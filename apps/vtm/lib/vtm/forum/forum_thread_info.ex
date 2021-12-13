defmodule Vtm.Forum.ForumThreadInfo do
  @moduledoc false

  use Ecto.Schema

  schema "forum_thread_info" do
    field :title, :string
    field :description, :string
    field :on_game, :boolean, default: false
    field :can_view, :boolean, default: false
    field :can_edit, :boolean, default: false
    field :last_checked_date, :naive_datetime
    field :last_post_updated_at, :naive_datetime
    field :forum_section_title, :string

    belongs_to :viewer, VtmAuth.Accounts.User
    belongs_to :creator_user, VtmAuth.Accounts.User
    belongs_to :creator_character, Vtm.Characters.Character
    belongs_to :forum_section, Vtm.Forum.ForumSection
    belongs_to :last_post, Vtm.Forum.ForumPost

    timestamps()
  end
end
