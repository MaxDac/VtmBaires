defmodule Vtm.Guide.GuideItems do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Guide.GuideSections

  @type t :: %__MODULE__{
    text: binary(),
    title: binary(),
    guide_sections_id: non_neg_integer(),
    guide_sections: GuideSections.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "guide_items" do
    field :text, :string
    field :title, :string

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
