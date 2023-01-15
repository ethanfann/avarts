if Rails.env.development?
  Sidekiq.configure_server do |config|
    config.redis = {
      host: ENV['REDIS_HOST'],
      port: ENV['REDIS_PORT'] || '6379',
    }
  end

  Sidekiq.configure_client do |config|
    config.redis = {
      host: ENV['REDIS_HOST'],
      port: ENV['REDIS_PORT'] || '6379',
    }
  end
end

if Rails.env.production?
  Sidekiq.configure_server { |config| config.redis = { url: ENV['REDIS_URL'] } }
  Sidekiq.configure_client { |config| config.redis = { url: ENV['REDIS_URL'] } }
end
