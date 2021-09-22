defmodule VtmWeb.SessionController do
  use VtmWeb, :controller
  use Absinthe.Phoenix.Controller, schema: VtmWeb.Schema

  alias VtmWeb.Authentication
  alias VtmAuth.Accounts
  alias Vtm.Characters

  action_fallback VtmWeb.FallbackController

  @graphql """
  mutation ($email: String!, $password: String!, $remember: Boolean!) {
    login(email: $email, password: $password, remember: $remember) {
      token
      user {
        id
        email
        name
        role
        __typename
      }
      session {
        characterId
        characterName
      }
    }
  }
  """
  def create(conn, graphql_response) do
    with %{data: %{"login" => result}} when not is_nil(result)  <- graphql_response,
         %{"token" => token, "user" => user}                    <- result,
         {:ok, s}                                               <- update_session(conn, user) do
      conn
      |> Authentication.put_token(token)
      |> render("ok.json", %{user: user, session: s})
    end
  end

  defp update_session(%{host: host, remote_ip: remote_ip}, user) do
    # Checking whether the user has only one character.
    # In this case, the character will be automatically selected.
    parsed_user =
      user
      |> Map.new(fn {k, v} -> {String.to_atom(k), v} end)

    attrs =
      case Characters.get_user_characters(parsed_user) do
        [%{id: id, name: name}] ->
          %{
            session_info: %{
              character_id: id,
              character_name: name
            }
          }
        [] ->
          %{}
      end
      |> Map.put(:host, host)
      |> Map.put(:ip, remote_ip |> ip_to_string())

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

  def logout(conn, _) do
    conn
    |> Authentication.put_token("")
    |> render("logout-ok.json")
  end

end
