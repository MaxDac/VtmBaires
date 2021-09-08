defmodule VtmWeb.Resolvers.CharacterResolvers do
  alias Vtm.Characters

  alias Vtm.Characters.Character
  # alias Vtm.Characters.Clan

  # alias VtmWeb.Resolvers.Helpers

  def get_clans(_, _, _) do
    {:ok, Characters.get_clans()}
  end

  def get_predator_types(_, _, _) do
    {:ok, Characters.get_predator_types()}
  end

  def get_attributes(_, _, _) do
    {:ok, Characters.get_attributes()}
  end

  def get_user_characters(user, _, _) do
    with characters when not is_nil(characters) <- Characters.get_user_characters(user) do
      {:ok, characters}
    else
      _ ->
        {:ok, []}
    end
  end

  def get_character(_, %{ id: id }, %{context: %{current_user: user}}) do
    IO.inspect user
    IO.inspect id
    with character when not is_nil(character) <- Characters.get_specific_character(user, id) do
      {:ok, character |> map_character()}
    else
      _ ->
        {:error, "The user does not exist, or you have no permission to see it."}
    end
  end

  def create_character(_, %{ request: request }, %{context: %{current_user: current_user}}) do
    with {:ok, character} <- Characters.create(request |> Map.put(:user_id, current_user.id)) do
      {:ok, character |> map_character()}
    end
  end

  defp map_character(character) do
    character
    |> Map.put(:info, %{
      id: character.id,
      name: character.name,
      avatar: character.avatar
    })
  end

  def append_attributes(x, %{ request: request, new_stage: new_stage }, context = %{context: %{current_user: %{ id: user_id }}}) do
    IO.puts "request: #{inspect request}"

    [%{character_id: character_id} | _] = request

    with true     <- Characters.character_of_user?(user_id, character_id),
         {:ok, _} <- Characters.append_attributes(request),
         {:ok, _} <- Characters.update(character_id, %{ stage: new_stage }) do
      get_character(x, %{ id: character_id }, context)
    else
      false ->
        {:error, :unauthorized}
      e -> e
    end
  end
end
