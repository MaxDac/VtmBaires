defmodule VtmWeb.Resolvers.NpcResolvers do
  import VtmWeb.Resolvers.Helpers

  alias Vtm.Characters

  def all(_, _, _) do
    {:ok, Characters.get_all_npcs()}
  end

  def create_npc(_, %{request: request}, %{context: %{current_user: current_user}}) do
    new_request =
      request
      |> Map.put(:user_id, 1)
      |> Map.put(:clan_id, from_global_id!(request.clan_id))

    with {:ok, %{id: id}} <- Characters.create_npc(new_request, current_user),
         {:ok, _}         <- Characters.add_npc_empty_attributes(id),
         ch               <- Characters.get_specific_character(current_user, id) do
      {:ok, %{character: ch}}
    end
  end

  def define_npc_stats(%{character_id: c_id, request: request}, _) do
    new_request =
      request
      |> Map.put(:predator_type_id, from_global_id!(request.predator_type_id))

    with {:ok, ch}  <- Characters.update_character(c_id |> String.to_integer(), new_request) do
      {:ok, %{response: ch}}
    end
  end

  def assign_npc_attributes(%{character_id: c_id, request: %{attributes: attributes}}, _) do
    parsed_attributes =
      attributes
      |> Enum.map(fn
        %{id: id, value: value} -> %{id: from_global_id!(id), value: value}
      end)

    Characters.assign_npc_attributes(c_id |> String.to_integer(), parsed_attributes)
  end

  @spec id_to_integer(String.t()) :: Integer.t()
  defp id_to_integer(id) do
    id |> String.to_integer()
  end

  @spec confirm_png(Map.t(), any()) :: {:ok, Character.t()}
  def confirm_png(%{character_id: id}, _) do
    c_id = id_to_integer(id)
    Characters.confirm_png(c_id)
  end
end
