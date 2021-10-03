defmodule VtmAuth.Helpers do
  @doc """
  Converts a map to a map with only atom keys.
  """
  @spec map_to_atom_map(Map.t()) :: Map.t()
  def map_to_atom_map(map) do
    map
    |> Map.new(fn
      {key, value} when is_binary(key)  -> {String.to_atom(key), value}
      e                                 -> e
    end)
  end

  @spec atom_map_to_map(Map.t()) :: Map.t()
  def atom_map_to_map(struct) when is_struct(struct) do
    struct
    |> Map.from_struct()
    |> atom_map_to_map()
  end

  def atom_map_to_map(map) do
    map
    |> Map.new(fn
      {key, value} when is_atom(key)    -> {Atom.to_string(key), value}
      kv                                -> kv
    end)
  end

  @doc """
  Generates a random string of specified length.
  """
  @spec generate_password(Number.t()) :: String.t()
  def generate_password(length) do
    :crypto.strong_rand_bytes(length)
    |> Base.url_encode64
    |> binary_part(0, length)
  end
end
