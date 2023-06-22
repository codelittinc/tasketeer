FROM ruby:3.2.0-bullseye as development

RUN echo "Running Dockerfile with the environment: DEVELOPMENT"

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN npm install -g yarn

RUN gem install bundler

EXPOSE 3000

WORKDIR /app

ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock

ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock

RUN yarn install

RUN gem install foreman
RUN bundle config set with ‘development’
RUN bundle install

ADD ./ /app

FROM development as production

ARG ENVIRONMENT
ARG SECRET_KEY_BASE

RUN echo "Running Dockerfile with the environment: PRODUCTION"

ENV RAILS_ENV production

CMD ["rails", "server", "-b", "0.0.0.0"]
