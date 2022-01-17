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
    field :difficulty, :integer
    field :owner_difficulty, :integer
    field :resources_level, :integer
    field :character, :character
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
  end

  object :haven_mutations do
  end
end
