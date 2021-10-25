defmodule Vtm.Pagination do
  @moduledoc """
  This module collects some query helpers for pagination.
  """

  import Ecto.Query

  @doc """
  This function returns a paginated query.
  Note: the query must be ordered.
  """
  @spec as_paged_query(any, integer, integer) :: any
  def as_paged_query(query, page_size, page) when not(is_nil(page_size)) and not(is_nil(page)) do
    offset = page_size * (page - 1)
    from q in query,
      limit: ^page_size,
      offset: ^offset
  end

  def as_paged_query(query, _, _), do: query
end
