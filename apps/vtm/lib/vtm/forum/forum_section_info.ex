defmodule Vtm.Forum.ForumSectionInfo do
  @moduledoc false

  use Ecto.Schema

  @type t :: %__MODULE__{
    title: binary(),
    description: binary(),
    on_game: boolean(),
    can_view: boolean(),
    can_edit: boolean(),
    last_thread_title: binary(),
    last_thread_updated_at: NaiveDateTime.t(),
    last_thread_id: non_neg_integer(),
    last_thread: Vtm.Forum.ForumThread.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

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
