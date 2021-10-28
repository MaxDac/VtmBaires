defmodule VtmWeb.Authentication do
  @moduledoc false

  @cookie_name "x-xcrf-cookie"
  @cookie_max_age 3600 * 4

  import Plug.Conn

  defp get_user_salt() do
    System.get_env("USER_SALT") || "USER SALT"
  end

  defp get_subscription_token_salt() do
    System.get_env("SUBSCRIPTION_TOKEN_SALT") || "TOKEN SALT"
  end

  def sign_token(data) do
    Phoenix.Token.sign(VtmWeb.Endpoint, get_user_salt(), data)
  end

  def verify(token) do
    Phoenix.Token.verify(VtmWeb.Endpoint, get_user_salt(), token, [
      max_age: @cookie_max_age
    ])
  end

  def sign_subscription_key_token(user) do
    Phoenix.Token.sign(VtmWeb.Endpoint, get_subscription_token_salt(), user)
  end

  def verify_subscription_key_token(token) do
    Phoenix.Token.verify(VtmWeb.Endpoint, get_subscription_token_salt(), token, [
      max_age: 60
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
