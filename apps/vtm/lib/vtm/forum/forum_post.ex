defmodule Vtm.Forum.ForumPost do
  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Forum.ForumSection
  alias Vtm.Forum.ForumThread
  alias VtmAuth.Accounts.User
  alias Vtm.Characters.Character

  schema "forum_posts" do
    field :text, :string

    belongs_to :forum_section, ForumSection
    belongs_to :forum_thread, ForumThread
    belongs_to :creator_user, User
    belongs_to :creator_character, Character

    timestamps()
  end

  @doc false
  def changeset(forum_post, attrs) do
    forum_post
    |> cast(attrs, [:text, :forum_section_id, :forum_thread_id, :creator_user_id, :creator_character_id])
    |> foreign_key_constraint(:forum_section_id)
    |> foreign_key_constraint(:forum_thread_id)
    |> foreign_key_constraint(:creator_user_id)
    |> foreign_key_constraint(:creator_character_id)
    |> validate_required([:text, :forum_section_id, :forum_thread_id, :creator_user_id])
  end
end
