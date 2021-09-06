defmodule VtmAuth.Accounts.Session do
  use Ecto.Schema
  import Ecto.Changeset

  alias VtmAuth.Accounts.User

  schema "sessions" do
    field :last_checked, :naive_datetime
    # field :user_id, :id

    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(session, attrs) do
    session
    |> cast(attrs, [:last_checked])
    |> unique_constraint([:user_id], name: "session_user_unique_idx")
    |> validate_required([:last_checked])
  end
end
