FROM ruby:2.6.3
RUN apt-get update -qq && apt-get install -y nodejs
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY . /myapp

#!/bin/bash
RUN set -e
# Remove a potentially pre-existing server.pid for Rails.
RUN rm -f /myapp/tmp/pids/server.pid
# Then exec the container's main process (what's set as CMD in the Dockerfile).
RUN exec "$@"

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
