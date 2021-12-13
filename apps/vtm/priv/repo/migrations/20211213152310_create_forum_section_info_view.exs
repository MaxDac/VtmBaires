defmodule Vtm.Repo.Migrations.CreateForumSectionInfoView do
  use Ecto.Migration

  def up do
    execute("""
    create view forum_section_info as
        select distinct on (fs.id)
               fs.id                        as id
              ,fs.title                     as title
              ,fs.description               as description
              ,fs.on_game                   as on_game
              ,fs.can_edit                  as can_edit
              ,fs.can_view                  as can_view
              ,fs.inserted_at               as inserted_at
              ,fs.updated_at                as updated_at
              ,ft.id                        as last_thread_id
              ,ft.title                     as last_thread_title
              ,ft.updated_at                as last_thread_updated_at
              ,cfn.user_id                  as viewer_id
              ,cfn.last_checked_date        as last_checked_date
          from forum_sections fs
                 left join forum_threads ft on fs.id = ft.forum_section_id
                 left join user_forum_notifications cfn on fs.id = cfn.forum_section_id
        order by fs.id, ft.updated_at desc
    """)
  end

  def down do
    execute("drop view forum_section_info")
  end
end
