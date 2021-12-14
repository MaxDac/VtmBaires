defmodule VtmWeb.Resolvers.ForumResolvers do
  @moduledoc false

  import VtmWeb.Resolvers.Helpers

  alias Vtm.Forum
  alias Vtm.Forum.ForumSectionInfo
  alias Vtm.Forum.UserForumNotification

  @spec map_forum_section_info(list({ForumSectionInfo.t(), UserForumNotification.t()})) :: list(any())
  defp map_forum_section_info(sections) do
    sections
    |> Enum.map(fn
      {
        s = %{
          last_thread_id: lt_id,
          last_thread_title: last_thread_title,
          last_thread_updated_at: last_thread_updated_at
        },
        notification
      } when not is_nil(lt_id) ->
        case notification do
          %{
            last_checked_date: last_checked_date
          } ->
            %{
              section: s,
              last_thread: %{
                id: lt_id,
                title: last_thread_title,
                updated_at: last_thread_updated_at
              },
              has_new_posts: NaiveDateTime.compare(last_checked_date, last_thread_updated_at) == :lt
            }
          _ ->
            %{
              section: s,
              last_thread: %{
                id: lt_id,
                title: last_thread_title,
                updated_at: last_thread_updated_at
              },
              has_new_posts: true
            }
        end
      {s, _} -> %{
        has_new_posts: false,
        section: s
      }
    end)
  end

  @spec get_forum_sections(any, any, %{
          :context => %{:current_user => map, optional(any) => any},
          optional(any) => any
        }) :: {:ok, list}
  def get_forum_sections(_, _, %{context: %{current_user: user}}) do
    result =
      Forum.get_forum_sections(user)
      |> map_forum_section_info()
      |> Enum.sort(fn
        %{section: %{id: id1}}, %{section: %{id: id2}} -> id1 <= id2
      end)

    {:ok, result}
  end

  defp datetime_compare_desc(date1, date2) do
    case NaiveDateTime.compare(date1, date2) do
      :lt -> false
      _   -> true
    end
  end

  def get_forum_threads(%{
    forum_section_id: section_id,
    page_size: page_size,
    page: page
  }, %{context: %{current_user: user}}) do
    with thread_count   <- Forum.get_section_thread_count(section_id),
         {:ok, threads} <- Forum.get_forum_threads(user, section_id, page_size, page) do
      # Remapping to preserve the Relay ID transformation
      threads =
        threads
        |> Enum.map(fn
          {t = %{forum_section_id: section_id}, n} ->
            {
              t
              |> Map.put(:forum_section, %{id: section_id})
              |> Map.put(:thread_count, thread_count),
              n
            }
        end)
        |> Enum.map(fn
          {t = %{last_post_updated_at: last_post_updated_at}, %{last_checked_date: last_checked_date}} ->
            %{
              thread: t,
              last_post_updated_at: last_post_updated_at,
              has_new_posts: NaiveDateTime.compare(last_checked_date, last_post_updated_at) == :lt
            }
          {t, _} ->
            %{
              thread: t,
              has_new_posts: true
            }
        end)
        |> Enum.sort(fn
          %{last_post_updated_at: up1}, %{last_post_updated_at: up2}    ->
            datetime_compare_desc(up1, up2)
          %{thread: %{updated_at: up1}}, %{thread: %{updated_at: up2}}  ->
            datetime_compare_desc(up1, up2)
        end)

      {:ok, %{
        thread_count: thread_count,
        threads: threads
      }}
    end
  end

  @spec get_forum_thread(%{:id => integer, optional(any) => any}, %{
          :context => %{:current_user => any, optional(any) => any},
          optional(any) => any
        }) ::
          {:error, :illegal_access | :not_found}
          | {:ok,
             %{
               :forum_section => %{id: any},
               :forum_section_id => any,
               :on_game => boolean,
               :post_count => integer,
               optional(any) => any
             }}
  def get_forum_thread(%{id: id}, %{context: %{current_user: user}}) do
    with {:ok, on_game} <- Forum.get_thread_section_on_game(id),
         {:ok, thread}  <- Forum.get_forum_thread(user, id),
         post_count     <- Forum.get_forum_thread_post_count(id) do
      {:ok,
        thread
        |> Map.put(:forum_section, %{id: thread.forum_section_id})
        |> Map.put(:on_game, on_game)
        |> Map.put(:post_count, post_count)
      }
    end
  end

  def get_forum_thread_posts(%{id: id, page_size: page_size, page: page}, %{context: %{current_user: user}}) do
    with {:ok, on_game} <- Forum.get_thread_section_on_game(id),
         {:ok, posts}   <- Forum.get_forum_posts(user, id, page_size, page) do
      {:ok,
        posts
        |> Enum.map(fn
          t = %{forum_section_id: section_id} ->
            t
            |> Map.put(:forum_section, %{id: section_id})
            |> Map.put(:on_game, on_game)
        end)
      }
    end
  end

  def get_forum_thread_post(%{id: id}, %{context: %{current_user: user}}) do
    with {:ok, character = %{
      creator_user: c_user,
      creator_character: c_character
    }} <- Forum.get_forum_post(user, id) do
      character =
        character
        |> Map.drop([:creator_user, :creator_character])
        |> Map.put(:user, c_user)
        |> Map.put(:character, c_character)
      {:ok, character}
    end
  end

  def set_forum_thread_read(_, %{thread_id: id}, %{context: %{current_user: %{id: user_id}}}) do
    with {:ok, t_id}  <- from_global_id?(id),
         {:ok, _}     <- Forum.set_forum_thread_read(t_id, user_id) do
      {:ok, %{result: true}}
    end
  end

  def new_forum_thread(_, %{request: %{section_id: section_id} = attrs}, %{context: %{current_user: user}}) do
    with {:ok, s_id}  <- from_global_id?(section_id),
         {:ok, cu_id} <- from_global_id?(attrs.creator_user_id) do
      attrs =
        attrs
        |> Map.put(:forum_section_id, s_id)
        |> Map.put(:creator_user_id, cu_id)

      case attrs do
        %{creator_character_id: c_id} ->
          with {:ok, cc_id} <- from_global_id?(c_id) do
            attrs =
              attrs
              |> Map.put(:creator_character_id, cc_id)

            with {:ok, thread}  <- Forum.new_thread(user, s_id, attrs) do
              {:ok, %{result: thread}}
            end
          end
        _ ->
          with {:ok, thread}  <- Forum.new_thread(user, s_id, attrs) do
            {:ok, %{result: thread}}
          end
      end
    end
  end

  def new_forum_post(_, %{request: attrs}, %{context: %{current_user: user}}) do
    with {:ok, cu_id} <- from_global_id?(attrs.creator_user_id),
         {:ok, t_id}  <- from_global_id?(attrs.forum_thread_id) do
      attrs =
        attrs
        |> Map.put(:creator_user_id, cu_id)
        |> Map.put(:forum_thread_id, t_id)

      case attrs do
        %{creator_character_id: c_id} ->
          with {:ok, cc_id} <- from_global_id?(c_id) do
            attrs =
              attrs
              |> Map.put(:creator_character_id, cc_id)

            Forum.new_post(user, t_id, attrs)
          end
        _ ->
          Forum.new_post(user, t_id, attrs)
      end
    end
  end

  def modify_forum_thread(attrs = %{thread_id: thread_id}, %{context: %{current_user: user}}) do
    with {:ok, thread}  <- Forum.modify_thread(user, thread_id |> String.to_integer(), attrs) do
      {:ok, %{result: thread}}
    end
  end

  def modify_forum_post(attrs = %{post_id: post_id}, %{context: %{current_user: user}}) do
    with {:ok, post}  <- Forum.modify_post(user, post_id |> String.to_integer(), attrs) do
      {:ok, %{result: post}}
    end
  end

  def delete_forum_thread(%{thread_id: thread_id}, %{context: %{current_user: user}}) do
    with {:ok, thread}  <- Forum.delete_thread(user, thread_id |> String.to_integer()) do
      {:ok, %{result: thread}}
    end
  end

  def delete_forum_post(%{post_id: post_id}, %{context: %{current_user: user}}) do
    with {:ok, post}  <- Forum.delete_post(user, post_id |> String.to_integer()) do
      {:ok, %{result: post}}
    end
  end
end
