// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import { guideStyle, liStyle, titleStyle } from "../GuidesStyles";
import { GuideRoutes } from "../GuidesMain";

const GuidesCreation = (): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Creazione della Scheda
                </h1>
            </Typography>

            <Typography paragraph style={guideStyle}>
                La creazione della scheda &egrave; sicuramente una delle parti pi&ugrave; importanti del gioco.
                Una scheda ben pensata e in linea col personaggio agevola l'interpretazione, definisce punti di forza 
                e deboli del personaggio e consente ai master di "capirlo". Il sito di Buenos Aires by Night offre
                la possibilit&agrave; di creare automaticamente la scheda per quanto riguarda la definizione di Attributi,
                Abilit&agrave; e Discipline, ma lascia la definizione dei Vantaggi a voi giocatori.
            </Typography>

            <Typography paragraph style={guideStyle}>
                Il motivo &egrave; chiaro: i Vantaggi devono essere accompagnati da una spiegazione sufficientemente
                credibile per il personaggio, e potranno subire cambiamenti per adattarlo alla nostra ambientazione.
                Questa &egrave; la ragione per cui chiediamo di specificare Vantaggi, Pregi e Difetti in modo testuale.
            </Typography>

            <Typography paragraph style={guideStyle}>
                Un'altra caratteristica della scheda che dovrete indicare saranno le <b>Convinzioni</b>
                ovvero il credo fondamentale che segue il personaggio, e ne determina la sua umanit&agrave;.
                Le convinzioni saranno fondamentali per determinare cosa lo tiene aggrappato alla sua Umanit&agrave;,
                un codice (seppur minimo) di condotta al quale si rifaceva intimamente per poter giustificare le 
                proprie azioni. Non si devono confondere le convinzioni con il credo religioso, o per qualcosa di
                "buonista": il personaggio sar&agrave; un vampiro, e c'&egrave; una buona probabilit&agrave;
                che in vita non sia stato uno stinco di santo. In questo senso, le Convinzioni non dovranno
                corrispondere a buone intenzioni, ma semplicemente a dei minimi dettami morali che il 
                personaggio, intimamente, segue o seguiva per giustificare ci&ograve; che era, &egrave; 
                diventato e ci&ograve; che ha intenzione di fare.
            </Typography>

            <Typography paragraph style={guideStyle}>
                In ordine, ora, verranno dettagliate le parti della creazione automatica del personaggio.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Informazioni generali
                </h3>
            </Typography>

            <Typography paragraph style={guideStyle}>
                Questa &egrave; la sezione pi&ugrave; importante della scheda. In questa sezione, dovrete definire il nome del 
                personaggio, il suo <Link to={GuideRoutes.clans}>Clan</Link>, il suo avatar,
                la sua descrizione, ma soprattutto la sua biografia, la storia della non vita (ed eventualmente dell'Abbraccio)
                del personaggio. La biografia dovr&agrave; essere credibile, e dovr&agrave; adattarsi all'ambientazione
                di Buenos Aires by Night. Una biografia priva di contenuti potr&agrave; determinare il rifiuto e la
                successiva cancellazione del personaggio.
            </Typography>

            <Typography paragraph style={guideStyle}>
                Ai giocatori non esperti nell'ambientazione di Vampiri: la Masquerade&trade; consigliamo di creare 
                personaggi <b>Infanti</b>, appena trasformati in vampiri (<b>Abbracciati</b>, nella terminologia dei <b>Fratelli</b>).
                Questo vi consentir&agrave; di concentrarvi sulla storia del vostro personaggio quando ancora era in vita.
                Di seguito, forniamo alcuni spunti per descrivere come, quando e perch&egrave; il vostro personaggio &egrave;
                stato trasformato in vampiro:
            </Typography>

            <Typography paragraph style={guideStyle}>
                <ul>
                    <li style={liStyle}>
                        Il personaggio &egrave; stato Abbracciato da un vampiro nell'ormani distrutto Dominio di Montevideo. 
                        Se optate per questa decisione, vi consigliamo di leggere la relativa <Link to={GuideRoutes.environmentBaires}>guida</Link>.
                    </li>
                    <li style={liStyle}>
                        Nel caso in cui scegliate di interpretare un personaggio <b>Sangue Debole</b> o <b>Vili</b>, potrete 
                        considerare che il vostro Sire vi abbia abbandonato una volta capito cosa eravate.
                    </li>
                    <li style={liStyle}>
                        Il personaggio &egrave; stato Abbracciato a Buenos Aires da uno dei <Link to={GuideRoutes.npcs}>personaggi 
                        non giocanti dell'Ambientazione</Link>. Consigliamo di condividere questa decisione coi master, che 
                        potranno guidare la vostra scelta con maggior informazioni.
                    </li>
                </ul>
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Attributi e Abilit&agrave;
                </h3>
            </Typography>

            <Typography paragraph style={guideStyle}>
                Le successive due schermate riguardano la definizione di Attributi e Abilit&agrave;. Il sistema &egrave; automatico,
                potrete scegliere gli Attributi da affidare ai vari valori, e nella schermata delle Abilit&agrave; anche il tipo di 
                personaggio per la selezione delle Abilit&agrave;. La descrizione di Attributi e Abilit&agrave; pu&ograve; essere 
                consultata nella relativa <Link to={GuideRoutes.attributes}>pagina della guida</Link>.<br />
                Potrete anche scegliere di saltare completamente questa parte ed
                affidarvi a dei <i>Template</i>, un set pre-fabbricato di Attributi e Abilit&agrave; gi&agrave; costruiti e adatti
                per particolari tipi di personaggi. Se non avete intenzione di perdere troppo tempo nello stilare la scheda, e vi 
                fidate del giudizio dei master, selezionate pure un template, potrete comunque sostituire e sistema Abilit&agrave; e 
                Attributi alla fine del processo di creazione.
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Caratteristiche del personaggio
                </h3>
            </Typography>

            <Typography paragraph style={guideStyle}>
                La parte successiva della creazione riguarda le ultime caratteristiche del personaggio. I personaggi Cainiti dovranno
                selezionare le due Discipline che potranno avere in fase di creazione. Dato che ogni Disciplina, con il nuovo regolamento
                pu&ograve; avere pi&ugrave; di un potere per livello, <b>sar&agrave; necessario indicare nelle note al master, quali 
                poteri per ogni livello di Disciplina selezionato volete prendere</b>, dato che sar&agrave; possibile selezionare un
                solo potere per livello di Disciplina.
            </Typography>

            <Typography paragraph style={guideStyle}>
                <b>Nota</b>: col nuovo regolamento, la scelta dei poteri delle Discipline &egrave; differente da quello normalmente
                utilizzato nelle precedenti versioni di Vampiri: la Masquerade&trade;. Per ogni livello di punto Disciplina acquisito,
                sar&agrave; necessario indicare quale potere il Cainita conosce. La scelta, ad ogni livello, pu&ograve; ricadere su un 
                potere dello stesso livello acquisito, <b>o uno inferiore</b>. Esempio: un personaggio acquisisce il potere di 
                Ascendente a livello 1, e sceglie di prendere <b>Soggezione</b>. In seguito, decide di comprare con punti esperienza
                il secondo livello: in questo caso, pu&ograve; scegliere il potere di secondo livello, come <b>Bacio Persistente</b>, 
                oppure pu&ograve; scegliere di acquistare il secondo potere di primo livello, <b>Intimidire</b>. Nel caso in cui scelga 
                di prendere <b>Bacio Persistente</b>, e acquisti il terzo livello della Disciplina, anche in quel caso potr&agrave;
                scegliere di prendere un potere di terzo livello, oppure di acquistare <b>Intimidire</b>, nonostante sia 2 livelli 
                inferiore.
            </Typography>

            <Typography paragraph style={guideStyle}>
                Potrete trovare le Discipline <Link to={GuideRoutes.attributes}>nell'apposita sezione della guida</Link>.
            </Typography>

            <Typography paragraph>
                <h4 style={titleStyle}>
                    Tipo di Predatore
                </h4>
            </Typography>
                
            <Typography paragraph style={guideStyle}>
                Per Cainiti e personaggi di Sangue Debole, si dovr&agrave; anche scegliere il Tipo di Predatore. La scelta di
                Tipo di Predatore garantir&agrave; anche attributi aggiuntivi alla scheda, come 
                le <Link to={GuideRoutes.attributes} id="specialties"><b>Specialit&agrave;</b></Link> del personaggio.
                Potrete scegliere tra questi:

                <ul>
                    <li style={liStyle}>
                        <b>Accattone</b>: l'accattone preferisce procurarsi sangue senza cacciare, acquistando sacche di sangue, rubandole
                        o acquisendole con altri mezzi. Il personaggio potrebbe ancora lavorare il turno di notte in Ospedale.
                        I <b>Ventrue</b> non potranno acquisire questo tipo di predatore.
                    </li>
                    <li style={liStyle}>
                        <b>Allevatore</b>: l'Allevatore non si nutre di esseri umani, ma solamente di animali. Normalmente, questo tipo
                        di Cainita in vita era una persona con fortissimi principi morali, che ha trasposto anche nella non vita.
                        Il fatto di nutrirsi di animali rischia per&ograve; di aumentare la <b>Fame</b>, quindi vivono sempre col
                        pericolo della Frenesia.
                    </li>
                    <li style={liStyle}>
                        <b>Consensualista</b>: il personaggio pu&ograve; nutrirsi solo di mortali consenzienti. Questo tipo di Cainita 
                        potrebbe correre il costante rischio di infrangere la Masquerade, dato che la vittima rischia di poter capire
                        cosa &egrave; realmente il Cainita.
                    </li>
                    <li style={liStyle}>
                        <b>Randagio</b>: il personaggio caccia e si nutre di qualsiasi cosa si muova, ogni volta che pu&ograve;. Il personaggio
                        si nasconde, tende agguati, si nutre e poi scappa, il pi&ugrave; velocemente possibile.
                    </li>
                    <li style={liStyle}>
                        <b>Sandman</b>: il vampiro Sandman si nutre di vittime addormentate, sfruttando la sua Furtivit&agrave;. Il tipico
                        personaggio Sandman potrebbe essere un anti-sociale, o qualcuno particolarmente attento alla Masquerade (d'altronde 
                        se non si svegliano quando si nutre, non potranno mai sapere che il personaggio &egrave; stato l&igrave;).
                    </li>
                    <li style={liStyle}>
                        <b>Sanguisuga (non disponibile in creazione)</b>: il personaggio si nutre di altri vampiri. Li pu&ograve; cacciare, 
                        li pu&ograve; costringere, o pu&ograve; pretendere sangue come pagamento. Giocare un personaggio sanguisuga 
                        pu&ograve; essere estremamente pericoloso, in quanto questa pratica &egrave; proibita nella comunit&agrave; Cainita.
                    </li>
                    <li style={liStyle}>
                        <b>Scene Queen</b>: il personaggio Scene Queen gode di popolarit&agrave; in una subcultura, sia essa <i>underground</i>, 
                        nelle strade o qualche altolocato circolo culturale, e sfrutta popolarit&agrave; e status per cibarsi di chi la 
                        considera un esempio da seguire in quella comunit&agrave;. Probabilmente, il vampiro era gi&agrave; una star
                        in quel particolare gruppo.
                    </li>
                    <li style={liStyle}>
                        <b>Simulante</b>: il Simulante ha ancora una famiglia mortale (oppure si &egrave; impossessato di una non sua), e 
                        continua ad avere contatti con essa anche nella non-morte. Alcuni Simulanti addirittura si sposano, o adottano figli.
                        Ovviamente questo per la Camarilla &egrave; un atteggiamento ritenuto pericoloso, e potrebbe prendere seri provvedimenti,
                        arrivando fino ad uccidere la famiglia mortale del Cainita.
                    </li>
                    <li style={liStyle}>
                        <b>Sirena</b>: il personaggio Sirena si nutre solamente durante un amplesso simulato. Sfrutta le sue capacit&agrave;
                        seduttive, il suo sex appeal, o... altro, per intraprendere una relazione sessuale di una notte, nutrirsi, e 
                        quindi abbandonare la preda per non rivederla mai pi&ugrave;. Potrebbero essere avventori o dipendenti di Night Club,
                        o semplicemente essere molto attivi su Tinder.
                    </li>
                </ul>

                Scegliere un predatore comporta anche un numero di Vantaggi / Discipline / Specializzazioni di Abilit&agrave;. Non 
                verranno elencate qui, e la decisione su quali aggiungere alla scheda saranno comunque appannaggio dei master; queste
                potrebbero anche <b>non corrispondere a quelle elencate nel Corebook</b>. 
                L'idea &egrave; quella di concentrarsi sulla natura del personaggio, pi&ugrave; che sull'elenco di bonus e malus 
                che un tipo di predatore garantisce.
            </Typography>

            <Typography paragraph style={guideStyle}>
                In seguito dovrete scegliere Vantaggi e scrivere le Note. Tra i Vantaggi, potrete scegliere di assegnare <b>5 punti</b> tra
                Background, Pregi e Difetti, elencati <Link to={GuideRoutes.attributes}>nella relativa pagina della guida</Link>. Questo 
                si discosta dalla regola del <b>Corebook</b>, ma &egrave; pi&ugrave; adatto per giocatori alle prime armi, ai quali sconsigliamo
                di prendere Pregi e Difetti, per concentrarsi invece sui <b>Backgrounds</b>. Ovviamente, se scegliete di prendere un Difetto,
                il valore del Difetto andr&agrave; sommato al punteggio totale per il valore del Difetto, per un massimo di 2 punti difetto.<br />
                Ad esempio, se decidete di prendere due difetti da un punto per il vostro personaggio, avrete ora a disposizione 7 punti totali
                da spendere su Background e Pregi. In fase di creazione, <b>il numero di pallini di difetto non pu&ograve; essere maggiore di 2</b>.
            </Typography>
            
            <Typography paragraph style={guideStyle}>
                I personaggi <b>Sangue Debole</b> dovranno poi, dopo aver selezionato i Vantaggi secondo le regole appena descritte,
                selezionare un numero uguale di Pregi e Difetti tipici per i Sangue Debole, descritti nella pagina di Attributi, per un massimo di 3.
                Questo significa che, ad esempio, un personaggio potr&agrave; acquisire un pregio e un difetto da Sangue Debole,
                due Pregi e due Difetti Sangue Debole, o tre Pregi e tre Difetti Sangue Debole: <b>Il numero di Pregi e Difetti da
                Sangue Debole dovr&agrave; essere uguale</b>.
            </Typography>

            <Typography paragraph style={guideStyle} id="convictions">
                Nell'apposita sezione, invece, dovrete scegliere tre <b>Convinzioni</b>.<br />
                Le Convinzioni riassumono le regole morali che il personaggio seguiva in vita, e che lo mantengono umano. Questo &egrave;
                un aspetto <b>importantissimo</b> per il personaggio, in quanto le convinzioni lo aiutano a resistere alle lusinghe della 
                Bestia. Potrete scegliere <b>tre</b> tra le seguenti Convinzioni, proposte dal <b>Corebook</b>, oppure proporne alcune vostre:

                <ul>
                    <li>Non ucciderai</li>
                    <li>Uccidi solo gli immeritevoli/i miscredenti/in un combattimento leale/per legittima difesa</li>
                    <li>Mai esporre i minori alla violenza</li>
                    <li>Ama il prossimo tuo come te stesso</li>
                    <li>Disobbedienza equivale a disonore</li>
                    <li>Proteggi gli innocenti dai pericoli</li>
                    <li>Il coraggio &egrave; il valore pi&ugrave; importante</li>
                    <li>Mantieni sempre la tua parola</li>
                    <li>La Verit&agrave; &egrave; sacra; non dirai falsa testimonianza</li>
                    <li>La schiavit&ugrave; &egrave; malvagit&agrave;</li>
                    <li>Obbedisci all'Autorit&agrave;</li>
                    <li>Il mio Paese prima di tutto</li>
                    <li>Nessuno potr&agrave; mai controllarmi</li>
                    <li>Non indulgere nelle droghe (o nell'alcol)</li>
                    <li>Non torturerai</li>
                    <li>Il colpevole dovr&agrave; essere punito</li>
                    <li>Da ciascuno secondo le sue capacit&agrave;, per ciascuno secondo i suoi bisogni</li>
                    <li>Ruba al ricco per dare al povero</li>
                    <li>Rifiuta la ricchezza, poich&eacute; corrompe.</li>
                    <li>Non agire contro (inserisci gruppo/fede/setta)</li>
                    <li>Aiuta sempre le donne in pericolo</li>
                    <li>Difendi i diseredati</li>
                    <li>Rispetta (inserisci religione) come sacra e rispettane le leggi morali</li>
                </ul>

            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Ritocchi finali
                </h3>
            </Typography>

            <Typography paragraph style={guideStyle}>
                In questa sezione potrete scambiare i valori della vostra scheda da un Attributo all'altro, e tra
                un'Abilit&agrave; e l'altra. Soprattutto se avete scelto di affidarvi ad un <i>template</i> per la 
                definizione del personaggio, in questa sezione potrete personalizzarlo, avendo a disposizione 
                visualmente tutta la scheda del vostro personaggio.
            </Typography>

            <Typography paragraph style={guideStyle}>
                Una volta finiti i ritocchi del personaggio, potrete confermarlo, oppure cancellarlo e ricominciare
                da capo. Se scegliete di confermarlo, i master prenderanno visione della scheda, apporranno le 
                dovute modifiche alla scheda, e accetteranno il personaggio, o vi contatteranno per sistemarlo.<br />
                Nel frattempo, potrete continuare a visionare il sito e le chat, per familiarizzare con il gioco, 
                potrete scrivere post nel Forum, mandare messaggi, e soprattutto partecipare alla vita della 
                Comunit&agrave; <b>VTM Baires</b> su <b>Discord</b>.
            </Typography>
        </>
    );
}

export default GuidesCreation;
