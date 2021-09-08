defmodule VtmWeb.Schema.AccountTypes do
  use Absinthe.Schema.Notation

  alias VtmWeb.Schema.Middlewares
  alias VtmWeb.Resolvers.AccountsResolvers
  alias VtmWeb.Resolvers.CharacterResolvers

  interface :user do
    field :id, :id
    field :email, :string
    field :name, :string

    resolve_type &AccountsResolvers.parse_role/2

    field :user_characters, list_of(:character_info) do
      resolve &CharacterResolvers.get_user_characters/3
    end
  end

  object :session do
    field :token, :string
    field :user, :user
  end

  enum :role do
    value :player
    value :master
  end

  object :player do
    interface :user

    field :id, :id
    field :email, :string
    field :name, :string

    field :user_characters, list_of(:character_info) do
      resolve &CharacterResolvers.get_user_characters/3
    end
  end

  object :master do
    interface :user

    field :id, :id
    field :email, :string
    field :name, :string

    field :user_characters, list_of(:character_info) do
      resolve &CharacterResolvers.get_user_characters/3
    end
  end

  object :creation_result do
    field :id, :id
  end

  object :user_queries do
    field :list, list_of(:player) do
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
      arg :role, non_null(:role)

      resolve &AccountsResolvers.login/3

      middleware Middlewares.Login, :any
      middleware Middlewares.ChangesetErrors
    end
  end
end
