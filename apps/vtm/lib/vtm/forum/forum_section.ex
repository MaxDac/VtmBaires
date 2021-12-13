defmodule Vtm.Forum.ForumSection do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  schema "forum_sections" do
    field :title, :string
    field :description, :string
    field :on_game, :boolean, default: false
    field :can_view, :boolean, default: false
    field :can_edit, :boolean, default: false

    timestamps()
  end

  @doc false
  def changeset(forum_section, attrs) do
    forum_section
    |> cast(attrs, [:title, :description, :on_game, :can_edit, :can_view])
    |> unique_constraint(:title, name: :forum_section_title_uk)
    |> validate_required([:title, :description, :on_game, :can_edit, :can_view])
  end
end
