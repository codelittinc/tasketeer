# frozen_string_literal: true

VCR.configure do |config|
  config.cassette_library_dir = 'spec/cassettes'
  config.hook_into :webmock
  config.configure_rspec_metadata!
  config.filter_sensitive_data('<SENSITIVE_DATA>') { ENV.fetch('GIT_AUTH_KEY', nil) }
  config.filter_sensitive_data('<SENSITIVE_DATA>') { ENV.fetch('AZURE_AUTH_KEY', nil) }
  config.filter_sensitive_data('<SENSITIVE_DATA>') { ENV.fetch('SLACK_API_KEY', nil) }
  config.filter_sensitive_data('<SENSITIVE_DATA>') { ENV.fetch('JIRA_AUTH_KEY', nil) }
  config.filter_sensitive_data('<SENSITIVE_DATA>') { ENV.fetch('NOTIFICATIONS_API_KEY', nil) }
  config.filter_sensitive_data('<SENSITIVE_DATA>') { ENV.fetch('GITHUB_PRIVATE_KEY', nil) }
  config.filter_sensitive_data('<SENSITIVE_DATA>') { ENV.fetch('GITHUB_APP_ID', nil) }
  config.filter_sensitive_data('<SENSITIVE_DATA>') { ENV.fetch('GITHUB_CLIENT_SECRET', nil) }
  config.filter_sensitive_data('<SENSITIVE_DATA>') { ENV.fetch('GPT_KEY', nil) }
end
