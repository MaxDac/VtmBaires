defmodule VtmWeb.Resolvers.AccountsResolvers do
  alias VtmAuth.Accounts
  alias VtmAuth.Accounts.User
  alias VtmAuth.Accounts.SessionInfo

  import VtmAuth.Helpers

  alias Vtm.Characters

  alias VtmWeb.UserEmail
  alias VtmWeb.Mailer

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
         character                            <- get_user_first_character(user),
         {:ok, _}                             <- Characters.update_character_in_session(user, character) do
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

  defp get_user_first_character(user) do
    # Checking whether the user has only one character.
    # In this case, the character will be automatically selected.
    case Characters.get_user_characters(user) do
      [character] -> character
      []          -> %{}
      characters  ->
        [c] =
          # Giving priviledge to non-npc
          characters
          |> Enum.sort(fn
            %{is_npc: false}, %{is_npc: true} -> true
            _, _ -> false
          end)
          |> Enum.take(1)

        c
    end
  end

  def user_name_exists?(_, %{name: name}, _) do
    {:ok, Accounts.user_name_exists?(name)}
  end

  def user_email_exists?(_, %{email: email}, _) do
    {:ok, Accounts.user_email_exists?(email)}
  end

  def create(_, request = %{email: email, name: user_name}, _) do
    new_password = generate_password(10)

    request =
      request
      |> Map.put_new(:role, "PLAYER")
      |> Map.put(:password, new_password)

    with {:ok, %User{id: id}} <- Accounts.create_user(request),
         mail                 <- UserEmail.welcome(user_name, email, new_password),
         {:ok, _}             <- Mailer.deliver(mail) do
      {:ok, %{id: id}}
    end
  end

  def all(_, _, _) do
    {:ok, Accounts.get_all_users()}
  end

  def all_sessions(_, _, _) do
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

  def update_session_character(%{character_id: id}, %{context: %{current_user: user}}) do
    with character      <- Characters.get_specific_character(user, id),
         mapped_request <- %SessionInfo{
           character_id: character.id,
           character_name: character.name,
           approved: character.approved
         },
      {:ok, %{session_info: %{
        character_id: id,
        character_name: name,
        approved: approved
      }}} <- Accounts.update_session_dynamic_field(user, mapped_request) do
      {:ok, %{
        id: id,
        name: name,
        approved: approved
      }}
    end
  end

  def update_session_map(request, %{context: %{current_user: user}}) do
    case Accounts.has_session_dynamic_fields?(user) do
      true ->
        with parsed_request                     <- Accounts.SessionInfo.extract_from_request(request),
             {:ok, session}                     <- Accounts.update_session_dynamic_field(user, parsed_request),
             %{session_info: %{"map_id" => id}} <- session do
          {:ok, id}
        end
      false ->
        {:error, :not_found}
    end
  end

  def clear_session(_, _, %{context: %{current_user: user}}) do
    with {:ok, _} <- Accounts.clear_session_dynamic_field(user) do
      {:ok, true}
    end
  end

  def logout(_, _, %{context: %{current_user: user}}) do
    with {:ok, _} <- Accounts.complete_session(user) do
      {:ok, true}
    end
  end

  def update_user_password(x, %{
    old_password: old,
    new_password: new,
    repeat_password: new
  }, context = %{context: %{current_user: %{id: id}}}) do
    with {:ok, user}  <- Accounts.get_user(id),
         {:ok, _}     <- login(x, %{email: user.email, password: old, remember: false}, context),
         {:ok, _}     <- user |> Accounts.update_user(%{password: new}) do
      {:ok, true}
    end
  end

  def request_new_password(_, %{user_email: user_email}, _) do
    with {:ok, user}  <- Accounts.get_user_by_email(user_email),
         new_password <- generate_password(10),
         mail         <- VtmWeb.UserEmail.recover_password(user.name, user.email, new_password),
         {:ok, _}     <- VtmWeb.Mailer.deliver(mail),
         {:ok, _}     <- user |> Accounts.update_user(%{password: new_password}) do
      {:ok, true}
    end
  end
end
