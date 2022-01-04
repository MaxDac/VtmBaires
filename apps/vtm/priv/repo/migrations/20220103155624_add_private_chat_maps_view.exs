defmodule Vtm.Repo.Migrations.AddPrivateChatMapsView do
  use Ecto.Migration

  def up do
    execute("""
    create or replace view private_chat_maps_view as
        select distinct
               m.id
              ,m.name
              ,m.is_private
              ,cr.guest_user_id
              ,cr.is_owner
              ,count(ce.id)                     as chat_count
              ,cr.inserted_at
              ,cr.updated_at
          from chat_maps                        m
               left join chat_rules cr
                 on                             m.id = cr.chat_map_id
                 and                            cr.inserted_at > now() - interval '6 hour'
               left join chat_entries ce
                 on                             m.id = ce.chat_map_id
                 and                            ce.inserted_at > now() - interval '10 minutes'
         group by
               m.id
              ,m.is_private
              ,cr.guest_user_id
              ,cr.is_owner
              ,cr.inserted_at
              ,cr.updated_at
    """)
  end

  def down do
    execute("drop view private_chat_maps_view")
  end
end
