defmodule Vtm.Forum do
  @moduledoc false

  import Ecto.Query, warn: false

  alias Vtm.Repo

  alias Vtm.Forum.ForumSection
  alias Vtm.Forum.ForumThread
  alias Vtm.Forum.ForumPost

  alias Vtm.Characters.Character
  alias VtmAuth.Accounts.User

  defp user_can_read_query(section_id) do
    from s in ForumSection,
      where: s.id == ^section_id,
      where: s.can_view == true
  end

  defp user_can_write_query(section_id) do
    from s in ForumSection,
      where: s.id == ^section_id,
      where: s.can_edit == true
  end

  defp can_write_on_game?(_, %{creator_character_id: _}), do: :ok

  defp can_write_on_game?(section_id, _) do
    case ForumSection |> Repo.get(section_id) do
      %{on_game: true}  -> {:error, "You need a character in order to post in this section."}
      _                 -> :ok
    end
  end

  @spec check_section(User.t(), Integer.t()) :: :ok | {:error, :unauthorized}
  defp check_section(%{role: :master}, _), do: :ok

  defp check_section(_, section_id) do
    case section_id |> user_can_read_query() |> Repo.one() do
      nil -> {:error, :unauthorized}
      _   -> :ok
    end
  end

  @spec check_section_write(User.t(), Integer.t()) :: :ok | {:error, :unauthorized}
  defp check_section_write(%{role: :master}, _), do: :ok

  defp check_section_write(_, section_id) do
    case section_id |> user_can_write_query() |> Repo.one() do
      nil -> {:error, :unauthorized}
      _   -> :ok
    end
  end

  def get_forum_sections(%{role: :master}) do
    Repo.all(ForumSection)
  end

  def get_forum_sections(_) do
    Repo.all(from s in ForumSection, where: s.can_view == true)
  end

  defp include_character_subquery() do
    from c in Character,
      where: parent_as(:items).creator_character_id == c.id,
      select: %Character{id: c.id, name: c.name}
  end

  defp include_user_subquery() do
    from u in User,
      where: parent_as(:items).creator_user_id == u.id,
      select: %User{id: u.id, name: u.name}
  end

  # TODO
  # This function is necessary because for the off game posts it returns error otherwise
  defp include_character_when_null(character = %{id: c_id}) when not is_nil(c_id), do: character
  defp include_character_when_null(_), do: %Character{id: 0, name: nil}

  @spec get_forum_threads(User.t(), Integer.t()) :: {:ok, [ForumThread.t()]} | {:error, :unauthorized}
  def get_forum_threads(user, section_id) do
    with :ok <- check_section(user, section_id) do
      query =
        from t in ForumThread,
          as: :items,
          left_lateral_join: c in subquery(include_character_subquery()),
          left_lateral_join: u in subquery(include_user_subquery()),
          where: t.forum_section_id == ^section_id,
          select: {t, c, u}

      {:ok,
        Repo.all(query)
        |> Enum.map(fn
          {thread, character, user} ->
            thread
            |> Map.put(:creator_user, user)
            |> Map.put(:creator_character, character |> include_character_when_null())
        end)}
    end
  end

  @spec get_forum_thread(User.t(), Integer.t()) :: {:ok, ForumThread.t()} | {:error, :unauthorized}
  def get_forum_thread(conn_user, id) do
    query =
      from t in ForumThread,
        as: :items,
        left_lateral_join: c in subquery(include_character_subquery()),
        left_lateral_join: u in subquery(include_user_subquery()),
        where: t.id == ^id,
        select: {t, c, u}

    with {
      item = %{forum_section_id: section_id},
      character,
      user
    }         <- Repo.one(query),
         :ok  <- check_section(conn_user, section_id) do
      item =
        item
        |> Map.put(:creator_character, character |> include_character_when_null())
        |> Map.put(:creator_user, user)

      {:ok, item}
    else
      nil -> {:error, :not_found}
      e   -> e
    end
  end

  @spec get_section_by_thread(Integer.t()) :: ForumSection.t()
  defp get_section_by_thread(thread_id) do
    query =
      from t in ForumThread,
        where: t.id == ^thread_id,
        join: s in ForumSection,
        on: t.forum_section_id == s.id,
        select: s

    Repo.one(query)
  end

  @spec get_forum_posts(User.t(), Integer.t()) :: {:ok, [ForumPost.t()]} | {:error, :unauthorized}
  def get_forum_posts(user, thread_id) do
    with %{id: id}  <- get_section_by_thread(thread_id),
         :ok        <- check_section(user, id) do
      query =
        from p in ForumPost,
          as: :items,
          left_lateral_join: c in subquery(include_character_subquery()),
          left_lateral_join: u in subquery(include_user_subquery()),
          where: p.forum_thread_id == ^thread_id,
          order_by: [asc: p.inserted_at],
          select: {p, c.id, c.name, u.id, u.name}

      {:ok, Repo.all(query)
        |> Enum.map(fn
          {item, id, name, _, _} when not is_nil(name) ->
            item
            |> Map.put(:character, %{id: id, name: name})
          {item, _, _, id, name} ->
            item
            |> Map.put(:user, %{id: id, name: name})
        end)}
    else
      nil -> {:error, :not_found}
      e   -> e
    end
  end

  def new_thread(user, section_id, attrs) do
    with :ok  <- check_section_write(user, section_id),
         :ok  <- can_write_on_game?(section_id, attrs) do
      %ForumThread{}
      |> ForumThread.changeset(attrs)
      |> Repo.insert()
    end
  end

  def new_post(user, thread_id, attrs) do
    with %{id: section_id, on_game: on_game}  <- get_section_by_thread(thread_id),
         :ok                                  <- check_section_write(user, section_id),
         :ok                                  <- can_write_on_game?(section_id, attrs) do

      attrs =
        case on_game do
          true ->
            attrs
          false ->
            attrs
            |> Map.drop([:creator_character_id])
        end

      %ForumPost{}
      |> ForumPost.changeset(attrs |> Map.put_new(:forum_section_id, section_id))
      |> Repo.insert()
    end
  end

  def can_modify?(%{id: user_id}, type, id) do
    query =
      from t in type,
        where: t.id == ^id,
        where: t.creator_user_id == ^user_id

    case Repo.one(query) do
      nil   -> {:error, :cannot_modify}
      item  -> {:ok, item}
    end
  end

  def modify_thread(user, id, attrs) do
    with {:ok, item} <- can_modify?(user, ForumThread, id) do
      item
      |> ForumThread.changeset(attrs)
      |> Repo.insert()
    end
  end

  def modify_post(user, id, attrs) do
    with {:ok, item} <- can_modify?(user, ForumPost, id) do
      item
      |> ForumPost.changeset(attrs)
      |> Repo.insert()
    end
  end

  def delete_thread(user, id) do
    with %{section_id: section_id}  <- get_section_by_thread(id),
         :ok                        <- check_section_write(user, section_id) do
      ForumThread
      |> Repo.get(id)
      |> Repo.delete()
    else
      nil -> {:error, :not_found}
      e   -> e
    end
  end

  def delete_post(user, id) do
    with item = %{forum_section_id: section_id} <- ForumPost |> Repo.get(id),
         :ok                                    <- check_section_write(user, section_id) do
      item
      |> Repo.delete()
    else
      nil -> {:error, :not_found}
      e   -> e
    end
  end
end
