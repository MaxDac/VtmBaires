defmodule VtmWeb.Resolvers.CharacterResolvers do
  alias Vtm.Characters
  # alias Vtm.Characters.Character
  # alias Vtm.Characters.Clan

  # alias VtmWeb.Resolvers.Helpers

  def get_clans(_, _, _) do
    {:ok, Characters.get_clans()}
  end

  def get_user_characters(user, _, _) do
    IO.puts "user: #{inspect user}"
    characters = Characters.get_user_character(user)
    IO.puts "characters: #{inspect characters}"
    {:ok, characters}
  end

  def create_character(_, attrs, %{context: %{current_user: current_user}}) do
    Characters.create(attrs |> Map.put(:user_id, current_user.id))
  end
end
