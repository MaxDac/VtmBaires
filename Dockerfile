FROM elixir:1.11-alpine AS build

USER root

# install build dependencies
RUN apk update && \
    apk add --no-cache build-base python3 && \
    ln -sf python3 /usr/bin/python

# install hex + rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# set build ENV
ARG app_name=vtm_baires
ARG phoenix_subdir=.
ARG build_env=prod

ENV MIX_ENV=${build_env} TERM=xterm

# prepare build dir
RUN mkdir /app
COPY . /app
WORKDIR /app

# install mix dependencies
RUN mix do deps.get, deps.compile

RUN mix phx.digest

# compile and build release
RUN mix do compile, release

# prepare release image
FROM alpine:3.13.5 AS app
RUN apk add --no-cache openssl ncurses-libs

WORKDIR /app

RUN chown nobody:nobody /app

USER nobody:nobody

COPY --from=build --chown=nobody:nobody /app/_build/prod/rel/pitu_blog ./

COPY utils/migrate_and_start.sh /app

ENV HOME=/app

CMD ["bin/pitu_blog", "start"]