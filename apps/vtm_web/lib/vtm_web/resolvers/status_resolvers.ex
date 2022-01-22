defmodule VtmWeb.Resolvers.StatusResolvers do
  @moduledoc false

  alias Vtm.StatusChecks
  alias Vtm.Characters
  alias Vtm.Havens.Event
  alias Vtm.Messages
  alias Vtm.Characters.Character

  alias VtmWeb.Resolvers.ChatHelpers
  alias VtmWeb.Resolvers.Helpers

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

  def rouse_check(%{character_id: character_id, chat_map_id: chat_map_id}, %{context: %{current_user: user}}) do
    execute_when_master_or_user_itself(character_id, user, fn ->
      with {:ok, text}  <- StatusChecks.rouse_check(character_id) do
        ChatHelpers.create_chat_entry(%{
          character_id: character_id,
          result: text,
          chat_map_id: chat_map_id
        }, user)
        |> Helpers.as_result()
      end
    end)
  end

  # Rest: TODO - add the other resolvers
  def use_willpower(%{character_id: character_id, chat_map_id: chat_map_id}, %{context: %{current_user: user}}) do
    execute_when_master_or_user_itself(character_id, user, fn ->
      with {:ok, text}  <- StatusChecks.use_willpower(character_id) do
        ChatHelpers.create_chat_entry(%{
          character_id: character_id,
          result: text,
          chat_map_id: chat_map_id
        }, user)
        |> Helpers.as_result()
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
          result: text,
          chat_map_id: chat_map_id
        }, user)
        |> Helpers.as_result()
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

  def awake(%{character_id: character_id}, _) do
    with {:ok, result}  <- character_id
      |> String.to_integer()
      |> StatusChecks.awake_character() do
      {:ok, %{result: result}}
    end
  end

  defp send_event_message(user_id, offender_name, owner_name) do
    subject = "Evento nel dominio di #{owner_name}"
    text = """
    #{offender_name} è entrato nel dominio di #{owner_name} per cacciare.
    """

    with {:ok, message} <- Messages.send_master_message(user_id, subject, text),
         _              <- Absinthe.Subscription.publish(VtmWeb.Endpoint, message, new_message_notification: user_id) do
      message
    end
  end

  @spec check_event(any(), Character.t(), Event.t() | nil) :: any()
  defp check_event(result, %{name: name}, %{haven: %{character: %{id: c_id, name: c_name}}}) do
    case Characters.get_character_user(%{id: c_id}) do
      %{id: id}   -> send_event_message(id, name, c_name)
    end

    result
  end

  defp check_event(result, _, _), do: result

  def hunt(%{character_id: character_id, haven_id: haven_id}, _) do
    with {:ok, c_id}                        <- character_id |> Helpers.parsed_id_to_integer?(),
         {:ok, h_id}                        <- haven_id |> Helpers.parsed_id_to_integer?(),
         {:ok, {message, character, event}} <- StatusChecks.hunt(c_id, h_id) do
      {:ok, %{result: message}}
      |> check_event(character, event)
    end
  end

  def reset_hunt(%{character_id: character_id}, _) do
    with c_id <- character_id |> String.to_integer() do
      StatusChecks.reset_hunt(c_id)
    end
  end

  def get_resonance_types(_, _, _) do
    {:ok, %{result: StatusChecks.get_resonance_types()}}
  end
end
