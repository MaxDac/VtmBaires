defmodule Vtm.Experience do
  @moduledoc """
  The Experience context.
  """

  import Ecto.Query, warn: false

  alias Vtm.Repo
  alias Vtm.Characters
  alias Vtm.Characters.Character
  alias Vtm.Characters.Clan
  alias Vtm.Characters.Attribute
  alias Vtm.Characters.AttributeType
  alias Vtm.Characters.CharacterAttribute

  alias Vtm.Experience.ExperienceLog

  @caitiff_clan_name "Vili"
  @thin_blood_clan_name "Sangue Debole"
  @discipline_type_name "Discipline"

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
    with %{id: id} <- AttributeType |> Repo.get_by(name: @discipline_type_name) do
      id
    end
  end

  defp get_clan_id(clan_name) do
    Clan
    |> from()
    |> where([c], c.name == ^clan_name)
    |> select([c], c.id)
    |> Repo.one()
  end

  defp get_caitiff_clan_id() do
    get_clan_id(@caitiff_clan_name)
  end

  defp get_thin_blood_clan_id() do
    get_clan_id(@thin_blood_clan_name)
  end

  @spec get_character_clan_and_disciplines(integer()) :: Clan.t() | nil
  defp get_character_clan_and_disciplines(character_id) do
    query =
      from cl in Clan,
        join: c in Character, on: cl.id == c.clan_id,
        where: c.id == ^character_id,
        preload: :attributes,
        select: cl

    Repo.one(query)
  end

  @spec determine_discipline_cost(integer(), integer()) :: integer()
  def determine_discipline_cost(character_id, attribute_id) do
    character_clan = get_character_clan_and_disciplines(character_id)
    caitiff_clan_id = get_caitiff_clan_id()
    thin_blood_clan_id = get_thin_blood_clan_id()

    is_attribute_id = fn %{id: d_id} -> d_id == attribute_id end

    case {caitiff_clan_id, thin_blood_clan_id, character_clan} do
      {cc_id, _, %Clan{id: cc_id}}  -> 6
      {_, tb_id, %Clan{id: tb_id}}  -> 7
      {_, _, %Clan{attributes: as}} ->
        if as |> Enum.any?(is_attribute_id) do
          5
        else
          7
        end
    end
  end

  @spec get_experience_cost_by_attribute(integer(), integer()) :: integer()
  def get_experience_cost_by_attribute(character_id, attribute_id) do
    discipline_type_id = get_discipline_attribute_type()
    attribute = Attribute |> preload(:attribute_type) |> Repo.get(attribute_id)

    case {discipline_type_id, attribute} do
      {_, nil} -> {:error, :not_found}
      {dt_id, %{attribute_type: %{
        id: dt_id
      }}}  ->
        determine_discipline_cost(character_id, attribute_id)
      {_, %{attribute_type: %{
        experience_cost: ec
      }}}  ->
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
    attribute_id: attribute_id
  }) do
    expenditure = get_experience_cost_by_attribute(character_id, attribute_id)

    current_character_attribute =
      case Characters.get_character_attribute_value_by_id(character_id, attribute_id) do
        %CharacterAttribute{value: v} when not is_nil(v)  -> v
        nil                                               -> 0
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
