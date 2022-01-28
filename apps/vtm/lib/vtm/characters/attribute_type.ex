defmodule Vtm.Characters.AttributeType do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  @type t :: %__MODULE__{
    name: binary(),
    section: binary(),
    experience_cost: non_neg_integer(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "attribute_types" do
    field :name, :string
    field :section, :string
    field :experience_cost, :integer

    timestamps()
  end

  def update_changeset(attribute_type, attrs) do
    attribute_type
    |> cast(attrs, [:experience_cost])
  end

  @doc false
  def changeset(attribute_type, attrs) do
    attribute_type
    |> cast(attrs, [:name, :section, :experience_cost])
    |> unique_constraint([:name, :section], name: :attribute_types_unique_key)
    |> validate_required([:name, :section, :experience_cost])
  end
end
