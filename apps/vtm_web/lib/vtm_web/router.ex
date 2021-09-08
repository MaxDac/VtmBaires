defmodule VtmWeb.Router do
  use VtmWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug VtmWeb.Context
    plug VtmWeb.HttpContextPlug
  end

  scope "/", VtmWeb do
    pipe_through :browser

    get "/", BaseController, :index
  end

  scope "/" do
    pipe_through :api

    post "/login", VtmWeb.SessionController, :create
    post "/check", VtmWeb.SessionController, :check
    post "/checkmaster", VtmWeb.SessionController, :check_master

    forward "/api", Absinthe.Plug,
      schema: VtmWeb.Schema
      # socket: VtmWeb.UserSocket

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: VtmWeb.Schema,
      socket: VtmWeb.UserSocket
      # interface: :simple,
      # socket: VtmWeb.UserSocket
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: VtmWeb.Telemetry
    end
  end
end
