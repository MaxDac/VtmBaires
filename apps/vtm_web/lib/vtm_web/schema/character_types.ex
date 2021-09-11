defmodule VtmWeb.Schema.CharacterTypes do
  use Absinthe.Schema.Notation

  alias VtmWeb.Resolvers.CharacterResolvers

  object :clan do
    field :id, :id
    field :name, :string
  end

  object :predator_type do
    field :id, :id
    field :name, :string
    field :description, :string
  end

  object :attribute_type do
    field :id, :id
    field :name, :string
    field :section, :string
  end

  object :attribute do
    field :id, :id
    field :name, :string
    field :description, :string
    field :attribute_type, :attribute_type
  end

  object :character_info do
    field :id, :id
    field :avatar, :string
    field :chat_avatar, :string
    field :name, :string
  end

  object :character do
    field :info, :character_info
    field :biography, :string
    field :description, :string
    field :is_npc, :boolean
    field :is_complete, :boolean
    field :experience, :integer
    field :humanity, :integer
    field :generation, :integer
    field :stage, :integer
    field :approved, :boolean
    field :hunger, :integer
    field :health, :integer
    field :damange, :integer
    field :aggravated_damage, :integer
    field :willpower, :integer
    field :willpower_damage, :integer
    field :clan, :clan
    field :predator_type, :predator_type
  end

  input_object :character_creation_request do
    field :name, non_null(:string)
    field :clan_id, non_null(:integer)
    field :avatar, :string
    field :chat_avatar, :string
    field :biography, non_null(:string)
    field :description, non_null(:string)
    field :is_npc, :integer
  end

  input_object :character_attribute_request do
    field :character_id, non_null(:id)
    field :attribute_id, non_null(:id)
    field :value, non_null(:integer)
  end

  object :character_queries do
    field :clans, list_of(:clan) do
      resolve &CharacterResolvers.get_clans/3
    end

    field :predator_types, list_of(:predator_type) do
      resolve &CharacterResolvers.get_predator_types/3
    end

    field :attributes, list_of(:attribute) do
      resolve &CharacterResolvers.get_attributes/3
    end

    field :get_character, :character do
      arg :id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &CharacterResolvers.get_character/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end

  object :character_mutations do
    field :create_character, :character do
      arg :request, :character_creation_request

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &CharacterResolvers.create_character/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :append_character_attributes, :character do
      arg :request, list_of(:character_attribute_request)
      arg :new_stage, non_null(:integer)

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &CharacterResolvers.append_attributes/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end
end
