# frozen_string_literal: true

if defined?(Datadog)
  return unless Rails.env.production?

  service = ENV.fetch('DATADOG_SITE_NAME', nil)
  Datadog.configure do |c|
    # Global settings
    c.agent.host = '127.0.0.1'
    c.agent.port = 8126
    c.runtime_metrics.enabled = true
    c.service = service

    # Tracing settings
    c.tracing.analytics.enabled = true
    c.tracing.partial_flush.enabled = true

    # CI settings
    c.ci.enabled = (ENV['DD_ENV'] == 'ci')

    # Instrumentation
    c.tracing.instrument :rails
    c.tracing.instrument :active_support, cache_service: "#{service}-cache"
    c.tracing.instrument :action_pack, service_name: "#{service}-controllers"
    c.tracing.instrument :active_record, service_name: "#{service}-db"
    c.tracing.instrument :active_job, service_name: "#{service}-jobs"

    c.ci.instrument :rspec
  end
end
