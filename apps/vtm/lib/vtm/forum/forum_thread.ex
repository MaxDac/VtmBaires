defmodule Vtm.Forum.ForumThread do
  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Forum.ForumSection
  alias VtmAuth.Accounts.User
  alias Vtm.Characters.Character

  schema "forum_threads" do
    field :title, :string
    field :description, :string

    belongs_to :forum_section, ForumSection
    belongs_to :creator_user, User
    belongs_to :creator_character, Character

    timestamps()
  end

  @doc false
  def changeset(forum_thread, attrs) do
    forum_thread
    |> cast(attrs, [:title, :description, :forum_section_id, :creator_user_id, :creator_character_id])
    |> foreign_key_constraint(:forum_section_id)
    |> foreign_key_constraint(:creator_user_id)
    |> foreign_key_constraint(:creator_character_id)
    |> validate_required([:title, :description, :forum_section_id, :creator_user_id])
  end
end
