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
      nil -> Vtm.Repo.insert(%Vtm.Characters.AttributeType{name: name, section: section, experience_cost: experience_cost})
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
Questa Abilità dona familiarità al personaggio in ambiti poco legali quali scassinare serrature, piantare cimici, disattivare allarmi, contraffazione,
apertura di cassaforti e altre attività più o meno illecite. Dato che i moderni sistemi di sicurezza fanno molto spesso uso di dispositivi elettronici,
potrebbe essere usata anche in corrispondenza dell'Abilità Tecnologia.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Manualità", description: """
Manualità è un'Abilità ad ampio spettro che racchiude esecuzione artistica, crezione di utensili, fino al miglioramento del proprio Rifugio.
Si possono possedere più specializzazioni in Manualità che punteggio.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Guidare", description: """
Questa Abilità consente al personaggio di poter guidare veicoli a motore. Più avanzata la conoscenza del personaggio in questa Abilità, maggiore
sarà la cilindrata e la grandezza dei veicoli che potrà guidare.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Armi da Fuoco", description: """
L'Abilità consente al personaggio di usare, manutenere e ricaricare velocemente armi da fuoco di vario calibro, dipendendo dal livello che si ha.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Rissa", description: """
Rissa consente al personaggio di colpire i propri avversari con pugni, calci, o artigli. Finché non si hanno armi in mano, si dovrà usare Rissa per colpire
gli avversari.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Mischia", description: """
Con questa Abilità, il personaggio riesce ad utilizzare armi da mischia quali coltelli, catene, bastoni o mazze da baseball. Anche i paletti di legno,
una delle armi preferite dalla Seconda Inquisizione, sono da considerarsi armi da mischia.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Furtività", description: """
Un personaggio con questa Abilità riesce facilmente a spiare, nascondersi e mimetizzarsi facilmente in una folla. Possedere alti livelli di questa
Abilità aiuta anche la Caccia per i vampiri.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: phisical_ability_id, name: "Sopravvivenza", description: """
La Sopravvivenza trasmette l'abilità di resistere in territori serlvaggi, e ritornare subito dopo alla civilizzazione: navigare usando la posizione delle stelle,
costruire un rifugio improvvisato, o notare tracce di Lupini prima che sia troppo tardi: tutte queste abilità rientrano nel novero di Sopravvivenza.
La Sopravvivenza è tra l'altro una Abilità importante per la caccia.
"""})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Affinità Animale", description: """
Rappresenta la capacità del personaggio di ammansire ed addestrare animali, e di predirne i comportamenti. I personaggi vampiri sprovvisti di questa Abilità
avranno serie difficoltà con gli animali, dato che questi eviteranno o saranno aggressivi naturalmente nei loro confronti.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Galateo", description: """
Il Galateo è la capacità del personaggio di rispondere e identificare le convenzioni sociali di una determinata congregazione, conoscerne i protocolli.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Intuito", description: """
L'Intuito si applica principalmente alla lettura del linguaggio del corpo degli interlocutori, alle loro espressioni ed al tono della loro voce.
Tramite questa Abilità si può capire se l'interlocutore sta mentendo, ed entro certi limiti intuire quali possono essere i motivi dietro le azioni di altri personaggi.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Intimidire", description: """
Intimidire è il potere di spaventare, inquietare o costringere gli avversari verso una vittoria sociale. Intimidire può essere associata sia alla Forza
che ad altri Attributi sociali, se il personaggio preferisce una coercizione fisica o sociale.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Autorità", description: """
Con questa Abilità il personaggio riesce a controllare una folla, o una truppa, innalzare il morale o placare una rivolta. È l'Abilità caratteristica di
Principi e Baroni.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Espressività", description: """
L'Espressività è l'Abilità con la quale il personaggio riesce ad esprimere sé stesso, molto spesso in modo artistico. Rappresenta anche la proprietà di linguaggio,
sia verbale che artistico: il personaggio sarà in grado di dipingere un quadro, o di articolare saggiamente un discorso. Acquisendo questa Abilità, si guadagna
una Specializzazione (da indicare in fase di creazione in scheda).
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Convincere", description: """
La Persuasione è l'Abilità con cui un personaggio riesce a convincerne altri che sa cos'è meglio per loro. I maestri persuasori sanno come giocare con le emozioni
delle loro vittime, o appellarsi alla loro ragione. Da non confondere con la Manipolazione, che è una capacità innata ed istintiva del personaggio, la Persuasione
ha a che fare con lo studio e la conoscenza di arti quali la retorica.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Bassifondi", description: """
Questa Abilità garantisce al personaggio l'abilità di parlare la stessa lingua dei bassifondi, riuscendoa mimetizzarcisi senza dare troppo nell'occhio.
Un personaggio con questa Abilità riesce anche ad interpretare lo slang, o i simboli e i graffiti sui muri di determinati quartieri.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: social_ability_id, name: "Sotterfugio", description: """
Il Sotterfugio è l'arte di ingannare in modo convincente, per evitare situazioni spiacevoli a seguito di cattive azioni, o convincere fornendo scuse convincenti.
Questa Abilità ha a che fare con l'intrigo, i segreti e il doppio gioco. Può essere anche utilizzata per sedurre, o imitare il comportamento di un mortale nel caso
dei vampiri.
"""})

Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Accademiche", description: """
L'Abilità rappresenta la conoscenza, l'alta educazione, e l'abilità di ricercare informazioni in contesti umanisti o delle arti liberali. Storia, filosofia, fanno
tutte parte di questa Abilità. Acquisendo questa Abilità si dovrà scegliere la specializzazione del personaggio (in quale branca della conoscenza è esperto).
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Allerta", description: """
Allerta ha a che fare coi sensi. Con alti livelli di questa Abilità il personaggio riesce a notare dettagli apparentemente insignificanti, o a percepire un attacco.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Finanza", description: """
Con questa Abilità è possibile identificare andamenti e manipolare il mercato azionario, o investire. Garantisce anche l'abilità di "seguire il denaro", identificando
l'origine delle risorse finanziarie di un altro personaggio.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Investigazione", description: """
L'Abilità dei detective: il personaggio sarà in grado di risolvere casi o dipanare segreti, identificare indizi, interpretarli, o trovare persone scomparse.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Medicina", description: """
La Medicina ha a che fare con la cura del corpo umano e delle sue ferite. Garantisce anche la conoscenza su patologie di vario tipo, e la capacità di usare equipaggiamento
medico.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Occulto", description: """
Occulto rappresenta la conoscenza del mondo mistico, dalle pratiche e rituali di Massoni o Rosacroce, fino alle conoscenze Noddistiche e magiche. Il personaggio sarà in grado
di riconoscere segni magici, siano essi efficaci o meno.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Politica", description: """
La Politica si occupa della burocrazia e della diplomazia, sia mortale che cainita. Il personaggio potrà lavorare, o anche pressionare, la politica di una circoscrizione, o di
un Comune, o anche più in su. Un cainita potrà sapere quale Setta domina, e dove.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Scienza", description: """
La Scienza è un'Abilità con uno spettro molto ampio, che accomuna la conoscenza della biologia della vita e le leggi dell'entropia universale. Ha molto a che vedere con le
conoscenze Accademiche, ma mentre queste sono focalizzate su conoscenze umanistiche, le Scienze sono focalizzate su materie scientifiche e ingegneristiche. Anche per Scienze,
così come per Accademiche, in fase di creazione sarà necessario identificare quale specializzazione il personaggio avrà.
"""})
Vtm.SeedsHelpers.insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: mental_ability_id, name: "Tecnologia", description: """
La Tecnologia è una materia sempre in movimento: nel XIX secolo riguardava lo studio di motori a vapore, adesso riguarda tutto ciò che ha a che fare con calcolatori, quali
computer, telefoni cellulari, ecc.
"""})

{:ok, animalism} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Animalità", description: "Animalità"})
{:ok, auspex} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Auspex", description: "Auspex"})
{:ok, blood_sorcery} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Stregoneria del Sangue", description: "Stregoneria del Sangue"})
{:ok, celerity} = Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: discipline_id, name: "Velocità", description: "Velocità"})
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
Il numero di livelli che si intendono acquistare possono significare più alleati (uno per pallino), o un alleato di maggiore influenza, su cui si può fare più affidamento.
Dovrete indicare in scheda la natura dell'Alleato e il suo "valore".
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Contatti", description: """
I contatti sono conoscenze superficiali del personaggio, che non si impegneranno molto per salvarlo da situazioni di pericolo, ma sono una utilissima fonte di informazioni.
Contrariamente agli alleati, un pallino acquistato in Contatti garantirà un numero variabile di contatti in diverse aree di influenza politiche, sanitarie,
o nelle forze dell'ordine del personaggio. Per questo, dovrete indicare in scheda per ciascun pallino in quale area di influenza i contatti del personaggio operano.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Fama", description: """
La Fama misura quanto il personaggio è conosciuto in un particolare ambito. Il personaggio potrà essere stato un cantante o un attore famoso, o essere un cainita
molto famoso nella società vampirica per un motivo (che dovrete specificare in creazione). La Fama potrebbe anche ritorcesi contro un personaggio: se un vampiro era
famoso nella sua vita mortale, alcuni potrebbero trovare strano il vederlo solamente di notte.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Generazione", description: """
Questo Vantaggio determina la Generazione del cainita, ovvero, quanto distante il suo Sangue è da quello di Caino, il mitico progenitore dei vampiri, ovvero quanti vampiri
sono stati Abbracciati fino a lui. I vampiri Abbracciati da Caino saranno della Seconda Generazione, i loro infanti saranno di Terza, e così via. Dato che i
Sangue Debole sono già per definizione troppo distanti dal Progenitore, non potranno acquisire questo Vantaggio. Gli altri personaggi vampiri, invece, saranno considerati
di Generazione 13. Potrete acquisire solo un punto di questo Vantaggio, e questo porterà il vostro personaggio ad avere Generazione 12. Non sarà possibile,
in gioco, assumere una Generazione maggiore della 12 al primo personaggio.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Rifugio", description: """
Questo Vantaggio determina la qualità del rifugio del personaggio. Acquistare più pallini in Rifugio potrebbe anche significare che il personaggio ne ha più di uno
in caso di emergenza. Quello che dovrete indicare in scheda per questo Vantaggio sarà la qualità e la quantità dei rifugi a cui il personaggio ha accesso.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Gregge", description: """
Il Gregge è un gruppo di mortali da cui il cainita può nutrirsi senza troppi rischi e pericoli. Non si tratta di alleati, o di contatti, semplicemente si tratta di
mortali che garantiscono un approvigionamento di vitae costante. Questo vantaggio aiuta grandemente nella caccia.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Influenza", description: """
Questo Vantaggio determina quanto il cainita o il mortale è in grado di influenzare un'area del governo del Dominio. Le aree di influenza possono riguardare qualsiasi
organizzazione mortale o cainita, dal governo del comune o di uno stato, alla stampa, alla sanità o alle forze dell'ordine, e perfino la Camarilla, nel caso dei
cainiti. Ogni pallino potrà rappresentare sia un'area differente di influenza, oppure un grado di influenza maggiore in una particolare area di interesse. In entrambi i casi,
dovranno essere indicate in fase di creazione le aree di influenza del personaggio.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Sapienza di Tenebra", description: """
Rappresenta la Conoscenza su di un'area particolarmente difficile da apprendere di un personaggio. Che sia un segreto noddista, o la conoscenza di un segreto,
o di particolari rituali dell'Oblivion proibiti, il personaggio possiede questa Conoscenza. Non sarà possibile acquisire in fase di creazione questo Vantaggio,
ma sarà possibile acquisirlo in gioco.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Maschera", description: """
Pallini in questo vantaggio garantiscono identità alternative credibili per le agenzie governative umane. Il personaggio potrà aver creato un'identità corroborata
da documenti falsi o contraffatti, o creati nelle agenzie preposte attraverso influenze o alleati. Un pallino in questo Vantaggio può significare una identità
alternativa ulteriore, oppure la maggiore affidabilità di una delle identità alternative.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Mawla", description: """
Vantaggio che identifica un mentore del personaggio più o meno famoso. Più grande sarà il punteggio di Mawla, maggiore sarà il potere o il grado di conoscenza del
Mentore del personaggio. Sarà possibile acquisire questo Vantaggio in fase di creazione, ma dovrà essere ben motivato.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Risorse", description: """
Le Risorse finanziarie del personaggio. Più alto sarà il livello di Risorse del personaggio, maggiore sarà la sua disponibilità economica. Le Risorse saranno
considerate quando il personaggio vorrà acquistare particolari oggetti, come armi da fuoco.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Seguaci", description: """
Gli Asserviti, o ghoul, personaggi mortali (o cainiti, in rari casi) fedeli al personaggio in virtù di un legame di sangue. Un legame di sangue può rendere un mortale
fedelissimo, ma può anche infondere sentimenti di gelosia, o altri sentimenti di desiderio, oscuri, e quindi potrebbe ritorcersi contro il personaggio cainita
in determinati casi.
"""})
Vtm.SeedsHelpers.get_or_insert_attribute(%Vtm.Characters.Attribute{attribute_type_id: advantage_id, name: "Status", description: """
La collocazione sociale del personaggio nella congregazione di cui fa parte. Per i cainiti della Camarilla, rappresenta il rango assunto (Sceriffo, Primogenio, Principe, Arpia, ...),
per gli Anarchici l'influenza che il vampiro possiede sugli altri, quanto cioè il cainita viene considerato una figura di riferimento.
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
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Lasombra", selectable: false, attributes: [dominate, oblivion, potence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Ravnos", selectable: false, attributes: [animalism, fortitude, presence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Salubri", selectable: false, attributes: [auspex, dominate, fortitude]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Toreador", selectable: true, attributes: [auspex, celerity, presence]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Tremere", selectable: true, attributes: [auspex, blood_sorcery, dominate]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Tzimisce", selectable: false, attributes: [auspex, dominate, protean]})
Vtm.SeedsHelpers.insert_clan(%Vtm.Characters.Clan{name: "Ventrue", selectable: true, attributes: [dominate, fortitude, presence]})

