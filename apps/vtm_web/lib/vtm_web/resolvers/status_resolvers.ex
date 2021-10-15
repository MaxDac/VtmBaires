defmodule VtmWeb.Resolvers.StatusResolvers do
  import VtmWeb.Resolvers.Helpers

  alias Vtm.StatusChecks
  alias Vtm.Characters

  alias VtmWeb.Resolvers.ChatHelpers

  defp execute_when_master_or_user_itself(character_id, %{role: role, id: user_id}, action) do
    case {role, Characters.character_of_user?(user_id, character_id)} do
      {:master, _}  -> action.()
      {_, true}     -> action.()
      _             -> {:error, :not_found}
    end
  end

  def get_character_status(%{character_id: character_id}, %{context: %{current_user: user}}) do
    execute_when_master_or_user_itself(character_id, user, fn ->
      {:ok, StatusChecks.character_status(character_id)}
    end)
  end

  def get_character_description(%{character_id: character_id}, _) do
    case Characters.get_character_description(character_id) do
      nil -> {:error, :not_found}
      ch  -> {:ok, ch}
    end
  end

  def rouse_check(%{character_id: character_id, chat_map_id: chat_map_id}, context = %{context: %{current_user: user}}) do
    execute_when_master_or_user_itself(character_id, user, fn ->
      with {:ok, text}  <- StatusChecks.rouse_check(character_id) do
        ChatHelpers.create_chat_entry(%{
          character_id: character_id,
          text: text,
          chat_map_id: chat_map_id
        }, user)
      end
    end)
  end

  # Rest: TODO - add the other resolvers
  def use_willpower(%{character_id: character_id, chat_map_id: chat_map_id}, %{context: %{current_user: user}}) do
    execute_when_master_or_user_itself(character_id, user, fn ->
      with {:ok, text}  <- StatusChecks.use_willpower(character_id) do
        ChatHelpers.create_chat_entry(%{
          character_id: character_id,
          text: text,
          chat_map_id: chat_map_id
        }, user)
      end
    end)
  end

  def apply_damage(%{character_id: character_id, damage_entity: damage_entity, type: type}, _) do
    StatusChecks.apply_damage(character_id, damage_entity, type)
  end

  def heal(%{character_id: character_id, chat_map_id: chat_map_id}, %{context: %{current_user: user}}) do
    execute_when_master_or_user_itself(character_id, user, fn ->
      with {:ok, text}  <- StatusChecks.heal(character_id) do
        ChatHelpers.create_chat_entry(%{
          character_id: character_id,
          text: text,
          chat_map_id: chat_map_id
        }, user)
      end
    end)
  end

  def heal_willpower(%{character_id: character_id, quantity: quantity}, _) do
    StatusChecks.heal_willpower(character_id, quantity)
  end

  def set_character_status(%{character_id: character_id, request: request}, _) do
    character_id
    |> String.to_integer()
    |> Characters.update_character(request)
  end

  def hunt(%{character_id: character_id}, _) do
    with c_id                       <- character_id |> String.to_integer(),
         {:ok, message, character}  <- StatusChecks.hunt(c_id) do
      {:ok, %{result: message}}
    end
  end

  def reset_hunt(%{character_id: character_id}, _) do
    with c_id <- character_id |> String.to_integer() do
      StatusChecks.reset_hunt(character_id)
    end
  end
end
