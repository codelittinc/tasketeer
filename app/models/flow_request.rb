# frozen_string_literal: true

# == Schema Information
#
# Table name: flow_requests
#
#  id            :bigint           not null, primary key
#  error_message :string
#  executed      :boolean
#  flow_name     :string
#  json          :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class FlowRequest < ApplicationRecord
end
