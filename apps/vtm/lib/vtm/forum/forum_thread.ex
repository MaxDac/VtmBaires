defmodule Vtm.Forum.ForumThread do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias Vtm.Forum.ForumSection
  alias VtmAuth.Accounts.User
  alias Vtm.Characters.Character

  @type t :: %__MODULE__{
    title: binary(),
    description: binary(),
    highlighted: boolean(),
    forum_section_id: non_neg_integer(),
    forum_section: ForumSection.t(),
    creator_user_id: non_neg_integer(),
    creator_user: User.t(),
    creator_character_id: non_neg_integer(),
    creator_character: Character.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "forum_threads" do
    field :title, :string
    field :description, :string
    field :highlighted, :boolean, default: false

    belongs_to :forum_section, ForumSection
    belongs_to :creator_user, User
    belongs_to :creator_character, Character

    timestamps()
  end

  def update_changeset(forum_thread, attrs) do
    forum_thread
    |> cast(attrs, [:title, :description, :highlighted])
    |> validate_required([:title, :description])
  end

  @doc false
  def changeset(forum_thread, attrs) do
    forum_thread
    |> cast(attrs, [:title, :description, :forum_section_id, :creator_user_id, :creator_character_id, :highlighted])
    |> foreign_key_constraint(:forum_section_id)
    |> foreign_key_constraint(:creator_user_id)
    |> foreign_key_constraint(:creator_character_id)
    |> validate_required([:title, :description, :forum_section_id, :creator_user_id])
  end
end
