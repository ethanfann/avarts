web: /bin/bash -l -c "bundle exec puma -C config/puma.rb"
worker: /bin/bash -l -c "bundle exec good_job start"
release: /bin/bash -l -c "bin/rails db:migrate"