defmodule VtmWeb.Resolvers.NpcResolvers do
  # import VtmWeb.Resolvers.Helpers

  alias Vtm.Characters

  def all(_, _, _) do
    {:ok, Characters.get_all_npcs()}
  end
end
