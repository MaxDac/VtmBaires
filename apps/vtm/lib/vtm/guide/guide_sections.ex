defmodule Vtm.Guide.GuideSections do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  @type t :: %__MODULE__{
    description: binary(),
    name: binary(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "guide_sections" do
    field :description, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(guides, attrs) do
    guides
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
