defmodule Vtm.Experience do
  @moduledoc """
  The Experience context.
  """

  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Characters
  alias Vtm.Characters.Character
  alias Vtm.Characters.Attribute
  alias Vtm.Characters.AttributeType
  alias Vtm.Characters.CharacterAttribute

  alias Vtm.Experience.ExperienceLog

  def get_chracter_experience_info(character_id) do
    Character
    |> from()
    |> where([c], c.id == ^character_id)
    |> select([c], %Character{
      id: c.id,
      experience: c.experience,
      total_experience: c.total_experience
    })
    |> Repo.one()
  end

  @spec get_discipline_attribute_type() :: integer()
  defp get_discipline_attribute_type() do
    with %{id: id} <- AttributeType |> Repo.get_by(name: "Discipline") do
      id
    end
  end

  @spec get_experience_cost_by_attribute(integer(), integer()) :: integer()
  def get_experience_cost_by_attribute(attribute_id, custom_expenditure) do
    discipline_id = get_discipline_attribute_type()

    case Attribute |> preload(:attribute_type) |> Repo.get(attribute_id) do
      nil -> {:error, :not_found}
      %{attribute_type: %{
        id: ^discipline_id,
        experience_cost: ec
      }}  ->
        case custom_expenditure do
          nil -> ec
          0   -> ec
          ce  -> ce
        end
      %{attribute_type: %{
        experience_cost: ec
      }}   ->
        ec
    end
  end

  @spec add_experience_log(%{
    :change => integer(),
    :character_id => integer(),
    optional(:attribute_id) => integer(),
    :master_id => integer()
  }) :: {:ok, ExperienceLog.t()} | {:error, any()}
  def add_experience_log(attrs) do
    %ExperienceLog{}
    |> ExperienceLog.changeset(attrs)
    |> Repo.insert()
  end

  @not_enough_experience "Il personaggio non ha sufficiente esperienza"

  @spec handle_experience_expenditure(%{
    character: Character.t(),
    attribute_id: integer(),
    custom_experience_expenditure: integer()
  }) :: {:ok, {Character.t(), integer()}} | {:error, binary()}
  def handle_experience_expenditure(%{
    character: %Character{
      id: character_id,
      experience: current_exp
    },
    attribute_id: nil,
    custom_experience_expenditure: custom_experience_expenditure
  }) do
    case {current_exp, custom_experience_expenditure} do
      {ce, e} when ce - e < 0 ->
        {:error, @not_enough_experience}
      {ce, e} ->
        with {:ok, ch}  <- Characters.update_character(character_id, %{experience: ce - e}) do
          {:ok, {ch, e}}
        end
    end
  end

  def handle_experience_expenditure(%{
    character: %Character{
      id: character_id,
      experience: current_exp
    },
    attribute_id: attribute_id,
    custom_experience_expenditure: custom_experience_expenditure
  }) do
    expenditure = get_experience_cost_by_attribute(attribute_id, custom_experience_expenditure)

    current_character_attribute =
      case Characters.get_character_attribute_value_by_id(character_id, attribute_id) do
        %CharacterAttribute{value: v} -> v
        nil                           -> 0
      end

    total_expenditure = expenditure * (current_character_attribute + 1)

    case {current_character_attribute, current_exp, total_expenditure} do
      {5, _, _} ->
        {:error, "L'attributo è già al massimo."}
      {_, ce, e} when ce - e < 0 ->
        {:error, @not_enough_experience}
      {v, ce, e} ->
        with {:ok, ch}  <- Characters.update_character(character_id, %{experience: ce - e}),
             {:ok, _}   <- Characters.change_character_attribute(character_id, attribute_id, v + 1) do
          {:ok, {ch, e}}
        end
    end
  end
end
