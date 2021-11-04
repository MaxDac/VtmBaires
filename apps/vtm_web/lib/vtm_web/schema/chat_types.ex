defmodule VtmWeb.Schema.ChatTypes do
  @moduledoc false

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
    field :result, :string
    field :text, :string
    field :off_game, :boolean
    field :master, :boolean
    field :character, :character
    field :chat_map, :chat_location
    field :inserted_at, :date_time
  end

  input_object :chat_entry_request do
    field :character_id, non_null(:id)
    field :text, non_null(:string)
    field :off_game, :boolean
    field :chat_map_id, non_null(:id)
  end

  input_object :chat_dice_entry_request do
    field :character_id, non_null(:id)
    field :attribute_id, :id
    field :ability_id, :id
    field :master, :boolean
    field :free_throw, :integer
    field :difficulty, :integer
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

    field :all_chat_locations, list_of(:chat_location) do
      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &ChatResolvers.all_chat_locations/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    # if left chat_entries, Relay got mad
    field :map_chat_entries, list_of(:map_chat_entry) do
      arg :map_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&ChatResolvers.get_chat_entries/2, map_id: :chat_location)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    # if left chat_entries, Relay got mad
    field :map_admin_chat_entries, list_of(:map_chat_entry) do
      arg :map_id, :id
      arg :from, :date_time
      arg :to, :date_time

      middleware VtmWeb.Schema.Middlewares.Authorize, :master
      resolve parsing_node_ids(&ChatResolvers.get_admin_chat_entries/2, map_id: :chat_location)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end

  object :chat_mutations do
    field :create_chat_entry, :map_chat_entry do
      arg :entry, :chat_entry_request

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      middleware VtmWeb.Schema.Middlewares.AuthorizeCharacter, :any
      middleware VtmWeb.Schema.Middlewares.RefreshUserSession
      resolve &ChatResolvers.create_chat_entry/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :create_chat_dice_entry, :map_chat_entry do
      arg :entry, :chat_dice_entry_request

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      middleware VtmWeb.Schema.Middlewares.AuthorizeCharacter, :any
      middleware VtmWeb.Schema.Middlewares.RefreshUserSession
      resolve &ChatResolvers.create_chat_dice_entry/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end

  object :chat_subscriptions do
    field :new_chat_entry, :map_chat_entry do
      arg :map_id, non_null(:id)
      arg :token, non_null(:string)

      config &ChatResolvers.config_chat_subscription/2

      trigger :create_chat_entry, topic: &ChatResolvers.handle_chat_trigger/1
      trigger :create_chat_dice_entry, topic: &ChatResolvers.handle_chat_trigger/1
      trigger :rouse_check, topic: &ChatResolvers.handle_chat_trigger/1
      trigger :use_willpower, topic: &ChatResolvers.handle_chat_trigger/1
      trigger :heal, topic: &ChatResolvers.handle_chat_trigger/1

      resolve fn root, _args, _res ->
        {:ok, root}
      end
    end
  end
end
