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

  defp try_insert_by_name(repo, name, insert) do
    case repo |> Vtm.Repo.get_by(name: name) do
      nil -> insert.()
      a   -> {:ok, a}
    end
  end

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
    case Vtm.Characters.Attribute |> Vtm.Repo.get_by(name: name) do
      nil ->
        %Vtm.Characters.Attribute{}
        |> Vtm.Characters.Attribute.changeset(%{name: name, description: description, attribute_type_id: attribute_type_id})
        |> Vtm.Repo.insert()
      a   ->
        a
        |> Vtm.Characters.Attribute.update_changeset(%{description: description})
        |> Vtm.Repo.update()
    end
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

  def update_attribute(old, attrs) do
    old
    |> Vtm.Characters.Attribute.changeset(attrs)
    |> Vtm.Repo.update()
  end

  def insert_clan(attrs = %{name: name}) do
    case Vtm.Characters.Clan |> Vtm.Repo.get_by(name: name) do
      nil ->
        try do
          Vtm.Repo.insert(attrs)
        rescue
          e ->
            Logger.error "An error happened while inserting the clan #{inspect e}"
        catch
          e ->
            Logger.error "An error happened while inserting the clan #{inspect e}"
        end
      e ->
        {:ok, e}
    end
  end

  def insert_predator_type(%Vtm.Characters.PredatorType{name: name, description: description}) do
    try_insert_by_name(
      Vtm.Characters.PredatorType,
      name,
      fn ->
        %Vtm.Characters.PredatorType{}
        |> Vtm.Characters.PredatorType.changeset(%{name: name, description: description})
        |> Vtm.Repo.insert()
      end
    )
  end

  def insert_map(%Vtm.Chats.ChatMap{name: name, is_chat: is_chat, chat_map_id: chat_map_id}) do
    try_insert_by_name(
      Vtm.Chats.ChatMap,
      name,
      fn ->
        %Vtm.Chats.ChatMap{}
        |> Vtm.Chats.ChatMap.changeset(%{name: name, is_chat: is_chat, chat_map_id: chat_map_id})
        |> Vtm.Repo.insert()
      end
    )
  end

  def insert_forum_section(attrs = %{title: title}) do
    case Vtm.Forum.ForumSection |> Vtm.Repo.get_by(title: title) do
      nil ->
        %Vtm.Forum.ForumSection{}
        |> Vtm.Forum.ForumSection.changeset(attrs)
        |> Vtm.Repo.insert()
      f ->
        {:ok, f}
    end
  end

  defp get_clan_by_name(name) do
    Vtm.Characters.Clan |> Vtm.Repo.get_by(name: name)
  end

  def create_or_update_humans_clan() do
    case {get_clan_by_name("Umano"), get_clan_by_name("Humans")} do
      {nil, nil}  ->
        Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Umano"})
      {h, nil}    ->
        {:ok, h}
      {nil, h}    ->
        h
        |> Vtm.Characters.Clan.changeset(%{name: "Umano"})
        |> Vtm.Repo.update()
      {_, h}      ->
        h
        |> Vtm.Repo.delete()
    end
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

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_attribute_id, name: "Forza", description: """
La Forza governa quanto è possibile sollevare, quanto duramente il personaggio può colpire e quanta forza il personaggio può esercitare.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_attribute_id, name: "Destrezza", description: """
La Destrezza governa l'agilità e la grazia del personaggio, quanto velocemente può schivare, e quanto fine è il controllo dei propri muscoli in situazioni di stress.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_attribute_id, name: "Costituzione", description: """
La Costituzione rappresenta la resistenza fisica del personaggio, intesa come capacità di assorbimeto dei danni, e la capacità di sopravvivere a duri e prolungati sforzi.
"""})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_attribute_id, name: "Carisma", description: """
Il Carisma misura il naturale charme, la grazia e il sex appeal del personaggio. Più alto sarà il punteggio di Carisma, più le persone saranno attirate dal personaggio.
Il Carisma non è da confondere con l'aspetto fisico del personaggio.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_attribute_id, name: "Persuasione", description: """
La Manipolazione è l'abilità del personaggio di convincere altri del proprio punto di vista, e mentire in modo convincente.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_attribute_id, name: "Autocontrollo", description: """
L'Autocontrollo consente di mantenere la calma, di comandare le proprie emozioni, e di mettere gli altri a proprio agio nonostante le loro ansietà.
Rappresenta anche la capacità di rimanere freddo di fronte alle situazioni più stressanti.
"""})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_attribute_id, name: "Intelligenza", description: """
L'Intelligenza misura l'abilità di ragionare, ricercare, e applicare logica. Si possono ricordare informazion da libri e dai propri sensi.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_attribute_id, name: "Prontezza", description: """
La Prontezza è la capacità di pensare velocemente e reagire correttamente con poche informazioni o nulla. "Senti due guardie arrivare" è Intelligenza.
Prontezza consente al personaggio di subodorare un'imboscata, o di intuire la risposta giusta al momento giusto ad una Arpia, e non la notte seguente.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_attribute_id, name: "Fermezza", description: """
La Fermezza fornisce fuoco e determinazione, misura al concentrazione e la forza mentale. La Fermezza rende possibile ronde di una notte intera, blocca
qualsiasi distrazione.
"""})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Atletica", description: """
L'Atletica consente di correre più veloce in un inseguimento, di saltare via da una macchina in corsa, e di correre, e nuotare, come una sana e robusta persona.
È possibile usare Atletica al posto di una qualsiasi altra abilità specifica di combattimento, ma se si usa questa Abilità non sarà possibile colpire gli avversari in nessun modo.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Criminalità", description: """

