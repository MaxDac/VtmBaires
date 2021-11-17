defmodule VtmAuth.Accounts.User do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :name, :string
    field :password, Comeonin.Ecto.Password
    field :role, :string
    field :needs_new_password, :boolean
    field :banned, :boolean
    field :last_login, :naive_datetime
    field :relogin_token, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password, :role])
    |> unique_constraint([:email, :role], name: "users_email_role_index")
    |> unique_constraint(:name, name: "users_name_index")
    |> validate_required([:name, :email, :role])
  end

  def update_changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password, :role, :needs_new_password, :banned, :last_login, :relogin_token])
  end
end
