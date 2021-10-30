// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { guideStyle, liStyle, titleStyle } from "../GuidesStyles";
import { useCustomLazyLoadQuery } from "../../../_base/relay-utils";
import type { AttributesCompleteQuery } from "../../../services/queries/info/__generated__/AttributesCompleteQuery.graphql";
import { attributesCompleteQuery } from "../../../services/queries/info/AttributesCompleteQuery";
import { GuideRoutes } from "../GuidesMain";

const GuidesAttributes = (): any => {
    const attributes = useCustomLazyLoadQuery < AttributesCompleteQuery > (attributesCompleteQuery, {}, {
        fetchPolicy: "store-and-network"
    })?.attributes ?? [];

    const showAttributes = (name: string, section?: string) =>
        attributes
            .filter(a => a?.attributeType?.name === name)
            .filter(a => section == null || a?.attributeType?.section === section)
            .sort((a, b) => (a?.name ?? "") > (b?.name ?? "") ? 1 : 0)
            .map(a => (
                <li style={liStyle} key={a?.id}><b>{a?.name}</b>: {a?.description}</li>
            ));

    const showAttributeColumns = (name: string, title: string) => (
        <>
            <Grid item xs={12}>
                <Typography paragraph>
                    <h3 style={titleStyle}>
                        {title}
                    </h3>
                </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Typography paragraph sx={{ textAlign: "center" }}>
                    <h4 style={titleStyle}>
                        Fisici
                    </h4>
                </Typography>

                <Typography paragraph sx={guideStyle}>
                    <ul>
                        {showAttributes(name, "Physical")}
                    </ul>
                </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Typography paragraph sx={{ textAlign: "center" }}>
                    <h4 style={titleStyle}>
                        Sociali
                    </h4>
                </Typography>

                <Typography paragraph sx={guideStyle}>
                    <ul>
                        {showAttributes(name, "Social")}
                    </ul>
                </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Typography paragraph sx={{ textAlign: "center" }}>
                    <h4 style={titleStyle}>
                        Mentali
                    </h4>
                </Typography>

                <Typography paragraph sx={guideStyle}>
                    <ul>
                        {showAttributes(name, "Mental")}
                    </ul>
                </Typography>
            </Grid>
        </>
    );

    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Abilit&agrave; e Attributi
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Proponiamo di seguito una lista di Attributi, Abilit&agrave;, Discipline e Vantaggi disponibili in fase di creazione,
                con relativa descrizione.
            </Typography>

            <Grid container>
                {showAttributeColumns("Attribute", "Attributi")}
                {showAttributeColumns("Ability", "Abilità")}
            </Grid>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Discipline
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <ul>
                    <li style={liStyle}><b>Animalità</b>: i poteri di Animalit&agrave; hanno a che fare con la Bestia interiore, del personaggio e altrui.
                        <ul>
                            <li><b>Legare il <i>Famulus</i></b> (&#9679;): crea un legame mentale con un animale legato di Sangue.</li>
                            <li><b>Percepire la Bestia</b> (&#9679;): il vampiro riesce a percepire la Bestia negli altri, intuendo se si tratta di una Bestia soprannaturale (cainiti o lupini) o meno.</li>
                            <li><b>Sussurri Ferali</b> (&#9679;&#9679;): il vampiro pu&ograve; entrare in contatto con un animale, scambiando informazioni basiche (carenza di prede). Il vampiro pu&ograve;
                            anche tentare di chiamare un gruppo di un preciso animale.</li>
                            <li><b>Succulenza animale</b> (&#9679;&#9679;&#9679;): il vampiro pu&ograve; soddisfare la sua Fame con un animale come se fosse sangue umano, riducendo enormemente le controindicazioni.</li>
                            <li><b>Domare la Bestia</b> (&#9679;&#9679;&#9679;): calma la Bestia in un umano, riducendolo ad uno stato semi letargico, o un vampiro, limitandone i poteri e, possibilmente, facendolo uscire dalla Frenesia.</li>
                            <li><b>Sciame non-morto</b> (&#9679;&#9679;&#9679; - Amalgama con Oscurazione &#9679;&#9679;): (Nosfeatu) il vampiro riesce ad estendere il proprio controllo ad uno sciame di insetti.</li>
                            <li><b>Sottomettere lo spirito</b> (&#9679;&#9679;&#9679;&#9679;): il vampiro trasferisce la sua mente in un animale, prendendone completamente il possesso (mentre il corpo del vampiro rimane indifeso, in uno stato simile al Torpore).</li>
                            <li><b>Dominio Animale</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il controllo del vampiro sul Regno Animale &egrave; cos&igrave; grande che ora riesce a compandare interi stormi, o branchi di animali, che possono arrivare
                            a lanciarsi in spregio della propria vita per proteggere il cainita.</li>
                            <li><b>Scacciare la Bestia</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): quando il vampiro sta per perdere il controllo alla Bestia per paura o per rabbia, pu&ograve; scacciare la sua Bestia, inviandola in un mortale o un 
                            vampiro nelle vicinanze, e quest'ultimo sperimenter&agrave; la Frenesia al posto del vampiro.</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Ascendente</b>: aumenta il naturale charme del cainita.
                        <ul>
                            <li><b>Soggezione</b> (&#9679;): la presenza del vampiro diventa immediatamente un punto di riferimento, quasi impossibile da ignorare. Non ispira infatuazioni, ma sicuramente riesce a catturare l'attenzione sul vampiro..</li>
                            <li><b>Intimidazione</b> (&#9679;): il vampiro, invece di attirare su di s&eacute; l'attenzione, usa il potere per intimidire, minacciare quelli che gli stanno attorno. I mortali eviteranno immediatamente di dare attenzione al vampiro, e anche i vampiri avranno remore ad interfacciarsi col cainita.</li>
                            <li><b>Bacio Persistente</b> (&#9679;&#9679;): il Bacio del vampiro, il suo morso, induce un'estasi molto superiore a quella di un normale Bacio, tanto che i mortali vittime di questo potere ne diventano dipendenti, con conseguente anemia o anche morte.</li>
                            <li><b>Sguardo Terribile</b> (&#9679;&#9679;&#9679;): il vampiro riesce a condensare la sua natura soprannaturale in un singolo, terribile sguardo, che blocca i mortali di terrore, costringendoli a fuggire o a rimanere bloccati dalla paura, e nei vampiri arriva a causare R&ouml;tschreck.</li>
                            <li><b>Ammaliamento</b> (&#9679;&#9679;&#9679;): il vampiro instilla meraviglia e infatuazione ai massimi livelli in una singola vittima, che tratter&agrave; il vampiro come il suo idolo.</li>
                            <li><b>Voce Irresistibile</b> (&#9679;&#9679;&#9679;&#9679; - Amalgama: Dominazione &#9679;): il vampiro ora necessita solo della sua voce per comandare la sua vittima, non pi&ugrave; del suo sguardo.</li>
                            <li><b>Convocazione</b> (&#9679;&#9679;&#9679;&#9679;): il vampiro pu&ograve; convocare qualsiasi mortale o cainita su cui abbia precedentemente usato Soggezione, Ammaliamento o Maest&agrave;, oppure che abbia assaggiato una volta il suo sangue. 
                            La vittima non metter&agrave; in pericolo la sua vita n&eacute; far&agrave; follie per raggiungere il cainita, ma si prodigher&agrave; comunque per raggiungerlo. La vittima sapr&agrave; chi lo sta chiamando e la sua posizione.</li>
                            <li><b>Maest&agrave;</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro, a questo livello, diventa una vera e proprio immagine angelica o mostruosamente infernale, lasciando mortali e cainiti attorno senza parole, senza la possibilit&agrave; di agire, se non continuando a guardare il cainita.</li>
                            <li><b>Magnetismo da Star</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): gli effetti di Ascendente adesso hanno effetto anche su chi sta vedendo i loro <i>live feeds</i>, o li sente per telefono. Il potere non ha effetto a posteriori.</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Auspex</b>: la Disciplina sensoriale per eccellenza, ha a che fare con la Percezione soprannaturale dei vampiri
                        <ul>
                            <li><b>Sensi sviluppati</b> (&#9679;): i sensi del vampiro si amplificano a dismisura, dandogli la possibilit&agrave; di vedere nella quasi oscurit&agrave;, percepire ultrasuoni o l'odore del sangue a distanza.</li>
                            <li><b>Vedere l'Invisibile</b> (&#9679;): il vampiro riesce ad individuare presenze celate in modo soprannaturale, come vampiri che stanno usando Oscurazione, o spiriti.</li>
                            <li><b>Premonizione</b> (&#9679;&#9679;): questo potere fornisce al vampiro dei lampi di intuizione. Il vampiro riesce a ricordare un dettaglio prima ritenuto insignificante, o a captare i segnali di una imboscata.</li>
                            <li><b>Scrutare l'Anima</b> (&#9679;&#9679;&#9679;): il vampiro riesce a captare l'aura di una persona, individuandone i sentimenti e le caratteristiche.</li>
                            <li><b>Condivisione dei Sensi</b> (&#9679;&#9679;&#9679;): il vampiro riesce a percepire informazioni sensoriali di qualcuno in linea visuale, oppure, a lunga distanza, di qualcuno che ha ancora qualche goccia del suo sangue.</li>
                            <li><b>Tocco degli Spiriti</b> (&#9679;&#9679;&#9679;&#9679;): il vampiro riesce a percepire residui di emozione o altri indizi impossibili da decifrare con mezzi tradizionali toccando un oggetto inanimato.</li>
                            <li><b>Chiaroveggenza</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): entrando in un leggero stato di <i>trance</i>, il vampiro riesce a percepire qualsiasi cosa fuori dall'ordinario in un quartiere o, se all'esterno o in un'area scarsamente popolata, in un'area di svariati chilometri.</li>
                            <li><b>Possessione</b> (&#9679;&#9679;&#9679;&#9679;&#9679; - Amalgama con Dominazione &#9679;&#9679;&#9679;): il vampiro acquisisce il controllo completo del corpo di un mortale.</li>
                            <li><b>Telepatia</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro riesce a leggere la mente di mortali o vampiri (anche se questi ultimi con un po' pi&ugrave; di fatica). Riesce anche ad impiantare pensieri nella mente della vittima.</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Blood Sorcery</b>: questa Disciplina &egrave; a met&agrave; tra magia e poteri della vitae.
                        <ul>
                            <li>
                                <b>Condiviso</b>
                                <ul>
                                    <li><b>Estinzione di Vitae</b> (&#9679;&#9679;): il vampiro, concentrandosi su un altro vampiro in vista ed eseguendo una serie di gesti, riesce a rendere infruibile la vitae della vittima, innalzando la sua Fame.</li>
                                    <li><b>Ladro di Sangue</b> (&#9679;&#9679;&#9679;&#9679;): il vampiro, concentrandosi, riesce ad aprire una ferita in un'arteria di un umano, ed a far levitare il sangue in aria, fino alla sua bocca. L'umano non si accorger&agrave; di nulla,
                                    come se fosse soggetto al Bacio del vampiro, la sua ferita si richiuder&agrave; una volta finito l'effetto del potere, ma il potere in s&eacute; &egrave; abbastanza evidente, ed &egrave; considerato un grande rischio di infrazione della <b>Masquerade</b>.</li>
                                </ul>
                            </li>
                            <li>
                                <b>Tremere</b>
                                <ul>
                                    <li><b>Assaggio del Sangue</b> (&#9679;): tramite un sorso di sangue, il Vampiro riesce a discernere i tratti basici dell'entit&agrave; a cui appartiene.</li>
                                    <li><b>Potenza nel Sangue</b> (&#9679;&#9679;&#9679;): il vampiro, concentrandosi sul proprio sangue, riesce ad aumentarne la Potenza.</li>
                                    <li><b>Calderone di Sangue</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): attraverso questo terribile potere, il vampiro fa bollire letteralmente il sangue nelle vene della vittima, mortale o cainita, provocando la morte quasi certa del mortale, e danni Aggravati per i cainiti.</li>
                                </ul>
                            </li>
                            <li>
                                <b>Banu Haquim</b>
                                <ul>
                                    <li><b>Vitae Corrosiva</b> (&#9679;): il vampiro riesce a convertire la sua vitae in una sostanza altamente corrosiva.</li>
                                    <li><b>Tocco dello Scorpione</b> (&#9679;&#9679;&#9679;): la vitae del vampiro diventa un icore velenoso che incapacita mortali e cainiti, e pu&ograve; essere sputato, o impresso su lame ed agire per contatto.
                                    A parte alcune tecniche praticate da alcune Societ&agrave; Segrete umane, e Robustezza, c'&egrave; poco da fare contro questo potere.</li>
                                    <li><b>Carezza di Baal</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro trasmuta la sua Vitae in un veleno pericolosissimo sia per i cainiti che per i mortali.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Dominazione</b>: questa Disciplina usa il Sangue per imporre comandi e suggestioni nella mente delle vittime. Si applica solo a vampiri della stessa generazione in su, o ai mortali. <b>Tutti</b> i poteri necessitano che il vampiro catturi lo sguardo della vittima.
                        <ul>
                            <li><b>Confondere la Memoria</b> (&#9679;): pronunciando le parole "<b>Dimentica!</b>", il vampiro riesce a far dimenticare gli ultimi cinque minuti alla vittima. La vittima non ricorder&agrave; nulla, e al massimo si accorger&agrave; del fatto che mancano cinque minuti dalla sua memoria.</li>
                            <li><b>Costringere</b> (&#9679;): il vampiro impone alla vittima l'esecuzione di un semplice comando, come "<b>Corri!</b>" o "<b>Fermo!</b>". Il comando deve essere chiaro e verr&agrave; eseguito alla lettera.</li>
                            <li><b>Mesmerismo</b> (&#9679;&#9679;): il vampiro riesce ad imprimere comandi complessi, fintanto che la vittima continua ad osservare il vampiro negli occhi. Gli ordini non devono contenere ordini condizionali (tipo "<b>Dai i documenti solo se vedi Tizio"</b>), altrimenti falliranno.</li>
                            <li><b>Demenza (Malkavian)</b> (&#9679;&#9679; - Amalgama con Oscurazione &#9679;&#9679;): nel corso di una conversazione normale, il vampiro riesce ad ispirare tra le righe delle sue frasi la sua influenza, agitando la vittima e riuscendo a far emergere i suoi demoni interiori, facendogli perdere temporaneamente la ragione.</li>
                            <li><b>La Mente Immemore</b> (&#9679;&#9679;&#9679;): il vampiro pu&ograve; riscrivere interi brani della memoria della sua vittima, descrivendo nei minimi particolari quello che la mente ricorder&agrave;.</li>
                            <li><b>Ordine Sommerso</b> (&#9679;&#9679;&#9679;): il vampiro riesce stavolta ad usare lo stesso potere di <b>Mesmerismo</b>, ma la suggestione, l'ordine rimarr&agrave; dormiente, finch&eacute; non si verificher&agrave; una condizione specifica dettata dal cainita. La direttiva pu&ograve; rimanere sommersa per anni, prima di attivarsi.</li>
                            <li><b>Razionalizzazione</b> (&#9679;&#9679;&#9679;&#9679;): la vittima dei poteri di Dominazione &egrave; ora convinta di aver agito secondo il proprio libero arbitrio. L'uso prolungato di questa Disciplina pu&ograve; provocare seri traumi.</li>
                            <li><b>Manipolazione di Massa</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il cainita pu&ograve; ora usare i poteri di dominazione su un'intera folla di mortali, o anche su un gruppo di altri cainiti.</li>
                            <li><b>Decreto Finale</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): i comandi dati con Dominazione adesso vengono eseguiti anche se la vittima percepisce chiaramente che questi gli faranno attivamente danno, o la porteranno alla morte (o alla Morte Ultima, nel caso dei vampiri).</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Oblivion</b>: questa Disciplina sacrilega prende il suo potere in parte dalla vitae del cainita, ed in parte dalle energie oltre il Velo che separa il regno dei vivi da quello dei morti.
                    Lasombra e Hecata sembrano sfruttare le stesse tecniche per <b>connettersi</b> con i loro poteri, ma i luoghi che raggiungono sono diametralmente opposti, e cos&igrave; anche le conoscenze che hanno accumulato.
                        <ul>
                            <li>
                                <b>Lasombra</b>
                                <ul>
                                    <li><b>Mantello d'Ombra</b> (&#9679;): applicando il loro potere alle ombre ambientali, il cainita riesce ad apparire pi&ugrave; sinistro ed inquietante.</li>
                                    <li><b>Veduta dell'Oblivion</b> (&#9679;): il vampiro chiude gli occhi, ed al riaprirli, le sue iridi sono completamente nere. Ora riesce a vedere nell'ombra pi&ugrave; nera, facendo fatica a vedere invece alla luce, come se la vista si fosse invertita.
                                    Riescono anche a percepire Presenze oltre il Velo che non stiano attivamente cercando di nascondersi dal cainita.</li>
                                    <li><b>Proiettare l'Ombra</b> (&#9679;&#9679;): i poteri di Oblivion spesso falliscono per via della mancanza di ombre. Questo potere consente all'utilizzatore di far sgorgare l'ombra interna del vampiro. Questa ombra seguir&agrave; le movenze del vampiro, proiettandone la figura,
                                    anche se a volte potr&agrave; assumere contorni inquietanti, riflettendo la propensione e l'umore del vampiro che le ha evocate.</li>
                                    <li><b>Braccia di Ahriman</b> (&#9679;&#9679; - Amalgama: Potenza &#9679;&#9679;): il vampiro riesce ad evocare lingue d'ombra che si dipanano da zone di oscurit&agrave; ambientale, scorrendo sulle superfici e percorrendo la vittima, tentando di stritolarla. 
                                    Il vampiro non potr&agrave; fare nulla finch&eacute; controlla le propaggini di Abisso.</li>
                                    <li><b>Propsettiva d'Ombra</b> (&#9679;&#9679;&#9679;): il vampiro riesce a proiettare i suoi sensi in una zona d'ombra in linea di vista, sentendo e vedendo come se fosse nascosto proprio in quella zona d'ombra.</li>
                                    <li><b>Tocco dell'Oblivion</b> (&#9679;&#9679;&#9679;): il vampiro, riuscendo a toccare e fare presa sulla vittima, trasferisce parte dell'Oblivion al suo interno nella vittima, di fatto "invecchiando" la parte che tocca, infliggendo danni Aggravati alla parte coinvolta.</li>
                                    <li><b>Sudario dello Stige</b> (&#9679;&#9679;&#9679;&#9679;): ombre vengono vomitate da una zona d'ombra vicino al comando del cainita, che ingloba una porzione di spazio attorno alla zona d'ombra che avvolge qualsiasi cosa attorno, scorrendo attraverso le superfici e chi ha la sfortuna
                                    di trovarsi vicino. Tutti quelli travolti dall'Ombra, tranne l'invocatore, soffrono di soffocamento e non riusciranno a vedere nulla, se non con mezzi soprannaturali.</li>
                                    <li><b>Passo d'Ombra</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il cainita entra in una zona d'ombra, e riesce ad emergere in un'altra zona d'ombra poco distante. Questo potere all'apparenza innocuo, nasconde una terribile verit&agrave;, palesata dalle vittime di chi, dal vampiro,
                                    viene costretto all'interno di una di queste zone d'ombra, anche solo per un breve periodo: che navighino il Labirinto solo superficialmente o se vi finiscano dentro, ci&ograve; che emerge non &egrave; pi&ugrave; lo stesso, e rischia di subire "Macchie" all'umanit&agrave;.</li>
                                    <li><b>Avatar di Tenebra</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): tramite questo potere, il vampiro riesce a tramutarsi in tenebra viva, dalle stesse caratteristiche del Sudario dello Stige. Pu&ograve; soffocare vittime, oppure scorrere sulle pareti a velocit&agrave; d'uomo e 
                                    passare attraverso le pi&ugrave; microscopiche fessure.</li>
                                </ul>
                            </li>
                            <li>
                                <b>Hecata</b>
                                <ul>
                                    <li><b>Cenere alla Cenere</b> (&#9679;): infondendo la propria vitae all'interno di un cadavere non animato, il cadavere si disintegra completamente in tre turni.</li>
                                    <li><b>Il Fetter Vincolante</b> (&#9679;): il vampiro riesce a percepire, concentrandosi, ci&ograve; che &egrave; importante per un fantasma, riuscendo a percepire i suoi dintorni proprio come li percepisce un fantasma. Tale oggetto &egrave; il Fetter, 
                                    l'oggetto in cui i Fantasmi "riposano".</li>
                                    <li><b>Precognizione Fatale</b> (&#9679;&#9679; - Amalgama: Auspex &#9679;&#9679;): il vampiro riesce a percepire il momento della morte di un mortale su cui posa lo sugardo, dopo essersi concentrato, e i suoi occhi diventati completamente neri.</li>
                                    <li><b>Dove il Velo si Dissolve</b> (&#9679;&#9679;): il vampiro riesce a percepire dove il Velo che separa il mondo dei vivi da quello di morti &egrave; pi&ugrave; spesso o quasi inesistente, nel primo caso se il luogo &egrave; consacrato o non sono avvenute
                                    morti, nel secondo se un evento terribile che &egrave; costato molte vite ha avuto luogo, o se un Necromante ha officiato un rituale per diminuire artificialmente il Velo.</li>
                                    <li><b>Aura di Decadimento</b> (&#9679;&#9679;&#9679;): l'aura del vampiro cos&igrave; percettivo nei confronti del Sudario, o Velo, accelera attorno a lui il decadimento di ci&ograve; che &egrave; vivo, spargendo malattie e facendo marcire il cibo. Con questo potere
                                    il vampiro pu&ograve; scientemente accelerare questo processo, che per&ograve; non accelera il decadimento dei cadaveri.</li>
                                    <li><b>Festa di Passioni</b> (&#9679;&#9679;&#9679;): il vampiro riesce a trarre nutrimento dalle emozioni che affliggono uno spettro o uno spirito, riuscendo a non-vivere pi&ugrave; tempo senza la necessit&agrave; di nutrirsi di sangue.</li>
                                    <li><b>Piaga Necrotica</b> (&#9679;&#9679;&#9679;&#9679;): il vampiro, sfruttando la sua vicinanza al Sudario, instilla una malattia nei mortali, malattia che pu&ograve; rischiare di essere contagiosa. Pi&ugrave; il vampiro &egrave; versato in medicina, pi&ugrave; potr&agrave;
                                    imprimere una particolare caratteristica o simulare una malattia esistente quando usa questo potere.</li>
                                    <li><b>Soddisfare il Fato</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il cainita sovverte una condizione artificiale che ha a sua volta sovvertito il fato, facendo riapparire una malattia in una persona guarita, rompendo un osso che si era riformato, o imprimendo gli anni guadagnati 
                                    da un ghoul asservito ad un vampiro che, grazie alla vitae del Sire, non ha sofferto il passaggio del tempo.</li>
                                    <li><b>Appassire lo spirito</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): questo terribile potere offre al vampiro la capacit&agrave; di disintegrare lo spirito di un mortale o di un cainita, rischiando anche che non si ripresenti come spirito o spettro dopo la morte, lasciando sul posto
                                    un guscio vuoto. Questo potere ha delle severe ripercussioni sull'Umanit&agrave; del vampiro, e rischia di collezionare "Macchie" all'umanit&agrave;.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Oscurazione</b>: tramite questa Disciplina, il vampiro riesce a rendersi invisibile agli occhi dei mortali e della maggior parte dei cainiti. Il potere si basa su un'illusione, sulla manipolazione delle menti, non su un effetto fisico.
                        <ul>
                            <li><b>Cappa di Ombre</b> (&#9679;): il vampiro diventa invisibile se rimane perfettamente fermo, non emette nessun suono, e rimane dietro una sorta di copertura.</li>
                            <li><b>Silenzio di Morte (Banu Haquim)</b> (&#9679;): il vampiro non emette suoni, o meglio, riesce ad annullare qualsiasi suono che emette dai sensi di chi gli &egrave; vicino. Microfoni ed altri apparecchi elettronici continuano a captare i suoni che emette.</li>
                            <li><b>Passaggio Invisibile</b> (&#9679;&#9679;): il vampiro ora pu&ograve; muoversi, e se non emette suoni dirompenti, pu&ograve; rimanere invisibile.</li>
                            <li><b>Ghost in the Machine</b> (&#9679;&#9679;&#9679;): il vampiro riesce a trasmettere il potere di Oscurazione anche ai macchinari elettronici, rendendosi invisibile o comunque irriconoscibile. L'effetto svanisce col tempo, ma la figura del vampiro rimarr&agrave; irriconoscibile.</li>
                            <li><b>Maschera delle Mille Facce</b> (&#9679;&#9679;&#9679;): il vampiro pu&ograve; assumere l'aspetto di un'altra persona qualunque, invece di sparire. L'identit&agrave; della persona sar&agrave; inerente al contesto, e il vampiro non potr&agrave; copiare l'aspetto di una persona nello specifico.</li>
                            <li><b>Nascondere</b> (&#9679;&#9679;&#9679;&#9679; - Amalgama Auspex &#9679;&#9679;&#9679;): il vampiro riesce ad imprimere la suggestione ipnotica che ispira con Oscurazione sulla sua persona ad un oggetto inanimato, che adesso rimarr&agrave; invisibile agli sguardi altrui.</li>
                            <li><b>Svanire</b> (&#9679;&#9679;&#9679;&#9679;): <b>Necessario avere Cappa di Ombre</b> il cainita riesce a sparire dalla vista, in un battito di ciglia, attivando il potere di Cappa d'Ombre o Passaggio Invisibile, ed anche la memoria del cainita negli astanti diventer&agrave; sfocata e indistinta,
                            come se la mente cercasse di dare un senso a quanto appena visto.</li>
                            <li><b>Ammantare le Masse</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro ora riesce a coprire anche altri compagni dietro la coltre di Oscurazione, attivando anche per loro i poteri di Cappa d'Ombra o di Passaggio Invisibile.</li>
                            <li><b>Guisa dell'Impostore</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il cainita dopo aver studiato una persona, riesce a replicarne in tutto e per tutto l'aspetto e i comportamenti, apparendo praticamente come lei.</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Potenza</b>: aumenta la potenza fisica del cainita.
                        <ul>
                            <li><b>Corpo Letale</b> (&#9679;): il vampiro pu&ograve; infliggere danni aggravati con le sue nude mani agli umani.</li>
                            <li><b>Balzo Innaturale</b> (&#9679;): il vampiro, grazie alla sua poderosa forza, riesce a saltare molto pi&ugrave; lontano di quanto un mortale riesca a fare.</li>
                            <li><b>Prodezza</b> (&#9679;&#9679;): il vampiro, spendendo sangue, riesce ad aggiungere il proprio punteggio di Potenza alla Forza in combattimento senza armi, o in generale in test sulla forza.</li>
                            <li><b>Morso Brutale</b> (&#9679;&#9679;&#9679;): il vampiro riesce a bere un'incredibile quantit&agrave; di sangue quando si ciba, drenando il sangue da una vittima in pochi secondi. Viene solitamente impiegato in combattiento, quando la vittima riesce a piantare le proprie zanne nella vittima.</li>
                            <li><b>Scintilla di Rabbia</b> (&#9679;&#9679;&#9679; - Amalgama: Ascendente &#9679;&#9679;&#9679;): il vampiro riesce ad ispirare rabbia ferale o addirittura frenesia negli astanti.</li>
                            <li><b>Presa Sconcertante</b> (&#9679;&#9679;&#9679;): il vampiro riesce ad arrampicarsi senza difficolt&agrave;, usando le proprie dita per penetrare la dura pietra di una parete.</li>
                            <li><b>Pozione di Potenza</b> (&#9679;&#9679;&#9679;&#9679;): chiunque beva il Sangue del cainita acqusisce un numero di pallini di potenza pari alla met&agrave; per difetto di quelli che possiede il cainita.</li>
                            <li><b>Terremoto</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro, dando un pugno o un calcio al pavimento, riesce a provocare increspature nel terreno che fanno immediatamente cadere gli avversari, ma potrebbero anche far cadere case addosso all'utilizzatore.</li>
                            <li><b>Pugno di Caino</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il cainita riesce ad infliggere danni Aggravati con le sue nude mani, sia a cainiti che mortali.</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Proteide</b>: questo potere fa assumere al cainita un aspetto bestiale, e gli fa ereditare il potere delle fiere.
                        <ul>
                            <li><b>Occhio della Bestia</b> (&#9679;): Gli occhi del vampiro emanano un bagliore rosso, e il cainita riesce a vedere anche nella pi&ugrave; completa oscurit&agrave;.</li>
                            <li><b>Peso di una Piuma</b> (&#9679;): il vampiro diventa leggero come una piuma, evitando di far scattare sensori di pressione, evitare danni da caduta. Il vampiro non potr&agrave; effettuare salti enormi, dato che anche la sua Forza &egrave; proporzionalmente ridotta.</li>
                            <li><b>Armi Ferali</b> (&#9679;&#9679;): le armi naturali del vampiro si allungano mostruosamente, diventando artigli o denti da serpente. Gli artigli e i denti causano danni aggravati ai mortali, e i danni superficiali causati ai vampiri non potranno essere dimezzati come normalmente avviene.</li>
                            <li><b>Fondersi con la Terra</b> (&#9679;&#9679;&#9679;): il vampiro riesce a fondersi con la terra sottostante, posto che la terra sia naturale. A meno che non sia in torpore, il vampiro riuscir&agrave; a risvegliarsi la notte successiva.</li>
                            <li><b>Cambio di Forma</b> (&#9679;&#9679;&#9679;): il vampiro riesce a trasformarsi in un animale pi&ugrave; o meno del suo stesso peso, con nessuna parvenza soprannaturale.</li>
                            <li><b>Metamorfosi</b> (&#9679;&#9679;&#9679;&#9679;): <b>Prerequisito: Cambio di Forma</b> il vampiro ora riesce a trasformarsi in animali di diverso peso e forma rispetto all'aspetto naturale, come pipistrelli, o corvi.</li>
                            <li><b>Forma di Nebbia</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro si trasforma in nebbia, e pu&ograve; soffrire danni solo da fuoco, Sole o altri rituali magici soprannaturali. Solo forti folate di vento potranno far sobbalzare la coltre di nebbia.</li>
                            <li><b>Cuore senza Restrizioni</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro controlla la sua forma anche interiormente, riuscendo a spostare il cuore dalla sua posizione originale, rendendolo incredibilmente difficile da bloccare con paletti.</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Robustezza</b>: la Disciplina aumenta l'innaturale resilienza del vampiro.
                        <ul>
                            <li><b>Resilienza</b> (&#9679;): il vampiro diventa immensamente resiliente: aggiunge il punteggio di Robustezza alla Salute.</li>
                            <li><b>Mente Ininfluenzabile</b> (&#9679;): il vampiro protegge la sua mente da tentativi di coercizione di qualsiasi tipo.</li>
                            <li><b>Durezza</b> (&#9679;&#9679;): il vampiro riesce ad usare il suo punteggio di Robustezza per sottrarre i danni superficiali inflitti dai nemici.</li>
                            <li><b>Bestie Resilienti</b> (&#9679;&#9679; - Amalgama con Animalismo &#9679;): il vampiro condivide la sua resilienza innaturale con gli animali che controlla, garantendogli alcuni dei benefici di Robustezza.</li>
                            <li><b>Sfidare la Maledizione</b> (&#9679;&#9679;&#9679;): il vampiro pu&ograve; convertire danni aggravati in una scena in danni superficiali, fino ad un massimo del suo punteggio di Robustezza, e non potr&agrave; guarire questi danni per il resto della scena.</li>
                            <li><b>Fortificare la Barriera Interna</b> (&#9679;&#9679;&#9679;): il vampiro fortifica la sua mente, invece della sua pelle, riuscendo ad impedire e resistere a tentativi di scrutinio dell'aura o dei suoi pensieri. La sua mente appare vuota, e l'aura piatta.</li>
                            <li><b>Pozione di Robustezza</b> (&#9679;&#9679;&#9679;&#9679;): la vittima condensa il potere di Robustezza nel suo sangue, infondendolo a chiunque lo beva.</li>
                            <li><b>Carne di Marmo</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): la pelle del cainita diventa di marmo, riuscendo a deviare uno degli attacchi che, per turno, gli vengono inferti.</li>
                            <li><b>Prodezza dal Dolore</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il cainita non soffre pi&ugrave; gli impedimenti dati dalla perdita di punti salute, fino al torpore. Riesce ad agire normalmente anche se incapacitato.</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Thin-Blood Alchemy</b>: Thin-Blood Alchemy</li>
                    <li style={liStyle}><b>Velocità</b>: questa Disciplina aumenta la naturale grazie e la velocit&agrave; di movimento di un vampiro
                        <ul>
                            <li><b>Grazie Felina</b> (&#9679;): il vampiro assume la grazia e la destrezza di un ginnasta olimpico.</li>
                            <li><b>Riflessi Rapidi</b> (&#9679;): questo potere (passivo) del vampiro gli consente di percepire ad una velocit&agrave; incredibile pericoli altrimenti letali. Pu&ograve; arrivare anche ad evitare frecce, o a scansare pallottole senza copertura.</li>
                            <li><b>Leggerezza</b> (&#9679;&#9679;): il vampiro a questo livello si muove con una velocit&agrave; incredibile. Aggiunge il valore di Velocit&agrave; all'ammontare di Destrezza, anche per difesa nei combattimenti.</li>
                            <li><b>Battito di Ciglia</b> (&#9679;&#9679;&#9679;): il vampiro pu&ograve; ingaggiare subito battaglia dopo aver percorso fino ad una cinquantina di metri (avendo a disposizione ancora un'azione), o fuggire immediatamente dalla scena.</li>
                            <li><b>Attraversamento</b> (&#9679;&#9679;&#9679;): il vampiro riesce a scalare pareti verticali per una buona distanza, o addirittura riesce a correre sull'acqua, con la dovuta rincorsa.</li>
                            <li><b>Pozione di Velocit&agrave;</b> (&#9679;&#9679;&#9679;&#9679;): il Sangue del vampiro riesce a trasmettere la met&agrave; dei pallini per difetto a chiunque beva il suo sangue.</li>
                            <li><b>Colpo Fulmineo</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro riesce a colpire un bersaglio in mischia senza che questi possa difendersi (Diff. 1), a meno che anche il bersaglio possegga Velocit&agrave; 5.</li>
                            <li><b>Frazione di Secondo</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro &egrave; cos&igrave; veloce che riesce ad agire in base ai suoi riflessi soprannaturali. Pu&ograve; passare attraverso una porta che si sta chiudendo, o apparire dietro un nemico in procinto di effettuare un'imboscata.</li>
                        </ul>
                    </li>
                </ul>
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Background
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <ul>
                    {showAttributes("Advantage")}
                </ul>
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Pregi e Difetti
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>

                <ul>
                    <li style={liStyle}>
                        <b>Linguista</b>: si condidera normalmente che il personaggio &egrave; capace di parlare la propria madre lingua.
                        Acquistendo un numero variabile di pallini in questo Pregio, potrete parlare una lingua aggiuntiva per pallino.
                        Questo Pregio &egrave; fondamentale per personaggio che provengono da paesi in cui non si parla spagnolo, e dovranno
                        acquisire almeno un pallino.<br />
                        <b>Difetto: (&bull;&bull;) Illitterato</b>: il personaggio non sa n&eacute; scrivere n&eacute; leggere. Il
                        personaggio potr&agrave; acquisire un solo pallino in Scienze e Accademiche, e non potrete acquisire nessuna
                        specializzazione concernente la modernit&agrave;.
                    </li>

                    <li style={liStyle}>
                        <b>Aspetto</b>: Il vampiro ha un bell'aspetto, o un aspetto orribile. Questo lo aiuta o lo ostacola nelle
                        interazioni sociali dove questa caratteristica indubbiamente influisce. A seconda dell'entit&agrave; del
                        Pregio o del Difetto, il Narratore potr&agrave; considerare una Difficolt&agrave; nei tiri sociali diminuita
                        o aumentata.<br />
                        <b>Difetto: (&bull;&bull;) Repulsivo</b>: il personaggio perde due dadi dall'ammontare nelle interazioni
                        sociali in cui l'aspetto &egrave; determinante.<br />
                        <b>Difetto: (&bull;) Brutto</b>: il personaggio perde un dado dall'ammontare nelle interazioni
                        sociali in cui l'aspetto &egrave; determinante.<br />
                        <b>Pregio: (&bull;&bull;) Bello</b>: il personaggio aggiunge un dado dall'ammontare nelle interazioni
                        sociali in cui l'aspetto &egrave; determinante.<br />
                        <b>Pregio: (&bull;&bull;&bull;&bull;) Stupendo</b>: il personaggio aggiunge due dadi dall'ammontare
                        nelle interazioni sociali in cui l'aspetto &egrave; determinante, ma il suo aspetto sar&agrave;
                        cos&igrave; evidente che sar&agrave; difficile rendersi credibile in altri contesti (intimidazioni).
                        In casi estremi, potrebbe attirare anche attenzioni indesiderate.
                    </li>

                    <li style={liStyle}>
                        <b>Dipendente</b>: Il vampiro dipende da un'altra sostanza oltre al Sangue, e la cerca attivamente
                        nel Sangue delle sue vittime. La dipendenza da una sostanza comporta che, all'assunzione, questa
                        agisca anche sul metabolismo non-morto del cainita, producendo gli stessi effetti che avrebbe su
                        un mortale.<br />
                        <b>Nota</b>: nel sito, se il giocatore vorr&agrave; prendere questo difetto, dovr&agrave; indicare
                        due risonanze che la sostanza da cui &egrave; dipendente ispira. Se l'ultima caccia non avr&agrave;
                        quelle risonanze, si considerer&agrave; che il vampiro <b>non si &egrave; nutrito di sangue con
                            la sostanza di cui &egrave; dipendente</b>.<br />
                        <b>Difetto: (&bull;&bull;) Dipendenza cronica</b>: si perdono due dadi dall'ammontare di <b>tutti</b>
                        i tiri di dado dopo che il personaggio si &egrave; cibato di un mortale che non conteneva la sostanza,
                        a meno che le azioni non portino al consumo proprio di quella sostanza.<br />
                        <b>Difetto: (&bull;) Dipendenza</b>: si perdono due dadi dall'ammontare di <b>tutti</b>
                        i tiri di dado dopo che il personaggio si &egrave; cibato di un mortale che non conteneva la sostanza,
                        a meno che le azioni non portino al consumo proprio di quella sostanza.<br />
                        <b>Pregio: (&bull;) Dipendente altamente funzionale</b>: il personaggio aggiunge un dado all'ammontare
                        di tutti i dadi dopo essersi nutrito della sostanza di cui &egrave; dipendente. In questo caso, il
                        giocatore dovr&agrave; identificare <b>solo una</b> risonanza con la quale potr&agrave; sfruttare
                        il dado in pi&ugrave;.
                    </li>

                    <li style={liStyle}>
                        <b>Reazione al legame</b>: Il vampiro o il mortale reagisce in modo diverso dal normale ai legami di
                        sangue.<br />
                        <b>Difetto: (&bull;&bull;) Schiavo del Sangue</b>: il personaggio &egrave; completamente legato ad
                        un vampiro solo dopo un sorso di sangue, invece di tre. Si dovr&agrave; indicare come si &egrave;
                        estinto il precedente legame di sangue col Sire, o se il Sire &egrave; un giocatore / personaggio non
                        giocante all'interno del gioco.<br />
                        <b>Difetto: (&bull;) Dipendente dal Sangue</b>: il sapore del Sangue di un altro cainita &egrave;
                        pi&ugrave; dolce per il personaggio che per altri. Si sottrae un dado per ogni tiro usato per
                        resistere ad un legame di Sangue.<br />
                        <b>Difetto: (&bull;) Legame lungo</b>: il legame di sangue si esaurisce pi&ugrave; lentamente
                        per il personaggio. Si perde un livello di legame di sangue dopo tre mesi, invece che uno.<br />
                        <b>Pregio: (&bull;) Resistente al Legame</b>: il personaggio &egrave; particolarmente resistente
                        ai legami di sangue, ed aggiunge un dado per ogni livello (massimo 3) di questo Pregio all'ammontare
                        di tutti i dadi di resistenza al legame di sangue.
                        <b>Pregio: (&bull;&bull;) Legame corto</b>: i legami di Sangue durano meno per il personaggio. Un legame
                        perde efficacia dopo ogni luna nuova o luna piena (cio&egrave; due volte al mese).
                        <b>Pregio: (&bull;&bull;&bull;&bull;&bull;) Indipendente dal Legame</b>: i legami di Sangue non hanno
                        effetto sul personaggio. Il personaggio potrebbe anche pensare di vendere la sua vitae ad un alchimista.
                    </li>

                    <li style={liStyle}>
                        <b>Caccia</b>: Ci sono diversi pregi e difetti legati alla caccia e al morso, del tutto indipendenti
                        tra di loro.<br />
                        <b>Difetto: (&bull;&bull;) Vegano</b>: il personaggio riesce a cibarsi solo di animali, e dovr&agrave;
                        spendere due punti di Forza di Volont&agrave; per potersi cibare di un umano. I <b>Ventrue</b> non
                        potranno prendere questo Difetto.<br />
                        <b>Difetto: (&bull;&bull;) Organivoro</b>: il personaggio, oltre al sangue, deve consumare
                        anche gli organi e la carne delle vittime, specialmente gli organi ricchi di sangue.<br />
                        <b>Difetto: (&bull;) Esclusione di preda</b>: il cainita non pu&ograve; cibarsi di particolari
                        classi di prede. Se &egrave; costretto a farlo, guadagner&agrave; una <b>Macchia</b> (vedere
                        la sezione delle meccaniche di gioco). Il personaggio guadagner&agrave; una Macchia anche se
                        assister&agrave; alla caccia di un altro cainita ai danni della classe di prede di cui lui
                        non riesce a cibarsi senza intervenire.<br />
                        <b>Pregio: (&bull;) Mastino del sangue</b>: il personaggio riesce a captare la Risonanza del
                        sangue di un mortale con l'olfatto. Il personaggio potr&agrave; tentare un tiro di Risoluzione +
                        Allerta Diff. 3 a distanza di olfatto, 2 a distanza ravvicinata, 4 se altri odori sono presenti
                        nell'aria o se &egrave; ad una distanza maggiore.
                        <b>Pregio: (&bull;&bull;&bull;) Stomaco di ferro</b>: il cainita pu&ograve; cibarsi normalmente
                        di sangue freddo, rancido e plasma frazionato. Non guadagner&agrave; comunque Risonanza dal sangue.
                    </li>

                    <li style={liStyle}>
                        <b>Mitici</b>: i seguenti Pregi e Difetti riguardano credenze e caratteristiche soprannaturali
                        del cainita.<br />
                        <b>Difetto: (&bull;&bull;) Debole al Paletto</b>: il personaggio soffre la Morte ultima
                        quando viene trafitto da un paletto al cuore, invece di entrare semplicemente in torpore.<br />
                        <b>Difetto: (&bull;) Maledizione da folklore</b>: il personaggio subisce danni Aggravati
                        da una fonte di danno folkloristico, tra cui:
                        <ul>
                            <li>Acqua santa (come fuoco)</li>
                            <li>Argento: armi d'argento infliggono aggravati, e anche toccare una moneta d'argento
                                infligge danni aggravati
                            </li>
                            <li>Raggi UV (come Sole)</li>
                        </ul>
                        <b>Difetto: (&bull;) Blocco da Folklore</b>: il cainita ha un blocco psicologico dato da una
                        leggenda folkloristica. Il personaggio rifuggir&agrave; attivamente il confronto con questi
                        fenomeni, oppure dovr&agrave; spendere un punto di Forza di Volont&agrave; per oltrepassarli.
                        Il personaggio pu&ograve; avere pi&ugrave; di un blocco, e ogni blocco
                        sar&agrave; rappresentato da un punto aggiuntivo del difetto. Le leggende includono:
                        <ul>
                            <li>Oggetti sacri branditi da persone normali (senza Vera Fede)</li>
                            <li>Attraversare acqua corrente</li>
                            <li>Entrare non invitato in una casa</li>
                            <li>Animali bianchi</li>
                            <li>Aglio</li>
                            <li>Rose selvatiche</li>
                            <li>Semi caduti che non sono stati contati</li>
                        </ul>
                        <b>Difetto: (&bull;) Stigmate</b>: il personaggio comincia attivamente a sanguinare da ferite
                        aperte in tutto il corpo quando raggiunge Fame 4. Questo ovviamente attirer&agrave; l'attenzione,
                        e a discrezione del Narratore potr&agrave; provocare altri inconvenienti al vampiro.
                        <b>Pregio: (&bull;&bull;) Mangiare cibo</b>: normalmente un cainita non tollera l'ingestione di
                        cibo. Pu&ograve; trattenerlo nello stomaco se spende vitae per simulare di essere ancora in vita,
                        altrimenti dovr&agrave; vomitarlo subito. Personaggi con questo pregio invece riescono
                        a mangiare senza problemi, e possono anche provare piacere, al contrario del resto che
                        ogni volta che assaggia cibo &egrave; come se assaggiasse cenere di sigaretta.<br />
                        Il personaggio dovr&agrave; comunque espellere il cibo prima del riposo diurno.
                    </li>
                </ul>

            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Pregi e Difetti dei Sangue Debole
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                I seguenti pregi e difetti non hanno valore, perch&egrave; fanno parte delle caratteristiche dei
                Sangue Debole. I personaggi di Sangue Debole, in altre parole, dovranno prendere almeno un pregio e
                un difetto di Sangue Debole, e non vedranno aumentare i propri punti nei Vantaggi. Per maggiori
                informazioni, consultare la <Link to={GuideRoutes.creation}>guida della creazione della scheda</Link>.
            </Typography>

            <Typography paragraph>
                <h4 style={titleStyle}>
                    Difetti
                </h4>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <ul>
                    <li style={liStyle}>
                        <b>Denti da Latte</b>: i denti del personaggio non si sono mai sviluppati correttamente,
                        o non esistono affatto, e sono inutili nel Morso. Il personaggio dovr&agrave; tagliare la
                        vittima per poter bere, o estrarre il sangue con una siringa.
                    </li>

                    <li style={liStyle}>
                        <b>Temperamento della Bestia</b>: il personaggio soffre la Bestia come qualsiasi altro cainita.
                        Dovr&agrave; sottoporsi agli stessi test sulla frenesia dei vampiri normali.
                    </li>

                    <li style={liStyle}>
                        <b>Marchiato dalla Camarilla</b>: molti Principi della Camarilla cacciano i Sangue Debole
                        a vista e li distruggono. Altri invece li marchiano, aspettando che commettano la pur minima
                        infrazione per cacciarli e ucciderli come i loro colleghi. Il tuo personaggio &egrave;
                        stato marchiato dallo Scheriffo di una citt&agrave; Camarilla, e il marchio &egrave; una
                        ferita incurabile. Alla prossima infrazione, il personaggio avr&agrave; tutta la Camarilla
                        al suo inseguimento.<br />
                        &Egrave; ancora possibile prendere il Background Contatti con un PnG Camarilla.
                    </li>

                    <li style={liStyle}>
                        <b>Maledizione di Clan</b>: il personaggio soffre della maledizione del clan del cainita che
                        l'ha abbracciato. La severit&agrave; del difetto &egrave; da considerarsi 1. Se il sangue
                        Debole ha acquisito il difetto <b>Temperamento della Bestia</b>, potr&agrave; acquisire
                        solamente la maledizione di clan Brujah o Gangrel, mentre potr&agrave; acquisire quella Tremere
                        solamente se acquisisce anche il Pregio Sangue Debole <b>Sangue incatenante</b>.
                    </li>

                    <li style={liStyle}>
                        <b>Carne Morta</b>: il Sangue del personaggio &egrave; troppo debole per sostenere la sua
                        natura non-morta, e quindi le sue carni sono sempre in uno stato di decomposizione. Oltre
                        all'odore grigiastro, la pelle emana anche un nauseabondo odore di putrefazione. Il Sangue Debole
                        sottrarr&agrave; un dado all'ammontare di ogni tiro di interazione sociale con un umano, e
                        ovviamente non potr&agrave; prendere il pregio <b>Come vivo</b>.
                    </li>

                    <li style={liStyle}>
                        <b>Fragilit&agrave; mortale</b>: il Sangue non riesce a guarire le ferite del vampiro, e quindi
                        dovr&agrave; guarire danni come un mortale. Il personaggio non potr&agrave; acquisire il Pregio
                        <b>Resilienza Vampirica</b> se prende questo difetto.
                    </li>

                    <li style={liStyle}>
                        <b>Evitato dagli Anarchici</b>: il personaggio ha in qualche modo fatto infuriare qualche
                        Anarchico. Come risultato, tutti gli Anarchici del Regnum lo evitano, e piuttosto che averci
                        a che fare, lo consegnerebbero alla Camarilla. Se prende questo Difetto, il personaggio
                        non potr&agrave; acquisire il Pregio <b>Compagni Anarchici</b>.
                    </li>

                    <li style={liStyle}>
                        <b>Dipendenza dalla Vitae</b>: il Sangue del personaggio &egrave; troppo debole. Per questo
                        motivo, se il personaggio non riesce a bere una quantit&agrave; di sangue pari ad un pallino
                        di Fame di Vitae Vampirica, il personaggio non potr&agrave; usare i poteri Vampirici,
                        inclusa la Alchimia di Sangue Debole.
                    </li>
                </ul>
            </Typography>

            <Typography paragraph>
                <h4 style={titleStyle}>
                    Difetti
                </h4>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <ul>
                    <li style={liStyle}>
                        <b>Compagni Anarchici</b>: il personaggio &egrave; riuscito ad amicarsi una coterie Anarchica,
                        che lo sopporta, e alla meglio addirittura lo tratta come un animale da compagnia. Prendendo
                        questo Pregio, si deve acquisire anche un pallino di Mawla, corrispondente alla Coterie Anarchica.
                    </li>

                    <li style={liStyle}>
                        <b>Camarilla Contact</b>: il personaggio &egrave; riuscito ad amicarsi un cainita della Camarilla
                        che lo tratta (malamente) come informatore, in cambio della possibilit&agrave; di entrare a far
                        parte della Camarilla diventando un Fratello a tutti gli effetti. Prendendo questo Pregio, si
                        deve acquisire anche un pallino di Mawla, corrispondente alla Contatto nella Camarilla.
                    </li>

                    <li style={liStyle}>
                        <b>Sangue Incatenante</b>: il vampiro Sangue Debole pu&ograve; Abbracciare e creare legami di
                        sangue come un cainita normale, anche se tutti i vampiri creati dal Sangue Debole, saranno
                        a loro volta dei Sangue Debole.
                    </li>

                    <li style={liStyle}>
                        <b>Day Drinker</b>: la luce del Sole fa ancora meno danni al Sangue Debole rispetto al normale.
                        Stando alla luce del Sole, il vampiro dimezza (per eccesso) la Salute, e non pu&ograve; usare
                        i poteri del Sangue, per il resto non soffre altri danni.<br />
                        La Fame per&ograve; continua a venire percepita, e il vampiro sentir&agrave; il bisogno di
                        riposare. Se inoltre i danni subiti supereranno i livelli di salute dimezzati, il vampiro
                        entrer&agrave; in torpore finch&egrave; non verr&agrave; tolto dalla luce del Sole.
                    </li>

                    <li style={liStyle}>
                        <b>Affinit&agrave; di Disciplina</b>: il Sangue Debole ha una affinit&agrave; con una
                        Disciplina. Il personaggio acquisisce questa Disciplina in creazione, e potr&agrave;
                        aumentarne il valore come se fosse un vampiro normale. Il Pregio pu&ograve; essere
                        preso solo in fase di creazione, e la Risonanza del sangue non avr&agrave; nessun
                        effetto sull'ammontare dei dadi per la Disciplina.
                    </li>

                    <li style={liStyle}>
                        <b>Come Vivo</b>: il personaggio ha un battito cardiaco, pu&ograve; mangiare cibo, e
                        approfittare dell'attivit&agrave; sessuale come un qualunque umano. Nessuna ispezione
                        medica, se non di altissima precisione, individua nessuna anomalia... di notte.
                    </li>

                    <li style={liStyle}>
                        <b>Alchimia di Sangue Debole</b>: il Sangue Debole cambia quando si nutre. L'Alchima
                        del Sangue sublima e aumenta l'intensit&agrave; di questo cambiamento. Che sia spontaneo
                        o il risultato degli insegnamenti di un mentore, o la lettura di note e formule di altri
                        "cuochi", il personaggio acquisisce un pallino di Alchimia di Sangue. Il personaggio
                        pu&ograve; acquisire altri punti di Alchimia del Sangue come se fosse una Disciplina
                        con l'esperienza. Questo Pregio pu&ograve; essere acquisito in gioco.
                    </li>

                    <li style={liStyle}>
                        <b>Resilienza Vampirica</b>: il personaggio soffre dei danni come un vampiro, e quindi
                        proiettili e danni da armi da taglio verranno considerati come dei semplici danni
                        superficiali.
                    </li>
                </ul>
            </Typography>
        </>
    );
}

export default GuidesAttributes;
