defmodule VtmWeb.ErrorStatusPlug do
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    register_before_send(conn, &set_status_code/1)
  end

  defp set_status_code(conn) do
    case Plug.Conn.get_resp_header(conn, "content-type") do
      ["application/json" <> _] ->
        set_status_code(conn, Jason.decode!(conn.resp_body))
      _ ->
        conn
    end
  end

  defp set_status_code(conn, %{"errors" => errors}) do
    case errors do
      [%{"message" => "unauthorized"}] ->
        put_status(conn, 401)
      _ ->
        put_status(conn, 400)
    end
  end

  defp set_status_code(conn, _) do
    conn
  end
end
