defmodule VtmWeb.Context do
  @behaviour Plug

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    Absinthe.Plug.put_options(conn, context: context)
  end

  defp build_context(conn) do
    with {:ok, data}  <- VtmWeb.Authentication.check_request_cookie(conn) do
      %{current_user: data}
    else
      _ -> %{}
    end
  end
end
