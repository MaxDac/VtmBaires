defmodule VtmAuth.Accounts do
  import Ecto.Query, warn: false

  alias Comeonin.Ecto.Password

  alias VtmAuth.Repo
  alias VtmAuth.Accounts.User
  alias VtmAuth.Accounts.Session
  alias VtmAuth.Accounts.SessionInfo
  alias VtmAuth.Accounts.ResetPasswordRequest

  import VtmAuth.Helpers

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

  def get_all_users() do
    query =
      from u in User,
        select: {u.id, u.name}

    Repo.all(query)
    |> Enum.map(fn {id, name} -> %{id: id, name: name} end)
  end

  @spec get_user(Number.t()) :: {:error, :not_found} | {:ok, %User{}}
  def get_user(id), do:
    User
    |> Repo.get(id)
    |> nil_to_result()

  @spec get_user_by_email(String.t()) :: {:error, :not_found} | {:ok, %User{}}
  def get_user_by_email(email) do
    User
    |> Repo.get_by(email: email)
    |> nil_to_result()
  end

  @spec user_name_exists?(String.t()) :: boolean()
  def user_name_exists?(name) do
    query = from u in User, where: u.name == ^name

    case Repo.one(query) do
      nil -> false
      _   -> true
    end
  end

  @spec user_email_exists?(String.t()) :: boolean()
  def user_email_exists?(email) do
    query = from u in User, where: u.email == ^email

    case Repo.one(query) do
      nil -> false
      _   -> true
    end
  end

  @doc """
  Creates a new user. The user will not be able to set its password at the creation step,
  the password will be automatically generated and sent by email.
  """
  @spec create_user(%{}) :: {:ok, %User{}} | {:error, any()}
  def create_user(attrs \\ %{}) do
    new_attrs =
      case attrs |> map_to_atom_map() do
        %{role: role} -> %{attrs | role: String.downcase(role)}
        _             -> attrs
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

  defp get_last_session_by_user_query(user_id) do
    from s in Session,
      where: s.user_id == ^user_id,
      where: not(s.completed)
  end

  def get_session_by_user_id(user_id) do
    user_id
    |> get_last_session_by_user_query()
    |> Repo.one()
  end

  # %{session_info: %{
  #   "character_id" => id,
  #   "character_name" => name,
  #   "approved" => approved
  # }}

  def get_character_session_by_user_id(user_id) do
    user_id
    |> get_session_by_user_id()
    |> SessionInfo.extract_from_session()
  end

  def update_session(%{ id: id }, attrs \\ %{}) do
    new_attrs =
      attrs
      |> Map.put_new(:last_checked, NaiveDateTime.utc_now())
      |> Map.put_new(:user_id, id)

    case get_last_session_by_user_query(id) |> Repo.one() do
      nil ->
        %Session{}
        |> Session.changeset(new_attrs)
        |> Repo.insert()
      session ->
        session
        |> Session.changeset(
          attrs
          |> Map.put(:last_checked, NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)))
        |> Repo.update()
    end
  end

  def update_session_dynamic_field(%{id: id}, attrs \\ %SessionInfo{}) do
    query = get_last_session_by_user_query(id)

    with session = %{session_info: info}  <- Repo.one(query) do
      new_values =
        (info || %{})
        |> Map.merge(attrs)
        |> Map.from_struct()

      session
      |> Session.changeset(%{session_info: new_values})
      |> Repo.update()
    else
      _ ->
        {:error, :not_found}
    end
  end

  def has_session_dynamic_fields?(%{id: id}) do
    with %{session_info: session_info} <- Session |> Repo.get_by(user_id: id, completed: false) do
      not is_nil(session_info)
    end
  end

  def clear_session_dynamic_field(%{id: id}) do
    Session
    |> Repo.get_by(user_id: id, completed: false)
    |> Session.changeset(%{session_info: %{}})
    |> Repo.update()
  end

  def complete_session(user) do
    with {:ok, s} <- clear_session_dynamic_field(user) do
      s
      |> Session.changeset(%{completed: true})
      |> Repo.update()
    end
  end

  def get_current_sessions() do
    query =
      from s in Session,
      join: u in User,
      on: s.user_id == u.id,
      where: s.last_checked > ago(^@session_offset, "minute"),
      where: not(s.completed),
      select: u

    Repo.all(query)
  end

  def authenticate(email, password, remember, _context) do
    with {:ok, user = %User{password: digest}}  <- get_user_by_email(email),
         true                                   <- Password.valid?(password, digest) do
      update_session(user, %{ remember: remember })
      {:ok, user}
    else
      _ ->
        {:error, :unauthorized}
    end
  end

  def create_new_password_request(attrs) do
    %ResetPasswordRequest{}
    |> ResetPasswordRequest.changeset(attrs)
    |> Repo.insert()
  end
end
