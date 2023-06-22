# frozen_string_literal: true

module Clients
  module NotionApi
    class Client
      def initialize(notion_key)
        @client = Notion::Client.new(token: notion_key)
        @seconds_interval = ENV.fetch('NOTION_SECONDS_INTERVAL', 3)
        @max_retry = ENV.fetch('NOTION_MAX_RETRY', 10)
      end

      def page_tree_content
        result = { 'content' => '', 'pages' => page_tree }
        result['pages'].each do |page|
          page_content = ''
          all_blocks_children(page.id).each do |block|
            page_content += block_content(block)
          end
          page.store('page_content', page_content)
          result['content'] += "#{page_content} \n "
          get_notion_content_children(page, result)
        end
        result
      end

      def page_tree
        notion_all_pages = all_pages.select { |page| page['archived'] == false }
        root_pages = notion_all_pages.select { |page| page['parent']['workspace'] == true }
        populate_children(notion_all_pages, root_pages)
      end

      private

      def get_notion_content_children(page, result)
        return if page['children'].blank?

        page['children'].each do |page_children|
          page_content = ''
          all_blocks_children(page_children.id).each do |block|
            page_content += block_content(block)
          end
          page_children.store('page_content', page_content)
          result['content'] += "#{page_content} \n "
          get_notion_content_children(page_children, result)
        end
      end

      def populate_children(notion_all_pages, root_pages)
        root_pages.each do |page|
          children_pages = notion_all_pages.select { |notion_page| notion_page['parent']['page_id'] == page['id'] }
          Rails.logger.debug { "page #{page.id} children #{children_pages.length}" }
          unless children_pages.empty?
            page.store('children', children_pages)
            populate_children(notion_all_pages, children_pages)
          end
        end
      end

      def all_pages
        filter = { 'filter' => { 'value' => 'page', 'property' => 'object' } }
        pages(filter, 0)
      end

      def pages(filter, count_attempt)
        Rails.logger.debug { "get pages #{filter}" }
        begin
          response = @client.search(filter)
        rescue StandardError => e
          Rails.logger.error { "error pages #{e.message}. count attempt #{count_attempt}" }
          raise 'Maximum number of attempts to access the Notion API' if count_attempt.to_i >= @max_retry.to_i

          sleep(@seconds_interval)
          count_attempt += 1
          return pages(filter, count_attempt)
        end
        response_pages = response.results
        if response.has_more
          filter.merge!('start_cursor' => response.next_cursor)
          response_pages += pages(filter, count_attempt)
        end
        response_pages
      end

      def blocks_children(options, count_attempt)
        Rails.logger.debug { "get blocks_children #{options}" }
        begin
          response = if options['start_cursor'].nil?
                       @client.block_children(block_id: options['block_id'])
                     else
                       @client.block_children(block_id: options['block_id'], start_cursor: options['start_cursor'])
                     end
        rescue StandardError => e
          Rails.logger.error { "error blocks_children #{e.message}. count attempt #{count_attempt}" }
          raise 'Maximum number of attempts to access the Notion API' if count_attempt.to_i >= @max_retry.to_i

          sleep(@seconds_interval)
          count_attempt += 1
          return blocks_children(options, count_attempt)
        end

        response_block_children = response.results

        response.results.select { |block_children| block_children['has_children'] == true && block_children['type'] != 'child_page' }.each do |block_children|
          response_block_children += blocks_children({ 'block_id' => block_children.id }, count_attempt)
        end

        if response.has_more
          options.merge!('start_cursor' => response.next_cursor)
          response_block_children += blocks_children(options, count_attempt)
        end
        response_block_children
      end

      def all_blocks_children(block_id)
        options = { 'block_id' => block_id }
        blocks_children(options, 0)
      end

      def block_content(block)
        types = %w[bulleted_list_item callout child_page column column_list embed equation file heading_1 heading_2 heading_3 numbered_list_item paragraph quote synced_block table table_of_contents table_row template to_do toggle]
        text = ''
        types.each do |type|
          block[type.to_s]&.rich_text&.each do |rich_text|
            text += rich_text.text.content unless rich_text&.text&.content.nil?
          end
        end
        !text.empty? && text += " \n "
        text
      end
    end
  end
end
