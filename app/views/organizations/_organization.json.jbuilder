# frozen_string_literal: true

json.extract! organization, :id, :notifications_id, :name, :notifications_key, :created_at, :updated_at
json.url organization_url(organization, format: :json)
