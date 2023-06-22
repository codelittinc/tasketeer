# frozen_string_literal: true

#
# Table name: notion_pages
#
#  id              :bigint           not null, primary key
#  content         :text
#  name            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  notion_id       :string
#  notion_page_id  :bigint
#  organization_id :bigint           not null
#
# Foreign Keys
#
#  fk_rails_...  (notion_page_id => notion_pages.id)
#  fk_rails_...  (organization_id => organizations.id)
#
require 'rails_helper'

RSpec.describe NotionPage, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
