defmodule Vtm.Guide.GuideSections do
  use Ecto.Schema
  import Ecto.Changeset

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
