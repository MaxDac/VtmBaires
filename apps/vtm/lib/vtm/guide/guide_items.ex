defmodule Vtm.Guide.GuideItems do
  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Guide.GuideSections

  schema "guide_items" do
    field :text, :string
    field :title, :string
    # field :category_id, :id
    belongs_to :guide_sections, GuideSections

    timestamps()
  end

  @doc false
  def changeset(guide_items, attrs) do
    guide_items
    |> cast(attrs, [:title, :text])
    |> validate_required([:title, :text])
  end
end
