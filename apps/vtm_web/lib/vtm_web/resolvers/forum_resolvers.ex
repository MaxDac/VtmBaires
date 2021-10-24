defmodule VtmWeb.Resolvers.ForumResolvers do
  @moduledoc false

  import VtmWeb.Resolvers.Helpers

  alias Vtm.Forum

  def get_forum_sections(_, _, %{context: %{current_user: user}}) do
    {:ok, Forum.get_forum_sections(user)}
  end

  def get_forum_threads(%{forum_section_id: section_id}, %{context: %{current_user: user}}) do
    with {:ok, threads} <- Forum.get_forum_threads(user, section_id) do
      # Remapping to preserve the Relay ID transformation
      {:ok, threads
        |> Enum.map(fn
          t = %{forum_section_id: section_id} -> %{t | forum_section: %{id: section_id}}
        end)
      }
    end
  end

  def get_forum_thread(%{id: id}, %{context: %{current_user: user}}) do
    with {:ok, thread}  <- Forum.get_forum_thread(user, id),
         {:ok, posts}   <- Forum.get_forum_posts(user, id) do
      {:ok, %{
        # Remapping to preserve the Relay ID transformation
        thread: %{thread | forum_section: %{id: thread.forum_section_id}},
        posts:
          posts
          |> Enum.map(fn
            t = %{forum_section_id: section_id} -> %{t | forum_section: %{id: section_id}}
          end)
      }}
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

            Forum.new_thread(user, s_id, attrs)
          end
        _ ->
          Forum.new_thread(user, s_id, attrs)
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
end
