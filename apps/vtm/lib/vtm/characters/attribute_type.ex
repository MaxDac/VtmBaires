defmodule Vtm.Characters.AttributeType do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  schema "attribute_types" do
    field :name, :string
    field :section, :string
    field :experience_cost, :integer

    timestamps()
  end

  @doc false
  def changeset(attribute_type, attrs) do
    attribute_type
    |> cast(attrs, [:name, :section, :experience_cost])
    |> unique_constraint([:name, :section], name: :attribute_types_unique_key)
    |> validate_required([:name, :section, :experience_cost])
  end
end
