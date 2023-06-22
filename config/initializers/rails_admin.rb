# frozen_string_literal: true

require 'nested_form/engine'
require 'nested_form/builder_mixin'

require Rails.root.join('app/services/admin/actions/replay_flow.rb')

RailsAdmin.config do |config|
  config.asset_source = :sprockets

  if Rails.env.production?
    config.authorize_with do
      authenticate_or_request_with_http_basic('Login required') do |username, password|
        username == ENV.fetch('ADMIN_USER') &&
          password == ENV.fetch('ADMIN_PASSWORD')
      end
    end
  end

  RailsAdmin.config FlowRequest do
    list do
      include_fields :json, :executed, :flow_name, :error_message, :created_at
    end
  end

  ### Popular gems integration

  ## == CancanCan ==
  # config.authorize_with :cancancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  config.main_app_name = %w[Tasketeer Admin]
  ## == Gravatar integration ==
  ## To disable Gravatar integration in Navigation Bar set to false
  # config.show_gravatar = true

  config.actions do
    dashboard do
      statistics true
    end
    index # mandatory
    new
    show
    edit
    delete

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end
end
