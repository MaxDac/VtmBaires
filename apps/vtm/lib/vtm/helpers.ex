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

  def unzip(collection, condition, first \\ [], second \\ [])

  def unzip([], _, first, second), do: {first |> Enum.reverse(), second |> Enum.reverse()}

  def unzip([a | rest], condition, first, second) do
    case condition.(a) do
      true -> unzip(rest, condition, [a | first], second)
      false -> unzip(rest, condition, first, [a | second])
    end
  end

  @doc """
  Reduces the possible errors in a collection of results, that can be :ok or :error tuple.
  The second argument deterines which object will be returned if everything went ok.
  """
  @spec reduce_errors([{:ok, any()} | {:error, any()}], {:ok, any()}) :: {:ok, any()} | {:error, [any()]}
  def reduce_errors(results, ok_final_state) do
    results
    |> Enum.reduce(ok_final_state, fn
      {:ok, _}, r               -> r
      e = {:error, _}, {:ok, _} -> e
      {:error, e}, {:error, ee} -> {:error, [e | ee]}
    end)
  end
end
