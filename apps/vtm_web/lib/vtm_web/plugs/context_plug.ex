defmodule VtmWeb.ContextPlug do
  @moduledoc false

  @behaviour Plug

  def init(opts), do: opts

  def call(conn, _) do
    {conn, context} = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  defp build_context(conn) do
    case VtmWeb.Authentication.check_request_cookie(conn) do
      {:ok, {conn, data}} -> {conn, %{current_user: data}}
      _ -> {conn, %{}}
    end
  end
end
