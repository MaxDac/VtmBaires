defmodule VtmWeb.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      VtmWeb.Telemetry,
      # Start the Endpoint (http/https)
      VtmWeb.Endpoint,
      # Start a worker by calling: VtmWeb.Worker.start_link(arg)
      # {VtmWeb.Worker, arg}
      {Absinthe.Subscription, VtmWeb.Endpoint}
    ]

    # Performs the needed migrations
    startup_tasks()

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: VtmWeb.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    VtmWeb.Endpoint.config_change(changed, removed)
    :ok
  end

  defp startup_tasks do
    # Migration should run only in production
    if Application.get_env(:vtm_web, :environment) == :prod do
      VtmWeb.Releases.migrate()
      VtmWeb.Releases.seed()
    end

    :ok
  end
end
