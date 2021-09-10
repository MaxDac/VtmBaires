defmodule VtmWeb.Resolvers.CharacterResolvers do
  alias Vtm.Characters

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
    with {:ok, character_id} <- Characters.update_character_stage(user_id, new_stage, request) do
      get_character(x, %{ id: character_id }, context)
    else
      _ -> {:error, :unauthorized}
    end
  end
end