Vtm.SeedsHelpers.set_selectable_clans(["Sangue Debole",
                                       "Vili",
                                       "Banu Haqim",
                                       "Brujah",
                                       "Gangrel",
                                       "Malkavian",
                                       "Nosferatu",
                                       "Lasombra",
                                       "Toreador",
                                       "Tremere",
                                       "Ventrue"])

Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Accattone", description: "Accattone"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Allevatore", description: "Allevatore"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Consensualista", description: "Consensualista"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Osiride", description: "Osiride"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Randagio", description: "Randagio"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Scene Queen", description: "Scene Queen"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Sandman", description: "Sandman"})
# Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Sanguisuga", description: "Sanguisuga"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Simulante", description: "Simulante"})
Vtm.SeedsHelpers.insert_predator_type(%Vtm.Characters.PredatorType{name: "Sirena", description: "Sirena"})

Vtm.SeedsHelpers.insert_forum_section(%{title: "In Game", description: "Sezione dedicata a giocate via forum", on_game: true, can_view: true, can_edit: true})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Off Game", description: "Sezione dedicata a dubbi o discussioni sul gioco", on_game: false, can_view: true, can_edit: true})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Annunci", description: "Sezione dedicata agli annunci da parte dei master", on_game: false, can_view: true, can_edit: false})
Vtm.SeedsHelpers.insert_forum_section(%{title: "Sezione Master", description: "Sezione riservata ai master", on_game: false, can_view: false, can_edit: false})
