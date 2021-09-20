FROM elixir:1.12.3-alpine AS build

ARG db_url

ARG secret_key

# set build ENV
ENV MIX_ENV=prod

ENV DATABASE_URL=$db_url

ENV SECRET_KEY_BASE=$secret_key

WORKDIR /build

RUN apk add --no-cache build-base nodejs yarn && \
    mix local.hex --force && \
    mix local.rebar --force

COPY mix.exs mix.lock config/ ./
COPY apps/vtm_web/mix.exs ./apps/vtm_web/
COPY apps/vtm/mix.exs ./apps/vtm/
COPY apps/vtm_auth/mix.exs ./apps/vtm_auth/

RUN HEX_HTTP_CONCURRENCY=4 HEX_HTTP_TIMEOUT=10000 mix deps.get --only prod && \
    mix deps.compile

COPY . .

RUN yarn --cwd apps/vtm_web/assets install --pure-lockfile && \
    yarn --cwd apps/vtm_web/assets build && \
    cd apps/vtm_web && mix phx.digest

WORKDIR /build/apps/vtm_web

RUN mix phx.digest

WORKDIR /build

RUN mix compile && mix release

# prepare release image
FROM alpine:3.13.6 AS app

RUN apk add --no-cache libgcc libstdc++ ncurses ncurses-libs

RUN addgroup -S release && \
    adduser -S -G release release && \
    mkdir /release && \
    chown -R release: /release

WORKDIR /release

COPY --from=build --chown=release:release /build/_build/prod/rel/vtm .

USER release

EXPOSE 4000

CMD ["bin/vtm", "start"]