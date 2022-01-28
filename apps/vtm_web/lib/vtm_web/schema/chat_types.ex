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
    field :is_private, :boolean
    field :children, list_of(:chat_location)
  end

  enum :chat_command do
    value :insert, as: "insert"
    value :delete, as: "delete"
  end

  # if left chat_entry, Relay got mad
  node object :map_chat_entry do
    field :result, :string
    field :text, :string
    field :off_game, :boolean
    field :master, :boolean
    field :character, :character
    field :chat_map, :chat_location
    field :hide, :boolean
    field :inserted_at, :date_time
    field :command, :chat_command
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
    field :for_discipline, :boolean
    field :augment_attribute, :boolean
    field :master, :boolean
    field :free_throw, :integer
    field :difficulty, :integer
    field :chat_map_id, non_null(:id)
  end

  input_object :add_user_to_private_request do
    field :chat_map_id, non_null(:id)
    field :guest_user_id, non_null(:id)
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
      middleware VtmWeb.Schema.Middlewares.Authorize, :master
      resolve &ChatResolvers.all_chat_locations/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :has_user_access_to_map, :boolean do
      arg :chat_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&ChatResolvers.has_user_access_to_map?/2, chat_id: :chat_location)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :has_user_already_booked, :boolean do
      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &ChatResolvers.has_user_already_booked?/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :private_chat_available_users, list_of(:user) do
      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &ChatResolvers.available_users/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :available_private_chats, list_of(:chat_location) do
      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &ChatResolvers.available_private_chats/3
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
    field :book_chat_map, :chat_location do
      arg :chat_id, non_null(:id)

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&ChatResolvers.book_chat_map/2, chat_id: :chat_location)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :add_user_to_chat, :chat_location do
      arg :request, non_null(:add_user_to_private_request)

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &ChatResolvers.add_user_to_chat/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

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

    payload field :delete_chat_entry do
      input do
        field :chat_entry_id, non_null(:id)
      end

      output do
        field :result, :map_chat_entry
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :master
      middleware VtmWeb.Schema.Middlewares.RefreshUserSession
      resolve parsing_node_ids(&ChatResolvers.delete_chat_entry/2, chat_entry_id: :map_chat_entry)
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
      trigger :delete_chat_entry, topic: &ChatResolvers.handle_chat_trigger/1

      resolve fn root, _args, _res ->
        root |> ChatResolvers.handle_chat_subscription_resolution()
      end
    end
  end
end
