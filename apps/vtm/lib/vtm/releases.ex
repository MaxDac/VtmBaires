defmodule Vtm.Releases do
  def migrate do
    path = Application.app_dir(:vtm, "priv/repo/migrations")
    Ecto.Migrator.run(Vtm.Repo, path, :up, all: true)
  end

  def rollback(version) do
    path = Application.app_dir(:vtm, "priv/repo/migrations")
    Ecto.Migrator.run(Vtm.Repo, path, :down, to: version)
  end

  def seed do
    path = Application.app_dir(:vtm, "priv/repo") <> "/seeds.exs"
    Code.eval_file(path)
  end
end
