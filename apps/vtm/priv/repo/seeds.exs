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

  def get_or_insert_attr_type(name, section, experience_cost) do
    query =
      from at in Vtm.Characters.AttributeType,
        where: at.name == ^name,
        where: at.section == ^section

    case Vtm.Repo.one(query) do
      nil ->
        %Vtm.Characters.AttributeType{name: name, section: section, experience_cost: experience_cost}
        |> Vtm.Repo.insert()
      at  ->
        at
        |> Vtm.Characters.AttributeType.update_changeset(%{experience_cost: experience_cost})
        |> Vtm.Repo.update()
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

  def insert_predator_type(%Vtm.Characters.PredatorType{
    name: name,
    description: description,
    attribute_id: attribute_id,
    skill_id: skill_id
  }) do
    case Vtm.Characters.PredatorType |> Vtm.Repo.get_by(name: name) do
      nil ->
        %Vtm.Characters.PredatorType{}
        |> Vtm.Characters.PredatorType.changeset(%{
          name: name,
          description: description,
          attribute_id: attribute_id,
          skill_id: skill_id
        })
        |> Vtm.Repo.insert()
      a   ->
        a
        |> Vtm.Characters.PredatorType.changeset(%{
          attribute_id: attribute_id,
          skill_id: skill_id
        })
        |> Vtm.Repo.update()
    end
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

  def set_selectable_clans(clans) do
    Vtm.Characters.Clan |> Vtm.Repo.update_all(set: [selectable: false])

    from(c in Vtm.Characters.Clan, where: c.name in ^clans)
    |> Vtm.Repo.update_all(set: [selectable: true])
  end
end

