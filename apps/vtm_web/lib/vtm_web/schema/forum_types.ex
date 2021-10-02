defmodule VtmWeb.Schema.ForumTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias VtmWeb.Schema.Middlewares
  alias VtmWeb.Resolvers.ForumResolvers

  node object :forum_section do
    field :title, :string
    field :description, :string
    field :on_game, :boolean
    field :can_view, :boolean
    field :can_edit, :boolean
    field :inserted_at, :date_time
    field :updated_at, :date_time
  end

  node object :forum_thread do
    field :title, :string
    field :description, :string
    field :creator_name, :string
    # Passing only the ID, this way to pass it as a Relay ID
    field :forum_section, :forum_section
    # TODO?
    # field :creator_user_id, :id
    # field :creator_character_id, :id
    field :inserted_at, :date_time
    field :updated_at, :date_time
  end

  node object :forum_post do
    field :text, :string
    field :creator_name, :string
    field :creator_avatar, :string
    # Passing only the ID, this way to pass it as a Relay ID
    field :forum_section, :forum_section
    field :forum_thread, :forum_thread
    # TODO?
    # field :creator_user_id, :id
    # field :creator_character_id, :id
    field :inserted_at, :date_time
    field :updated_at, :date_time
  end

  object :forum_thread_page do
    field :thread, :forum_thread
    field :posts, list_of(:forum_post)
  end

  object :forum_queries do
    field :get_forum_sections, list_of(:forum_section) do
      middleware Middlewares.Authorize, :any
      resolve &ForumResolvers.get_forum_sections/3
      middleware Middlewares.ChangesetErrors
    end

    field :get_forum_threads, list_of(:forum_thread) do
      arg :forum_section_id, :id

      middleware Middlewares.Authorize, :any
      resolve parsing_node_ids(&ForumResolvers.get_forum_threads/2, forum_section_id: :forum_section)
      middleware Middlewares.ChangesetErrors
    end

    field :get_forum_thread, :forum_thread_page do
      arg :id, :id

      middleware Middlewares.Authorize, :any
      resolve parsing_node_ids(&ForumResolvers.get_forum_thread/2, id: :forum_thread)
      middleware Middlewares.ChangesetErrors
    end
  end

  input_object :create_new_thread_request do
    field :section_id, non_null(:id)
    field :creator_user_id, non_null(:id)
    field :creator_character_id, :id
    field :title, non_null(:string)
    field :description, :string
  end

  input_object :create_new_post_request do
    field :forum_thread_id, non_null(:id)
    field :creator_user_id, non_null(:id)
    field :creator_character_id, :id
    field :text, :string
  end

  object :forum_mutations do
    payload field :new_forum_thread do
      input do
        field :request, non_null(:create_new_thread_request)
      end

      output do
        field :result, :forum_thread
      end

      middleware Middlewares.Authorize, :any
      resolve &ForumResolvers.new_forum_thread/3
      middleware Middlewares.ChangesetErrors
    end

    payload field :new_forum_post do
      input do
        field :request, non_null(:create_new_post_request)
      end

      output do
        field :result, :forum_post
      end

      middleware Middlewares.Authorize, :any
      resolve &ForumResolvers.new_forum_post/3
      middleware Middlewares.ChangesetErrors
    end
  end
end
