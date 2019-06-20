FROM ruby:2.6.3

# Install node
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install -y nodejs

# Setup Cypress dependencies
RUN apt-get update && apt-get install -y xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2

# Setup application & dependencies
RUN mkdir /myapp
WORKDIR /myapp
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN bundle install
COPY package.json /myapp/package.json
COPY package-lock.json /myapp/package-lock.json
RUN npm install
COPY . /myapp

#!/bin/bash
RUN set -e
# Remove a potentially pre-existing server.pid for Rails.
RUN rm -f /myapp/tmp/pids/server.pid
# Then exec the container's main process (what's set as CMD in the Dockerfile).
RUN exec "$@"

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]
