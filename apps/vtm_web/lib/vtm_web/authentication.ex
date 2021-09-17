defmodule VtmWeb.Authentication do
  @user_salt "user salt"
  @cookie_name "x-xcrf-cookie"

  import Plug.Conn

  @spec sign_token(any) :: nonempty_binary
  def sign_token(data) do
    Phoenix.Token.sign(VtmWeb.Endpoint, @user_salt, data)
  end

  def verify(token) do
    Phoenix.Token.verify(VtmWeb.Endpoint, @user_salt, token, [
      max_age: 1800
    ])
  end

  @spec get_cookie(%Plug.Conn{}, String.t()) :: {:error, :not_found} | {:ok, String.t()}
  def get_cookie(conn, cookie_key) do
    conn = conn |> fetch_cookies()

    try do
      case conn.req_cookies[cookie_key] do
        nil -> {:error, :not_found}
        c   -> {:ok, c}
      end
    catch
      _ ->
        {:error, :not_found}
    end
  end

  def put_token(conn, token) do
    conn |> put_resp_cookie(@cookie_name, token, same_site: "Strict")
  end

  def check_request_cookie(conn) do
    with {:ok, token}   <- get_cookie(conn, @cookie_name),
         res = {:ok, _} <- verify(token) do
      res
    else
      _ -> {:error, :unauthorized}
    end
  end
end
