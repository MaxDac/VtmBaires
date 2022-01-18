defmodule Vtm.Havens do
  @moduledoc false

  import Ecto.Query
  alias Ecto.Changeset
  alias Vtm.Repo

  alias Vtm.Havens.Haven

  @spec build_haven_name(Haven.t()) :: Haven.t()
  defp build_haven_name(haven = %{character: %{name: cn}, difficulty: d}) do
    haven
    |> Map.put(:name, "#{cn} - Difficoltà: #{d}")
  end

  defp build_haven_name(haven = %{difficulty: d, resources_level: r, x: x, y: y}) do
    haven
    |> Map.put(:name, "(#{x} #{y}) Difficoltà: #{d} - Risorse: #{r}")
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
end
