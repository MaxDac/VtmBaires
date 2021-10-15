defmodule VtmWeb.Schema.StatusTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias VtmWeb.Resolvers.StatusResolvers

  object :status_queries do
    field :get_character_status, :character do
      arg :character_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&StatusResolvers.get_character_status/2, character_id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :get_character_description, :character do
      arg :character_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&StatusResolvers.get_character_description/2, character_id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end

  enum :damage_type do
    value :superficial, as: "superficial"
    value :aggravated, as: "aggravated"
  end

  input_object :set_character_status_request do
    field :hunger, :integer
    field :damage, :integer
    field :aggravated_damage, :integer
    field :willpower_damage, :integer
    field :stains, :integer
  end

  object :status_mutations do
    payload field :rouse_check do
      input do
        field :character_id, non_null(:id)
        field :chat_map_id, non_null(:id)
      end

      output do
        field :result, :map_chat_entry
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      middleware VtmWeb.Schema.Middlewares.AuthorizeCharacterId, :any
      resolve parsing_node_ids(&StatusResolvers.rouse_check/2, character_id: :character, chat_map_id: :chat_location)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    payload field :use_willpower do
      input do
        field :character_id, non_null(:id)
        field :chat_map_id, non_null(:id)
      end

      output do
        field :result, :map_chat_entry
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      middleware VtmWeb.Schema.Middlewares.AuthorizeCharacterId, :any
      resolve parsing_node_ids(&StatusResolvers.use_willpower/2, character_id: :character, chat_map_id: :chat_location)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    payload field :apply_damage do
      input do
        field :character_id, non_null(:id)
        field :damage_entity, non_null(:integer)
        field :type, non_null(:damage_type)
      end

      output do
        field :result, :string
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :master
      resolve parsing_node_ids(&StatusResolvers.apply_damage/2, character_id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    payload field :heal do
      input do
        field :character_id, non_null(:id)
        field :chat_map_id, non_null(:id)
      end

      output do
        field :result, :map_chat_entry
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      middleware VtmWeb.Schema.Middlewares.AuthorizeCharacterId, :any
      resolve parsing_node_ids(&StatusResolvers.heal/2, character_id: :character, chat_map_id: :chat_location)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    payload field :heal_willpower do
      input do
        field :character_id, non_null(:id)
        field :quantity, non_null(:integer)
      end

      output do
        field :result, :string
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :master
      resolve parsing_node_ids(&StatusResolvers.heal_willpower/2, character_id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    payload field :set_character_status do
      input do
        field :character_id, non_null(:id)
        field :request, non_null(:set_character_status_request)
      end

      output do
        field :result, :character
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :master
      resolve parsing_node_ids(&StatusResolvers.set_character_status/2, character_id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    payload field :hunt do
      input do
        field :character_id, non_null(:id)
      end

      output do
        field :result, :string
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      middleware VtmWeb.Schema.Middlewares.AuthorizeCharacterId, :any
      resolve parsing_node_ids(&StatusResolvers.hunt/2, character_id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    payload field :reset_character_hunt do
      input do
        field :character_id, non_null(:id)
      end

      output do
        field :result, :character
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :master
      resolve parsing_node_ids(&StatusResolvers.reset_hunt/2, character_id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end
end
