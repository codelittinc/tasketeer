# frozen_string_literal: true

module Admin
  module Actions
    class ReplayFlow < RailsAdmin::Config::Actions::Base
      RailsAdmin::Config::Actions.register(ReplayFlow)

      register_instance_option :member do
        true
      end

      register_instance_option :visible? do
        bindings[:object].is_a?(FlowRequest)
      end

      register_instance_option :http_methods do
        %i[get]
      end

      register_instance_option :link_icon do
        # FontAwesome Icons
        'icon-repeat'
      end

      register_instance_option :controller do
        proc do
          flash[:success] = "We're replaying this flow right now!"
          if Rails.env.production?
            HardWorker.perform_async(@object.id)
          else
            FlowExecutor.new(@object).execute!
          end
          redirect_to back_or_index
        end
      end
    end
  end
end
