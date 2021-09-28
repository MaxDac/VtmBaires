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
case VtmAuth.Accounts.get_user_by_email("maxdac@hotmail.com") do
  {:ok, user = %{email: "maxdac@hotmail.com"}} ->
    {:ok, user}
  _ ->
    VtmAuth.Accounts.create_user(%{
      "email" => "maxdac@hotmail.com",
      "role" => "master",
      "name" => "Storyteller",
      "password" => "huevos!!"
    })
end