"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Manualità", description: """
Manualità è un'Abilità ad ampio spettro che racchiude esecuzione artistica, crezione di utensili, fino al miglioramento del proprio Rifugio.
Si possono possedere più specializzazioni in Manualità che punteggio.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Guidare", description: "Guidare"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Armi da Fuoco", description: "Armi da Fuoco"})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Rissa", description: """
Rissa consente al personaggio di colpire i propri avversari con pugni, calci, o artigli. Finché non si hanno armi in mano, si dovrà usare Rissa per colpire
gli avversari.
"""})
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

{:ok, allies} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Allies", description: "Allies"})
{:ok, contacts} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Contacts", description: "Contacts"})
{:ok, fame} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Fame", description: "Fame"})
{:ok, haven} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Haven", description: "Haven"})
{:ok, herd} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Herd", description: "Herd"})
{:ok, influence} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Influence", description: "Influence"})
{:ok, loresheet} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Loresheet", description: "Loresheet"})
{:ok, mask} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Mask", description: "Mask"})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Mawla", description: "Mawla"})
{:ok, resources} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Resources", description: "Resources"})
{:ok, retainers} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Retainers", description: "Retainers"})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Status", description: "Status"})

# Translating in italian
Vtm.SeedsHelpers.update_attribute(allies, %{name: "Alleati", description: "Alleati"})
Vtm.SeedsHelpers.update_attribute(contacts, %{name: "Contatti", description: "Contatti"})
Vtm.SeedsHelpers.update_attribute(fame, %{name: "Fama", description: "Fama"})
Vtm.SeedsHelpers.update_attribute(haven, %{name: "Rifugio", description: "Rifugio"})
Vtm.SeedsHelpers.update_attribute(herd, %{name: "Gregge", description: "Gregge"})
Vtm.SeedsHelpers.update_attribute(influence, %{name: "Influenza", description: "Influenza"})
Vtm.SeedsHelpers.update_attribute(loresheet, %{name: "Grimori", description: "Grimori"})
Vtm.SeedsHelpers.update_attribute(mask, %{name: "Maschera", description: "Maschera"})
Vtm.SeedsHelpers.update_attribute(resources, %{name: "Risorse", description: "Risorse"})
Vtm.SeedsHelpers.update_attribute(retainers, %{name: "Seguaci", description: "Seguaci"})


# Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Umano"})
Vtm.SeedsHelpers.create_or_update_humans_clan()
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Thin Blood", attributes: [alchemy]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Caitiff", attributes: [auspex, celerity, fortitude, obfuscate, potence, presence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Banu Haquim", attributes: [blood_sorcery, celerity, obfuscate]})
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

Vtm.SeedsHelpers.insert_forum_section(%{title: "In Game", description: "Sezione dedicata a giocate via forum", on_game: true, can_view: true, can_edit: true})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Off Game", description: "Sezione dedicata a dubbi o discussioni sul gioco", on_game: false, can_view: true, can_edit: true})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Annunci", description: "Sezione dedicata agli annunci da parte dei master", on_game: false, can_view: true, can_edit: false})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Sezione Master", description: "Sezione riservata ai master", on_game: false, can_view: false, can_edit: false})
