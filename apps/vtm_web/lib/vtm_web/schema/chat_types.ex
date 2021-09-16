defmodule VtmWeb.Schema.ChatTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias VtmWeb.Resolvers.ChatResolvers

  node object :chat_location do
    field :name, :string
    field :description, :string
    field :image, :string
    field :is_chat, :boolean
    field :children, list_of(:chat_location)
  end

  # if left chat_entry, Relay got mad
  node object :map_chat_entry do
    field :character_id, :id
    field :character_name, :string
    field :character_chat_avatar, :string
    field :result, :string
    field :text, :string
    field :chat_map_id, :id
  end

  input_object :chat_entry_request do
    field :character_id, non_null(:id)
    field :result, :string
    field :text, :string
    field :chat_map_id, non_null(:id)
  end

  object :chat_queries do
    field :main_maps, list_of(:chat_location) do
      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &ChatResolvers.get_main_chat_maps/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :section_maps, list_of(:chat_location) do
      arg :parent_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&ChatResolvers.get_chat_maps/2, parent_id: :chat_location)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :map, :chat_location do
      arg :id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&ChatResolvers.get_chat/2, id: :chat_location)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    # if left chat_entries, Relay got mad
    field :map_chat_entries, list_of(:map_chat_entry) do
      arg :map_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&ChatResolvers.get_chat_entries/2, map_id: :chat_location)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end

  object :chat_mutations do
    field :create_chat_entry, :map_chat_entry do
      arg :entry, :chat_entry_request

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &ChatResolvers.create_chat_entry/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end

  object :chat_subscriptions do
    field :new_chat_entry, :map_chat_entry do
      arg :map_id, non_null(:id)

      config &ChatResolvers.config_chat_subscription/2

      trigger :create_chat_entry, topic: fn
        %{ chat_map_id: id }  -> id
        _                     -> "0"
      end

      resolve fn root, _args, _res ->
        {:ok, root}
      end
    end
  end
end
