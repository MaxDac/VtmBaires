defmodule VtmWeb.Resolvers.Helpers do
  @moduledoc false

  import Absinthe.Relay.Node

  @spec parsed_id_to_string?(any()) :: integer() | nil
  def parsed_id_to_string?(parsed_id) when is_binary(parsed_id), do: parsed_id |> String.to_integer()
  def parsed_id_to_string?(parsed_id) when is_integer(parsed_id), do: parsed_id
  def parsed_id_to_string?(_), do: nil

  def parse_changeset_errors(%Ecto.Changeset{errors: errors}, _) do
    errors
    |> Enum.map(fn
      {value, {error, _}} -> "#{value}: #{error}"
      _                   -> nil
    end)
    |> Enum.filter(fn x -> not is_nil(x) end)
  end

  def parse_changeset_errors(_, default) do
    [default]
  end

  @doc """
  This function gets a table id from the global id for Relay.
  If it doesn't find it, it throws an exception.
  """
  @spec from_global_id!(binary) :: integer
  def from_global_id!(global_id) do
    case global_id |> from_global_id(VtmWeb.Schema) do
      {:ok, %{id: new_id}}  ->
        new_id |> String.to_integer()
      _                     ->
        raise ArgumentError, "The provided global id #{global_id} is invalid, it cannot be parsed."
    end
  end

  @doc """
  This function gets a table id from the global id for Relay.
  It returns {:ok, id} if it finds it, {:error, error} otherwise.
  """
  @spec from_global_id?(binary) :: {:ok, integer} | {:error, binary}
  def from_global_id?(global_id) do
    with {:ok, %{id: new_id}} <- global_id |> from_global_id(VtmWeb.Schema) do
      {:ok, new_id |> String.to_integer()}
    end
  end

  @doc """
  Tries to convert the global id if present, if not, it returns nil.
  """
  @spec from_global_id_if_not_null?(binary) :: {:ok, integer | nil} | {:error, binary}
  def from_global_id_if_not_null?(global_id) when not is_nil(global_id) and global_id != "" do
    from_global_id?(global_id)
  end

  def from_global_id_if_not_null?(_), do: {:ok, nil}

  @spec reduce_error_list(list({:ok, any} | {:error, binary})) :: {:ok, list(any)} | {:error, list(binary)}
  def reduce_error_list(list) do
    list
    |> Enum.reduce({:ok, []}, fn
      {:ok, el}, {:ok, acc}     -> {:ok, [el | acc]}
      {:ok, _}, e               -> e
      {:error, e}, {:ok, _}     -> {:error, [e]}
      {:error, e}, {:error, ee} -> {:error, [e | ee]}
    end)
  end

  @doc """
  Processes the ids passed in input, returning only the values parsed
  as global ids, ignoring the ones returned as errors.
  """
  @spec from_global_ids(list(binary)) :: list(integer)
  def from_global_ids(global_ids) do
    global_ids
    |> Enum.map(&from_global_id?/1)
    |> Enum.filter(fn
      {:ok, _}  -> true
      _         -> false
    end)
    |> Enum.map(fn {:ok, value} -> value end)
  end

  @doc """
  Processes the ids passed in input, trying to process all of them.
  If one of them fails, it returns a list of errors.
  """
  @spec from_global_ids_or_error(list(binary)) :: {:ok, list(integer)} | {:error, list(binary)}
  def from_global_ids_or_error(global_ids) do
    global_ids
    |> Enum.map(&from_global_id?/1)
    |> reduce_error_list()
  end
end
