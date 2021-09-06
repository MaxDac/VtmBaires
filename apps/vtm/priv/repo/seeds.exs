# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     VtmAuth.Repo.insert!(%VtmAuth.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
Vtm.Repo.insert!(%Vtm.Character.Clan{name: "Humans"})
Vtm.Repo.insert!(%Vtm.Character.Clan{name: "Brujah"})
Vtm.Repo.insert!(%Vtm.Character.Clan{name: "Lasombra"})
