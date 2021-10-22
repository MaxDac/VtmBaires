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

  # Gets the remote host and IP.
  # Having that the site in production will use Nginx, it forwards the information
  # as headers in Host and X-Real-IP respectively.
  defp get_remote_host_and_ip(conn = %{req_headers: headers}) do
    case Application.get_env(:vtm_web, :environment) do
      :prod ->
        case {
          conn |> get_req_header("host"),
          conn |> get_req_header("x-real-ip")
        } do
          {[host], [ip]} ->
            {host, ip}
          {_, ip} ->
            {inspect(headers), inspect(ip)}
        end
      _ ->
        %{host: host, remote_ip: remote_ip} = conn
        {host, remote_ip |> ip_to_string()}
    end
  end

  defp update_session(conn, user) do
    parsed_user =
      user
      |> Map.new(fn {k, v} -> {String.to_atom(k), v} end)

    {host, ip} = get_remote_host_and_ip(conn)

    attrs = %{
      host: host,
      ip: ip
    }

    Accounts.update_session(parsed_user, attrs)
  end

  def check(conn, _) do
    with {:ok, user} <- Authentication.check_request_cookie(conn) do
      conn
      |> render("ok-keys.json", user: user)
    end
  end

  def check_master(conn, _) do
    with {:ok, user = %{role: :master} } <- Authentication.check_request_cookie(conn) do
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

  defp ip_to_string(ip) when is_tuple(ip) do
    ip
    |> Tuple.to_list()
    |> Enum.join(".")
  end

  defp ip_to_string(ip), do: inspect(ip)

  @graphql """
  mutation ($userEmail: String!) {
    requestNewPassword(userEmail: $userEmail)
  }
  """
  def request_new_password(conn = %{
    host: host,
    remote_ip: remote_ip,
    body_params: %{"userEmail" => user_email}
  }, graphql_response) do
    with %{data: %{"requestNewPassword" => true}} <- graphql_response,
         ip_as_string                             <- remote_ip |> ip_to_string(),
         {:ok, _}                                 <- Accounts.create_new_password_request(%{ip: ip_as_string, host: host, user_email: user_email}) do # TODO
      conn
      |> render("password-request-ok.json")
    else
      e ->
        Logger.error("An error happened while requesting password change: #{inspect e}")

        conn
        |> put_status(400)
        |> render("not-ok.json")
    end
  end

end
