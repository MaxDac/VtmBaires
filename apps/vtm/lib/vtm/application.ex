defmodule Vtm.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Vtm.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Vtm.PubSub}
      # Start a worker by calling: Vtm.Worker.start_link(arg)
      # {Vtm.Worker, arg}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: Vtm.Supervisor)
  end
end
