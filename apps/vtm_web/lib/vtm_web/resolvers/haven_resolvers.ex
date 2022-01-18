defmodule VtmWeb.Resolvers.HavenResolvers do
  @moduledoc false

  import VtmWeb.Resolvers.Helpers

  alias Vtm.Havens
  alias Vtm.Havens.Haven

  def get_havens(_, _, _) do
    result =
      Havens.get_havens()
      |> Enum.sort(fn
        %{x: _, y: ya}, %{x: _, y: yb} when ya != yb -> ya - yb >= 0
        %{x: xa, y: _}, %{x: xb, y: _} -> xa - xb >= 0
      end)

    {:ok, %{result: result}}
  end

  def set_haven_character(%{haven_id: haven_id, character_id: character_id}, _) do
    with {:ok, h_id}  <- parsed_id_to_integer?(haven_id),
         {:ok, c_id}  <- parsed_id_to_integer?(character_id) do
      Havens.set_haven_character(h_id, c_id)
    end
  end

  def delete_haven_character(%{haven_id: haven_id}, _) do
    with {:ok, h_id}  <- parsed_id_to_integer?(haven_id) do
      Havens.delete_character_from_haven(h_id)
    end
  end

end
