defmodule Vtm.Helpers do
  defp key_tuple_to_atom({key, value}) when is_binary(key), do: {String.to_atom(key), value}
  defp key_tuple_to_atom(t), do: t

  def map_to_atom_map(map) do
    map
    |> Map.new(&key_tuple_to_atom/1)
  end

  def throw_dice() do
    :rand.uniform(10)
  end
end
