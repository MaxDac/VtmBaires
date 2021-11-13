// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {guideStyle, liStyle, titleStyle} from "../../GuidesStyles";
import {GuideRoutes} from "../../GuidesMain";

type Props = {

}

const GuidesAttributesDisciplines = (props: Props): any => {
    return (
        <>
            <Typography paragraph>
                <h3 style={titleStyle}>
                    Discipline
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Le Discipline costituiscono l'insieme di poteri e di conoscenze che rendono i vampiri potenti esseri soprannaturali.
                Con il nuovo regolamento di Vampiri: la Masquerade&trade;, sono stati introdotti pi&ugrave; poteri per lo stesso livello di
                Disciplina, ma un personaggio potr&agrave; acquistare <b>un solo potere per livello di Disciplina</b>, includendo anche i poteri
                amalgama, per i quali sar&agrave; necessario avere anche il punteggio richiesto nella seconda Disciplina.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Di seguito proponiamo un veloce riassunto dei poteri acquisibili in creazione.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <ul>
                    <li style={liStyle}><b>Animalità</b>: i poteri di Animalit&agrave; hanno a che fare con la Bestia interiore, del personaggio e altrui.
                        <ul>
                            <li style={liStyle}>
                                <b>Legare il <i>Famulus</i></b> (&#9679;): crea un legame mentale con un animale legato di Sangue.<br />
                                <b>Sistema</b>: tiro di Carisma + Affinit&agrave; animale Diff. 2 per ordini semplici, maggiore per pi&ugrave; complessi.
                            </li>

                            <li style={liStyle}>
                                <b>Percepire la Bestia</b> (&#9679;): il vampiro riesce a percepire la Bestia negli altri, intuendo se si tratta di una Bestia soprannaturale (cainiti o lupini) o meno.<br />
                                <b>Sistema</b>: tiro contrastato di Fermezza + Animalit&agrave; del Cainita contro Autocontrollo + Sotterfugio del bersaglio.
                            </li>
                            
                            <li style={liStyle}>
                                <b>Sussurri Ferali</b> (&#9679;&#9679;): il vampiro pu&ograve; entrare in contatto con un animale, scambiando informazioni basiche (carenza di prede). Il vampiro pu&ograve;
                                anche tentare di chiamare un gruppo di un preciso animale.<br />
                                <b>Sistema</b>: 1 Rouse Check, poi tiro di Manipolazione + Animalit&agrave; (convincere un animale) o Carisma + Animalit&agrave; (richiamare un animale), 
                                Diff. 3 per ordini semplici, 6 per ordini di vita o morte; 2 per richiamare animali presenti nei dintori, 6 per richiamarne da lontano.
                            </li>

                            <li style={liStyle}>
                                <b>Succulenza animale</b> (&#9679;&#9679;&#9679;): il vampiro pu&ograve; soddisfare la sua Fame con un animale come se fosse sangue umano, riducendo enormemente le controindicazioni.<br />
                                <b>Sistema</b>: il vampiro riesce a soddisfare la sua Fame con animali, indipendentemente dalla Potenza del Sangue. Se inoltre consuma un Famulus, raggiunge automaticamente Fame 1.
                            </li>

                            <li style={liStyle}>
                                <b>Domare la Bestia</b> (&#9679;&#9679;&#9679;): calma la Bestia in un umano, riducendolo ad uno stato semi letargico, o un vampiro, limitandone i poteri e, possibilmente, facendolo uscire dalla Frenesia.<br />
                                <b>Sistema</b>: 1 Rouse Check, tiro contrastato di Carisma + Animalit&agrave; contro Costituzione + Fermezza. Se la vittima &egrave; umana, cadr&agrave; in uno stato letargico. Se &egrave; un vampiro,
                                non potr&agrave; aumentare i propri Attributi col Sangue, e durer&agrave; un numero di turni pari ai successi supplementari + 1. Se il vampiro ottiene un successo critico, la vittima
                                uscir&agrave; dalla Frenesia.
                            </li>

                            <li style={liStyle}>
                                <b>Sciame non-morto</b> (&#9679;&#9679;&#9679; - Amalgama con Oscurazione &#9679;&#9679;): (Nosfeatu) il vampiro riesce ad estendere il proprio controllo ad uno sciame di insetti.
                                <b>Sistema</b>: i poteri che precedentemente potevano prendere di mira solo i vertebrati, adesso si possono usare con sciami di insetti, che possono anche vivere nelle cavit&agrave; interne del vampiro.
                            </li>

                            <li style={liStyle}>
                                <b>Sottomettere lo spirito</b> (&#9679;&#9679;&#9679;&#9679;): il vampiro trasferisce la sua mente in un animale, prendendone completamente il possesso (mentre il corpo del vampiro rimane indifeso, in uno stato simile al Torpore).
                                <b>Sistema</b>: 1 Rouse Check, 0 se la vittima &egrave; il <i>famulus</i>, poi Manipolazione + Animalit&agrave; Difficolt&agrave; 4. Se il corpo del vampiro subisce danni, o se l'animale muore, la trance finisce e il vampiro perde 
                                1 punto di Forza di Volont&agrave;.
                            </li>

                            <li style={liStyle}>
                                <b>Dominio Animale</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il controllo del vampiro sul Regno Animale &egrave; cos&igrave; grande che ora riesce a compandare interi stormi, o branchi di animali, che possono arrivare
                                a lanciarsi in spregio della propria vita per proteggere il Cainita.<br />
                                <b>Sistema</b>: 2 Rouse Checks, poi Carisma + Animalit&agrave;, Difficolt&agrave; 3 per ordini semplici, Diff. 5 per ordini che possono costare la vita al branco o allo stormo.
                            </li>

                            <li style={liStyle}>
                                <b>Scacciare la Bestia</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): quando il vampiro sta per perdere il controllo alla Bestia per paura o per rabbia, pu&ograve; scacciare la sua Bestia, inviandola in un mortale o un
                                vampiro nelle vicinanze, e quest'ultimo sperimenter&agrave; la Frenesia al posto del vampiro.<br />
                                <b>Sistema</b>: 1 Rouse Check, quindi tiro contrastato di Prontezza + Animalit&agrave; contro Autocontrollo + Fermezza. Se il tiro fallisce, il vampiro entra in Frenesia automaticamente. Se riesce, la vittima entra in Frenesia al suo posto.<br />
                                Non sar&agrave; possibile trasferire Frenesia di Fame, e successivamente il vampiro potr&agrave; ancora entrare in Frenesia se sottoposto ad altri stimoli.
                            </li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Ascendente</b>: aumenta il naturale charme del Cainita.
                        <ul>
                            <li style={liStyle}>
                                <b>Soggezione</b> (&#9679;): la presenza del vampiro diventa immediatamente un punto di riferimento, quasi impossibile da ignorare. Non ispira infatuazioni, ma sicuramente riesce a catturare l'attenzione sul vampiro.
                                <b>Sistema</b>: 
                            </li>
                            <li><b>Intimidazione</b> (&#9679;): il vampiro, invece di attirare su di s&eacute; l'attenzione, usa il potere per intimidire, minacciare quelli che gli stanno attorno. I mortali eviteranno immediatamente di dare attenzione al vampiro, e anche i vampiri avranno remore ad interfacciarsi col Cainita.</li>
                            <li><b>Bacio Persistente</b> (&#9679;&#9679;): il Bacio del vampiro, il suo morso, induce un'estasi molto superiore a quella di un normale Bacio, tanto che i mortali vittime di questo potere ne diventano dipendenti, con conseguente anemia o anche morte.</li>
                            <li><b>Sguardo Terribile</b> (&#9679;&#9679;&#9679;): il vampiro riesce a condensare la sua natura soprannaturale in un singolo, terribile sguardo, che blocca i mortali di terrore, costringendoli a fuggire o a rimanere bloccati dalla paura, e nei vampiri arriva a causare R&ouml;tschreck.</li>
                            <li><b>Ammaliamento</b> (&#9679;&#9679;&#9679;): il vampiro instilla meraviglia e infatuazione ai massimi livelli in una singola vittima, che tratter&agrave; il vampiro come il suo idolo.</li>
                            <li><b>Voce Irresistibile</b> (&#9679;&#9679;&#9679;&#9679; - Amalgama: Dominazione &#9679;): il vampiro ora necessita solo della sua voce per comandare la sua vittima, non pi&ugrave; del suo sguardo.</li>
                            <li><b>Convocazione</b> (&#9679;&#9679;&#9679;&#9679;): il vampiro pu&ograve; convocare qualsiasi mortale o Cainita su cui abbia precedentemente usato Soggezione, Ammaliamento o Maest&agrave;, oppure che abbia assaggiato una volta il suo sangue.
                                La vittima non metter&agrave; in pericolo la sua vita n&eacute; far&agrave; follie per raggiungere il Cainita, ma si prodigher&agrave; comunque per raggiungerlo. La vittima sapr&agrave; chi lo sta chiamando e la sua posizione.</li>
                            <li><b>Maest&agrave;</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro, a questo livello, diventa una vera e proprio immagine angelica o mostruosamente infernale, lasciando mortali e cainiti attorno senza parole, senza la possibilit&agrave; di agire, se non continuando a guardare il Cainita.</li>
                            <li><b>Magnetismo da Star</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): gli effetti di Ascendente adesso hanno effetto anche su chi sta vedendo i loro <i>live feeds</i>, o li sente per telefono. Il potere non ha effetto a posteriori.</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Auspex</b>: la Disciplina sensoriale per eccellenza, ha a che fare con la Percezione soprannaturale dei vampiri
                        <ul>
                            <li style={liStyle}>
                                <b>Sensi sviluppati</b> (&#9679;): i sensi del vampiro si amplificano a dismisura, dandogli la possibilit&agrave; di vedere nella quasi oscurit&agrave;, percepire ultrasuoni o l'odore del sangue a distanza.<br />
                                <b>Sistema</b>: automatico. Il vampiro aggiunge il suo punteggio di Auspex a tutti i tiri basati sulla percezione. Se esposto a violenti stimoli sensoriali, come esplosioni o flash, deve tirare Prontezza + Fermezza Diff. 3 per non venire
                                confusi; in caso di fallimento, il vampiro sperimenter&agrave; una penalit&agrave; a tutti i tiri basati sulla percezione di -3 per il resto della Scena.
                            </li>

                            <li style={liStyle}>
                                <b>Vedere l'Invisibile</b> (&#9679;): il vampiro riesce ad individuare presenze celate in modo soprannaturale, come vampiri che stanno usando Oscurazione, o spiriti.<br />
                                <b>Sistema</b>: automatico, le creature che si potranno vedere saranno a discrezione del Narratore.
                            </li>

                            <li style={liStyle}>
                                <b>Premonizione</b> (&#9679;&#9679;): questo potere fornisce al vampiro dei lampi di intuizione. Il vampiro riesce a ricordare un dettaglio prima ritenuto insignificante, o a captare i segnali di una imboscata.<br />
                                <b>Sistema</b>: se non scatenata dal Narratore, il personaggio dovr&agrave; concentrarsi su un oggetto, effettuare 1 Rouse Check e tirare Fermezza + Auspex: il numero di successi determiner&agrave; la quantit&agrave;
                                di informazioni che il personaggio intuir&agrave;.
                            </li>

                            <li style={liStyle}>
                                <b>Scrutare l'Anima</b> (&#9679;&#9679;&#9679;): il vampiro riesce a captare l'aura di una persona, individuandone i sentimenti e le caratteristiche.<br />
                                <b>Sistema</b>: il personaggio effettua 1 Rouse Check, quindi tira Intelligenza + Auspex contro Autocontrollo + Sotterfugio della vittima. Il numero di successi supplementari indicher&agrave; quante informazioni il vampiro riuscir&agrave; 
                                ad ottenere dalla vittima. In caso di giocata libera, il personaggio potr&agrave; fare tre domande sullo stato emotivo del bersaglio. Il potere ha effetto anche sulle folle, ma in quel caso sar&agrave; necessaria la presenza
                                del Narratore.
                            </li>

                            <li style={liStyle}>
                                <b>Condivisione dei Sensi</b> (&#9679;&#9679;&#9679;): il vampiro riesce a percepire informazioni sensoriali di qualcuno in linea visuale, oppure, a lunga distanza, di qualcuno che ha ancora qualche goccia del suo sangue.<br />
                                <b>Sistema</b>: effettuare 1 Rouse Check, quindi tirare Fermezza + Auspex a Difficolt&agrave; 3, o pi&ugrave; se il bersaglio &egrave; distante. &Egrave; impossibile accorgersi della condivisione senza usare Vedere l'Invisibile,
                                ma se la vittima si accorge dell'intrusione, dovr&agrave; riuscire in un tiro di Prontezza + Fermezza contro Prontezza + Fermezza del perpetratore: se il tiro riesce, il vampiro non potr&agrave; condividere i sensi per il resto
                                della notte.
                            </li>
                            <li style={liStyle}>
                                <b>Tocco degli Spiriti</b> (&#9679;&#9679;&#9679;&#9679;): il vampiro riesce a percepire residui di emozione o altri indizi impossibili da decifrare con mezzi tradizionali toccando un oggetto inanimato.<br />
                                <b>Sistema</b>: effettuare 1 Rouse Check, quindi tirare Intelligenza + Auspex a Difficolt&agrave; determinata dal Narratore. Questo potere non potr&agrave; essere usato in una giocata libera.
                            </li>
                            <li style={liStyle}>
                                <b>Chiaroveggenza</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): entrando in un leggero stato di <i>trance</i>, il vampiro riesce a percepire qualsiasi cosa fuori dall'ordinario in un quartiere o, se all'esterno o in un'area scarsamente popolata, in un'area di svariati chilometri.<br />
                                <b>Sistema</b>: effettuare 1 Rouse Check, quindi tirare Intelligenza + Auspex ad una Difficolt&agrave; determinata dal Narratore. Questo potere non potr&agrave; essere usato in giocate libere.
                            </li>
                            <li style={liStyle}>
                                <b>Possessione</b> (&#9679;&#9679;&#9679;&#9679;&#9679; - Amalgama con Dominazione &#9679;&#9679;&#9679;): il vampiro acquisisce il controllo completo del corpo di un mortale.<br />
                                <b>Sistema</b>: questo potere ha effetto solo su mortali. Effettuare 2 Rouse Checks, quindi tirare Fermezza + Auspex contro Fermezza + Intelligenza della vittima. Se il tiro finisce in pareggio, pu&ograve; 
                                essere ritentato, in quanto la Possessione &egrave; una Disciplina che implica una lotta di volont&agrave; tra il vampiro e la sua vittima. Se il vampiro fallisce totalmente, non potr&agrave; pi&ugrave; 
                                possedere il mortale per il resto della scena.
                            </li>
                            <li style={liStyle}>
                                <b>Telepatia</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro riesce a leggere la mente di mortali o vampiri (anche se questi ultimi con un po' pi&ugrave; di fatica). Riesce anche ad impiantare pensieri nella mente della vittima.
                                <b>Sistema</b>: effettuare 1 Rouse Check, quindi tirare Fermezza + Auspex contro Prontezza + Sotterfugio della vittima. Se la vittima &egrave; consenziente, o se il vampiro vuole semplicemente trasmettere un pensiero alla vittima,
                                sia essa mortale o Cainita, non dovr&agrave; effettuare nessun tiro.
                            </li>
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
                                    <li><b>Calderone di Sangue</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): attraverso questo terribile potere, il vampiro fa bollire letteralmente il sangue nelle vene della vittima, mortale o Cainita, provocando la morte quasi certa del mortale, e danni Aggravati per i cainiti.</li>
                                </ul>
                            </li>
                            <li>
                                <b>Banu Haqim</b>
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
                            <li><b>Ordine Sommerso</b> (&#9679;&#9679;&#9679;): il vampiro riesce stavolta ad usare lo stesso potere di <b>Mesmerismo</b>, ma la suggestione, l'ordine rimarr&agrave; dormiente, finch&eacute; non si verificher&agrave; una condizione specifica dettata dal Cainita. La direttiva pu&ograve; rimanere sommersa per anni, prima di attivarsi.</li>
                            <li><b>Razionalizzazione</b> (&#9679;&#9679;&#9679;&#9679;): la vittima dei poteri di Dominazione &egrave; ora convinta di aver agito secondo il proprio libero arbitrio. L'uso prolungato di questa Disciplina pu&ograve; provocare seri traumi.</li>
                            <li><b>Manipolazione di Massa</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il Cainita pu&ograve; ora usare i poteri di dominazione su un'intera folla di mortali, o anche su un gruppo di altri cainiti.</li>
                            <li><b>Decreto Finale</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): i comandi dati con Dominazione adesso vengono eseguiti anche se la vittima percepisce chiaramente che questi gli faranno attivamente danno, o la porteranno alla morte (o alla Morte Ultima, nel caso dei vampiri).</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Oblivion</b>: questa Disciplina sacrilega prende il suo potere in parte dalla vitae del Cainita, ed in parte dalle energie oltre il Velo che separa il regno dei vivi da quello dei morti.
                        Lasombra e Hecata sembrano sfruttare le stesse tecniche per <b>connettersi</b> con i loro poteri, ma i luoghi che raggiungono sono diametralmente opposti, e cos&igrave; anche le conoscenze che hanno accumulato.
                        <ul>
                            <li>
                                <b>Lasombra</b>
                                <ul>
                                    <li><b>Mantello d'Ombra</b> (&#9679;): applicando il loro potere alle ombre ambientali, il Cainita riesce ad apparire pi&ugrave; sinistro ed inquietante.</li>
                                    <li><b>Veduta dell'Oblivion</b> (&#9679;): il vampiro chiude gli occhi, ed al riaprirli, le sue iridi sono completamente nere. Ora riesce a vedere nell'ombra pi&ugrave; nera, facendo fatica a vedere invece alla luce, come se la vista si fosse invertita.
                                        Riescono anche a percepire Presenze oltre il Velo che non stiano attivamente cercando di nascondersi dal Cainita.</li>
                                    <li><b>Proiettare l'Ombra</b> (&#9679;&#9679;): i poteri di Oblivion spesso falliscono per via della mancanza di ombre. Questo potere consente all'utilizzatore di far sgorgare l'ombra interna del vampiro. Questa ombra seguir&agrave; le movenze del vampiro, proiettandone la figura,
                                        anche se a volte potr&agrave; assumere contorni inquietanti, riflettendo la propensione e l'umore del vampiro che le ha evocate.</li>
                                    <li><b>Braccia di Ahriman</b> (&#9679;&#9679; - Amalgama: Potenza &#9679;&#9679;): il vampiro riesce ad evocare lingue d'ombra che si dipanano da zone di oscurit&agrave; ambientale, scorrendo sulle superfici e percorrendo la vittima, tentando di stritolarla.
                                        Il vampiro non potr&agrave; fare nulla finch&eacute; controlla le propaggini di Abisso.</li>
                                    <li><b>Prospettiva d'Ombra</b> (&#9679;&#9679;&#9679;): il vampiro riesce a proiettare i suoi sensi in una zona d'ombra in linea di vista, sentendo e vedendo come se fosse nascosto proprio in quella zona d'ombra.</li>
                                    <li><b>Tocco dell'Oblivion</b> (&#9679;&#9679;&#9679;): il vampiro, riuscendo a toccare e fare presa sulla vittima, trasferisce parte dell'Oblivion al suo interno nella vittima, di fatto "invecchiando" la parte che tocca, infliggendo danni Aggravati alla parte coinvolta.</li>
                                    <li><b>Sudario dello Stige</b> (&#9679;&#9679;&#9679;&#9679;): ombre vengono vomitate da una zona d'ombra vicino al comando del Cainita, che ingloba una porzione di spazio attorno alla zona d'ombra che avvolge qualsiasi cosa attorno, scorrendo attraverso le superfici e chi ha la sfortuna
                                        di trovarsi vicino. Tutti quelli travolti dall'Ombra, tranne l'invocatore, soffrono di soffocamento e non riusciranno a vedere nulla, se non con mezzi soprannaturali.</li>
                                    <li><b>Passo d'Ombra</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il Cainita entra in una zona d'ombra, e riesce ad emergere in un'altra zona d'ombra poco distante. Questo potere all'apparenza innocuo, nasconde una terribile verit&agrave;, palesata dalle vittime di chi, dal vampiro,
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
                                    <li><b>Soddisfare il Fato</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il Cainita sovverte una condizione artificiale che ha a sua volta sovvertito il fato, facendo riapparire una malattia in una persona guarita, rompendo un osso che si era riformato, o imprimendo gli anni guadagnati
                                        da un ghoul asservito ad un vampiro che, grazie alla vitae del Sire, non ha sofferto il passaggio del tempo.</li>
                                    <li><b>Appassire lo spirito</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): questo terribile potere offre al vampiro la capacit&agrave; di disintegrare lo spirito di un mortale o di un Cainita, rischiando anche che non si ripresenti come spirito o spettro dopo la morte, lasciando sul posto
                                        un guscio vuoto. Questo potere ha delle severe ripercussioni sull'Umanit&agrave; del vampiro, e rischia di collezionare "Macchie" all'umanit&agrave;.</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Oscurazione</b>: tramite questa Disciplina, il vampiro riesce a rendersi invisibile agli occhi dei mortali e della maggior parte dei cainiti. Il potere si basa su un'illusione, sulla manipolazione delle menti, non su un effetto fisico.
                        <ul>
                            <li><b>Cappa di Ombre</b> (&#9679;): il vampiro diventa invisibile se rimane perfettamente fermo, non emette nessun suono, e rimane dietro una sorta di copertura.</li>
                            <li><b>Silenzio di Morte (Banu Haqim)</b> (&#9679;): il vampiro non emette suoni, o meglio, riesce ad annullare qualsiasi suono che emette dai sensi di chi gli &egrave; vicino. Microfoni ed altri apparecchi elettronici continuano a captare i suoni che emette.</li>
                            <li><b>Passaggio Invisibile</b> (&#9679;&#9679;): il vampiro ora pu&ograve; muoversi, e se non emette suoni dirompenti, pu&ograve; rimanere invisibile.</li>
                            <li><b>Ghost in the Machine</b> (&#9679;&#9679;&#9679;): il vampiro riesce a trasmettere il potere di Oscurazione anche ai macchinari elettronici, rendendosi invisibile o comunque irriconoscibile. L'effetto svanisce col tempo, ma la figura del vampiro rimarr&agrave; irriconoscibile.</li>
                            <li><b>Maschera delle Mille Facce</b> (&#9679;&#9679;&#9679;): il vampiro pu&ograve; assumere l'aspetto di un'altra persona qualunque, invece di sparire. L'identit&agrave; della persona sar&agrave; inerente al contesto, e il vampiro non potr&agrave; copiare l'aspetto di una persona nello specifico.</li>
                            <li><b>Nascondere</b> (&#9679;&#9679;&#9679;&#9679; - Amalgama Auspex &#9679;&#9679;&#9679;): il vampiro riesce ad imprimere la suggestione ipnotica che ispira con Oscurazione sulla sua persona ad un oggetto inanimato, che adesso rimarr&agrave; invisibile agli sguardi altrui.</li>
                            <li><b>Svanire</b> (&#9679;&#9679;&#9679;&#9679;): <b>Necessario avere Cappa di Ombre</b> il Cainita riesce a sparire dalla vista, in un battito di ciglia, attivando il potere di Cappa d'Ombre o Passaggio Invisibile, ed anche la memoria del Cainita negli astanti diventer&agrave; sfocata e indistinta,
                                come se la mente cercasse di dare un senso a quanto appena visto.</li>
                            <li><b>Ammantare le Masse</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro ora riesce a coprire anche altri compagni dietro la coltre di Oscurazione, attivando anche per loro i poteri di Cappa d'Ombra o di Passaggio Invisibile.</li>
                            <li><b>Guisa dell'Impostore</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il Cainita dopo aver studiato una persona, riesce a replicarne in tutto e per tutto l'aspetto e i comportamenti, apparendo praticamente come lei.</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Potenza</b>: aumenta la potenza fisica del Cainita.
                        <ul>
                            <li><b>Corpo Letale</b> (&#9679;): il vampiro pu&ograve; infliggere danni aggravati con le sue nude mani agli umani.</li>
                            <li><b>Balzo Innaturale</b> (&#9679;): il vampiro, grazie alla sua poderosa forza, riesce a saltare molto pi&ugrave; lontano di quanto un mortale riesca a fare.</li>
                            <li><b>Prodezza</b> (&#9679;&#9679;): il vampiro, spendendo sangue, riesce ad aggiungere il proprio punteggio di Potenza alla Forza in combattimento senza armi, o in generale in test sulla forza.</li>
                            <li><b>Morso Brutale</b> (&#9679;&#9679;&#9679;): il vampiro riesce a bere un'incredibile quantit&agrave; di sangue quando si ciba, drenando il sangue da una vittima in pochi secondi. Viene solitamente impiegato in combattiento, quando la vittima riesce a piantare le proprie zanne nella vittima.</li>
                            <li><b>Scintilla di Rabbia</b> (&#9679;&#9679;&#9679; - Amalgama: Ascendente &#9679;&#9679;&#9679;): il vampiro riesce ad ispirare rabbia ferale o addirittura frenesia negli astanti.</li>
                            <li><b>Presa Sconcertante</b> (&#9679;&#9679;&#9679;): il vampiro riesce ad arrampicarsi senza difficolt&agrave;, usando le proprie dita per penetrare la dura pietra di una parete.</li>
                            <li><b>Pozione di Potenza</b> (&#9679;&#9679;&#9679;&#9679;): chiunque beva il Sangue del Cainita acqusisce un numero di pallini di potenza pari alla met&agrave; per difetto di quelli che possiede il Cainita.</li>
                            <li><b>Terremoto</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro, dando un pugno o un calcio al pavimento, riesce a provocare increspature nel terreno che fanno immediatamente cadere gli avversari, ma potrebbero anche far cadere case addosso all'utilizzatore.</li>
                            <li><b>Pugno di Caino</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il Cainita riesce ad infliggere danni Aggravati con le sue nude mani, sia a cainiti che mortali.</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Proteide</b>: questo potere fa assumere al Cainita un aspetto bestiale, e gli fa ereditare il potere delle fiere.
                        <ul>
                            <li><b>Occhio della Bestia</b> (&#9679;): Gli occhi del vampiro emanano un bagliore rosso, e il Cainita riesce a vedere anche nella pi&ugrave; completa oscurit&agrave;.</li>
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
                            <li><b>Carne di Marmo</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): la pelle del Cainita diventa di marmo, riuscendo a deviare uno degli attacchi che, per turno, gli vengono inferti.</li>
                            <li><b>Prodezza dal Dolore</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il Cainita non soffre pi&ugrave; gli impedimenti dati dalla perdita di punti salute, fino al torpore. Riesce ad agire normalmente anche se incapacitato.</li>
                        </ul>
                    </li>
                    <li style={liStyle}><b>Thin-Blood Alchemy</b>: <i>Under Construction</i></li>
                    <li style={liStyle}><b>Velocità</b>: questa Disciplina aumenta la naturale grazie e la velocit&agrave; di movimento di un vampiro
                        <ul>
                            <li style={liStyle}>
                                <b>Grazie Felina</b> (&#9679;): il vampiro assume la grazia e la destrezza di un ginnasta olimpico.<br />
                                <b>Sistema</b>: non &egrave; necessario nessun tiro, n&eacute; Rouse Check, il vampiro riesce a camminare e tenersi in equilibrio su qualsiasi supporto, a patto che siano in grado di sostenere il suo peso.
                            </li>

                            <li style={liStyle}>
                                <b>Riflessi Rapidi</b> (&#9679;): questo potere (passivo) del vampiro gli consente di percepire ad una velocit&agrave; incredibile pericoli altrimenti letali. Pu&ograve; arrivare anche ad evitare frecce, o a scansare pallottole senza copertura.<br />
                                <b>Sistema</b>: non &egrave; necessario nessun tiro, n&eacute; Rouse Check, il vampiro non subisce nessuna penalit&agrave; per la mancanza di copertura sotto attacco di armi da fuoco, e ha anche a disposizione una 
                                azione supplementare del valore massimo di 2 dadi per ricaricare l'arma, per esempio.
                            </li>

                            <li style={liStyle}>
                                <b>Leggerezza</b> (&#9679;&#9679;): il vampiro a questo livello si muove con una velocit&agrave; incredibile. Aggiunge il valore di Velocit&agrave; all'ammontare di Destrezza, anche per difesa nei combattimenti.<br />
                                <b>Sistema</b>: effettuando 1 Rouse Check per scena, il vampiro pu&ograve; aggiungere il suo punteggio di Velocit&agrave; ad ogni tiro di Destrezza fuori dal combattimento, al massimo per schivare con Destrezza + Atletica.
                            </li>

                            <li style={liStyle}>
                                <b>Battito di Ciglia</b> (&#9679;&#9679;&#9679;): il vampiro pu&ograve; ingaggiare subito battaglia dopo aver percorso fino ad una cinquantina di metri (avendo a disposizione ancora un'azione), o fuggire immediatamente dalla scena.<br />
                                <b>Sistema</b>: effettuando 1 Rouse Check, il vampiro raggiunge il bersaglio e ha ancora a disposizione un'azione, quindi &egrave; come se fosse gi&agrave; nella mischia all'inizio del turno, per la determinazione 
                                dell'<Link to={GuideRoutes.mechanics}>Iniziativa</Link>. Dipendendo dal terreno, il Narratore potr&agrave; chiedere un tiro di Destrezza + Atletica. Nel caso in cui l'avversario voglia usare un'arma da fuoco, il vampiro
                                dovr&agrave; tirare Destrezza + Atletica contro Destrezza + Armi da Fuoco dell'attaccante: se il vampiro riesce, potr&agrave; agire prima dell'attaccante, viceversa l'attaccante avr&agrave; a disposizione un'azione per sparare
                                contro il vampiro.
                            </li>

                            <li style={liStyle}>
                                <b>Attraversamento</b> (&#9679;&#9679;&#9679;): il vampiro riesce a scalare pareti verticali per una buona distanza, o addirittura riesce a correre sull'acqua, con la dovuta rincorsa.<br />
                                <b>Sistema</b>: effettuando 1 Rouse Check, il vampiro tira Destrezza + Atletica, con una Difficolt&agrave; dipendente dal tipo di superficie. Ogni successo avviciner&agrave; il vampiro al traguardo.
                            </li>

                            <li style={liStyle}>
                                <b>Pozione di Velocit&agrave;</b> (&#9679;&#9679;&#9679;&#9679;): il Sangue del vampiro riesce a trasmettere la met&agrave; dei pallini per difetto a chiunque beva il suo sangue.<br />
                                <b>Sistema</b>: chi beve l'equivalente di un Rouse Check di Vitae del Cainita, acquisisce un livello di Velocit&agrave; pari alla met&agrave; di quelli del Cainita, arrotondato per difetto (quindi 2). Dura per una notte.
                            </li>

                            <li style={liStyle}>
                                <b>Colpo Infallibile</b> (&#9679;&#9679;&#9679;&#9679; Amalgama: Auspex &#9679;&#9679;): il mondo per il Cainita pare fermarsi per qualche istante, in cui riesce a prendere la mira come se fosse un tiro stazionario, anche se
                                attorno a lui pu&ograve; succedere qualsiasi cosa.<br />
                                <b>Sistema</b>: effettuando 1 Rouse Check, il potere &egrave; automatico. Il vampiro potr&agrave; attaccare un altro personaggio con Armi da Fuoco tirando a Difficolt&agrave; 1, e quest'ultimo non potr&agrave; difendersi, a meno
                                che non possieda Velocit&agrave; 5: in quel caso, potr&agrave; difendersi facendo un Rouse Check.
                            </li>

                            <li style={liStyle}>
                                <b>Colpo Fulmineo</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro riesce a colpire un bersaglio in mischia senza che questi possa difendersi (Diff. 1), a meno che anche il bersaglio possegga Velocit&agrave; 5.<br />
                                <b>Sistema</b>: il personaggio effettua 1 Rouse Check, e per un solo attacco di rissa o mischia il bersaglio non potr&agrave; difendersi. Il tiro di attacco avr&agrave; difficolt&agrave; 1.
                                Un personaggio con Velocit&agrave; 5 potr&agrave; effettuare 1 Rouse Check e difendersi normalmente.
                            </li>
                            
                            <li style={liStyle}>
                                <b>Frazione di Secondo</b> (&#9679;&#9679;&#9679;&#9679;&#9679;): il vampiro &egrave; cos&igrave; veloce che riesce ad agire in base ai suoi riflessi soprannaturali. 
                                Pu&ograve; passare attraverso una porta che si sta chiudendo, o apparire dietro un nemico in procinto di effettuare un'imboscata.<br />
                                <b>Sistema</b>: effettuando 1 Rouse Check, il personaggio potr&agrave;, sempre ragionevolmente, anticipare qualsiasi cosa il Narratore stia preparando; non sono necessari tiri.
                            </li>
                        </ul>
                    </li>
                </ul>
            </Typography>
        </>
    );
}

export default GuidesAttributesDisciplines;
