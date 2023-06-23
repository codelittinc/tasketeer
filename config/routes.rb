# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength

# == Route Map
#

require 'sidekiq/web'
require 'sidekiq/cron/web'

Rails.application.routes.draw do
  enable_sign_in = ENV.fetch('REACT_APP_ENABLE_SIGN_IN', nil)

  if Rails.env.production?
    Sidekiq::Web.use Rack::Auth::Basic do |username, password|
      ActiveSupport::SecurityUtils.secure_compare(Digest::SHA2.hexdigest(username), Digest::SHA2.hexdigest(ENV.fetch('ADMIN_USER', nil))) &
        ActiveSupport::SecurityUtils.secure_compare(Digest::SHA2.hexdigest(password), Digest::SHA2.hexdigest(ENV.fetch('ADMIN_PASSWORD', nil)))
    end
  end

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  mount Sidekiq::Web => '/sidekiq'
  mount ActionCable.server => '/cable'

  if enable_sign_in == 'true'
    devise_for :users,
               path: '/',
               path_names: {
                 sign_in: 'login',
                 sign_out: 'logout',
                 registration: 'signup'
               },
               controllers: {
                 sessions: 'users/sessions',
                 registrations: 'users/registrations'
               }
  else
    devise_for :users,
               path: '/',
               path_names: {
                 sign_out: 'logout'
               }
  end

  namespace :api do
    resources :gpt_api_keys, only: %i[create index destroy]
    resources :web_pages, only: %i[create edit index destroy]
    resources :messages, only: %i[create index] do
      collection do
        delete 'delete_all'
      end
    end
    resources :roles, only: %i[index]
    resources :user_roles, only: %i[create index destroy]
    get 'me', to: 'users#index'
    post 'oauth/slack', to: 'users#slack'
    post 'authorize_oauth/slack', to: 'users#authorize_oauth_slack'
    post 'flows', to: 'flow#create'
    resources :organizations
    resources :organization_files, only: %i[create index destroy]
    post 'index-files', to: 'organization_files#index_files'
    get 'files/processing', to: 'organization_files#show_processing_files'
    get 'notion/last-execution/:organization_id', to: 'notion_integration#last_execution'
    post 'notion/run/:organization_id', to: 'notion_integration#run'
    get 'notion/all_pages/:organization_id', to: 'notion_integration#all_pages'
    post 'users/reset-password', to: 'users#reset_password'
    post 'users/update-password', to: 'users#update_password'

    namespace :admin do
      get 'history', to: 'search_history#index'
    end
  end

  root to: 'app#index'

  # All html requests render the app#index for react
  get '*path', constraints: { path: /.*/, format: 'html' }, to: 'app#index'
end

# rubocop:enable Metrics/BlockLength
