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

  @spec get_user_by_email(String.t()) :: {:error, :not_found} | {:ok, %User{}}
  def get_user_by_email(email) do
    User
    |> Repo.get_by(email: email)
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

  def get_session_by_user_id(user_id) do
    query = from s in Session, where: s.user_id == ^user_id
    Repo.one(query)
  end

  def get_character_session_by_user_id(user_id) do
    with %{session_info: %{
      "character_id" => id,
      "character_name" => name
    }} <- get_session_by_user_id(user_id) do
      %{
        id: id,
        name: name
      }
    end
  end

  @spec update_session(%{:id => any, optional(any) => any}, :invalid | map) :: {:ok, %{}} | {:error, %{}}
  def update_session(%{ id: id }, attrs \\ %{}) do
    case Session |> Repo.get_by(user_id: id) do
      nil ->
        %Session{}
        |> Session.changeset(attrs)
        |> Repo.insert()
      session ->
        session
        |> Session.changeset(
          attrs
          |> Map.put(:last_checked, NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second)))
        |> Repo.update()
    end
  end

  defp remap_attrs(v = {key, _}) when is_binary(key), do: v
  defp remap_attrs({key, v}), do: {Atom.to_string(key), v}

  def update_session_dynamic_field(%{id: id}, attrs \\ %{}) do
    query = from s in Session, where: s.user_id == ^id

    with session = %{session_info: info} when not is_nil(session) <- Repo.one(query),
         converted_attrs <- attrs |> Map.new(&remap_attrs/1),
         new_values = info |> Map.merge(converted_attrs) do
      session
      |> Session.changeset(%{session_info: new_values})
      |> Repo.update()
    else
      _ ->
        {:error, :not_found}
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
end
