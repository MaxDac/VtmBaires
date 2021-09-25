defmodule VtmWeb.Resolvers.AccountsResolvers do
  alias VtmAuth.Accounts
  alias VtmAuth.Accounts.User

  alias VtmWeb.Resolvers.Helpers
  alias Vtm.Characters

  def parse_role("master", _), do: :master
  def parse_role(_, _), do: :player

  def me(_, _, %{context: %{current_user: current_user}}) do
    {:ok, current_user}
  end

  def me(_, _, _) do
    {:ok, nil}
  end

  def login(_, %{email: email, password: password, remember: remember}, context) do
    with {:ok, %{id: id, role: role} = user}  <- Accounts.authenticate(email, password, remember, context),
         character                            <- get_user_session(user) do
      token = VtmWeb.Authentication.sign_token(%{id: id, role: parse_role(role, nil)})

      {:ok, %{
        token: token,
        # Passing the id in this field to allow queries (for adding host and IP to the session)
        user: user |> Map.put(:original_id, user.id),
        character: character
      }}
    else
      _ ->
        {:error, "incorrect username or password"}
    end
  end

  defp get_user_session(user) do
    # Checking whether the user has only one character.
    # In this case, the character will be automatically selected.
    case Characters.get_user_characters(user) do
      [character] -> character
      []          -> %{}
    end
  end

  def create(_, request = %{email: _, name: _, password: _}, _) do
    case Accounts.create_user(request |> Map.put_new(:role, "PLAYER")) do
      {:ok, %User{id: id}} ->
        {:ok, %{id: id}}
      {:error, errors} ->
        {:error, errors |> Helpers.parse_changeset_errors("Couldn't create the user")}
    end
  end

  def all(_, _, _) do
    case Accounts.get_current_sessions() do
      sessions = %{session_info: %{
        "character_id"    => id,
        "character_name"  => name
      }} -> {:ok, sessions |> Map.put(:session_character, %{
        id: id,
        name: name
      })}
      session ->
        {:ok, session}
    end
  end

  def token(_, _, %{context: %{current_user: current_user}}) do
    {:ok, VtmWeb.Authentication.sign_subscription_key_token(current_user)}
  end

  def update_session_character(request, %{context: %{current_user: user}}) do
    with {:ok, %{session_info: %{
      character_id: id,
      character_name: name
    }}} <- VtmAuth.Accounts.update_session_dynamic_field(user, request) do
      {:ok, %{
        id: id,
        name: name
      }}
    end
  end

  def update_session_map(request, %{context: %{current_user: user}}) do
    with {:ok, session}                     <- VtmAuth.Accounts.update_session_dynamic_field(user, request),
         %{session_info: %{"map_id" => id}} <- session do
      {:ok, id}
    end
  end
end
