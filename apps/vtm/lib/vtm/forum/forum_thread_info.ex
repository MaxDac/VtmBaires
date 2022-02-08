defmodule Vtm.Forum.ForumThreadInfo do
  @moduledoc false

  use Ecto.Schema

  @type t :: %__MODULE__{
    title: binary(),
    description: binary(),
    highlighted: boolean(),
    on_game: boolean(),
    can_view: boolean(),
    can_edit: boolean(),
    last_post_updated_at: NaiveDateTime.t(),
    forum_section_title: binary(),
    creator_user_id: non_neg_integer(),
    creator_user: VtmAuth.Accounts.User.t(),
    creator_character_id: non_neg_integer(),
    creator_character: Vtm.Characters.Character.t(),
    forum_section_id: non_neg_integer(),
    forum_section: Vtm.Forum.ForumSection.t(),
    last_post_id: non_neg_integer(),
    last_post: Vtm.Forum.ForumPost.t(),
    allowed_character_id: non_neg_integer(),
    allowed_character: Vtm.Characters.Character.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "forum_thread_info" do
    field :title, :string
    field :description, :string
    field :highlighted, :boolean, default: false
    field :on_game, :boolean, default: false
    field :can_view, :boolean, default: false
    field :can_edit, :boolean, default: false
    field :last_post_updated_at, :naive_datetime
    field :forum_section_title, :string

    belongs_to :creator_user, VtmAuth.Accounts.User
    belongs_to :creator_character, Vtm.Characters.Character
    belongs_to :forum_section, Vtm.Forum.ForumSection
    belongs_to :last_post, Vtm.Forum.ForumPost
    belongs_to :allowed_character, Vtm.Characters.Character

    timestamps()
  end
end
