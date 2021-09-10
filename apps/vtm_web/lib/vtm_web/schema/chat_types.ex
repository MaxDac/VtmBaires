defmodule VtmWeb.Schema.ChatTypes do
  use Absinthe.Schema.Notation

  alias VtmWeb.Resolvers.ChatResolvers

  object :chat_location do
    field :id, :id
    field :name, :string
    field :description, :string
    field :image, :string
    field :is_chat, :boolean
    field :childs, list_of(:chat_location)
  end

  # if left chat_entry, Relay got mad
  object :map_chat_entry do
    field :id, :id
    field :character_id, :id
    field :character_name, :string
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
      resolve &ChatResolvers.get_chat_maps/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :map, :chat_location do
      arg :id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &ChatResolvers.get_chat/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    # if left chat_entries, Relay got mad
    field :map_chat_entries, list_of(:map_chat_entry) do
      arg :map_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &ChatResolvers.get_chat_entries/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end

  object :chat_mutations do
    field :create_chat_entry, :map_chat_entry do
      arg :entry, :chat_entry_request

      # middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &ChatResolvers.create_chat_entry/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end

  object :chat_subscriptions do
    field :new_chat_entry, :map_chat_entry do
      arg :map_id, non_null(:id)

      config fn %{map_id: map_id}, _context -> {:ok, topic: map_id} end

      trigger :create_chat_entry, topic: fn
        %{ chat_map_id: id }  -> id
        _                     -> "0"
      end

      resolve fn root, _args, _res ->
        IO.puts "root: #{inspect root}"
        {:ok, root}
      end
    end
  end
end
