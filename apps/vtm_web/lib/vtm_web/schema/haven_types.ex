defmodule VtmWeb.Schema.HavenTypes do
  @moduledoc false

  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias VtmWeb.Schema.Middlewares
  alias VtmWeb.Resolvers.HavenResolvers

  node object :haven do
    field :name, :string
    field :x, :integer
    field :y, :integer
    field :danger, :integer
    field :ground_control, :integer
    field :difficulty, :integer
    field :owner_difficulty, :integer
    field :resources_level, :integer
    field :character, :character
    field :inserted_at, :date_time
    field :updated_at, :date_time
  end

  node object :haven_event do
    field :danger_triggered, :boolean
    field :control_triggered, :boolean
    field :resolved, :boolean
    field :character, :character
    field :haven, :haven
    field :inserted_at, :date_time
    field :updated_at, :date_time
  end

  object :haven_queries do
    payload field :get_havens do
      output do
        field :result, list_of(:haven)
      end

      middleware Middlewares.Authorize, :any
      middleware VtmWeb.Schema.Middlewares.RefreshUserSession
      resolve &HavenResolvers.get_havens/3
      middleware Middlewares.ChangesetErrors
    end

    payload field :get_unresolved_events do
      output do
        field :result, list_of(:haven_event)
      end

      middleware Middlewares.Authorize, :master
      resolve &HavenResolvers.get_unresolved_events/3
      middleware Middlewares.ChangesetErrors
    end

    payload field :get_character_domain_events do
      input do
        field :character_id, non_null(:id)
      end

      output do
        field :result, list_of(:haven_event)
      end

      middleware VtmWeb.Schema.Middlewares.AuthorizeCharacterId, :any
      resolve parsing_node_ids(&HavenResolvers.get_character_domain_events/2, character_id: :character)
      middleware Middlewares.ChangesetErrors
    end
  end

  input_object :set_haven_info_request do
    field :danger, non_null(:integer)
    field :ground_control, non_null(:integer)
    field :difficulty, non_null(:integer)
    field :owner_difficulty, non_null(:integer)
    field :resources_level, non_null(:integer)
  end

  object :haven_mutations do
    payload field :set_haven_character do
      input do
        field :haven_id, non_null(:id)
        field :character_id, non_null(:id)
      end

      output do
        field :result, :haven
      end

      middleware Middlewares.Authorize, :master
      resolve parsing_node_ids(&HavenResolvers.set_haven_character/2, haven_id: :haven, character_id: :character)
      middleware Middlewares.ChangesetErrors
    end

    payload field :delete_haven_character do
      input do
        field :haven_id, non_null(:id)
      end

      output do
        field :result, :haven
      end

      middleware Middlewares.Authorize, :master
      resolve parsing_node_ids(&HavenResolvers.delete_haven_character/2, haven_id: :haven)
      middleware Middlewares.ChangesetErrors
    end

    payload field :set_haven_info do
      input do
        field :haven_id, non_null(:id)
        field :request, non_null(:set_haven_info_request)
      end

      output do
        field :result, :haven
      end

      middleware Middlewares.Authorize, :master
      resolve parsing_node_ids(&HavenResolvers.set_haven_info/2, haven_id: :haven)
      middleware Middlewares.ChangesetErrors
    end

    payload field :resolve_event do
      input do
        field :event_id, non_null(:id)
      end

      output do
        field :result, :haven_event
      end

      middleware Middlewares.Authorize, :master
      resolve parsing_node_ids(&HavenResolvers.resolve_event/2, event_id: :haven_event)
      middleware Middlewares.ChangesetErrors
    end
  end
end
