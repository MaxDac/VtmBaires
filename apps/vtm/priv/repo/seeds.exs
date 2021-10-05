# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     VtmAuth.Repo.insert(%VtmAuth.SomeSchema{})
#
# We recommend using the bang functions (`insert`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Vtm.SeedsHelpers do
  import Ecto.Query
  require Logger

  def get_or_insert_attr_type(name, section) do
    query =
      from at in Vtm.Characters.AttributeType,
        where: at.name == ^name,
        where: at.section == ^section

    case Vtm.Repo.one(query) do
      nil -> Vtm.Repo.insert(%Vtm.Characters.AttributeType{name: name, section: section})
      at  -> {:ok, at}
    end
  end

  def insert_attribute(%Vtm.Characters.Attribute{name: name, description: description, attribute_type_id: attribute_type_id}) do
    %Vtm.Characters.Attribute{}
    |> Vtm.Characters.Attribute.changeset(%{name: name, description: description, attribute_type_id: attribute_type_id})
    |> Vtm.Repo.insert()
  end

  def get_or_insert_attribute(attrs = %Vtm.Characters.Attribute{name: name, description: description}) do
    query =
      from a in Vtm.Characters.Attribute,
        where: a.name == ^name,
        where: a.description == ^description

    case Vtm.Repo.one(query) do
      nil -> insert_attribute(attrs)
      a   -> {:ok, a}
    end
  end

  def insert_clan(attrs) do
    try do
      Vtm.Repo.insert(attrs)
    rescue
      e ->
        Logger.error "An error happened while inserting the clan #{inspect e}"
    catch
      e ->
        Logger.error "An error happened while inserting the clan #{inspect e}"
    end
  end

  def insert_predator_type(%Vtm.Characters.PredatorType{name: name, description: description}) do
    %Vtm.Characters.PredatorType{}
    |> Vtm.Characters.PredatorType.changeset(%{name: name, description: description})
    |> Vtm.Repo.insert()
  end

  def insert_map(%Vtm.Chats.ChatMap{name: name, is_chat: is_chat, chat_map_id: chat_map_id}) do
    %Vtm.Chats.ChatMap{}
    |> Vtm.Chats.ChatMap.changeset(%{name: name, is_chat: is_chat, chat_map_id: chat_map_id})
    |> Vtm.Repo.insert()
  end

  def insert_map(%Vtm.Chats.ChatMap{name: name, is_chat: is_chat}) do
    %Vtm.Chats.ChatMap{}
    |> Vtm.Chats.ChatMap.changeset(%{name: name, is_chat: is_chat})
    |> Vtm.Repo.insert()
  end

  def get_or_insert_map(attrs = %Vtm.Chats.ChatMap{name: name}) do
    query =
      from a in Vtm.Chats.ChatMap,
        where: a.name == ^name

    case Vtm.Repo.one(query) do
      nil -> insert_map(attrs)
      a   -> {:ok, a}
    end
  end

  def insert_forum_section(attrs) do
    %Vtm.Forum.ForumSection{}
    |> Vtm.Forum.ForumSection.changeset(attrs)
    |> Vtm.Repo.insert()
  end
end

