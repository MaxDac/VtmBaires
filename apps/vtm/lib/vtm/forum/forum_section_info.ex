defmodule Vtm.Forum.ForumSectionInfo do
  @moduledoc false

  use Ecto.Schema

  schema "forum_section_info" do
    field :title, :string
    field :description, :string
    field :on_game, :boolean, default: false
    field :can_view, :boolean, default: false
    field :can_edit, :boolean, default: false
    field :last_thread_title, :string
    field :last_thread_updated_at, :naive_datetime

    belongs_to :last_thread, Vtm.Forum.ForumThread

    timestamps()
  end
end
