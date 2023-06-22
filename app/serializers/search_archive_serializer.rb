# frozen_string_literal: true

# == Schema Information
#
# Table name: search_archives
#
#  id              :bigint           not null, primary key
#  query           :text             not null
#  response        :text             not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :bigint           not null
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#
class SearchArchiveSerializer
  include JSONAPI::Serializer
  attributes :id, :query, :response

  attributes :created_at do |object|
    object.created_at.strftime('%Y-%m-%d %H:%M')
  end
end
