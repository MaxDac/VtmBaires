defmodule VtmWeb.Schema.ForumTypes do
  @moduledoc false

  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias VtmWeb.Schema.Middlewares
  alias VtmWeb.Resolvers.ForumResolvers

  enum :forum_section_order_type do
    description "The forum section default ordering"

    value :asc, description: "Ascending order"
    value :desc, description: "Descending order"
  end

  node object :forum_section do
    field :title, :string
    field :description, :string
    field :on_game, :boolean
    field :can_view, :boolean
    field :can_edit, :boolean
    field :order_type, :forum_section_order_type
    field :inserted_at, :date_time
    field :updated_at, :date_time
  end

  object :forum_section_info do
    field :section, :forum_section
    field :last_thread, :forum_thread
    field :has_new_posts, :boolean
  end

  node object :forum_thread do
    field :title, :string
    field :description, :string
    field :highlighted, :boolean
    field :forum_section, :forum_section
    field :on_game, :boolean
    field :creator_user, :user
    field :creator_character, :character
    field :post_count, :integer
    field :allowed_characters, list_of(:character)
    field :inserted_at, :date_time
    field :updated_at, :date_time
  end

  object :forum_thread_info do
    field :thread, :forum_thread
    field :last_post_updated_at, :date_time
    field :has_new_posts, :boolean
  end

  node object :forum_post do
    field :text, :string
    field :forum_section, :forum_section
    field :on_game, :boolean
    field :forum_thread, :forum_thread
    field :character, :character
    field :user, :user
    field :inserted_at, :date_time
    field :updated_at, :date_time
  end

  object :get_threads_response do
    field :thread_count, :integer
    field :threads, list_of(:forum_thread_info)
  end

  object :forum_queries do
    field :get_forum_sections, list_of(:forum_section_info) do
      middleware Middlewares.Authorize, :any
      resolve &ForumResolvers.get_forum_sections/3
      middleware Middlewares.ChangesetErrors
    end

    field :get_forum_threads, :get_threads_response do
      arg :forum_section_id, non_null(:id)
      arg :character_id, :id
      arg :page_size, non_null(:integer)
      arg :page, non_null(:integer)

      middleware Middlewares.Authorize, :any
      resolve parsing_node_ids(&ForumResolvers.get_forum_threads/2, forum_section_id: :forum_section)
      middleware Middlewares.ChangesetErrors
    end

    field :get_forum_thread, :forum_thread do
      arg :id, non_null(:id)

      middleware Middlewares.Authorize, :any
      resolve parsing_node_ids(&ForumResolvers.get_forum_thread/2, id: :forum_thread)
      middleware Middlewares.ChangesetErrors
    end

    field :get_forum_thread_posts, list_of(:forum_post) do
      arg :id, non_null(:id)
      arg :page_size, non_null(:integer)
      arg :page, non_null(:integer)

      middleware Middlewares.Authorize, :any
      resolve parsing_node_ids(&ForumResolvers.get_forum_thread_posts/2, id: :forum_thread)
      middleware Middlewares.ChangesetErrors
    end

    field :get_forum_post, :forum_post do
      arg :id, non_null(:id)

      middleware Middlewares.Authorize, :any
      resolve parsing_node_ids(&ForumResolvers.get_forum_thread_post/2, id: :forum_post)
      middleware Middlewares.ChangesetErrors
    end
  end

  input_object :create_new_thread_request do
    field :section_id, non_null(:id)
    field :creator_user_id, non_null(:id)
    field :creator_character_id, :id
    field :title, non_null(:string)
    field :description, :string
    field :highlighted, :boolean
    field :allowed_characters, list_of(:id)
  end

  input_object :create_new_post_request do
    field :forum_thread_id, non_null(:id)
    field :creator_user_id, non_null(:id)
    field :creator_character_id, :id
    field :text, :string
  end

  object :forum_mutations do
    payload field :set_forum_thread_read do
      input do
        field :thread_id, non_null(:id)
      end

      output do
        field :result, :boolean
      end

      middleware Middlewares.Authorize, :any
      middleware VtmWeb.Schema.Middlewares.RefreshUserSession
      resolve &ForumResolvers.set_forum_thread_read/3
      middleware Middlewares.ChangesetErrors
    end

    payload field :new_forum_thread do
      input do
        field :request, non_null(:create_new_thread_request)
      end

      output do
        field :result, :forum_thread
      end

      middleware Middlewares.Authorize, :any
      middleware VtmWeb.Schema.Middlewares.RefreshUserSession
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
      middleware VtmWeb.Schema.Middlewares.RefreshUserSession
      resolve &ForumResolvers.new_forum_post/3
      middleware Middlewares.ChangesetErrors
    end

    payload field :modify_forum_thread do
      input do
        field :thread_id, non_null(:id)
        field :title, non_null(:string)
        field :description, non_null(:string)
        field :highlighted, :boolean
        field :allowed_characters, list_of(:id)
      end

      output do
        field :result, :forum_thread
      end

      middleware Middlewares.Authorize, :any
      resolve parsing_node_ids(&ForumResolvers.modify_forum_thread/2, thread_id: :forum_thread)
      middleware Middlewares.ChangesetErrors
    end

    payload field :modify_forum_post do
      input do
        field :post_id, non_null(:id)
        field :text, non_null(:string)
      end

      output do
        field :result, :forum_post
      end

      middleware Middlewares.Authorize, :any
      resolve parsing_node_ids(&ForumResolvers.modify_forum_post/2, post_id: :forum_post)
      middleware Middlewares.ChangesetErrors
    end

    payload field :delete_forum_thread do
      input do
        field :thread_id, non_null(:id)
      end

      output do
        field :result, :forum_thread
      end

      middleware Middlewares.Authorize, :any
      resolve parsing_node_ids(&ForumResolvers.delete_forum_thread/2, thread_id: :forum_thread)
      middleware Middlewares.ChangesetErrors
    end

    payload field :delete_forum_post do
      input do
        field :post_id, non_null(:id)
      end

      output do
        field :result, :forum_post
      end

      middleware Middlewares.Authorize, :any
      resolve parsing_node_ids(&ForumResolvers.delete_forum_post/2, post_id: :forum_post)
      middleware Middlewares.ChangesetErrors
    end
  end
end
