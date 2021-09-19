FROM elixir:1.12.3-alpine AS build

# install build dependencies
RUN apk add --no-cache build-base npm git

RUN npm install -g yarn

# prepare build dir
WORKDIR /app

# install hex + rebar
RUN mix local.hex --force && \
    mix local.rebar --force

ARG db_url

ARG secret_key

# set build ENV
ENV MIX_ENV=prod

ENV DATABASE_URL=$db_url

ENV SECRET_KEY_BASE=$secret_key

# install mix dependencies
COPY apps apps
COPY mix.exs mix.lock ./
COPY config config
RUN HEX_HTTP_CONCURRENCY=1 HEX_HTTP_TIMEOUT=180 mix do deps.get, deps.compile
RUN mix do compile

# build assets
RUN npm --prefix ./apps/vtm_web/assets ci --progress=false --no-audit --loglevel=error

RUN npm run --prefix ./apps/vtm_web/assets dock
RUN cd apps/vtm_web
RUN mix phx.digest

# uncomment COPY if rel/ exists
# COPY rel rel
RUN mix do compile, release

# prepare release image
FROM alpine:3.13.6 AS app

RUN apk upgrade --no-cache && \
    apk add --no-cache postgresql-client bash openssl libgcc libstdc++ ncurses-libs

WORKDIR /app

RUN chown nobody:nobody /app

USER nobody:nobody

COPY --from=build --chown=nobody:nobody /app/_build/prod/rel/vtm ./

ENV HOME=/app

CMD ["bin/vtm", "start"]