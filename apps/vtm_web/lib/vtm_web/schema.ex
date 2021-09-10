defmodule VtmWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema, :modern

  import_types __MODULE__.BaseTypes
  import_types __MODULE__.AccountTypes
  import_types __MODULE__.CharacterTypes
  import_types __MODULE__.ChatTypes

  query do
    import_fields :base_queries
    import_fields :user_queries
    import_fields :character_queries
    import_fields :chat_queries
  end

  mutation do
    import_fields :user_mutations
    import_fields :character_mutations
    import_fields :chat_mutations
  end

  subscription do
    import_fields :chat_subscriptions
  end
end
