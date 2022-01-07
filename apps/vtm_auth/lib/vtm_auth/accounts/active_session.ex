defmodule VtmAuth.Accounts.ActiveSession do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  alias VtmAuth.Accounts.User

  @type t :: %__MODULE__{
    last_checked: NaiveDateTime.t(),
    remember: boolean(),
    host: binary(),
    ip: binary(),
    session_info: map(),
    completed: boolean(),
    approved: boolean(),
    character_id: non_neg_integer(),
    character_name: binary(),
    map_id: non_neg_integer(),
    map_name: binary(),
    user_id: non_neg_integer(),
    user: User.t(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "session_info" do
    field :last_checked, :naive_datetime
    field :remember, :boolean
    field :host, :string
    field :ip, :string
    field :session_info, :map
    field :completed, :boolean

    #views fields
    field :approved, :boolean
    field :character_id, :id
    field :character_name, :string
    field :map_id, :id
    field :map_name, :string

    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(session, attrs) do
    session
    |> cast(attrs, [:user_id, :last_checked, :remember, :host, :ip, :session_info, :completed])
    |> unique_constraint([:user_id], name: "session_user_unique_idx")
    |> validate_required([:last_checked, :user_id])
  end
end
