defmodule VtmAuth.Accounts.Session do
  use Ecto.Schema
  import Ecto.Changeset

  alias VtmAuth.Accounts.User

  schema "sessions" do
    field :last_checked, :naive_datetime
    field :remember, :boolean
    field :host, :string
    field :ip, :string
    field :session_info, :map

    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(session, attrs) do
    session
    |> cast(attrs, [:last_checked, :remember, :host, :ip, :session_info])
    |> unique_constraint([:user_id], name: "session_user_unique_idx")
    |> validate_required([:last_checked])
  end
end
