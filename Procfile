web: /bin/bash -l -c "bundle exec puma -C config/puma.rb"
worker: /bin/bash -l -c "bundle exec sidekiq -e production"
release: /bin/bash -l -c "bin/rails db:migrate"