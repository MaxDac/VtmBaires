defmodule Vtm.StatusChecks do
  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Helpers
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

  @doc """
  This function implements the Rouse Check. It doesn't check whether the character belongs to a particular user.
  """
  @spec rouse_check(Integer.t()) :: {:ok, String.t()} | {:error, String.t()} | {:error, :not_found}
  def rouse_check(character_id) do
    query =
      from c in Character,
        where: c.id == ^character_id,
        select: %Character{id: c.id, hunger: c.hunger}

    case {Repo.one(query), Helpers.throw_dice()} do
      {nil, _}                      ->
        {:error, :not_found}
      {%{hunger: 5}, _}             ->
        {:ok, "Il personaggio è sulla soglia della frenesia, deve cibarsi prima di poter spendere vitae."}
      {_, d} when d >= 6 ->
        {:ok, "Il personaggio personaggio riesce ad usare efficientemente la sua vitae."}
      {ch = %{hunger: h}, _} ->
        with {:ok, _} <- ch |> update_character(%{hunger: h + 1}) do
          {:ok, "Il personaggio riesce ad usare vitae, ma la sua fame cresce."}
        end
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
end
