defmodule Vtm.Repo.Migrations.ModifyForumThreadInfoView do
  use Ecto.Migration

  def up do
    execute("drop view forum_thread_info")

    execute("""
    create or replace view forum_thread_info as
        select distinct on (ft.id)
               ft.id                        as id
              ,ft.title                     as title
              ,ft.description               as description
              ,fs.on_game                   as on_game
              ,fs.can_edit                  as can_edit
              ,fs.can_view                  as can_view
              ,ft.creator_user_id           as creator_user_id
              ,ft.creator_character_id      as creator_character_id
              ,ft.inserted_at               as inserted_at
              ,ft.updated_at                as updated_at
              ,fs.id                        as forum_section_id
              ,fs.title                     as forum_section_title
              ,fp.id                        as last_post_id
              ,fp.updated_at                as last_post_updated_at
          from forum_threads ft
                 join forum_sections fs on ft.forum_section_id = fs.id
                 left join forum_posts fp on ft.id = fp.forum_thread_id
         order by ft.id, fp.updated_at desc
    """)
  end

  def down do
    execute("drop view forum_thread_info")
  end
end
