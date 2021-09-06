defmodule VtmAuth.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :password, Comeonin.Ecto.Password
    field :role, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password, :role])
    |> unique_constraint([:email, :name], name: "users_email_role_index")
    |> validate_required([:name, :email, :password, :role])
  end

  def update_changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password, :role])
  end
end
