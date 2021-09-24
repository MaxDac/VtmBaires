defmodule VtmWeb.Resolvers.CharacterResolvers do
  alias Vtm.Characters
  import VtmWeb.Resolvers.Helpers

  alias Vtm.Characters.Character
  alias VtmAuth.Accounts

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
    with characters when not is_nil(characters) <- Characters.get_user_characters(user) do
      {:ok, characters}
    else
      _ ->
        {:ok, []}
    end
  end

  def get_character(%{ id: id }, %{context: %{current_user: user}}) do
    with character when not is_nil(character) <- Characters.get_specific_character(user, id) do
      {:ok, character |> map_character()}
    else
      _ ->
        {:error, "The user does not exist, or you have no permission to see it."}
    end
  end

  def get_character_stats(%{ character_id: id }, %{context: %{current_user: user}}) do
    with %{id: character_id}  <- Characters.get_specific_character(user, id),
         stats                <- Characters.get_character_stats(character_id) do
      {:ok, stats}
    else
      _ ->
        {:error, "The user does not exist, or you have no permission to see it."}
    end
  end

  defp get_session_character_p(user) do
    with session when not is_nil(session) <- Accounts.get_character_session_by_user_id(user.id) do
      {:ok, session}
    else
      _ ->
        {:ok, %{}}
    end
  end

  def get_session_character(_, _, %{context: %{current_user: user}}) do
    get_session_character_p(user)
  end

  def create_character(_, %{ request: request }, %{context: %{current_user: current_user}}) do
    new_request =
      request
      |> Map.put(:clan_id, from_global_id?(request.clan_id))
      |> Map.put(:user_id, current_user.id)

    with {:ok, %Character{id: id, name: name}} <- Characters.create(new_request, current_user) do
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

  def append_attributes(_, %{ request: request, new_stage: new_stage }, context = %{context: %{current_user: %{ id: user_id }}}) do
    new_request =
      request
      |> Enum.map(&parse_attribute_query/1)

    with {:ok, character_id} <- Characters.update_character_stage(user_id, new_stage, new_request) do
      get_character(%{ id: character_id }, context)
    end
  end

  def finalize_creation(_, %{ request: request, attributes: attributes, new_stage: new_stage }, context = %{context: %{current_user: %{ id: user_id }}}) do
    new_attributes =
      attributes
      |> Enum.map(&parse_attribute_query/1)

    IO.puts "new_attributes: #{inspect new_attributes}"

    [first_attribute | _] = new_attributes

    new_request =
      request
      |> Map.put(:predator_type_id, from_global_id?(request.predator_type_id))
      |> Map.put(:id, first_attribute.character_id)

    IO.puts "new_request: #{inspect new_request}"

    with {:ok, _}             <- Characters.finalize_creation(user_id, new_request),
         {:ok, character_id}  <- Characters.update_character_stage(user_id, new_stage, new_attributes) do
      get_character(%{ id: character_id }, context)
    end
  end
end
