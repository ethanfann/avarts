#!/bin/sh

set -e

echo "Executing docker-entrypoint.sh"

if [ -f tmp/pids/server.pid ]; then
  echo "Deleting tmp/pids/server.pid"
  rm tmp/pids/server.pid
fi

echo "Preparing database"
bundle exec rails db:prepare

echo "Starting Rails"
bundle exec rails s -b 0.0.0.0

echo "Starting worker"
bundle exec good_job start