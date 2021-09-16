defmodule VtmWeb.Schema.AccountTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias VtmWeb.Schema.Middlewares
  alias VtmWeb.Resolvers.AccountsResolvers
  alias VtmWeb.Resolvers.CharacterResolvers

  object :user do
    field :id, :id
    field :email, :string
    field :name, :string
    field :role, :role

    field :user_characters, list_of(:character) do
      resolve &CharacterResolvers.get_user_characters/3
    end
  end

  object :session do
    field :token, :string
    field :user, :user
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
  end

  object :user_mutations do
    field :create_user, :creation_result do
      arg :email, non_null(:string)
      arg :name, non_null(:string)
      arg :password, non_null(:string)

      resolve &AccountsResolvers.create/3
    end

    field :login, :session do
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      arg :remember, non_null(:boolean)

      resolve &AccountsResolvers.login/3

      middleware Middlewares.Login, :any
      middleware Middlewares.ChangesetErrors
    end
  end
end
