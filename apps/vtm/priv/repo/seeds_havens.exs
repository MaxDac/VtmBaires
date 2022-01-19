defmodule Vtm.SeedsHavens.Helpers do
  alias Vtm.Havens.Haven
  alias Vtm.Repo

  @center_x 16
  @center_y 8
  @max_distance 23

  @max_danger 3
  @max_ground_control 5
  # the greater this number, the greater the control in the center rather than the periphery
  @ground_control_center_offset 2
  @max_resources 5
  @max_difficulty 5

  def insert_haven(x, y) do
    distance_coefficient_from_center = abs(@center_x - x) + abs(@center_y - y)
    distance_coefficient = distance_coefficient_from_center / @max_distance

    danger = round(@max_danger * distance_coefficient)
    # with this algorithm, the edge between center and peripheral will have less control
    ground_control = round(abs(round(@max_ground_control * 2 * distance_coefficient) - @max_ground_control - @ground_control_center_offset))
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
      danger: danger + 1,
      ground_control: ground_control,
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

Vtm.Repo.query!("truncate table haven_locations cascade")

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
