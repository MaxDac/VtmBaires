defmodule Vtm.Repo.Migrations.ModifyingAllConstraintBehavior do
  use Ecto.Migration

  def change do
    execute("""
    alter table characters
        drop constraint characters_user_id_fkey,
        add constraint characters_user_id_fkey
            foreign key (user_id)
            references users(id)
            on delete cascade;
    """)

    execute("""
    alter table characters_info
        drop constraint characters_info_character_id_fkey,
        add constraint characters_info_character_id_fkey
            foreign key (character_id)
            references characters(id)
            on delete cascade;
            """)

    execute("""
    alter table chat_rules
        drop constraint chat_rules_chat_map_id_fkey,
        add constraint chat_rules_chat_map_id_fkey
            foreign key (chat_map_id)
            references chat_maps(id)
            on delete cascade;
    """)

    execute("""
    alter table chat_rules
        drop constraint chat_rules_guest_user_id_fkey,
        add constraint chat_rules_guest_user_id_fkey
            foreign key (guest_user_id)
            references users(id)
            on delete cascade;
    """)

    execute("""
    alter table experience_logs
        drop constraint experience_logs_attribute_id_fkey,
        add constraint experience_logs_attribute_id_fkey
            foreign key (attribute_id)
            references attributes(id)
            on delete cascade;
    """)

    execute("""
    alter table experience_logs
        drop constraint experience_logs_character_id_fkey,
        add constraint experience_logs_character_id_fkey
            foreign key (character_id)
            references characters(id)
            on delete cascade;
    """)

    execute("""
    alter table forum_posts
        drop constraint forum_posts_creator_character_id_fkey,
        add constraint forum_posts_creator_character_id_fkey
            foreign key (creator_character_id)
            references characters(id)
            on delete set null;
    """)

    execute("""
    alter table forum_posts
        drop constraint forum_posts_creator_user_id_fkey,
        add constraint forum_posts_creator_user_id_fkey
            foreign key (creator_user_id)
            references users(id)
            on delete set null;
    """)

    execute("""
    alter table forum_threads
        drop constraint forum_threads_creator_character_id_fkey,
        add constraint forum_threads_creator_character_id_fkey
            foreign key (creator_character_id)
            references characters(id)
            on delete set null;
    """)

    execute("""
    alter table forum_threads
        drop constraint forum_threads_creator_user_id_fkey,
        add constraint forum_threads_creator_user_id_fkey
            foreign key (creator_user_id)
            references users(id)
            on delete set null;
    """)

    execute("""
    alter table haven_events
        drop constraint haven_events_character_id_fkey,
        add constraint haven_events_character_id_fkey
            foreign key (character_id)
            references characters(id)
            on delete cascade;
    """)

    execute("""
    alter table haven_events
        drop constraint haven_events_haven_id_fkey,
        add constraint haven_events_haven_id_fkey
            foreign key (haven_id)
            references haven_locations(id)
            on delete cascade;
    """)

    execute("""
    alter table haven_locations
        drop constraint haven_locations_character_id_fkey,
        add constraint haven_locations_character_id_fkey
            foreign key (character_id)
            references characters(id)
            on delete set null;
    """)

    execute("""
    alter table predator_types
        drop constraint predator_types_attribute_id_fkey,
        add constraint predator_types_attribute_id_fkey
            foreign key (attribute_id)
            references attributes(id)
            on delete set null;
    """)

    execute("""
    alter table predator_types
        drop constraint predator_types_skill_id_fkey,
        add constraint predator_types_skill_id_fkey
            foreign key (skill_id)
            references attributes(id)
            on delete set null;
    """)

    execute("""
    alter table user_forum_notifications
        drop constraint user_forum_notifications_forum_section_id_fkey,
        add constraint user_forum_notifications_forum_section_id_fkey
            foreign key (forum_section_id)
            references forum_sections(id)
            on delete cascade;
    """)

    execute("""
    alter table user_forum_notifications
        drop constraint user_forum_notifications_forum_thread_id_fkey,
        add constraint user_forum_notifications_forum_thread_id_fkey
            foreign key (forum_thread_id)
            references forum_threads(id)
            on delete cascade;
    """)

    execute("""
    alter table user_forum_notifications
        drop constraint user_forum_notifications_user_id_fkey,
        add constraint user_forum_notifications_user_id_fkey
            foreign key (user_id)
            references users(id)
            on delete cascade;
    """)
  end
end
