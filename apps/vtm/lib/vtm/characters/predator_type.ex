defmodule Vtm.Characters.PredatorType do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Characters.Attribute

  @type t :: %__MODULE__{
    description: binary(),
    name: binary(),

    attribute_id: non_neg_integer(),
    attribute: Attribute.t(),
    skill_id: non_neg_integer(),
    skill: Attribute.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "predator_types" do
    field :description, :string
    field :name, :string

    belongs_to :attribute, Attribute
    belongs_to :skill, Attribute

    timestamps()
  end

  @doc false
  def changeset(predator_type, attrs) do
    predator_type
    |> cast(attrs, [:name, :description, :attribute_id, :skill_id])
    |> foreign_key_constraint(:attribute_id)
    |> foreign_key_constraint(:skill_id)
    |> unique_constraint(:name, name: :predator_types_unique_key)
    |> validate_required([:name, :description, :attribute_id, :skill_id])
  end
end
