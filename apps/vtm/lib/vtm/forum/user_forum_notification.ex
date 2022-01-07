defmodule Vtm.Forum.UserForumNotification do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  @type t :: %__MODULE__{
    last_checked_date: NaiveDateTime.t(),
    user_id: non_neg_integer(),
    user: VtmAuth.Accounts.User.t(),
    forum_section_id: non_neg_integer(),
    forum_section: Vtm.Forum.ForumSection.t(),
    forum_thread_id: non_neg_integer(),
    forum_thread: Vtm.Forum.ForumThread.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "user_forum_notifications" do
    field :last_checked_date, :naive_datetime

    belongs_to :user, VtmAuth.Accounts.User
    belongs_to :forum_section, Vtm.Forum.ForumSection
    belongs_to :forum_thread, Vtm.Forum.ForumThread

    timestamps()
  end

  @doc false
  def changeset(user_forum_notification, attrs) do
    user_forum_notification
    |> cast(attrs, [:user_id, :forum_section_id, :forum_thread_id, :last_checked_date])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:forum_section_id)
    |> foreign_key_constraint(:forum_thread_id)
    |> validate_required([:user_id, :forum_section_id, :last_checked_date])
  end
end
