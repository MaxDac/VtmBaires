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
      end )

    {:ok, %{result: result}}
  end

end
