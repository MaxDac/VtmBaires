defmodule VtmWeb.Resolvers.NpcResolvers do
  import VtmWeb.Resolvers.Helpers

  alias Vtm.Characters

  def all(_, _, _) do
    {:ok, Characters.get_all_npcs()}
  end

  def create_npc(_, %{request: request }, %{context: %{current_user: current_user}}) do
    new_request =
      request
      |> Map.put(:user_id, 1)
      |> Map.put(:clan_id, from_global_id?(request.clan_id))

    Characters.create_npc(new_request, current_user)
  end

  def define_npc_stats(%{character_id: c_id, request: request}, %{context: %{current_user: current_user}}) do
    new_request =
      request
      |> Map.put(:predator_type_id, from_global_id?(request.predator_type_id))

    with {:ok, ch}  <- Characters.update_character(c_id |> String.to_integer(), new_request) do
      {:ok, %{response: ch}}
    end
  end

  def assign_npc_attributes(%{character_id: c_id, request: %{attributes: attributes}}, %{context: %{current_user: current_user}}) do
    parsed_attributes =
      attributes
      |> Enum.map(fn
        %{id: id, value: value} -> %{id: from_global_id?(id), value: value}
      end)

    Characters.assign_npc_attributes(c_id |> String.to_integer(), parsed_attributes)
  end

  def confirm_png(%{character_id: id}, _) do
    Characters.confirm_png(id |> String.to_integer())
  end
end
