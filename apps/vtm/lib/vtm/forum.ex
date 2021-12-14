defmodule Vtm.Forum do
  @moduledoc false

  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Pagination
  alias Vtm.Helpers

  alias Vtm.Forum.ForumSection
  alias Vtm.Forum.ForumThread
  alias Vtm.Forum.ForumPost
  alias Vtm.Forum.ForumSectionInfo
  alias Vtm.Forum.ForumThreadInfo
  alias Vtm.Forum.UserForumNotification

  alias Vtm.Characters.Character
  alias VtmAuth.Accounts.User

  defp zip_with_nulls_ordered(sorted1, sorted2, acc \\ [])
  defp zip_with_nulls_ordered([], [], acc), do: acc |> Enum.reverse()
  defp zip_with_nulls_ordered([i1 | sorted1], [], acc), do: zip_with_nulls_ordered(sorted1, [], [{i1, nil} | acc])
  defp zip_with_nulls_ordered([], [i2 | sorted2], acc), do: zip_with_nulls_ordered([], sorted2, [{nil, i2} | acc])
  defp zip_with_nulls_ordered([i1 | sorted1], [i2 | sorted2], acc), do: zip_with_nulls_ordered(sorted1, sorted2, [{i1, i2} | acc])

  defp zip_with_nulls(enumeration1, enumeration2, id_getter1, id_getter2) do
    sorted1 =
      enumeration1
      |> Enum.sort_by(id_getter1)

    sorted2 =
      enumeration2
      |> Enum.sort_by(id_getter2)

    zip_with_nulls_ordered(sorted1, sorted2)
  end

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

  @spec check_section(User.t(), Integer.t()) :: :ok | {:error, :illegal_access}
  defp check_section(%{role: :master}, _), do: :ok

  defp check_section(_, section_id) do
    case section_id |> user_can_read_query() |> Repo.one() do
      nil -> {:error, :illegal_access}
      _   -> :ok
    end
  end

  @spec check_section_write(User.t(), Integer.t()) :: :ok | {:error, :illegal_access}
  defp check_section_write(%{role: :master}, _), do: :ok

  defp check_section_write(_, section_id) do
    case section_id |> user_can_write_query() |> Repo.one() do
      nil -> {:error, :illegal_access}
      _   -> :ok
    end
  end

  @spec get_all_forum_section_ids(map()) :: list(ForumSectionInfo.t())
  defp get_all_forum_section_ids(%{role: :master}) do
    ForumSectionInfo
    |> from()
    |> Repo.all()
  end

  defp get_all_forum_section_ids(_) do
    ForumSectionInfo
    |> from()
    |> where([s], s.can_view == true)
    |> Repo.all()
  end

  defp zip_sections_with_user_notifications(sections, notifications) do
    zip_with_nulls(sections, notifications, fn %{id: id} -> id end, fn %{forum_section_id: id} -> id end)
  end

  @spec add_user_notification_information(list(ForumSectionInfo.t()), integer()) :: list({ForumSectionInfo.t(), UserForumNotification | nil})
  defp add_user_notification_information(sections, user_id) do
    section_ids =
      sections
      |> Enum.map(fn %{id: id} -> id end)

    notifications =
      UserForumNotification
      |> from()
      |> where([u], u.forum_section_id in ^section_ids)
      |> where([u], u.user_id == ^user_id)
      |> group_by([u], [u.forum_section_id, u.user_id])
      |> select([u], %UserForumNotification{
        forum_section_id: u.forum_section_id,
        user_id: u.user_id,
        last_checked_date: fragment("MAX(?)", u.last_checked_date)})
      |> Repo.all()

      zip_sections_with_user_notifications(sections, notifications)
  end

  @doc """
  Collects all the sections, returning metadata about the reading state for a particular user.
  """
  @spec get_forum_sections(%{:id => integer, optional(any) => any}) :: list({ForumSectionInfo.t(), UserForumNotification | nil})
  def get_forum_sections(attrs = %{id: user_id, role: :master}) do
    get_all_forum_section_ids(attrs)
    |> add_user_notification_information(user_id)
  end

  def get_forum_sections(attrs = %{id: user_id}) do
    get_all_forum_section_ids(attrs)
    |> add_user_notification_information(user_id)
  end

  @spec get_section_thread_count(integer) :: integer
  def get_section_thread_count(section_id) do
    ForumThread
    |> from()
    |> where([t], t.forum_section_id == ^section_id)
    |> select([t], count(t.id))
    |> Repo.one()
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

  defp zip_threads_with_user_notifications(threads, notifications) do
    zip_with_nulls(threads, notifications, fn %{id: id} -> id end, fn %{forum_thread_id: id} -> id end)
  end

  @spec get_forum_threads(User.t(), integer, integer, integer) :: {:ok, list({ForumThread.t(), UserForumNotification.t()})} | {:error, :illegal_access}
  def get_forum_threads(user = %{id: user_id}, section_id, page_size, page) do
    with :ok <- check_section(user, section_id) do
      query =
        ForumThreadInfo
        |> from()
        |> where([t], t.forum_section_id == ^section_id)
        |> order_by([t], [desc: t.last_post_updated_at])
        |> Pagination.as_paged_query(page_size, page)

      query =
        from t in query,
          as: :items,
          left_lateral_join: c in subquery(include_character_subquery()),
          left_lateral_join: u in subquery(include_user_subquery()),
          select: {t, c, u}

      items =
        Repo.all(query)
        |> Enum.map(fn
          {thread, character, user} ->
            thread
            |> Map.put(:creator_user, user)
            |> Map.put(:creator_character, character |> include_character_when_null())
        end)

      item_ids =
        items
        |> Enum.map(fn %{id: id} -> id end)

      notifications =
        UserForumNotification
        |> from()
        |> where([u], u.forum_thread_id in ^item_ids)
        |> where([u], u.user_id == ^user_id)
        |> Repo.all()

      merged = zip_threads_with_user_notifications(items, notifications)

      {:ok, merged}
    end
  end

  @doc """
  Return true if the section of the given thread is on game or not.
  The query is by thread because it's a middle ground between all the forum
  entities, and the section already has this characteristic.
  """
  @spec get_thread_section_on_game(integer) :: {:ok, boolean} | {:error, :not_found}
  def get_thread_section_on_game(thread_id) do
    query =
      from t in ForumThread,
        where: t.id == ^thread_id,
        join: s in ForumSection,
        on: t.forum_section_id == s.id,
        select: s

    case query |> Repo.one() do
      %{on_game: on_game} -> {:ok, on_game}
      _                   -> {:error, :not_found}
    end
  end

  @spec get_forum_thread(User.t(), Integer.t()) :: {:ok, ForumThread.t()} | {:error, :illegal_access}
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

  @spec get_forum_thread_post_count(integer) :: integer
  def get_forum_thread_post_count(thread_id) do
    ForumPost
    |> from()
    |> where([p], p.forum_thread_id == ^thread_id)
    |> select([p], count(p.id))
    |> Repo.one()
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

  @spec get_forum_posts(User.t(), integer, integer, integer) :: {:ok, [ForumPost.t()]} | {:error, :illegal_access}
  def get_forum_posts(user, thread_id, page_size, page) do
    with %{id: id}  <- get_section_by_thread(thread_id),
         :ok        <- check_section(user, id) do

      query =
        ForumPost
        |> from()
        |> where([p], p.forum_thread_id == ^thread_id)
        |> order_by([p], [desc: p.inserted_at])
        |> Pagination.as_paged_query(page_size, page)

      query =
        from p in query,
          as: :items,
          left_lateral_join: c in subquery(include_character_subquery()),
          left_lateral_join: u in subquery(include_user_subquery()),
          select: {p, c.id, c.name, u.id, u.name}

      {:ok, Repo.all(query)
        |> Enum.map(fn
          {item, id, name, u_id, u_name} when not is_nil(name) ->
            item
            |> Map.put(:character, %{id: id, name: name})
            |> Map.put(:user, %{id: u_id, name: u_name})
          {item, _, _, id, name} ->
            item
            |> Map.put(:user, %{id: id, name: name})
        end)}
    else
      nil -> {:error, :not_found}
      e   -> e
    end
  end

  def get_forum_post(user, post_id) do
    case ForumPost |> Repo.get(post_id) do
      post = %{forum_section_id: section_id} ->
        with :ok  <- check_section(user, section_id) do
          {:ok,
            post
            |> Repo.preload(:creator_user)
            |> Repo.preload(:creator_character)
          }
        end
      _ ->
        {:error, :not_found}
    end
  end

  @spec set_forum_thread_read(integer(), integer()) :: {:ok, UserForumNotification.t()} | {:error, any()}
  def set_forum_thread_read(thread_id, user_id) do
    case UserForumNotification
      |> from()
      |> where([un], un.user_id == ^user_id)
      |> where([un], un.forum_thread_id == ^thread_id)
      |> Repo.one() do
      nil ->
        %{forum_section_id: section_id} = ForumThread |> Repo.get(thread_id)

        %UserForumNotification{}
        |> UserForumNotification.changeset(%{
          user_id: user_id,
          forum_section_id: section_id,
          forum_thread_id: thread_id,
          last_checked_date: NaiveDateTime.utc_now()
        })
        |> Repo.insert()

      item ->
        item
        |> UserForumNotification.changeset(%{
          last_checked_date: NaiveDateTime.utc_now()
        })
        |> Repo.update()
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

      # Updating only the updated_at date of the related thread
      ForumThread
      |> Repo.get(thread_id)
      |> ForumThread.changeset(%{})
      |> Repo.update(force: true)

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

    case {Repo.one(query), VtmAuth.Accounts.is_user_master?(user_id)} do
      {_, true} -> {:ok, type |> Repo.get(id)}
      {nil, _}  -> {:error, :cannot_modify}
      {item, _} -> {:ok, item}
    end
  end

  def modify_thread(user, id, attrs) do
    with {:ok, item} <- can_modify?(user, ForumThread, id) do
      # Updating only the updated_at date of the related thread
      ForumThread
      |> Repo.get(item.id)
      |> ForumThread.changeset(%{})
      |> Repo.update(force: true)

      item
      |> ForumThread.update_changeset(attrs)
      |> Repo.update()
    end
  end

  def modify_post(user, id, attrs) do
    with {:ok, item} <- can_modify?(user, ForumPost, id) do
      item
      |> ForumPost.update_changeset(attrs)
      |> Repo.update()
    end
  end

  defp delete_all_thread_posts(thread_id) do
    ForumPost
    |> from()
    |> where([p], p.forum_thread_id == ^thread_id)
    |> Repo.all()
    |> Enum.map(fn t -> t |> Repo.delete() end)
    |> Helpers.reduce_errors({:ok, %{id: thread_id}})
  end

  def delete_thread(user, id) do
    with {:ok, _}           <- can_modify?(user, ForumThread, id),
         %{id: section_id}  <- get_section_by_thread(id),
         :ok                <- check_section_write(user, section_id),
         {:ok, _}           <- delete_all_thread_posts(id) do
      ForumThread
      |> Repo.get(id)
      |> Repo.delete()
    else
      nil -> {:error, :not_found}
      e   -> e
    end
  end

  def delete_post(user, id) do
    with {:ok, item = %{forum_section_id: section_id}}  <- can_modify?(user, ForumPost, id),
         :ok                                            <- check_section_write(user, section_id) do
      item
      |> Repo.delete()
    else
      nil -> {:error, :not_found}
      e   -> e
    end
  end
end
