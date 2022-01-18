defmodule Vtm.SeedsHavens.Helpers do
  alias Vtm.Havens.Haven
  alias Vtm.Repo

  @center_x 16
  @center_y 8
  @max_distance 23

  @max_danger 3
  @max_resources 4
  @max_difficulty 4

  def insert_haven(x, y) do
    distance_coefficient_from_center = abs(@center_x - x) + abs(@center_y - y)
    distance_coefficient = distance_coefficient_from_center / @max_distance

    danger = round(@max_danger * distance_coefficient)
    resources = @max_resources - round(@max_resources * distance_coefficient)
    difficulty = round(@max_difficulty * distance_coefficient) - 2
    owner_difficulty =
      case difficulty do
        x when x > ((@max_difficulty - 2) / 2) -> 1
        x when x < 0 -> x
        _ -> 0
      end

    %Haven{}
    |> Haven.changeset(%{
      x: x,
      y: y,
      danger: danger,
      resources_level: resources,
      difficulty: difficulty,
      owner_difficulty: owner_difficulty
    })
    |> Repo.insert()
  end

  def insert_row(y, max_x) when max_x > 0 do
    insert_haven(max_x, y)
    insert_row(y, max_x - 1)
  end

  def insert_row(_, _), do: {:ok, %{}}
end

# Vtm.Repo.query!("truncate table haven_locations")

Vtm.SeedsHavens.Helpers.insert_row(1, 9)
Vtm.SeedsHavens.Helpers.insert_row(2, 9)
Vtm.SeedsHavens.Helpers.insert_row(3, 11)
Vtm.SeedsHavens.Helpers.insert_row(4, 12)
Vtm.SeedsHavens.Helpers.insert_row(5, 13)
Vtm.SeedsHavens.Helpers.insert_row(6, 15)
Vtm.SeedsHavens.Helpers.insert_row(7, 15)
Vtm.SeedsHavens.Helpers.insert_row(8, 16)
Vtm.SeedsHavens.Helpers.insert_row(9, 16)
Vtm.SeedsHavens.Helpers.insert_row(10, 16)
Vtm.SeedsHavens.Helpers.insert_row(11, 17)
Vtm.SeedsHavens.Helpers.insert_row(12, 17)
Vtm.SeedsHavens.Helpers.insert_row(13, 17)
Vtm.SeedsHavens.Helpers.insert_row(14, 18)
Vtm.SeedsHavens.Helpers.insert_row(15, 20)
Vtm.SeedsHavens.Helpers.insert_row(16, 21)
