defmodule VtmWeb.Releases do
  @apps [:vtm, :vtm_auth]

  def migrate do
    for app <- @apps do
      path = Application.app_dir(app, "priv/repo/migrations")
      Ecto.Migrator.run(Vtm.Repo, path, :up, all: true)
    end
  end

  def rollback(version) do
    for app <- @apps do
      path = Application.app_dir(app, "priv/repo/migrations")
      Ecto.Migrator.run(Vtm.Repo, path, :down, to: version)
    end
  end

  def seed do
    for app <- @apps do
      path = Application.app_dir(app, "priv/repo") <> "/seeds.exs"
      Code.eval_file(path)
    end
  end
end
