defmodule Vtm.Havens do
  @moduledoc false

  import Ecto.Query
  alias Ecto.Changeset
  alias Vtm.Repo

  alias Vtm.Havens.Haven
  alias Vtm.Havens.Event
  alias Vtm.Characters.Character

  @spec build_haven_name(Haven.t()) :: Haven.t()
  defp build_haven_name(haven = %{character: %{name: cn}, difficulty: d, danger: da, ground_control: gc}) do
    haven
    |> Map.put(:name, "#{cn} - Difficoltà: #{d} - Pericolosità: #{da} - Controllo: #{gc}")
  end

  defp build_haven_name(haven = %{difficulty: d, resources_level: r, danger: da, x: x, y: y, ground_control: gc}) do
    haven
    |> Map.put(:name, "(#{x} - #{y}) Difficoltà: #{d} - Pericolosità: #{da} - Risorse: #{r} - Controllo: #{gc}")
  end

  @spec get_havens() :: list(Haven.t())
  def get_havens() do
    Haven
    |> from()
    |> order_by([h], h.y)
    |> order_by([h], h.x)
    |> preload(:character)
    |> Repo.all()
    |> Enum.map(&build_haven_name/1)
  end

  @spec get_character_haven(non_neg_integer()) :: Haven.t() | nil
  def get_character_haven(character_id) do
    Haven
    |> from()
    |> where([c], c.character_id == ^character_id)
    |> Repo.one()
  end

  @spec set_haven_character(non_neg_integer(), non_neg_integer()) :: {:ok, Haven.t()} | {:error, Changeset.t() | :not_found}
  def set_haven_character(haven_id, character_id) do
    Haven
    |> Repo.get(haven_id)
    |> Haven.add_character_changeset(%{character_id: character_id})
    |> Repo.update()
  end

  @spec delete_character_from_haven(non_neg_integer()) :: {:ok, Haven.t()} | {:error, Changeset.t()}
  def delete_character_from_haven(haven_id) do
    Haven
    |> Repo.get(haven_id)
    |> Haven.add_character_changeset(%{character_id: nil})
    |> Repo.update()
  end

  @spec events_query() :: Ecto.Query.t()
  defp events_query() do
    from c in Character,
      join: h in Haven,
      on: c.id == h.character_id,
      join: e in Event,
      on: h.id == e.haven_id,
      join: ca in Character,
      on: e.character_id == ca.id,
      where: e.resolved == false,
      select: {e, h, c.id, c.name, ca.id, ca.name}
  end

  @spec events_query_result_map({Event.t(), Haven.t(), non_neg_integer(), binary(), non_neg_integer(), binary()} | nil) :: Event.t() | nil
  defp events_query_result_map({event, haven, owner_id, owner_name, character_id, character_name}) do
    haven =
      haven
      |> Map.put(:character, %Character{
        id: owner_id,
        name: owner_name
      })

    event
    |> Map.put(:haven, haven)
    |> Map.put(:character, %Character{
      id: character_id,
      name: character_name
    })
  end

  defp events_query_result_map(_), do: nil

  @spec filter_not_nil(any() | nil) :: boolean()
  defp filter_not_nil(nil), do: false
  defp filter_not_nil(_), do: true

  @spec get_unresolved_events() :: list(Event.t())
  def get_unresolved_events() do
    events_query()
    |> Repo.all()
    |> Enum.map(&events_query_result_map/1)
    |> Enum.filter(&filter_not_nil/1)
  end

  @spec get_character_domain_events(non_neg_integer()) :: list(Event.t())
  def get_character_domain_events(character_id) do
    query =
      events_query()
      |> where([c], c.id == ^character_id)

    Repo.all(query)
    |> Enum.map(&events_query_result_map/1)
    |> Enum.filter(&filter_not_nil/1)
  end

  @spec get_event_character(non_neg_integer()) :: Character.t() | nil
  def get_event_character(event_id) do
    Event
    |> from()
    |> where([e], e.id == ^event_id)
    |> select([e], e.character_id)
    |> Repo.one()
  end

  @spec resolve_event(non_neg_integer()) :: {:ok, Event.t()} | {:error, Changeset.t()}
  def resolve_event(event_id) do
    Event
    |> Repo.get(event_id)
    |> Event.changeset(%{resolved: true})
    |> Repo.update()
  end
end
