defmodule VtmWeb.HttpContextPlug do
  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    conn |> assign(:current_user, context)
  end

  defp build_context(conn) do
    with {:ok, data}  <- VtmWeb.Authentication.check_request_cookie(conn) do
      data
    else
      _ ->
        nil
    end
  end

  def get_current_user(%Plug.Conn{ assigns: %{ current_user: current_user } }) do
    {:ok, current_user}
  end

  def get_current_user(_) do
    {:error, :not_found}
  end
end
