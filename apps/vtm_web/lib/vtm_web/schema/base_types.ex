defmodule VtmWeb.Schema.BaseTypes do
  use Absinthe.Schema.Notation
  use Absinthe.Relay.Schema.Notation, :modern

  alias VtmWeb.Resolvers.AccountsResolvers
  alias VtmWeb.Schema.Middlewares

  defp pad_number(number) do
    number
    |> Integer.to_string()
    |> String.pad_leading(2, "0")
  end

  defp format_hour_and_minutes(%{hour: hour, minute: minute}) do
    {pad_hour, pad_minute} = {
      hour |> pad_number(),
      minute |> pad_number()
    }

    "#{pad_hour}:#{pad_minute}"
  end

  scalar :date do
    parse fn %{value: value} ->
      case Date.from_iso8601(value) do
        x = {:ok, _} -> x
        _ -> :error
      end
    end

    serialize fn date ->
      Date.to_iso8601(date)
    end
  end

  scalar :date_time do
    parse fn %{value: value} ->
      case NaiveDateTime.from_iso8601(value) do
        x = {:ok, _} -> x
        _ -> :error
      end
    end

    serialize fn date ->
      "#{Date.to_iso8601(date)} #{format_hour_and_minutes(date)}"
    end
  end

  scalar :hour do
    #TODO
    parse fn _ -> NaiveDateTime.utc_now() end

    serialize &format_hour_and_minutes/1
  end

  scalar :decimal do
    parse fn
      %{ value: value } when is_binary(value) ->
        {result, _} = Decimal.parse(value)
        {:ok, result}
      %{ value: value } when is_float(value) ->
        result = Decimal.from_float(value)
        {:ok, result}
      _ ->
        :error
    end

    serialize &Decimal.to_string/1
  end

  @desc "Determines the order of the data"
  enum :sort_order do
    @desc "Ascending order"
    value :asc

    @desc "Descending order"
    value :desc
  end

  @desc "An error encountered trying to persist input"
  object :input_error do
    field :key, non_null(:string)
    field :message, non_null(:string)
  end

  object :base_queries do
    field :me, :user do
      middleware Middlewares.Authorize, :any
      resolve &AccountsResolvers.me/3
    end
  end
end
