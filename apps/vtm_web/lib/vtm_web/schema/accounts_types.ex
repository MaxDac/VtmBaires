defmodule VtmWeb.Schema.AccountTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias VtmWeb.Schema.Middlewares
  alias VtmWeb.Resolvers.AccountsResolvers
  alias VtmWeb.Resolvers.CharacterResolvers

  node object :user do
    field :original_id, :id
    field :email, :string
    field :name, :string
    field :role, :role
    field :session_character, :character

    field :user_characters, list_of(:character) do
      resolve &CharacterResolvers.get_user_characters/3
    end

    field :session_character, :character do
      resolve &CharacterResolvers.get_session_character/3
    end
  end

  object :login_response do
    field :token, :string
    field :user, :user
    field :character, :character
  end

  enum :role do
    value :user, as: "player"
    value :master, as: "master"
  end

  object :creation_result do
    field :id, :id
  end

  object :user_queries do
    field :list, list_of(:user) do
      middleware VtmWeb.Schema.Middlewares.Authorize, "player"
      resolve &VtmWeb.Resolvers.AccountsResolvers.all/3
    end

    field :subscription_token, :string do
      middleware VtmWeb.Schema.Middlewares.Authorize, "player"
      resolve &VtmWeb.Resolvers.AccountsResolvers.token/3
    end
  end

  object :user_mutations do
    field :create_user, :creation_result do
      arg :email, non_null(:string)
      arg :name, non_null(:string)
      arg :password, non_null(:string)

      resolve &AccountsResolvers.create/3
    end

    field :login, :login_response do
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      arg :remember, non_null(:boolean)

      resolve &AccountsResolvers.login/3

      middleware Middlewares.Login, :any
      middleware Middlewares.ChangesetErrors
    end
  end
end
