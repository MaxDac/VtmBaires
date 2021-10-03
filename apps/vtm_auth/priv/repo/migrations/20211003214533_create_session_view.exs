defmodule VtmAuth.Repo.Migrations.CreateSessionView do
  use Ecto.Migration

  def up do
    execute("""
    create view session_info as
        select s.id
              ,s.user_id
              ,s.remember
              ,s.host
              ,s.ip
              ,s.completed
              ,approved
              ,character_id
              ,character_name
              ,map_id
              ,map_name
              ,s.last_checked
              ,s.inserted_at
              ,s.updated_at
              ,s.session_info
          from sessions                 as s,
              jsonb_to_record(session_info) as i(
                  approved boolean,
                  character_id integer,
                  character_name text,
                  map_id integer,
                  map_name text
              )
        where completed = false
    """)
  end

  def down do
    execute("drop view session_info")
  end
end
