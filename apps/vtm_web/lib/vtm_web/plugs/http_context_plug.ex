defmodule VtmWeb.HttpContextPlug do
  @moduledoc """
  This Plug checks the request cookie for the connection token.
  """
  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    {conn, context} = build_context(conn)
    conn |> assign(:current_user, context)
  end

  defp build_context(conn) do
    case VtmWeb.Authentication.check_request_cookie(conn) do
      {:ok, {conn, data}} -> {conn, data}
      _                   -> {conn, nil}
    end
  end

  def get_current_user(%Plug.Conn{assigns: %{current_user: current_user}}) do
    {:ok, current_user}
  end

  def get_current_user(_) do
    {:error, :not_found}
  end
end
