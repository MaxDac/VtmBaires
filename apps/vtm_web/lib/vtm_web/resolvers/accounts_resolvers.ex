defmodule VtmWeb.Resolvers.AccountsResolvers do
  alias VtmAuth.Accounts
  alias VtmAuth.Accounts.User

  alias VtmWeb.Resolvers.Helpers

  def parse_role("master", _), do: :master
  def parse_role(_, _), do: :player

  def me(_, _, %{context: %{current_user: current_user}}) do
    {:ok, current_user}
  end

  def me(_, _, _) do
    {:ok, nil}
  end

  def login(_, %{email: email, password: password, remember: remember}, _) do
    case Accounts.authenticate(email, password, remember) do
      {:ok, %{id: id, role: role} = user} ->
        token = VtmWeb.Authentication.sign_token(%{id: id, role: parse_role(role, nil)})
        {:ok, %{token: token, user: user}}
      _ ->
        {:error, "incorrect username or password"}
    end
  end

  def create(_, request = %{email: _, name: _, password: _}, _) do
    case Accounts.create_user(request |> Map.put_new(:role, "PLAYER")) do
      {:ok, %User{id: id}}                        ->
        {:ok, %{id: id}}
      {:error, errors} ->
        {:error, errors |> Helpers.parse_changeset_errors("Couldn't create the user")}
    end
  end

  def all(_, _, _) do
    sessions = Accounts.get_current_sessions()
    {:ok, sessions}
  end

  def token(_, _, %{context: %{current_user: current_user}}) do
    VtmWeb.Authentication.sign_subscription_key_token(current_user)
  end
end