{:ok, %{id: phisical_attribute_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Attribute", "Physical")
{:ok, %{id: social_attribute_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Attribute", "Social")
{:ok, %{id: mental_attribute_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Attribute", "Mental")
{:ok, %{id: phisical_ability_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Ability", "Physical")
{:ok, %{id: social_ability_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Ability", "Social")
{:ok, %{id: mental_ability_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Ability", "Mental")
{:ok, %{id: advantage_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Advantage", "")
{:ok, %{id: discipline_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Discipline", "")

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_attribute_id, name: "Forza", description: "Forza"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_attribute_id, name: "Destrezza", description: "Destrezza"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_attribute_id, name: "Costituzione", description: "Costituzione"})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_attribute_id, name: "Carisma", description: "Carisma"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_attribute_id, name: "Persuasione", description: "Persuasione"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_attribute_id, name: "Autocontrollo", description: "Autocontrollo"})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_attribute_id, name: "Intelligenza", description: "Intelligenza"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_attribute_id, name: "Prontezza", description: "Prontezza"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_attribute_id, name: "Fermezza", description: "Fermezza"})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Atletica", description: "Atletica"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Criminalità", description: "Criminalità"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Manualità", description: "Manualità"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Guidare", description: "Guidare"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Armi da Fuoco", description: "Armi da Fuoco"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Rissa", description: "Rissa"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Mischia", description: "Mischia"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Furtività", description: "Furtività"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Sopravvivenza", description: "Sopravvivenza"})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Affinità Animale", description: "Affinità Animale"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Galateo", description: "Galateo"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Intuito", description: "Intuito"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Intimidire", description: "Intimidire"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Autorità", description: "Autorità"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Espressività", description: "Espressività"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Convincere", description: "Convincere"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Bassifondi", description: "Bassifondi"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Sotterfugio", description: "Sotterfugio"})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Accademiche", description: "Accademiche"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Allerta", description: "Allerta"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Finanza", description: "Finanza"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Investigazione", description: "Investigazione"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Medicina", description: "Medicina"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Occulto", description: "Occulto"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Politica", description: "Politica"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Scienza", description: "Scienza"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Tecnologia", description: "Tecnologia"})

{:ok, animalism} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Animalità", description: "Animalità"})
{:ok, auspex} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Auspex", description: "Auspex"})
{:ok, blood_sorcery} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Blood Sorcery", description: "Blood Sorcery"})
{:ok, celerity} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Velocità", description: "Velocità"})
{:ok, dominate} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Dominazione", description: "Dominazione"})
{:ok, fortitude} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Robustezza", description: "Robustezza"})
{:ok, obfuscate} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Oscurazione", description: "Oscurazione"})
{:ok, oblivion} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Oblivion", description: "Oblivion"})
{:ok, potence} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Potenza", description: "Potenza"})
{:ok, presence} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Ascendente", description: "Ascendente"})
{:ok, protean} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Proteide", description: "Proteide"})
{:ok, alchemy} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Thin-Blood Alchemy", description: "Thin-Blood Alchemy"})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Allies", description: "Allies"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Contacts", description: "Contacts"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Fame", description: "Fame"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Haven", description: "Haven"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Herd", description: "Herd"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Influence", description: "Influence"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Loresheet", description: "Loresheet"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Mask", description: "Mask"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Mawla", description: "Mawla"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Resources", description: "Resources"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Retainers", description: "Retainers"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Status", description: "Status"})

Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Humans"})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "ThinBlood", attributes: [alchemy]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Caitiff", attributes: [auspex, celerity, fortitude, obfuscate, potence, presence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "BanuHaquim", attributes: [blood_sorcery, celerity, obfuscate]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Brujah", attributes: [celerity, potence, presence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Gangrel", attributes: [animalism, fortitude, protean]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Hecata", attributes: [oblivion, dominate, auspex, potence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Malkavian", attributes: [auspex, dominate, obfuscate]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Ministry", attributes: [obfuscate, presence, protean]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Nosferatu", attributes: [animalism, obfuscate, potence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Lasombra", attributes: [dominate, oblivion, potence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Ravnos", attributes: [animalism, fortitude, presence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Salubri", attributes: [auspex, dominate, fortitude]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Toreador", attributes: [auspex, celerity, presence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Tremere", attributes: [auspex, blood_sorcery, dominate]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Tzimisce", attributes: [auspex, dominate, protean]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Ventrue", attributes: [dominate, fortitude, presence]})

# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(thin_blood, [alchemy])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(caitiff, [auspex, celerity, fortitude, obfuscate, potence, presence])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(banu_haquim, [blood_sorcery, celerity, obfuscate])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(bruja, [celerity, potence, presence])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(gangrel, [animalism, fortitude, protean])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(hecata, [oblivion, dominate, auspex, potence])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(malkavian, [auspex, dominate, obfuscate])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(ministry, [obfuscate, presence, protean])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(nosferatu, [animalism, obfuscate, potence])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(lasombra, [dominate, oblivion, potence])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(ravnos, [animalism, fortitude, presence])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(salubri, [auspex, dominate, fortitude])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(toreador, [auspex, celerity, presence])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(tremere, [auspex, blood_sorcery, dominate])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(tzimisce, [auspex, dominate, protean])
# Vtm.Seeds.Helpers.Vtm.SeedsHelpers.insert_clan_discipline_association(ventrue, [dominate, fortitude, presence])

Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Accattone", description: "Accattone"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Allevatore", description: "Allevatore"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Consensualista", description: "Consensualista"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Osiride", description: "Osiride"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Randagio", description: "Randagio"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Scene Queen", description: "Scene Queen"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Sandman", description: "Sandman"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Sanguisuga", description: "Sanguisuga"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Simulante", description: "Simulante"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Sirena", description: "Sirena"})

{:ok, %{id: palermo_id}} = Vtm.SeedsHelpers.get_or_insert_map(%Vtm.Chats.ChatMap{name: "Palermo", is_chat: false})
{:ok, %{id: recoleta_id}} = Vtm.SeedsHelpers.get_or_insert_map(%Vtm.Chats.ChatMap{name: "Recoleta", is_chat: false})
{:ok, %{id: puerto_madero_id}} = Vtm.SeedsHelpers.get_or_insert_map(%Vtm.Chats.ChatMap{name: "Puerto Madero", is_chat: false})
{:ok, %{id: boca_id}} = Vtm.SeedsHelpers.get_or_insert_map(%Vtm.Chats.ChatMap{name: "La Boca", is_chat: false})
{:ok, %{id: provincia_id}} = Vtm.SeedsHelpers.get_or_insert_map(%Vtm.Chats.ChatMap{name: "Provincia", is_chat: false})

Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Plaza Garibaldi", is_chat: true, chat_map_id: palermo_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Belgrano", is_chat: true, chat_map_id: palermo_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Colegiales", is_chat: true, chat_map_id: palermo_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Chacarita", is_chat: true, chat_map_id: palermo_id})

Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Cementerio Monumental", is_chat: true, chat_map_id: recoleta_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Recoleta", is_chat: true, chat_map_id: recoleta_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Retiro", is_chat: true, chat_map_id: recoleta_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Palacio Almas", is_chat: true, chat_map_id: recoleta_id})

Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Puerto Madero", is_chat: true, chat_map_id: puerto_madero_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "San Telmo", is_chat: true, chat_map_id: puerto_madero_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Constitución", is_chat: true, chat_map_id: puerto_madero_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Monserrat", is_chat: true, chat_map_id: puerto_madero_id})

Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Quilmes", is_chat: true, chat_map_id: provincia_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Avellaneda", is_chat: true, chat_map_id: provincia_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Ezeiza", is_chat: true, chat_map_id: provincia_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Tigre", is_chat: true, chat_map_id: provincia_id})

Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "La Boca", is_chat: true, chat_map_id: boca_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Caminito", is_chat: true, chat_map_id: boca_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "Barracas", is_chat: true, chat_map_id: boca_id})
Vtm.SeedsHelpers.insert_map(%Vtm.Chats.ChatMap{name: "El Castillo", is_chat: true, chat_map_id: boca_id})

Vtm.SeedsHelpers.insert_forum_section(%{title: "In Game", description: "Sezione dedicata a giocate via forum", on_game: true, can_view: true, can_edit: true})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Off Game", description: "Sezione dedicata a dubbi o discussioni sul gioco", on_game: false, can_view: true, can_edit: true})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Annunci", description: "Sezione dedicata agli annunci da parte dei master", on_game: false, can_view: true, can_edit: false})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Sezione Master", description: "Sezione riservata ai master", on_game: false, can_view: false, can_edit: false})
