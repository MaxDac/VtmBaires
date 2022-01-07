defmodule Vtm.InfoRegistry do
  @moduledoc false

  use GenServer

  @registry_key :character_info_registry

  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  defp refetch(key, getter) do
    data = getter.()

    with {:ok, _} <- GenServer.call(__MODULE__, {:insert, key, data}) do
      get_or_refetch(key, getter)
    end
  end

  def get_or_refetch(key, getter) do
    case GenServer.call(__MODULE__, {:get, key}) do
      {:ok, values} -> values
      _             -> refetch(key, getter)
    end
  end

  @impl true
  def init(_) do
    state = :ets.new(@registry_key, [:named_table, read_concurrency: true])
    {:ok, state}
  end

  @impl true
  def handle_call({:get, key}, _from, state) do
    case :ets.lookup(@registry_key, key) do
      [{^key, values}]  -> {:reply, {:ok, values}, state}
      _                 -> {:reply, {:error, :not_found}, state}
    end
  end

  @impl true
  def handle_call({:insert, key, data}, _from, state) do
    with true <- :ets.insert(@registry_key, {key, data}) do
      {:reply, {:ok, []}, state}
    end
  end
end
