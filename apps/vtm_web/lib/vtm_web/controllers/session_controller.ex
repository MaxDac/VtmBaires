defmodule VtmWeb.SessionController do
  use VtmWeb, :controller
  use Absinthe.Phoenix.Controller, schema: VtmWeb.Schema

  alias VtmWeb.Authentication

  action_fallback VtmWeb.FallbackController

  @graphql """
  mutation ($email: String!, $password: String!, $role: Role!) {
    login(role: $role, email: $email, password: $password) {
      token
      user {
        id
        email
        name
        __typename
      }
    }
  }
  """
  def create(conn, graphql_response) do
    with %{data: %{"login" => result}} when not is_nil(result) <- graphql_response,
         %{"token" => token, "user" => user} <- result do
      conn
      |> Authentication.put_token(token)
      |> render("ok.json", user: user)
    end
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

  def logout(conn, _) do
    conn
    |> Authentication.put_token("")
    |> render("logout-ok.json")
  end

end
