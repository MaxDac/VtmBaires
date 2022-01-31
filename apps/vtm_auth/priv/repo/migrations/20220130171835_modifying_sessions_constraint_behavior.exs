defmodule VtmAuth.Repo.Migrations.ModifyingAllConstraintBehavior do
  use Ecto.Migration

  def change do
    execute("""
    alter table sessions
        drop constraint sessions_user_id_fkey,
        add constraint sessions_user_id_fkey
            foreign key (user_id)
            references users(id)
            on delete cascade;
    """)
  end
end
