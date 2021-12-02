defmodule Vtm.Chats do
  @moduledoc false

  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Helpers
  alias Vtm.Chats.ChatMap
  alias Vtm.Chats.ChatEntry
  alias Vtm.Characters.Character
  alias Vtm.Characters
  alias Vtm.StatusChecks

  @two_hours_in_second 3_600 * 2
  @ten_minutes_in_seconds 60 * 10

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

  def all_chat_locations() do
    from(c in ChatMap, where: c.is_chat == true)
    |> Repo.all()
  end

  @doc """
  Enriches the map id passed in input with the name, returning a session info struct.
  """
  @spec enrich_map_id_for_session(Integer.t()) :: {:ok, Map.t()} | {:error, :not_found}
  def enrich_map_id_for_session(map_id) do
    case get_map(map_id) do
      nil                   -> {:error, :not_found}
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
        # character_chat_avatar: ch.chat_avatar,
        result: c.result,
        master: c.master,
        text: c.text,
        off_game: c.off_game,
        chat_map_id: c.chat_map_id,
        inserted_at: c.inserted_at
      }
  end

  defp get_chat_entries_on_game(map_id) do
    two_hours_ago =
      NaiveDateTime.utc_now()
      |> NaiveDateTime.add(@two_hours_in_second * -1)

    query = from c in chat_and_character_joined_query(),
      where: c.chat_map_id == ^map_id,
      where: c.off_game == false,
      where: c.inserted_at > ^two_hours_ago

    Repo.all(query)
  end

  defp get_chat_entries_off_game(map_id) do
    ten_minutes_ago =
      NaiveDateTime.utc_now()
      |> NaiveDateTime.add(@ten_minutes_in_seconds * -1)

    query = from c in chat_and_character_joined_query(),
      where: c.chat_map_id == ^map_id,
      where: c.off_game == true,
      where: c.inserted_at > ^ten_minutes_ago

    Repo.all(query)
  end

  def get_chat_entries(map_id) do
    on_game = get_chat_entries_on_game(map_id)
    off_game = get_chat_entries_off_game(map_id)

    on_game
    |> Enum.concat(off_game)
    |> Enum.sort_by(&(&1.inserted_at), :asc)
  end

  @spec get_chat_entries_by_dates(Integer.t(), NaiveDateTime.t(), NaiveDateTime.t()) :: list(ChatEntry.t())
  def get_chat_entries_by_dates(map_id, from, to) do
    query = from c in ChatEntry,
      where: c.chat_map_id == ^map_id,
      where: fragment("? BETWEEN ? AND ?", c.inserted_at, ^from, ^to),
      join: ch in Character,
      on: c.character_id == ch.id,
      order_by: c.inserted_at,
      select: %ChatEntry{c | character: %{
        id: ch.id,
        name: ch.name
      }}

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

  def create_chat_entry(attrs = %{text: _}), do: create_chat_entry_p(attrs)
  def create_chat_entry(attrs = %{result: _}), do: create_chat_entry_p(attrs)
  def create_chat_entry(_), do: {:error, "text or result should not be both emtpy."}

  def random_simulate_master_dice_throw(free_throw) do
    Helpers.random_dice_thrower(free_throw)
    |> Enum.join(", ")
  end

  def random_simulate_dice_throw(user_id, character_id, request) do
    simulate_dice_throw(&Helpers.random_dice_thrower/1, user_id, character_id, request)
  end

  def simulate_dice_throw(dice_thrower, user_id, character_id, request = %{difficulty: difficulty}) do
    # Gathering all the information
    {amount, throw_description} = get_dice_amount(character_id, request)

    %{hunger: hunger} = Characters.get_character_status(user_id, character_id)

    case amount do
      0 ->
        "#{throw_description}: *Il personaggio non ha dadi da tirare*."
      _ ->
        # Simulating dice throwing
        dices = get_dices_result(dice_thrower, amount, hunger)

        # Computing the throw result agains the difficulty
        {successes, dice_throw_result} = get_dice_throw_results(dices, difficulty)

        # Transforming the dices roll as a string
        dices_as_string = dices_to_string(dices, difficulty)

        # Parsing the result
        parse_result(dice_throw_result, throw_description, dices_as_string, difficulty, successes)
    end
  end

  defp get_dice_amount(character_id, %{
    attribute_id: attribute_id,
    ability_id: ability_id,
    for_discipline: for_discipline,
    augment_attribute: augment_attribute,
    free_throw: free_throw
  }) do
    case {attribute_id, ability_id, free_throw} do
      {attribute_id, ability_id, _} when not(is_nil(attribute_id)) and not(is_nil(ability_id)) ->
        with result <- get_character_dices_amount(character_id, attribute_id, ability_id, for_discipline, augment_attribute, free_throw) do
          result
        end
      {_, _, free_throw} when not is_nil(free_throw) ->
        free_throw = free_throw |> zero_if_less_than_zero()
        {free_throw, "Tiro di #{free_throw} dadi"}
      _ ->
        {0, "Tiro di 0 dadi"}
    end
  end

  @spec zero_if_less_than_zero(integer) :: integer
  defp zero_if_less_than_zero(a) when is_integer(a) and a < 0, do: 0
  defp zero_if_less_than_zero(a), do: a

  defp parse_augment_attribute(character_id, true) do
    augment =
      case Characters.get_character_blood_potency(character_id) do
        0 -> 0
        1 -> 1
        _ -> 1
      end

    case StatusChecks.rouse_check_effect(character_id, false) do
      {:ok, :frenzy} -> {0, :frenzy}
      {:ok, effect} -> {augment, effect}
      e -> e
    end
  end

  defp parse_augment_attribute(_, _), do: {0, :no_rouse}

  defp parse_amount_augment_for_discipline(character_id, for_discipline) do
    case {for_discipline, Characters.get_character_blood_potency(character_id)} do
      {false, _}  -> 0
      {_, 2}      -> 1
      {_, 3}      -> 2
      _           -> 0
    end
  end

  defp get_character_dices_amount(character_id, attribute_id, ability_id, for_discipline, augment_attribute, free_throw) do
    attrs =
      Characters.get_character_attributes_subset_by_ids(character_id, [attribute_id, ability_id])

    {
      %{value: attribute_value, attribute: %{name: attribute_name}},
      %{value: ability_value, attribute: %{name: ability_name}}
    } = {
      attrs |> Enum.find(fn %{attribute: %{id: id}} -> id == attribute_id end),
      attrs |> Enum.find(fn %{attribute: %{id: id}} -> id == ability_id end)
    }

    discipline_amount = parse_amount_augment_for_discipline(character_id, for_discipline)

    {rouse_augment_amount, rouse_augment_effect} =
      parse_augment_attribute(character_id, augment_attribute)

    amount =
      (attribute_value + ability_value + free_throw + discipline_amount + rouse_augment_amount)
      |> zero_if_less_than_zero()

    {amount, get_character_dice_amount_label(attribute_name, ability_name, free_throw, for_discipline, augment_attribute, rouse_augment_effect)}
  end

  @spec get_character_dice_amount_label(binary(), binary(), integer(), boolean(), boolean(), :rouse | :no_rouse | :frenzy) :: binary()
  defp get_character_dice_amount_label(attribute_name, ability_name, free_throw, for_discipline, augment_attribute, rouse_augment_effect) do
    free_throw_label =
      case free_throw do
        0       -> ""
        ft      -> " più #{ft}"
      end

    for_discipline_label =
      case for_discipline do
        false   -> ""
        true    -> " per Disciplina"
      end

    augment_attribute =
      case {augment_attribute, rouse_augment_effect} do
        {false, _}      -> ""
        {_, :no_rouse}  -> " con spesa efficace di Sangue"
        {_, :rouse}     -> " con spesa di Sangue"
        {_, :frenzy}    -> " (al limite della Frenesia)"
        _               -> ""
      end

    "Tiro di #{attribute_name} e #{ability_name}#{free_throw_label}#{for_discipline_label}#{augment_attribute}"
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

  defp difficulty_as_string(0), do: "tiro contrastato"
  defp difficulty_as_string(difficulty), do: "difficoltà: #{difficulty}"

  defp dices_to_string(dices, difficulty) do
    visual =
      dices
      |> Enum.map(fn
        {true, n} -> "*#{n}*"
        {_, n}    -> "#{n}"
      end)
      |> Enum.join(", ")

    difficulty_string = difficulty_as_string(difficulty)

    "(#{visual}, #{difficulty_string})"
  end

  @spec parse_result(atom(), binary(), binary(), integer(), integer()) :: binary()
  defp parse_result(result, throw_description, dices_as_string, 0, successes) do
    result_desc =
      case result do
        :bestial_failure  -> "*Il personaggio sperimenta un fallimento bestiale!* #{dices_as_string}."
        :total_failure    -> "Il personaggio fallisce totalmente! #{dices_as_string}."
        :messy_contrasted -> "Il personaggio potrebbe ottenere un successo caotico con #{successes} successi #{dices_as_string}."
        :contrasted       -> "Il personaggio ottiene #{successes} successi #{dices_as_string}."
      end

    "#{throw_description}: #{result_desc}"
  end

  defp parse_result(result, throw_description, dices_as_string, _, _) do
    result_desc =
      case result do
        :bestial_failure    -> "*Il personaggio sperimenta un fallimento bestiale!* #{dices_as_string}."
        :total_failure      -> "Il personaggio fallisce totalmente! #{dices_as_string}."
        :critical_success   -> "Il personaggio ottiene un successo critico! #{dices_as_string}."
        :failure            -> "Il personaggio fallisce. #{dices_as_string}."
        :messy_critical     -> "*La Bestia emerge: il personaggio totalizza un successo caotico!* #{dices_as_string}."
        :success            -> "Il personaggio riesce nell'intento #{dices_as_string}."
      end

    "#{throw_description}: #{result_desc}"
  end

  @spec get_dice_throw_results([{boolean(), number()}], number()) :: {integer(),
          :bestial_failure
          | :total_failure
          | :critical_success
          | :failure
          | :messy_critical
          | :success
          | :contrasted
          | :messy_contrasted}
  def get_dice_throw_results(dices, 0) do
    with tens         <- dices |> Enum.count(fn {_, x} -> x == 10 end),
         hunger_tens  <- dices |> Enum.count(fn {h, x} -> h && x == 10 end),
         hunger_ones  <- dices |> Enum.count(fn {h, x} -> h && x == 1 end),
         successes    <- (dices |> Enum.count(fn {_, x} -> x >= 6 end)) + div(tens, 2) do

      result =
        case {successes, hunger_ones, hunger_tens} do
          {0, ho, _} when ho > 0          -> :bestial_failure
          {0, _, _}                       -> :total_failure
          {_, _, ht} when div(ht, 2) > 0  -> :messy_contrasted
          {_, _, _}                       -> :contrasted
        end

      {successes, result}
    end
  end

  def get_dice_throw_results(dices, difficulty) do
    with tens         <- dices |> Enum.count(fn {_, x} -> x == 10 end),
         hunger_tens  <- dices |> Enum.count(fn {h, x} -> h && x == 10 end),
         hunger_ones  <- dices |> Enum.count(fn {h, x} -> h && x == 1 end),
         successes    <- (dices |> Enum.count(fn {_, x} -> x >= 6 end)) + div(tens, 2) do

      result =
        case {successes, tens} do
          {s, t} when s >= difficulty and div(t, 2) > 0  -> :critical_success
          {s, _} when s >= difficulty                    -> :success
          {0, _}                                         -> :total_failure
          _                                              -> :failure
        end

      result =
        case {result, hunger_ones, hunger_tens, tens} do
          {:critical_success, _, ht, t} when ht > 0 and rem(t, 2) == 0  -> :messy_critical
          {:total_failure, o, _, _} when o > 0                          -> :bestial_failure
          {:failure, o, _, _} when o > 0                                -> :bestial_failure
          {res, _, _, _}                                                -> res
        end

      {successes, result}
    end
  end
end
