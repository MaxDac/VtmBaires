defmodule VtmWeb.Resolvers.CharacterResolvers do
  alias Vtm.Characters
  import VtmWeb.Resolvers.Helpers

  alias Vtm.Characters.Character
  alias VtmAuth.Accounts
  alias VtmAuth.Accounts.SessionInfo

  def all(_, _, _) do
    {:ok, Characters.all()}
  end

  def all_unapproved(_, _, _) do
    {:ok, Characters.all_unapproved()}
  end

  def get_clans(_, _, _) do
    {:ok, Characters.get_clans()}
  end

  def get_predator_types(_, _, _) do
    {:ok, Characters.get_predator_types()}
  end

  def get_attributes(_, _, _) do
    {:ok, Characters.get_attributes()}
  end

  def get_clan_disciplines(%{clan_id: clan_id}, _) do
    {:ok, Characters.get_clan_disciplines(clan_id)}
  end

  def get_user_characters(user, _, _) do
    case Characters.get_user_characters(user) do
      characters when not is_nil(characters) ->
        {:ok, characters}
      _ ->
        {:ok, []}
    end
  end

  def get_character(%{id: id }, %{context: %{current_user: user}}) do
    case Characters.get_specific_character(user, id) do
      character when not is_nil(character) ->
        {:ok, character |> map_character()}
      _ ->
        {:error, "The user does not exist, or you have no permission to see it."}
    end
  end

  def get_character_stats(%{character_id: id }, %{context: %{current_user: user}}) do
    with %{id: character_id}  <- Characters.get_specific_character(user, id),
         stats                <- Characters.get_character_stats(character_id) do
      {:ok, stats}
    else
      _ ->
        {:error, "The user does not exist, or you have no permission to see it."}
    end
  end

  def get_session_character(_, _, %{context: %{current_user: user}}) do
    with {:ok, %SessionInfo{
      character_id: id,
      character_name: name,
      approved: approved
    }} <- Accounts.get_character_session_by_user_id(user.id) do
      {:ok, %{
        id: id,
        name: name,
        approved: approved
      }}
    end
  end

  def create_character(_, %{request: request }, %{context: %{current_user: current_user}}) do
    new_request =
      request
      |> Map.put(:clan_id, from_global_id?(request.clan_id))
      |> Map.put(:user_id, current_user.id)

    with {:ok, %Character{id: id, name: name}}  <- Characters.create(new_request, current_user),
         {:ok, _}                               <- VtmAuth.Accounts.update_session_dynamic_field(current_user, %{
           character_id: id,
           character_name: name,
           approved: false
         }) do
      {:ok, %{
        id: id,
        name: name
      }}
    end
  end

  defp map_character(character) do
    character
    |> Map.put(:info, %{
      id: character.id,
      name: character.name,
      avatar: character.avatar,
      chat_avatar: character.chat_avatar
    })
  end

  def parse_attribute_query(request = %{attribute_id: id, character_id: char_id}) do
    request
    |> Map.put(:attribute_id, from_global_id?(id))
    |> Map.put(:character_id, from_global_id?(char_id))
  end

  def append_attributes(_, %{request: request, new_stage: new_stage}, context = %{context: %{current_user: %{id: user_id}}}) do
    new_request =
      request
      |> Enum.map(&parse_attribute_query/1)

    with {:ok, character_id} <- Characters.update_character_stage(user_id, new_stage, new_request) do
      get_character(%{id: character_id}, context)
    end
  end

  def switch_attributes(_, request = %{character_id: id}, context = %{context: %{current_user: %{id: user_id}}}) do
    with parsed_id    <- from_global_id?(id),
         true         <- Characters.character_of_user?(user_id, parsed_id),
         new_request  <- request |> Map.new(fn {k, v} -> {k, from_global_id?(v)} end),
         {:ok, _}     <- Characters.switch_attributes(new_request) do
      get_character(%{id: parsed_id}, context)
    else
      false ->
        {:error, :unauthorized}
      e ->
        e
    end
  end

  def add_advantages(_, %{request: request, attributes: attributes, new_stage: new_stage}, context = %{context: %{current_user: %{id: user_id}}}) do
    new_attributes =
      attributes
      |> Enum.map(&parse_attribute_query/1)

    [first_attribute | _] = new_attributes

    new_request =
      request
      |> Map.put(:predator_type_id, from_global_id?(request.predator_type_id))
      |> Map.put(:id, first_attribute.character_id)

    with {:ok, _}             <- Characters.add_advantages(user_id, new_request),
         {:ok, character_id}  <- Characters.update_character_stage(user_id, new_stage, new_attributes) do
      get_character(%{id: character_id}, context)
    end
  end

  def finalize_character(%{character_id: character_id}, context = %{context: %{current_user: %{id: user_id}}}) do
    with {:ok, _} <- Characters.complete_character(user_id, character_id) do
      get_character(%{id: character_id}, context)
    end
  end

  def delete_character(%{character_id: character_id}, %{context: %{current_user: user}}) do
    with {:ok, _} <- Characters.delete_character(character_id, user),
         {:ok, _} <- Accounts.update_session_dynamic_field(user) do
      {:ok, true}
    end
  end

  def change_sheet_info(%{character_id: character_id, request: request}, _) do
    Characters.change_sheet_info(character_id, request)
  end
end
