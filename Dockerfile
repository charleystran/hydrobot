FROM ruby:3.0
# Ideally this is pulled from a private container registry for security purposes
FROM ruby:3.0-slim-buster
# Install container dependencies
# TODO: Build a better Dockerfile based on node + ruby-slim (k3s?)
RUN apt-get update -qq && apt-get install -y \
  curl \
  build-essential \
  libpq-dev \
  postgresql-client && \
  curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y nodejs yarn git
WORKDIR /app
# Install ruby dependencies
# TODO: Bundle into vendor/cache and map as volume: https://stackoverflow.com/a/61208108/705131
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN gem update bundler
RUN bundle install --jobs 5
# Install javascript dependencies
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install
RUN yarn
# Copy source code for application
COPY . /app
# This tool, in conjunction with the /usr/bin/notify-send-server on host machine, will forward notifications
# sent with notify-send in the container (from Guard) to the host.
# TODO: Find a better way to do notifications from within a container, and move to a Guard-only Dockerfile
RUN /bin/bash -c "curl -L https://github.com/fgrehm/notify-send-http/releases/download/v0.2.0/client-linux_amd64 | tee /usr/local/bin/notify-send &>/dev/null"
RUN chmod +x /usr/local/bin/notify-send
ARG rails_env=development
ENV RAILS_ENV=$rails_env
ENV NOTIFY_SEND_URL="http://172.17.0.1:12345"
# Add a script to be executed every time the container starts.
COPY bin/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000
# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0"]

