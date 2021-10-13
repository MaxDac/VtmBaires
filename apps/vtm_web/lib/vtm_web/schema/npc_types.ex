defmodule VtmWeb.Schema.NpcTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias VtmWeb.Resolvers.NpcResolvers

  object :npc_queries do
    field :all_npcs, list_of(:character) do
      middleware VtmWeb.Schema.Middlewares.Authorize, :master
      resolve &NpcResolvers.all/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end

  object :npc_mutations do

  end
end
