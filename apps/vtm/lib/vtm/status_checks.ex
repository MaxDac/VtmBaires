defmodule Vtm.StatusChecks do
  @moduledoc false

  import Ecto.Query, warn: false

  @hunt_difficulty 1

  alias Vtm.Repo
  alias Vtm.Helpers
  alias Vtm.Characters
  alias Vtm.Characters.Character

  defp update_character(character, changes) do
    character
    |> Character.update_changeset(changes)
    |> Repo.update()
  end

  def character_status(character_id) do
    query =
      from c in Character,
        where: c.id == ^character_id,
        select: %Character{
          id: c.id,
          blood_potency: c.blood_potency,
          hunger: c.hunger,
          health: c.health,
          damage: c.damage,
          aggravated_damage: c.aggravated_damage,
          willpower: c.willpower,
          willpower_damage: c.willpower_damage
        }

    Repo.one(query)
  end

  @spec rouse_check_effect(integer()) :: {:error, :not_found} |
                                         {:ok, :no_rouse} |
                                         {:ok, :rouse} |
                                         {:ok, :frenzy}
  def rouse_check_effect(character_id) do
    query =
      from c in Character,
        where: c.id == ^character_id,
        select: %Character{id: c.id, hunger: c.hunger, blood_potency: c.blood_potency}

    case {Repo.one(query), Helpers.throw_dice(), Helpers.throw_dice()} do
      {nil, _, _} ->
        {:error, :not_found}
      {%{hunger: 5}, _, _} ->
        {:ok, :frenzy}
      {_, d, _} when d >= 6 ->
        {:ok, :no_rouse}
      {%{blood_potency: bp}, _, d} when bp >= 1 and d >= 6 ->
        {:ok, :no_rouse}
      {ch = %{hunger: h}, _, _} ->
        with {:ok, _} <- ch |> update_character(%{hunger: h + 1}) do
          {:ok, :rouse}
        end
    end
  end

  @doc """
  This function implements the Rouse Check. It doesn't check whether the character belongs to a particular user.
  """
  @spec rouse_check(Integer.t()) :: {:ok, String.t()} | {:error, String.t()} | {:error, :not_found}
  def rouse_check(character_id) do
    case rouse_check_effect(character_id) do
      {:ok, :frenzy} ->
        {:ok, "Il personaggio è sulla soglia della frenesia, deve cibarsi prima di poter spendere vitae."}
      {:ok, :no_rouse} ->
        {:ok, "Il personaggio personaggio riesce ad usare efficientemente la sua vitae."}
      {:ok, :rouse} ->
        {:ok, "Il personaggio riesce ad usare vitae, ma la sua fame cresce."}
      e -> e
    end
  end

  @doc """
  This function applies the damage to a character, returning the current state of the character itself.
  """
  @spec apply_damage(Integer.t(), Integer.t(), :aggravated | :superficial) :: {:ok, String.t()}
  def apply_damage(character_id, damage_entity, :superficial) do
    query =
      from c in Character,
        where: c.id == ^character_id,
        select: %Character{id: c.id, health: c.health, damage: c.damage, aggravated_damage: c.aggravated_damage}

    case {Repo.one(query), damage_entity} do
      {%{health: health, damage: health, aggravated_damage: health}, _} ->
        {:ok, "Il personaggio è già in torpore"}
      {ch = %{health: health, damage: health, aggravated_damage: ad}, damage} when ad + damage >= health ->
        with {:ok, _} <- ch |> update_character(%{aggravated_damage: health, damage: 0, torpor: true}) do
          {:ok, "Il personaggio entra in torpore"}
        end
      {ch = %{health: health, damage: d, aggravated_damage: ad}, damage} when d + ad == health ->
        with {:ok, _} <- ch |> update_character(%{aggravated_damage: ad + damage, damage: health - ad - damage}) do
          {:ok, "Il personaggio ha subito #{ad + damage} danni aggravati in tutto."}
        end
      {ch = %{health: health, damage: d}, damage} when d + damage >= health ->
        with {:ok, _} <- ch |> update_character(%{damage: health}) do
          apply_damage(character_id, damage + d - health, :superficial)
        end
      {ch = %{damage: d}, damage} ->
        with {:ok, _} <- ch |> update_character(%{damage: d + damage}) do
          {:ok, "Il personaggio ha subito #{d + damage} danni in tutto."}
        end
    end
  end

  def apply_damage(character_id, damage_entity, :aggravated) do
    query =
      from c in Character,
        where: c.id == ^character_id,
        select: %Character{id: c.id, health: c.health, damage: c.damage, aggravated_damage: c.aggravated_damage}

    case {Repo.one(query), damage_entity} do
      {ch = %{health: health, aggravated_damage: health}, _} ->
        with {:ok, _} <- ch |> update_character(%{dead: true}) do
          {:ok, "Il personaggio raggiunge la morte ultima."}
        end
      {ch = %{health: health, aggravated_damage: ad}, damage} when ad + damage >= health ->
        with {:ok, _} <- ch |> update_character(%{aggravated_damage: health, torpor: true}) do
          {:ok, "Il personaggio entra in torpore per le ferite riportate."}
        end
      {ch = %{health: h, damage: d, aggravated_damage: ad}, damage} when (ad + damage) > (h - d) ->
        with {:ok, _} <- ch |> update_character(%{aggravated_damage: ad + damage, damage: h - ad - damage}) do
          {:ok, "Il personaggio ha subito #{ad + damage} danni aggravati."}
        end
      {ch = %{aggravated_damage: ad}, damage} ->
        with {:ok, _} <- ch |> update_character(%{aggravated_damage: ad + damage}) do
          {:ok, "Il personaggio ha subito #{ad + damage} danni aggravati."}
        end
    end
  end

  defp healing_rouse_check(character = %{hunger: h}) do
    case {h, Helpers.throw_dice()} do
      {5, _} ->
        {:ok, "Il personaggio è sull'orlo della frenesia."}
      {_, d} when d >= 6 ->
        {:ok, "Il personaggio riesce a spendere vitae per curarsi."}
      {hunger, _} ->
        with {:ok, _} <- character |> update_character(%{hunger: hunger + 1}) do
          {:ok, "Il personaggio riesce a spendere vitae per curarsi, ma il ruggito della Bestia si fa più forte."}
        end
    end
  end

  defp healing_power(blood_potency) when blood_potency <= 1, do: 1
  defp healing_power(blood_potency) when blood_potency <= 3, do: 2
  defp healing_power(_), do: 3

  def heal(character_id) do
    query =
      from c in Character,
        where: c.id == ^character_id,
        select: %Character{
          id: c.id,
          health: c.health,
          hunger: c.hunger,
          blood_potency: c.blood_potency,
          damage: c.damage,
          hunger: c.hunger
        }
    case Repo.one(query) do
      %{torpor: true} ->
        {:ok, "Il personaggio non può più curarsi: è in torpore."}
      %{damage: d} when d == 0 ->
        {:ok, "Il personaggio non ha bisogno di curarsi."}
      ch = %{damage: d, blood_potency: bp} ->
        with {:ok, updated_ch} <- ch |> update_character(%{damage: d - healing_power(bp)}) do
          healing_rouse_check(updated_ch)
        end
    end
  end

  def use_willpower(character_id) do
    query =
      from c in Character,
        where: c.id == ^character_id,
        select: %Character{
          id: c.id,
          willpower: c.willpower,
          willpower_damage: c.willpower_damage
        }

    case Repo.one(query) do
      %{willpower: w, willpower_damage: w} ->
        {:ok, "Il personaggio non ha più Forza di Volontà da spendere"}
      ch = %{willpower_damage: wd} ->
        with {:ok, _} <- ch |> update_character(%{willpower_damage: wd + 1}) do
          {:ok, "Il personaggio riesce a spendere Forza di Volontà"}
        end
    end
  end

  def heal_willpower(character_id, quantity) do
    query =
      from c in Character,
        where: c.id == ^character_id,
        select: %Character{
          id: c.id,
          willpower: c.willpower,
          willpower_damage: c.willpower_damage
        }

    case Repo.one(query) do
      %{willpower_damage: 0} ->
        {:ok, "Il personaggio recupera forza di volontà."}
      ch = %{willpower_damage: wd} when wd < quantity ->
        with {:ok, _} <- ch |> update_character(%{willpower_damage: 0}) do
          {:ok, "Il personaggio recupera forza di volontà."}
        end
      ch = %{willpower_damage: wd} ->
        with {:ok, _} <- ch |> update_character(%{willpower_damage: wd - quantity}) do
          {:ok, "Il personaggio recupera forza di volontà."}
        end
    end
  end

  defp at_least_zero(n) when n < 0, do: 0
  defp at_least_zero(n), do: n

  defp at_least_one(n) when n < 1, do: 1
  defp at_least_one(n), do: n

  defp less_than_5(x) when x > 5, do: 5
  defp less_than_5(x), do: x

  defp parse_throw(dices, tens \\ 0, successes \\ 0, ones \\ 0)
  defp parse_throw([], tens, successes, ones), do: {tens, successes, ones}
  defp parse_throw([x | rest], tens, successes, ones) when x == 10, do: parse_throw(rest, tens + 1, successes + 1, ones)
  defp parse_throw([x | rest], tens, successes, ones) when x == 1, do: parse_throw(rest, tens, successes, ones + 1)
  defp parse_throw([x | rest], tens, successes, ones) when x >= 6, do: parse_throw(rest, tens, successes + 1, ones)
  defp parse_throw([_ | rest], tens, successes, ones), do: parse_throw(rest, tens, successes, ones)

  defp update_hunger(character = %{hunger: hunger}, updater) do
    character
    |> Character.update_changeset(%{hunger: updater.(less_than_5(hunger))})
    |> Repo.update()
  end

  defp increase_hunger(character, amount), do: update_hunger(character, &(&1 + amount))

  defp decrease_hunger(character, amount), do: update_hunger(character, fn h -> at_least_one(h - amount) end)

  def get_hunt_attributes_amount(%{id: character_id}) do
    character_id
    |> Characters.get_character_attributes_subset_by_names(["Prontezza", "Sopravvivenza", "Gregge", "Seguaci"])
    |> Enum.map(fn %{value: value} -> value end)
    |> Enum.sum()
  end

  defp determine_hunger(character) do
    with amount <- get_hunt_attributes_amount(character) do
      case Helpers.random_dice_thrower(amount) |> parse_throw() do
        {0, 0, o} when o > 0          ->
          with {:ok, character} <- character |> increase_hunger(2),
               message          <-  "Il personaggio fallisce clamorosamente la caccia." do
            {:no_hunt, message, character}
          end
        {_, s, _} when s < @hunt_difficulty ->
          with {:ok, character} <- character |> increase_hunger(1),
               message          <- "Il personaggio fallisce la caccia." do
            {:no_hunt, message, character}
          end
        {t, s, o}                     ->
          with decrease         <- s + at_least_zero(t - o) - @hunt_difficulty + 1,
               message          <- "Il personaggio riesce a cacciare.",
               {:ok, character} <- character |> decrease_hunger(decrease) do
            {:ok, message, character}
          end
      end
    end
  end

  defp determine_resonance_power() do
    case {Helpers.throw_dice(), Helpers.throw_dice()} do
      {x, r} when x >= 9 and r >= 9 -> 4
      {x, _} when x >= 9            -> 3
      {x, _} when x >= 6            -> 2
      _                             -> 1
    end
  end

  defp determine_resonance_type() do
    case Helpers.throw_dice() do
      x when x >= 9 -> "Flemmatica"
      x when x >= 7 -> "Collerica"
      x when x >= 4 -> "Malinconica"
      _             -> "Sanguigna"
    end
  end

  defp determine_resonance(character) do
    with power            <- determine_resonance_power(),
         type             <- determine_resonance_type(),
         {:ok, character} <- character
                             |> Character.update_changeset(%{last_resonance: type, last_resonance_intensity: power})
                             |> Repo.update() do
      {:ok, power, type, character}
    end
  end

  defp set_new_hunt_time(character) do
    character
    |> Character.update_changeset(%{last_hunt: NaiveDateTime.utc_now()})
    |> Repo.update()
  end

  defp enrich_message_with_resonance(hunt_message, power_level, type) do
    power_level_message =
      case power_level do
        1 -> "trascurabile"
        2 -> "fugace"
        3 -> "intensa"
        4 -> "acuta (discrasia)"
      end

    "#{hunt_message} La vitae estratta dalla preda concede una risonanza #{type} #{power_level_message}."
  end

  defp perform_hunt(character) do
    with {:ok, message, character}      <- determine_hunger(character),
         {:ok, power, type, character}  <- determine_resonance(character) do
      {:ok, message |> enrich_message_with_resonance(power, type), character}
    else
      # If the character failed the hunt, it is not considered an error
      {:no_hunt, message, character} ->
        {:ok, message, character}
      e ->
        e
    end
  end

  @doc """
  Simulates the character hunting.
  It considers the Herd Advantage while performing a throw of Wits + Survival.
  """
  @spec hunt(Integer.t()) :: Character.t()
  def hunt(character_id) do
    character = %{last_hunt: last_hunt} = Character |> Repo.get(character_id)

    case Helpers.at_least_one_day?(last_hunt) do
      false ->
        {:ok, "L'ultima caccia risale a meno di un giorno fa.", character}
      true ->
        # Updating the hunt only if no technical errors occoured
        with {:ok, message, character}  <- perform_hunt(character),
             {:ok, character}           <- character |> set_new_hunt_time() do
          {:ok, message, character}
        end
    end
  end

  def reset_hunt(character_id) do
    Character
    |> Repo.get(character_id)
    |> Character.changeset(%{last_hunt: nil})
    |> Repo.update()
  end
end
