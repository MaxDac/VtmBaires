defmodule VtmAuth.Accounts do
  import Ecto.Query, warn: false

  alias Comeonin.Ecto.Password

  alias VtmAuth.Repo
  alias VtmAuth.Accounts.User
  alias VtmAuth.Accounts.Session

  @session_offset 60 * 30

  def list_users() do
    User
    |> Repo.all()
  end

  defp nil_to_result(u) do
    case u do
      nil -> {:error, :not_found}
      u   -> {:ok, u}
    end
  end

  @spec get_user(Number.t()) :: {:error, :not_found} | {:ok, %User{}}
  def get_user(id), do:
    User
    |> Repo.get(id)
    |> nil_to_result()

  @spec get_user_by_email(String.t(), String.t()) :: {:error, :not_found} | {:ok, %User{}}
  def get_user_by_email(email, role) do
    User
    |> Repo.get_by([email: email, role: to_string(role)])
    |> nil_to_result()
  end

  @spec create_user(%{}) :: {:ok, %User{}} | {:error, any()}
  def create_user(attrs \\ %{}) do
    new_attrs =
      case attrs do
        %{ "role" => role } -> %{ attrs | "role" => String.downcase(role) }
        %{ role: role }     -> %{ attrs | role: String.downcase(role) }
        _                   -> attrs
      end

    %User{}
    |> User.changeset(new_attrs)
    |> Repo.insert()
  end

  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  def update_session(%User{ id: id }) do
    case Session |> Repo.get(id) do
      nil ->
        %Session{
          user_id: id,
          last_checked: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
        } |> Repo.insert()
      session ->
        session
        |> Session.changeset(%{
          last_checked: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)
        })
        |> Repo.update()
    end
  end

  def get_current_sessions() do
    query =
      from s in Session,
      join: u in User,
      on: s.user_id == u.id,
      where: s.last_checked > ago(^@session_offset, "minute"),
      select: u

    Repo.all(query)
  end

  def authenticate(role, email, password) do
    with {:ok, user = %User{password: digest}}  <- get_user_by_email(email, role),
         true                                   <- Password.valid?(password, digest) do
      update_session(user)
      {:ok, user}
    else
      _ -> {:error, :unauthorized}
    end
  end
end
