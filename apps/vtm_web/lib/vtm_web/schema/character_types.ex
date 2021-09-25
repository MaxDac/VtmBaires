defmodule VtmWeb.Schema.CharacterTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias VtmWeb.Resolvers.CharacterResolvers

  node object :clan do
    field :name, :string
  end

  node object :predator_type do
    field :name, :string
    field :description, :string
  end

  node object :attribute_type do
    field :name, :string
    field :section, :string
  end

  node object :attribute do
    field :name, :string
    field :description, :string
    field :attribute_type, :attribute_type
  end

  node object :discipline do
    field :name, :string
    field :description, :string
  end

  node object :character do
    field :avatar, :string
    field :chat_avatar, :string
    field :name, :string
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
    field :damage, :integer
    field :aggravated_damage, :integer
    field :willpower, :integer
    field :willpower_damage, :integer
    field :advantages, :string
    field :notes, :string
    field :clan, :clan
    field :predator_type, :predator_type
  end

  node object :character_attribute do
    field :attribute, :attribute
    field :value, :integer
  end

  object :character_stats do
    field :id, :id
    field :predator_type, :predator_type
    field :attributes, list_of(:character_attribute)
    field :disciplines, list_of(:character_attribute)
  end

  input_object :character_creation_request do
    field :name, non_null(:string)
    field :clan_id, non_null(:string)
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

  input_object :character_finalization_request do
    field :predator_type_id, non_null(:id)
    field :advantages, non_null(:string)
    field :notes, :string
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

    field :clan_disciplines, list_of(:discipline) do
      arg :clan_id, non_null(:id)

      resolve parsing_node_ids(&CharacterResolvers.get_clan_disciplines/2, clan_id: :clan)
    end

    field :get_character, :character do
      arg :id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&CharacterResolvers.get_character/2, id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :get_session_character, :character do
      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &CharacterResolvers.get_session_character/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :get_character_stats, :character_stats do
      arg :character_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&CharacterResolvers.get_character_stats/2, character_id: :character)
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

    payload field :add_advantages do
      input do
        field :request, non_null(:character_finalization_request)
        field :attributes, list_of(:character_attribute_request)
        field :new_stage, non_null(:integer)
      end

      output do
        field :result, :character
      end

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &CharacterResolvers.add_advantages/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :switch_character_attributes, :character do
      arg :character_id, :id
      arg :first_attribute, :string
      arg :second_attribute, :string

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve &CharacterResolvers.switch_attributes/3
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :finalize_character, :character do
      arg :character_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&CharacterResolvers.finalize_character/2, character_id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end

    field :delete_character, :boolean do
      arg :character_id, :id

      middleware VtmWeb.Schema.Middlewares.Authorize, :any
      resolve parsing_node_ids(&CharacterResolvers.delete_character/2, character_id: :character)
      middleware VtmWeb.Schema.Middlewares.ChangesetErrors
    end
  end
end
