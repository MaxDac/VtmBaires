defmodule VtmWeb.Authentication do
  @moduledoc false

  @cookie_name "x-xcrf-cookie"
  @relogin_cookie_name "x-xcfre-rl-cookie"

  @cookie_max_age 1800
  @relogin_cookie_max_age 3600 * 12

  require Logger
  import Plug.Conn
  alias VtmAuth.Accounts
  alias VtmWeb.Resolvers.AccountsResolvers
  alias VtmAuth.Accounts.User

  defp get_user_salt() do
    System.get_env("USER_SALT") || "USER SALT"
  end

  defp get_relogin_user_salt() do
    System.get_env("USER_RELOGIN_SALT") || "USER_RELOGIN_SALT"
  end

  defp get_subscription_token_salt() do
    System.get_env("SUBSCRIPTION_TOKEN_SALT") || "TOKEN SALT"
  end

  @spec sign_token(map()) :: nonempty_binary
  def sign_token(data) do
    Phoenix.Token.sign(VtmWeb.Endpoint, get_user_salt(), data)
  end

  def verify(token) do
    Phoenix.Token.verify(VtmWeb.Endpoint, get_user_salt(), token, [
      max_age: @cookie_max_age
    ])
  end

  def get_token_info(token) do
    Phoenix.Token.verify(VtmWeb.Endpoint, get_user_salt(), token, [
      max_age: @relogin_cookie_max_age
    ])
  end

  def sign_relogin_token(data) do
    Phoenix.Token.sign(VtmWeb.Endpoint, get_relogin_user_salt(), data)
  end

  def verify_relogin_token(token) do
    Phoenix.Token.verify(VtmWeb.Endpoint, get_relogin_user_salt(), token, [
      max_age: @relogin_cookie_max_age
    ])
  end

  def sign_subscription_key_token(user) do
    Phoenix.Token.sign(VtmWeb.Endpoint, get_subscription_token_salt(), user)
  end

  def verify_subscription_key_token(token) do
    Phoenix.Token.verify(VtmWeb.Endpoint, get_subscription_token_salt(), token, [
      max_age: 30
    ])
  end

  @spec get_cookie(Plug.Conn.t(), binary()) :: {:error, :not_found} | {:ok, binary()}
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

  @spec put_session_token(Plug.Conn.t(), binary()) :: Plug.Conn.t()
  def put_session_token(conn, token) do
    conn |> put_resp_cookie(@cookie_name, token, same_site: "Strict")
  end

  @spec put_relogin_token(Plug.Conn.t(), binary()) :: Plug.Conn.t()
  def put_relogin_token(conn, token) do
    conn |> put_resp_cookie(@relogin_cookie_name, token, same_site: "Strict")
  end

  @doc """
  Checks whether the request contains the session cookie. If it hasn't or it expired,
  it tries to check whether the relogin token is available or not. If it is, it then tries to
  relogin, otherwise returns an unauthenticated response.
  """
  @spec check_request_cookie(Plug.Conn.t()) :: {:ok, {Plug.Conn.t(), map()}} | {:error, :unauthorized}
  def check_request_cookie(conn) do
    case get_cookie(conn, @cookie_name) do
      {:ok, token}  ->
        case verify(token) do
          {:ok, res}  -> {:ok, {conn, res}}
          _           -> check_relogin_cookie(conn, token)
        end
      _ ->
        {:error, :unauthorized}
    end
  end

  @spec check_relogin_cookie(Plug.Conn.t(), binary()) :: {:ok, {Plug.Conn.t(), map()}} | {:error, :unauthorized}
  defp check_relogin_cookie(conn, session_token) do
    Logger.info("Performing relogin token authentication")

    with {:ok, user}        <- get_token_info(session_token),
         {:ok, token}       <- get_cookie(conn, @relogin_cookie_name),
         {:ok, relogin_id}  <- verify_relogin_token(token),
         :ok                <- Accounts.user_has_relogin_token?(user, relogin_id) do

      new_token = sign_token(user)
      Logger.info("new token: #{inspect new_token}")
      conn = conn |> put_session_token(new_token)
      {:ok, {conn, user}}

    else
      _ ->
        {:error, :unauthorized}
    end
  end

  @doc """
  Performs the login, calling the Ecto projects.
  """
  @spec login(binary(), binary(), boolean()) :: {:ok, %{
               relogin_token: binary(),
               relogin_id: binary(),
               token: nonempty_binary(),
               user: User.t()
             }} | {:error, :unauthorized}
  def login(email, password, remember) do
    case Accounts.authenticate(email, password, remember) do
      {:error, _} ->
        {:error, :unauthorized}
      {:ok, user = %User{id: id, role: role}} ->
        role = AccountsResolvers.parse_role(role, nil)
        token = VtmWeb.Authentication.sign_token(%{id: id, role: role})
        {relogin_id, relogin_token} = get_relogin_token(remember)

        {:ok, %{
          token: token,
          relogin_token: relogin_token,
          relogin_id: relogin_id,
          # Passing the id in this field to allow queries (for adding host and IP to the session)
          user: user |> Map.put(:original_id, user.id)
        }}
    end
  end

  defp get_relogin_token(true) do
    uuid = VtmAuth.Helpers.get_uuid()
    {uuid, uuid |> VtmWeb.Authentication.sign_relogin_token()}
  end

  defp get_relogin_token(_), do: {"", ""}
end
