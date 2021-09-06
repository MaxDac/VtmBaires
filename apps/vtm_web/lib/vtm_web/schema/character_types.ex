defmodule VtmWeb.Schema.CharacterTypes do
  use Absinthe.Schema.Notation

  alias VtmWeb.Resolvers.CharacterResolvers

  object :clan do
    field :id, :id
    field :name, :string
  end

  object :character do
    field :id, :id
    field :avatar, :string
    field :biography, :string
    field :description, :string
    field :name, :string
    field :is_npc, :boolean
    field :is_complete, :boolean
    field :experience, :integer
    field :clan, :clan
  end

  input_object :character_creation_request do
    field :name, non_null(:string)
    field :clan_id, non_null(:integer)
    field :biography, non_null(:string)
    field :description, non_null(:string)
    field :is_npc, :integer
  end

  object :character_queries do
    field :clans, list_of(:clan) do
      resolve &CharacterResolvers.get_clans/3
    end
  end

  object :character_mutations do
    field :create_character, :character do
      arg :request, :character_creation_request

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &CharacterResolvers.create_character/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end
end
