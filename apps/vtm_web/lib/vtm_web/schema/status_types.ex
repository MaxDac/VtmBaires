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
  end

end
