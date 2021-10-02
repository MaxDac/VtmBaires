defmodule VtmWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema, :modern

  node interface do
    resolve_type fn
      # %VtmAuth.Accounts.User{}, _ -> :user
      # %VtmAuth.Accounts.Session{}, _ -> :session
      %Vtm.Characters.Attribute{}, _ -> :attribute
      %Vtm.Characters.AttributeType{}, _ -> :attribute_type
      %Vtm.Characters.PredatorType{}, _ -> :predator_type
      %Vtm.Chats.ChatMap{}, _ -> :chat_location
      _, _ -> nil
    end
  end

  import_types __MODULE__.BaseTypes
  import_types __MODULE__.AccountTypes
  import_types __MODULE__.CharacterTypes
  import_types __MODULE__.ChatTypes
  import_types __MODULE__.MessageTypes
  import_types __MODULE__.ForumTypes

  query do
    import_fields :base_queries
    import_fields :user_queries
    import_fields :character_queries
    import_fields :chat_queries
    import_fields :messages_queries
    import_fields :forum_queries
  end

  mutation do
    import_fields :user_mutations
    import_fields :character_mutations
    import_fields :chat_mutations
    import_fields :messages_mutations
    import_fields :forum_mutations
  end

  subscription do
    import_fields :chat_subscriptions
    import_fields :messages_subscriptions
  end
end
