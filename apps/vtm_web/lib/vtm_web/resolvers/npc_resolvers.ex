defmodule VtmWeb.Resolvers.NpcResolvers do
  @moduledoc false

  import VtmWeb.Resolvers.Helpers

  alias Vtm.Characters
  alias Vtm.Characters.Character

  def all(_, _, _) do
    {:ok, Characters.get_all_npcs()}
  end

  def create_npc(_, %{request: request}, %{context: %{current_user: current_user}}) do
    new_request = fn c_id ->
      request
      |> Map.put(:user_id, 1)
      |> Map.put(:clan_id, c_id)
    end

    with {:ok, c_id}      <- from_global_id?(request.clan_id),
         new_req          <- new_request.(c_id),
         {:ok, %{id: id}} <- Characters.create_npc(new_req, current_user),
         {:ok, _}         <- Characters.add_npc_empty_attributes(id),
         ch               <- Characters.get_specific_character(current_user, id) do
      {:ok, %{character: ch}}
    end
  end

  def define_npc_stats(%{character_id: c_id, request: request}, _) do
    new_request = fn p_id ->
      request
      |> Map.put(:predator_type_id, p_id)
    end

    with {:ok, p_id}  <- from_global_id?(request.predator_type_id),
         new_req      <- new_request.(p_id),
         {:ok, ch}    <- Characters.update_character(c_id |> String.to_integer(), new_req) do
      {:ok, %{response: ch}}
    end
  end

  defp parse_npc_attributes(attributes) do
    attributes
    |> Enum.map(fn
      %{id: id, value: value} -> %{id: from_global_id?(id), value: value}
    end)
    |> Enum.reduce({:ok, []}, fn
      %{id: {:ok, id}, value: v}, {:ok, ls} -> {:ok, [%{id: id, value: v} | ls]}
      %{id: {:error, e}}, {:ok, _}          -> {:error, [e]}
      %{id: {:error, e}}, {:error, es}      -> {:error, [e | es]}
      _, e = {:error, _}                    -> e
    end)
  end

  def assign_npc_attributes(%{character_id: c_id, request: %{attributes: attributes}}, _) do
    with {:ok, parsed_attributes} <- parse_npc_attributes(attributes) do
      Characters.assign_npc_attributes(c_id |> String.to_integer(), parsed_attributes)
    end
  end

  @spec confirm_png(map(), any()) :: {:ok, Character.t()}
  def confirm_png(%{character_id: id}, _) do
    id
    |> String.to_integer()
    |> Characters.confirm_png()
  end
end
