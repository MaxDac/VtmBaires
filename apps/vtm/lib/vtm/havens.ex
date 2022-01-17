defmodule Vtm.Havens do
  @moduledoc false

  import Ecto.Query
  alias Vtm.Repo

  alias Vtm.Havens.Haven

  @spec build_haven_name(Haven.t()) :: Haven.t()
  defp build_haven_name(haven = %{difficulty: d, resources_level: r}) do
    haven
    |> Map.put(:name, "Difficoltà: #{d} - Risorse: #{r}")
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

end
