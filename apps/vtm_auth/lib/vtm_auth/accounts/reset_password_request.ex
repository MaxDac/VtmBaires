defmodule VtmAuth.Accounts.ResetPasswordRequest do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  @type t :: %__MODULE__{
    host: binary(),
    ip: binary(),
    user_email: binary(),

    inserted_at: NaiveDateTime.t(),
    updated_at: NaiveDateTime.t()
  }

  schema "reset_password_requests" do
    field :host, :string
    field :ip, :string
    field :user_email, :string

    timestamps()
  end

  @doc false
  def changeset(reset_password_request, attrs) do
    reset_password_request
    |> cast(attrs, [:ip, :host, :user_email])
    |> validate_required([:ip, :host, :user_email])
  end
end
