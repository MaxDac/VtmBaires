defmodule VtmWeb.SessionController do
  use VtmWeb, :controller
  require Logger
  use Absinthe.Phoenix.Controller, schema: VtmWeb.Schema

  alias VtmWeb.Authentication
  alias VtmAuth.Accounts

  action_fallback VtmWeb.FallbackController

  @graphql """
  mutation ($email: String!, $password: String!, $remember: Boolean!) {
    login(email: $email, password: $password, remember: $remember) {
      token
      user {
        id
        originalId
        email
        name
        role
        __typename
      }
    }
  }
  """
  def create(conn, graphql_response) do
    Logger.info("Logging in user");

    with %{data: %{"login" => result}} when not is_nil(result)  <- graphql_response,
         %{"token" => token, "user" => user}                    <- result,
         {:ok, _}                                               <- update_session(conn, %{user | "id" => user["originalId"]}) do
      conn
      |> Authentication.put_token(token)
      |> render("ok.json", %{user: user})
    else
      e ->
        Logger.error("An error happend while the user log in #{inspect e}")
        e
    end
  end

  defp update_session(%{host: host, remote_ip: remote_ip}, user) do
    parsed_user =
      user
      |> Map.new(fn {k, v} -> {String.to_atom(k), v} end)

    attrs = %{
      host: host,
      ip: remote_ip |> ip_to_string()
    }

    Accounts.update_session(parsed_user, attrs)
  end

  defp ip_to_string(ip) do
    ip
    |> Tuple.to_list()
    |> Enum.join(".")
  end

  def check(conn, _) do
    with {:ok, user} <- Authentication.check_request_cookie(conn) do
      conn
      |> render("ok-keys.json", user: user)
    end
  end

  def check_master(conn, _) do
    with { :ok, user = %{role: :master} } <- Authentication.check_request_cookie(conn) do
      conn
      |> render("ok-keys.json", user: user)
    end
  end

  @graphql """
  mutation {
    logout
  }
  """
  def logout(conn, _) do
    conn
    |> Authentication.put_token("")
    |> render("logout-ok.json")
  end

end
