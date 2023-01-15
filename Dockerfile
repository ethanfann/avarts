FROM ruby:3.2.0-alpine
ENV BUNDLER_VERSION=2.4.3
RUN apk add --update --no-cache \
  binutils-gold \
  build-base \
  curl \
  file \
  g++ \
  gcc \
  git \
  less \
  libstdc++ \
  libffi-dev \
  libc-dev \ 
  linux-headers \
  libxml2-dev \
  libxslt-dev \
  libgcrypt-dev \
  make \
  netcat-openbsd \
  openssl \
  pkgconfig \
  postgresql-dev \
  python3 \
  tzdata
RUN gem install bundler -v 2.4.3
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle config set without 'development test'
RUN bundle config build.nokogiri --use-system-libraries
RUN bundle check || bundle install
COPY . ./
ENTRYPOINT ["./entrypoints/docker-entrypoint.sh"]