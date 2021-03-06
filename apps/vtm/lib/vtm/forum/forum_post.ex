defmodule Vtm.Forum.ForumPost do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Forum.ForumSection
  alias Vtm.Forum.ForumThread
  alias VtmAuth.Accounts.User
  alias Vtm.Characters.Character

  @type t :: %__MODULE__{
    text: binary(),
    forum_section_id: non_neg_integer(),
    forum_section: ForumSection.t(),
    forum_thread_id: non_neg_integer(),
    forum_thread: ForumThread.t(),
    creator_user_id: non_neg_integer(),
    creator_user: User.t(),
    creator_character_id: non_neg_integer(),
    creator_character: Character.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "forum_posts" do
    field :text, :string

    belongs_to :forum_section, ForumSection
    belongs_to :forum_thread, ForumThread
    belongs_to :creator_user, User
    belongs_to :creator_character, Character

    timestamps()
  end

  def update_changeset(forum_post, attrs) do
    forum_post
    |> cast(attrs, [:text])
    |> validate_required([:text])
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
