defmodule VtmWeb.Schema.MessageTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias VtmWeb.Resolvers.MessageResolvers

  node object :message do
    field :subject, non_null(:string)
    field :text, non_null(:string)
    field :on_game, :boolean
    field :read, :boolean
    field :sender_user_id, non_null(:id)
    field :receiver_user_id, non_null(:id)
    field :sender_character_id, :id
    field :receiver_character_id, :id
    field :sender_user, non_null(:user)
    field :receiver_user, non_null(:user)
    field :sender_character, :character
    field :receiver_character, :character
    field :inserted_at, :date_time
    field :modified_at, :date_time
  end

  input_object :send_message_request do
    field :subject, non_null(:string)
    field :text, non_null(:string)
    field :on_game, :boolean
    field :receiver_user_id, non_null(:id)
    field :sender_character_id, :id
    field :receiver_character_id, :id
    field :reply_to_id, :id
  end

  object :messages_queries do
    field :get_message, :message do
      arg :message_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&MessageResolvers.get_message/2, message_id: :message)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end

  object :messages_mutations do
    field :send_message, :message do
      arg :message, non_null(:send_message_request)

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &MessageResolvers.send_message/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :set_message_read, :message do
      arg :message_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&MessageResolvers.set_message_read/2, message_id: :message)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :delete_message, :message do
      arg :message_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&MessageResolvers.delete_message/2, message_id: :message)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end
end