{:ok, %{id: phisical_attribute_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Attribute", "Physical", 5)
{:ok, %{id: social_attribute_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Attribute", "Social", 5)
{:ok, %{id: mental_attribute_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Attribute", "Mental", 5)
{:ok, %{id: phisical_ability_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Ability", "Physical", 3)
{:ok, %{id: social_ability_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Ability", "Social", 3)
{:ok, %{id: mental_ability_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Ability", "Mental", 3)
{:ok, %{id: advantage_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Advantage", "", 3)
{:ok, %{id: discipline_id}} = Vtm.SeedsHelpers.get_or_insert_attr_type("Discipline", "", 7)

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_attribute_id, name: "Forza", description: """
La Forza governa quanto ?? possibile sollevare, quanto duramente il personaggio pu?? colpire e quanta forza il personaggio pu?? esercitare.
"""})
{:ok, %{id: dexterity_id}} = Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_attribute_id, name: "Destrezza", description: """
La Destrezza governa l'agilit?? e la grazia del personaggio, quanto velocemente pu?? schivare, e quanto fine ?? il controllo dei propri muscoli in situazioni di stress.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_attribute_id, name: "Costituzione", description: """
La Costituzione rappresenta la resistenza fisica del personaggio, intesa come capacit?? di assorbimeto dei danni, e la capacit?? di sopravvivere a duri e prolungati sforzi.
"""})

{:ok, %{id: charisma_id}} = Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_attribute_id, name: "Carisma", description: """
Il Carisma misura il naturale charme, la grazia e il sex appeal del personaggio. Pi?? alto sar?? il punteggio di Carisma, pi?? le persone saranno attirate dal personaggio. Il Carisma non ?? da confondere con l'aspetto fisico del personaggio.
"""})
{:ok, %{id: manipulation_id}} = Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_attribute_id, name: "Persuasione", description: """
La Manipolazione ?? l'abilit?? del personaggio di convincere altri del proprio punto di vista, e mentire in modo convincente.
"""})
{:ok, %{id: composure_id}} = Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_attribute_id, name: "Autocontrollo", description: """
L'Autocontrollo consente di mantenere la calma, di comandare le proprie emozioni, e di mettere gli altri a proprio agio nonostante le loro ansiet??. Rappresenta anche la capacit?? di rimanere freddo di fronte alle situazioni pi?? stressanti.
"""})

{:ok, %{id: intelligence_id}} = Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_attribute_id, name: "Intelligenza", description: """
L'Intelligenza misura l'abilit?? di ragionare, ricercare, e applicare logica. Si possono ricordare informazion da libri e dai propri sensi.
"""})
{:ok, %{id: wits_id}} = Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_attribute_id, name: "Prontezza", description: """
La Prontezza ?? la capacit?? di pensare velocemente e reagire correttamente con poche informazioni o nulla. "Senti due guardie arrivare" ?? Intelligenza. Prontezza consente al personaggio di subodorare un'imboscata, o di intuire la risposta giusta al momento giusto ad una Arpia, e non la notte seguente.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_attribute_id, name: "Fermezza", description: """
La Fermezza fornisce fuoco e determinazione, misura al concentrazione e la forza mentale. La Fermezza rende possibile ronde di una notte intera, blocca qualsiasi distrazione.
"""})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Atletica", description: """
L'Atletica consente di correre pi?? veloce in un inseguimento, di saltare via da una macchina in corsa, e di correre, e nuotare, come una sana e robusta persona. ?? possibile usare Atletica al posto di una qualsiasi altra abilit?? specifica di combattimento, ma se si usa questa Abilit?? non sar?? possibile colpire gli avversari in nessun modo.
**Specialit??**: Acrobazia, Alpinismo, Lanciare, Nuoto, Parkour, Resistenza, Saltare, Tiro con l???Arco.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Criminalit??", description: """
Questa Abilit?? dona familiarit?? al personaggio in ambiti poco legali quali scassinare serrature, piantare cimici, disattivare allarmi, contraffazione, apertura di cassaforti e altre attivit?? pi?? o meno illecite. Dato che i moderni sistemi di sicurezza fanno molto spesso uso di dispositivi elettronici, potrebbe essere usata anche in corrispondenza dell'Abilit?? Tecnologia.
**Specialit??**: Analisi di Sicurezza, Allarmi, Borseggiare, Effrazione, Falsificare, Grande Furto d???Auto, Scassinare Casseforti, Scassinare Serrature.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Manualit??", description: """
Manualit?? ?? un'Abilit?? ad ampio spettro che racchiude esecuzione artistica, crezione di utensili, fino al miglioramento del proprio Rifugio. Si possono possedere pi?? specializzazioni in Manualit?? che punteggio.
**Specialit??**: Armaiolo, Falegnameria, Intaglio, Pittura, Progettazione, Sartoria, Scultura.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Guidare", description: """
Questa Abilit?? consente al personaggio di poter guidare veicoli a motore. Pi?? avanzata la conoscenza del personaggio in questa Abilit??, maggiore sar?? la cilindrata e la grandezza dei veicoli che potr?? guidare.
**Specialit??**: Acrobazie Automobilistiche, Autocarri, Gare di Velocit??, Manovre Evasive, Modelli d'Epoca, Motociclette, Pedinamenti, Veicoli Fuoristrada.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Armi da Fuoco", description: """
L'Abilit?? consente al personaggio di usare, manutenere e ricaricare velocemente armi da fuoco di vario calibro, dipendendo dal livello che si ha.
**Specialit??**: Armaiolo, Balestre, Estrazione Rapida, Ricarica Manuale, Tiratore Scelto, Tiri Impossibili, Rivendere Armi.
"""})
{:ok, %{id: brawl_id}} = Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Rissa", description: """
Rissa consente al personaggio di colpire i propri avversari con pugni, calci, o artigli. Finch?? non si hanno armi in mano, si dovr?? usare Rissa per colpire gli avversari.
**Specialit??**: Animali, Combattimento Sportivo, Fratelli, In Forma Bestiale di Proteide, Lupi Mannari, Mortali Armati, Mortali Disarmati, Prese di Lotta, Zuffe da Bar.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Mischia", description: """
Con questa Abilit??, il personaggio riesce ad utilizzare armi da mischia quali coltelli, catene, bastoni o mazze da baseball. Anche i paletti di legno, una delle armi preferite dalla Seconda Inquisizione, sono da considerarsi armi da mischia.
**Specialit??**: Armi Improvvisate, Asce, Catene, Colpi Disarmanti, Coltelli, Garrota, Paletti, Randelli, Scherma, Spade.
"""})
{:ok, %{id: stealth_id}} = Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Furtivit??", description: """
Un personaggio con questa Abilit?? riesce facilmente a spiare, nascondersi e mimetizzarsi facilmente in una folla. Possedere alti livelli di questa Abilit?? aiuta anche la Caccia per i vampiri.
**Specialit??**: Ambienti Naturali, Folle, Imboscate, Movimento Silenzioso, Nascondersi, Pedinamenti, Travestimenti, Urbana.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Sopravvivenza", description: """
La Sopravvivenza trasmette l'abilit?? di resistere in territori serlvaggi, e ritornare subito dopo alla civilizzazione: navigare usando la posizione delle stelle, costruire un rifugio improvvisato, o notare tracce di Lupini prima che sia troppo tardi: tutte queste abilit?? rientrano nel novero di Sopravvivenza. La Sopravvivenza ?? tra l'altro una Abilit?? importante per la caccia.
**Specialit??**: Boschi, Caccia, Deserto, Esplorazione Urbana, Giungla, Ripari, Seguire Tracce, Trappole.
"""})

{:ok, %{id: animal_ken_id}} = Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Affinit?? Animale", description: """
Rappresenta la capacit?? del personaggio di ammansire ed addestrare animali, e di predirne i comportamenti. I personaggi vampiri sprovvisti di questa Abilit?? avranno serie difficolt?? con gli animali, dato che questi eviteranno o saranno aggressivi naturalmente nei loro confronti.
**Specialit??**: Acrobazie, Attaccare, Cani, Cavalli, Gatti, Falconeria, Lupi, Pacificare, Serpenti, Topi.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Galateo", description: """
Il Galateo ?? la capacit?? del personaggio di rispondere e identificare le convenzioni sociali di una determinata congregazione, conoscerne i protocolli.
**Specialit??**: Anarchici, Aziende, Camarilla, Celebrit??, Elysium, Feudale, Ricconi, Societ?? Segreta.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Intuito", description: """
L'Intuito si applica principalmente alla lettura del linguaggio del corpo degli interlocutori, alle loro espressioni ed al tono della loro voce. Tramite questa Abilit?? si pu?? capire se l'interlocutore sta mentendo, ed entro certi limiti intuire quali possono essere i motivi dietro le azioni di altri personaggi.
**Specialit??**: Ambizioni, Desideri, Emozioni, Empatia, Fobie, Interrogare, Motivazioni, Scoprire Bugie, Vizi.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Intimidire", description: """
Intimidire ?? il potere di spaventare, inquietare o costringere gli avversari verso una vittoria sociale. Intimidire pu?? essere associata sia alla Forza che ad altri Attributi sociali, se il personaggio preferisce una coercizione fisica o sociale.
**Specialit??**: Coercizione Fisica, Estorsione, Insulti, Interrogare, Lotta di Sguardi, Minacce Velate.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Autorit??", description: """
Con questa Abilit?? il personaggio riesce a controllare una folla, o una truppa, innalzare il morale o placare una rivolta. ?? l'Abilit?? caratteristica di Principi e Baroni.
**Specialit??**: Branco da Guerra, Comando, Dinamiche di Squadra, Ispirazione, Oratoria, Praxis.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Espressivit??", description: """
L'Espressivit?? ?? l'Abilit?? con la quale il personaggio riesce ad esprimere s?? stesso, molto spesso in modo artistico. Rappresenta anche la propriet?? di linguaggio, sia verbale che artistico: il personaggio sar?? in grado di dipingere un quadro, o di articolare saggiamente un discorso. Acquisendo questa Abilit??, si guadagna una Specializzazione (da indicare in fase di creazione in scheda).
**Specialit??**: Batteria, Canto, Chitarra, Commedia, Declamazione, Danza, Poesia, Rap, Strumenti a Fiato, Tastiere, Teatro, Violino.
"""})
{:ok, %{id: persuasion_id}} = Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Convincere", description: """
La Persuasione ?? l'Abilit?? con cui un personaggio riesce a convincerne altri che sa cos'?? meglio per loro. I maestri persuasori sanno come giocare con le emozioni delle loro vittime, o appellarsi alla loro ragione. Da non confondere con la Manipolazione, che ?? una capacit?? innata ed istintiva del personaggio, la Persuasione ha a che fare con lo studio e la conoscenza di arti quali la retorica.
**Specialit??**: Contrattare, Dibattimento, Interrogare, Negoziati, Raggirare, Retorica.
"""})
{:ok, %{id: streetwise_id}} = Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Bassifondi", description: """
Questa Abilit?? garantisce al personaggio l'abilit?? di parlare la stessa lingua dei bassifondi, riuscendoa mimetizzarcisi senza dare troppo nell'occhio. Un personaggio con questa Abilit?? riesce anche ad interpretare lo slang, o i simboli e i graffiti sui muri di determinati quartieri.
**Specialit??**: Corruzione, Droghe, Fama Personale, Gang, Graffiti, Mercato Nero, Prostituzione, Ricettazione, Sopravvivenza Urbana, Traffico d???Armi.
"""})
{:ok, %{id: subterfuge_id}} = Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Sotterfugio", description: """
Il Sotterfugio ?? l'arte di ingannare in modo convincente, per evitare situazioni spiacevoli a seguito di cattive azioni, o convincere fornendo scuse convincenti. Questa Abilit?? ha a che fare con l'intrigo, i segreti e il doppio gioco. Pu?? essere anche utilizzata per sedurre, o imitare il comportamento di un mortale nel caso dei vampiri.
**Specialit??**: Bluff, Bugie Impeccabili, Fingere Mortalit??, Innocenza, Lungo Raggiro, Seduzione.
"""})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Accademiche", description: """
L'Abilit?? rappresenta la conoscenza, l'alta educazione, e l'abilit?? di ricercare informazioni in contesti umanisti o delle arti liberali. Storia, filosofia, fanno tutte parte di questa Abilit??. Acquisendo questa Abilit?? si dovr?? scegliere la specializzazione del personaggio (in quale branca della conoscenza ?? esperto).
**Specialit??**: Architettura, Giornalismo, Filosofia, Letteratura Inglese, Insegnamento, Ricerca, Storia dell???Arte, Storia (specificare Campo o Periodo), Teologia.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Allerta", description: """
Allerta ha a che fare coi sensi. Con alti livelli di questa Abilit?? il personaggio riesce a notare dettagli apparentemente insignificanti, o a percepire un attacco.
**Specialit??**: Ambienti Naturali, Imboscate, Istinto, Mimetismo, Oggetti Nascosti, Olfatto, Vista, Trappole, Udito.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Finanza", description: """
Con questa Abilit?? ?? possibile identificare andamenti e manipolare il mercato azionario, o investire. Garantisce anche l'abilit?? di "seguire il denaro", identificando l'origine delle risorse finanziarie di un altro personaggio.
**Specialit??**: Belle Arti, Borsa, Cambio di Valuta, Contabilit?? Forense, Banking, Mercati Neri, Riciclaggio, Valutazioni.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Investigazione", description: """
L'Abilit?? dei detective: il personaggio sar?? in grado di risolvere casi o dipanare segreti, identificare indizi, interpretarli, o trovare persone scomparse.
**Specialit??**: Analisi del Traffico, Criminologia, Deduzione, Medicina Legale, Omicidi, Misteri Paranormali, Persone Scomparse.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Medicina", description: """
La Medicina ha a che fare con la cura del corpo umano e delle sue ferite. Garantisce anche la conoscenza su patologie di vario tipo, e la capacit?? di usare equipaggiamento medico.
**Specialit??**: Chirurgia, Traumatologia, Ematologia, Farmacologia, Flebotomia, Patologia, Pronto Soccorso, Veterinaria.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Occulto", description: """
Occulto rappresenta la conoscenza del mondo mistico, dalle pratiche e rituali di Massoni o Rosacroce, fino alle conoscenze Noddistiche e magiche. Il personaggio sar?? in grado di riconoscere segni magici, siano essi efficaci o meno.
**Specialit??**: Alchimia, Fantasmi, Fate, Grimori, Infernalismo, Lupi Mannari, Magia del Sangue, Maghi, Necromanzia, Noddismo, Parapsicologia, Vud??.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Politica", description: """
La Politica si occupa della burocrazia e della diplomazia, sia mortale che cainita. Il personaggio potr?? lavorare, o anche pressionare, la politica di una circoscrizione, o di un Comune, o anche pi?? in su. Un cainita potr?? sapere quale Setta domina, e dove.
**Specialit??**: Anarchici, Camarilla, Clan (specifico), Diplomazia, Governo Cittadino, Media, Politica Nazionale, Politica Statale/Provinciale.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Scienza", description: """
La Scienza ?? un'Abilit?? con uno spettro molto ampio, che accomuna la conoscenza della biologia della vita e le leggi dell'entropia universale. Ha molto a che vedere con le conoscenze Accademiche, ma mentre queste sono focalizzate su conoscenze umanistiche, le Scienze sono focalizzate su materie scientifiche e ingegneristiche. Anche per Scienze, cos?? come per Accademiche, in fase di creazione sar?? necessario identificare quale specializzazione il personaggio avr??.
**Specialit??**: Astronomia, Biologia, Chimica, Demolizioni, Fisica, Genetica, Geologia, Ingegneria, Matematica.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Tecnologia", description: """
La Tecnologia ?? una materia sempre in movimento: nel XIX secolo riguardava lo studio di motori a vapore, adesso riguarda tutto ci?? che ha a che fare con calcolatori, quali computer, telefoni cellulari, ecc.
**Specialit??**: Artiglieria, Assemblare Computer, Data Mining, Hackeraggio, Programmazione, Reti Informatiche, Sistemi di Sorveglianza, Telefonia.
"""})

{:ok, animalism} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Animalit??", description: "Animalit??"})
{:ok, auspex} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Auspex", description: "Auspex"})
{:ok, blood_sorcery} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Stregoneria del Sangue", description: "Stregoneria del Sangue"})
{:ok, celerity} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Velocit??", description: "Velocit??"})
{:ok, dominate} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Dominazione", description: "Dominazione"})
{:ok, fortitude} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Robustezza", description: "Robustezza"})
{:ok, obfuscate} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Oscurazione", description: "Oscurazione"})
{:ok, oblivion} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Oblivion", description: "Oblivion"})
{:ok, potence} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Potenza", description: "Potenza"})
{:ok, presence} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Ascendente", description: "Ascendente"})
{:ok, protean} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Proteide", description: "Proteide"})
{:ok, alchemy} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Alchimia dei Sangue Debole", description: "Alchimia dei Sangue Debole"})

Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Alleati", description: """
Gli alleati sono personaggi, umani o cainiti, che supportano il personaggio: famiglia, amici, o gli elementi dell'organizzazione di cui il personaggio fa parte.
Il numero di livelli che si intendono acquistare possono significare pi?? alleati (uno per pallino), o un alleato di maggiore influenza, su cui si pu?? fare pi?? affidamento.
Dovrete indicare in scheda la natura dell'Alleato e il suo "valore".
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Contatti", description: """
I contatti sono conoscenze superficiali del personaggio, che non si impegneranno molto per salvarlo da situazioni di pericolo, ma sono una utilissima fonte di informazioni.
Contrariamente agli alleati, un pallino acquistato in Contatti garantir?? un numero variabile di contatti in diverse aree di influenza politiche, sanitarie,
o nelle forze dell'ordine del personaggio. Per questo, dovrete indicare in scheda per ciascun pallino in quale area di influenza i contatti del personaggio operano.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Fama", description: """
La Fama misura quanto il personaggio ?? conosciuto in un particolare ambito. Il personaggio potr?? essere stato un cantante o un attore famoso, o essere un cainita
molto famoso nella societ?? vampirica per un motivo (che dovrete specificare in creazione). La Fama potrebbe anche ritorcesi contro un personaggio: se un vampiro era
famoso nella sua vita mortale, alcuni potrebbero trovare strano il vederlo solamente di notte.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Generazione", description: """
Questo Vantaggio determina la Generazione del cainita, ovvero, quanto distante il suo Sangue ?? da quello di Caino, il mitico progenitore dei vampiri, ovvero quanti vampiri
sono stati Abbracciati fino a lui. I vampiri Abbracciati da Caino saranno della Seconda Generazione, i loro infanti saranno di Terza, e cos?? via. Dato che i
Sangue Debole sono gi?? per definizione troppo distanti dal Progenitore, non potranno acquisire questo Vantaggio. Gli altri personaggi vampiri, invece, saranno considerati
di Generazione 13. Potrete acquisire solo un punto di questo Vantaggio, e questo porter?? il vostro personaggio ad avere Generazione 12. Non sar?? possibile,
in gioco, assumere una Generazione maggiore della 12 al primo personaggio.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Rifugio", description: """
Questo Vantaggio determina la qualit?? del rifugio del personaggio. Acquistare pi?? pallini in Rifugio potrebbe anche significare che il personaggio ne ha pi?? di uno
in caso di emergenza. Quello che dovrete indicare in scheda per questo Vantaggio sar?? la qualit?? e la quantit?? dei rifugi a cui il personaggio ha accesso.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Gregge", description: """
Il Gregge ?? un gruppo di mortali da cui il cainita pu?? nutrirsi senza troppi rischi e pericoli. Non si tratta di alleati, o di contatti, semplicemente si tratta di
mortali che garantiscono un approvigionamento di vitae costante. Questo vantaggio aiuta grandemente nella caccia.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Influenza", description: """
Questo Vantaggio determina quanto il cainita o il mortale ?? in grado di influenzare un'area del governo del Dominio. Le aree di influenza possono riguardare qualsiasi
organizzazione mortale o cainita, dal governo del comune o di uno stato, alla stampa, alla sanit?? o alle forze dell'ordine, e perfino la Camarilla, nel caso dei
cainiti. Ogni pallino potr?? rappresentare sia un'area differente di influenza, oppure un grado di influenza maggiore in una particolare area di interesse. In entrambi i casi,
dovranno essere indicate in fase di creazione le aree di influenza del personaggio.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Sapienza di Tenebra", description: """
Rappresenta la Conoscenza su di un'area particolarmente difficile da apprendere di un personaggio. Che sia un segreto noddista, o la conoscenza di un segreto,
o di particolari rituali dell'Oblivion proibiti, il personaggio possiede questa Conoscenza. Non sar?? possibile acquisire in fase di creazione questo Vantaggio,
ma sar?? possibile acquisirlo in gioco.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Maschera", description: """
Pallini in questo vantaggio garantiscono identit?? alternative credibili per le agenzie governative umane. Il personaggio potr?? aver creato un'identit?? corroborata
da documenti falsi o contraffatti, o creati nelle agenzie preposte attraverso influenze o alleati. Un pallino in questo Vantaggio pu?? significare una identit??
alternativa ulteriore, oppure la maggiore affidabilit?? di una delle identit?? alternative.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Mawla", description: """
Vantaggio che identifica un mentore del personaggio pi?? o meno famoso. Pi?? grande sar?? il punteggio di Mawla, maggiore sar?? il potere o il grado di conoscenza del
Mentore del personaggio. Sar?? possibile acquisire questo Vantaggio in fase di creazione, ma dovr?? essere ben motivato.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Risorse", description: """
Le Risorse finanziarie del personaggio. Pi?? alto sar?? il livello di Risorse del personaggio, maggiore sar?? la sua disponibilit?? economica. Le Risorse saranno
considerate quando il personaggio vorr?? acquistare particolari oggetti, come armi da fuoco.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Seguaci", description: """
Gli Asserviti, o ghoul, personaggi mortali (o cainiti, in rari casi) fedeli al personaggio in virt?? di un legame di sangue. Un legame di sangue pu?? rendere un mortale
fedelissimo, ma pu?? anche infondere sentimenti di gelosia, o altri sentimenti di desiderio, oscuri, e quindi potrebbe ritorcersi contro il personaggio cainita
in determinati casi.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Status", description: """
La collocazione sociale del personaggio nella congregazione di cui fa parte. Per i cainiti della Camarilla, rappresenta il rango assunto (Sceriffo, Primogenio, Principe, Arpia, ...),
per gli Anarchici l'influenza che il vampiro possiede sugli altri, quanto cio?? il cainita viene considerato una figura di riferimento.
"""})

# Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Umano"})
Vtm.SeedsHelpers.create_or_update_humans_clan()
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Sangue Debole", selectable: true, attributes: [alchemy]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Vili", selectable: true, attributes: [auspex, celerity, fortitude, obfuscate, potence, presence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Banu Haqim", selectable: true, attributes: [blood_sorcery, celerity, obfuscate]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Brujah", selectable: true, attributes: [celerity, potence, presence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Gangrel", selectable: true, attributes: [animalism, fortitude, protean]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Hecata", selectable: true, attributes: [oblivion, dominate, auspex, potence, fortitude]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Malkavian", selectable: true, attributes: [auspex, dominate, obfuscate]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Ministry", selectable: true, attributes: [obfuscate, presence, protean]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Nosferatu", selectable: true, attributes: [animalism, obfuscate, potence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Lasombra", selectable: true, attributes: [dominate, oblivion, potence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Ravnos", selectable: false, attributes: [animalism, fortitude, presence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Salubri", selectable: false, attributes: [auspex, dominate, fortitude]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Toreador", selectable: true, attributes: [auspex, celerity, presence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Tremere", selectable: true, attributes: [auspex, blood_sorcery, dominate]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Tzimisce", selectable: false, attributes: [auspex, dominate, protean]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Ventrue", selectable: true, attributes: [dominate, fortitude, presence]})

Vtm.SeedsHelpers.set_selectable_clans(["Sangue Debole",
                                       "Vili",
                                       "Brujah",
                                       "Gangrel",
                                       "Lasombra",
                                       "Malkavian",
                                       "Nosferatu",
                                       "Toreador",
                                       "Tremere",
                                       "Ventrue"])

Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Accattone", description: "Accattone", attribute_id: intelligence_id, skill_id: streetwise_id})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Allevatore", description: "Allevatore", attribute_id: composure_id, skill_id: animal_ken_id})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Consensualista", description: "Consensualista", attribute_id: manipulation_id, skill_id: persuasion_id})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Osiride", description: "Osiride", attribute_id: manipulation_id, skill_id: subterfuge_id})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Randagio", description: "Randagio", attribute_id: wits_id, skill_id: streetwise_id})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Scene Queen", description: "Scene Queen", attribute_id: manipulation_id, skill_id: persuasion_id})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Sandman", description: "Sandman", attribute_id: dexterity_id, skill_id: stealth_id})
# Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Sanguisuga", description: "Sanguisuga"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Simulante", description: "Simulante", attribute_id: manipulation_id, skill_id: subterfuge_id})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Sirena", description: "Sirena", attribute_id: charisma_id, skill_id: subterfuge_id})

Vtm.SeedsHelpers.insert_forum_section(%{title: "In Game", description: "Sezione dedicata a giocate via forum", on_game: true, can_view: true, can_edit: true})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Off Game", description: "Sezione dedicata a dubbi o discussioni sul gioco", on_game: false, can_view: true, can_edit: true})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Annunci", description: "Sezione dedicata agli annunci da parte dei master", on_game: false, can_view: true, can_edit: false, order_type: :desc})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Guide", description: "Sezione dedicata alle guide modificate con pi?? frequenza", on_game: false, can_view: true, can_edit: false})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Sezione Master", description: "Sezione riservata ai master", on_game: false, can_view: false, can_edit: false})
