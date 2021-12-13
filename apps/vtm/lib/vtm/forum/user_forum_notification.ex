defmodule Vtm.Forum.UserForumNotification do
  use Ecto.Schema
  import Ecto.Changeset

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
