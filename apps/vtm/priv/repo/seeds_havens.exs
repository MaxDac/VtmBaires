defmodule Vtm.SeedsHavens.Helpers do
  alias Vtm.Havens.Haven
  alias Vtm.Repo

  @center_x 10
  @center_y 5
  @max_distance 15

  @max_danger 3
  @max_resources 4
  @max_difficulty 4

  def insert_haven(x, y) do
    distance_coefficient_from_center = abs(@center_x - x) + abs(@center_y - y)
    distance_coefficient = distance_coefficient_from_center / @max_distance

    danger = round(@max_danger * distance_coefficient)
    resources = @max_resources - round(@max_resources * distance_coefficient)
    difficulty = round(@max_difficulty * distance_coefficient)
    owner_difficulty = if difficulty > (@max_difficulty / 2) do 1 else 0 end

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

Vtm.SeedsHavens.Helpers.insert_row(1, 6)
Vtm.SeedsHavens.Helpers.insert_row(2, 6)
Vtm.SeedsHavens.Helpers.insert_row(3, 8)
Vtm.SeedsHavens.Helpers.insert_row(4, 9)
Vtm.SeedsHavens.Helpers.insert_row(5, 11)
Vtm.SeedsHavens.Helpers.insert_row(6, 10)
Vtm.SeedsHavens.Helpers.insert_row(7, 11)
Vtm.SeedsHavens.Helpers.insert_row(8, 11)
Vtm.SeedsHavens.Helpers.insert_row(9, 12)
Vtm.SeedsHavens.Helpers.insert_row(10, 12)
Vtm.SeedsHavens.Helpers.insert_row(11, 15)
