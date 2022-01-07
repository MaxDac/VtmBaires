defmodule Vtm.Characters.PredatorType do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  @type t :: %__MODULE__{
    description: binary(),
    name: binary(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "predator_types" do
    field :description, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(predator_type, attrs) do
    predator_type
    |> cast(attrs, [:name, :description])
    |> unique_constraint(:name, name: :predator_types_unique_key)
    |> validate_required([:name, :description])
  end
end
