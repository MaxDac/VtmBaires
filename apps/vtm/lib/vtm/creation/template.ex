defmodule Vtm.Creation.Template do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  @type t :: %__MODULE__{
    description: binary(),
    name: binary(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "creation_templates" do
    field :description, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(template, attrs) do
    template
    |> cast(attrs, [:name, :description])
    |> unique_constraint(:name, name: :creation_templates_name_uk)
    |> validate_required([:name, :description])
  end
end
