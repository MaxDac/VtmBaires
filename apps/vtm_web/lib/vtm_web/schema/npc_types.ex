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

  input_object :npc_stats_request do
    field :notes, :string
    field :advantages, non_null(:string)
    field :humanity, non_null(:integer)
    field :willpower, non_null(:integer)
    field :blood_potency, non_null(:integer)
    field :generation, non_null(:integer)
    field :predator_type_id, non_null(:id)
  end

  input_object :npc_attribute do
    field :id, non_null(:id)
    field :value, non_null(:integer)
  end

  input_object :npc_attributes_request do
    field :attributes, non_null(list_of(:npc_attribute))
  end

  object :npc_mutations do
    field :create_npc, :character do
      arg :request, :character_creation_request

      middleware VtmWeb.Schema.Middlewares.Authorize, :master
      resolve &NpcResolvers.create_npc/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    payload field :define_npc_stats do
      input do
        field :character_id, non_null(:id)
        field :request, non_null(:npc_stats_request)
      end

      output do
        field :response, :character
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :master
      resolve parsing_node_ids(&NpcResolvers.define_npc_stats/2, character_id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    payload field :assign_npc_attributes do
      input do
        field :character_id, non_null(:id)
        field :request, :npc_attributes_request
      end

      output do
        field :response, :character
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :master
      resolve parsing_node_ids(&NpcResolvers.assign_npc_attributes/2, character_id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    payload field :confirm_png do
      input do
        field :character_id, non_null(:id)
      end

      output do
        field :response, :character
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :master
      resolve parsing_node_ids(&NpcResolvers.confirm_png/2, character_id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end
end
