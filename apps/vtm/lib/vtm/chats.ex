defmodule Vtm.Chats do
  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Helpers
  alias Vtm.Chats.ChatMap
  alias Vtm.Chats.ChatEntry
  alias Vtm.Characters.Character
  alias Vtm.Characters

  def get_main_chat_maps() do
    query = from m in ChatMap,
      where: is_nil(m.chat_map_id)

    query |> Repo.all()
  end

  def get_chat_maps(parent_id) do
    query = from m in ChatMap,
      where: m.chat_map_id == ^parent_id

    query |> Repo.all()
  end

  def get_map(chat_id) do
    ChatMap |> Repo.get(chat_id)
  end

  @doc """
  Enriches the map id passed in input with the name, returning a session info struct.
  """
  @spec enrich_map_id_for_session(Integer.t()) :: {:ok, Map.t()} | {:error, :not_found}
  def enrich_map_id_for_session(map_id) do
    case get_map(map_id) do
      nil -> {:error, :not_found}
      %{id: id, name: name} ->
        {:ok,
          %{
            map_id: id,
            map_name: name
          }
        }
    end
  end

  defp chat_and_character_joined_query() do
    from c in ChatEntry,
      join: ch in Character,
      on: ch.id == c.character_id,
      select: %{
        id: c.id,
        character_id: ch.id,
        character_name: ch.name,
        character_chat_avatar: ch.chat_avatar,
        result: c.result,
        master: c.master,
        text: c.text,
        chat_map_id: c.chat_map_id,
        inserted_at: c.inserted_at
      }
  end

  def get_chat_entries(map_id) do
    query = from c in chat_and_character_joined_query(),
      where: c.chat_map_id == ^map_id

    Repo.all(query)
  end

  def get_chat_entry(id) do
    query = from c in chat_and_character_joined_query(),
      where: c.id == ^id

    Repo.one(query)
  end

  defp create_chat_entry_p(attrs) do
    %ChatEntry{}
    |> ChatEntry.changeset(attrs)
    |> Repo.insert()
  end

  def create_chat_entry(attrs = %{ text: _ }), do: create_chat_entry_p(attrs)
  def create_chat_entry(attrs = %{ result: _ }), do: create_chat_entry_p(attrs)
  def create_chat_entry(_), do: {:error, "text or result should not be both emtpy."}

  @spec random_dice_thrower(Number.t()) :: [Number.t()]
  defp random_dice_thrower(amount) do
    1..amount
    |> Enum.map(fn _ -> Helpers.throw_dice() end)
  end

  def random_simulate_master_dice_throw(free_throw) do
    random_dice_thrower(free_throw)
    |> Enum.join(", ")
  end

  def random_simulate_dice_throw(user_id, character_id, attribute_id, ability_id, free_throw, difficulty) do
    simulate_dice_throw(&random_dice_thrower/1, user_id, character_id, attribute_id, ability_id, free_throw, difficulty)
  end

  def simulate_dice_throw(dice_thrower, user_id, character_id, attribute_id, ability_id, free_throw, difficulty) do
    # Gathering all the information
    amount = get_dice_amount(character_id, attribute_id, ability_id, free_throw)
    %{ hunger: hunger } = Characters.get_character_status(user_id, character_id)

    # Simulating dice throwing
    dices = get_dices_result(dice_thrower, amount, hunger)

    # Computing the throw result agains the difficulty
    dice_throw_result = get_dice_throw_results(dices, difficulty)

    # Transforming the dices roll as a string
    dices_as_string = dices_to_string(dices, difficulty)

    # Parsing the result
    parse_result(dice_throw_result, dices_as_string)
  end

  defp get_dice_amount(character_id, attribute_id, ability_id, free_throw) do
    case {attribute_id, ability_id, free_throw} do
      {attribute_id, ability_id, _} when not(is_nil(attribute_id)) and not(is_nil(ability_id)) ->
        get_character_dices_amount(character_id, attribute_id, ability_id)
      {_, _, free_throw} when not is_nil(free_throw) ->
        free_throw
      _ ->
        0
    end
  end

  defp get_character_dices_amount(character_id, attribute_id, ability_id) do
    attrs = Characters.get_character_attrs_with_value(character_id)

    case {attrs |> Map.get(attribute_id), attrs |> Map.get(ability_id)} do
      {nil, nil}    -> 0
      {nil, val}    -> val
      {val, nil}    -> val
      {val1, val2}  -> val1 + val2
    end
  end

  defp get_dices_result(dice_thrower, amount, hunger) do
    dice_thrower.(amount)
    |> Enum.zip(1..amount)
    |> Enum.map(fn
      {dice_result, idx} when idx <= hunger ->
        {true, dice_result}
      {dice_result, _} ->
        {false, dice_result}
    end)
  end

  defp dices_to_string(dices, difficulty) do
    visual =
      dices
      |> Enum.map(fn
        {true, n} -> "*#{n}*"
        {_, n}    -> "#{n}"
      end)
      |> Enum.join(", ")

    "(#{visual}, difficoltà: #{difficulty})"
  end

  defp parse_result(result, dices_as_string) do
    case result do
      :bestial_failure    -> "*Il personaggio sperimenta un fallimento bestiale!* #{dices_as_string}."
      :total_failure      -> "Il personaggio fallisce totalmente! #{dices_as_string}."
      :critical_success   -> "Il personaggio ottiene un successo critico! #{dices_as_string}."
      :failure            -> "Il personaggio fallisce. #{dices_as_string}."
      :messy_critical     -> "*La Bestia emerge: il personaggio totalizza un successo caotico!* #{dices_as_string}."
      :success            -> "Il personaggio riesce nell'intento #{dices_as_string}."
    end
  end

  @spec get_dice_throw_results([{boolean(), number()}], number()) ::
          :bestial_failure
          | :total_failure
          | :critical_success
          | :failure
          | :messy_critical
          | :success
  def get_dice_throw_results(dices, difficulty) do
    with tens         <- dices |> Enum.count(fn {_, x} -> x == 10 end),
         hunger_tens  <- dices |> Enum.count(fn {h, x} -> h && x == 10 end),
         hunger_ones  <- dices |> Enum.count(fn {h, x} -> h && x == 1 end),
         successes    <- (dices |> Enum.count(fn {_, x} -> x > 6 end)) + div(tens, 2) do

      result =
        case {successes, tens} do
          {s, t} when s >= difficulty and div(t, 2) > 0  -> :critical_success
          {s, _} when s >= difficulty                    -> :success
          {0, _}                                         -> :total_failure
          _                                              -> :failure
        end

      case {result, hunger_ones, hunger_tens, tens} do
        {:critical_success, _, ht, t} when ht > 0 and rem(t, 2) == 0  -> :messy_critical
        {:total_failure, o, _, _} when o > 0                          -> :bestial_failure
        {:failure, o, _, _} when o > 0                                -> :bestial_failure
        {res, _, _, _}                                                -> res
      end
    end
  end
end
