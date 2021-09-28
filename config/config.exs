# This file is responsible for configuring your umbrella
# and **all applications** and their dependencies with the
# help of Mix.Config.
#
# Note that all applications in your umbrella share the
# same configuration and dependencies, which is why they
# all use the same configuration file. If you want different
# configurations or dependencies per app, it is best to
# move said applications out of the umbrella.
use Mix.Config

# Configure Mix tasks and generators
config :vtm_auth,
  ecto_repos: [VtmAuth.Repo]

# Configure Mix tasks and generators
config :vtm,
  ecto_repos: [Vtm.Repo]

config :vtm_web,
  ecto_repos: [Vtm.Repo],
  generators: [context_app: :vtm]

# Configures the endpoint
config :vtm_web, VtmWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "clflXLpE1qXp2Tp5pUFJ+rKyCymEpQ+o6xoozLx/89p2EBxB/GNO+rJhSrVKNfox",
  render_errors: [view: VtmWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Vtm.PubSub,
  live_view: [signing_salt: "AWg1Oe3w"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
