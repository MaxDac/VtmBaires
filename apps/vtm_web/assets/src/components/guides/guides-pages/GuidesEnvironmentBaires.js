// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import { GuideRoutes } from "../GuidesMain";
import {Link} from 'react-router-dom';

type Props = {

}

const GuidesEnvironmentBaires = (props: Props): any => {
    const storyStyle = {
        fontFamily: 'GabrieleLightRibbon',
        fontSize: "14px",
        margin: "20px 0",
        paddingLeft: "20px",
        paddingRight: "10px"
    }

    const liStyle = {
        margin: "15px 0"
    };

    return (
        <>
            <Typography paragraph>
                <h1>
                    Buenos Aires by Night
                </h1>
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Il luogo d'incontro che aveva scelto era un'antica sala in un
                appartamento nel quartiere di San Telmo, a poca distanza dalla Casa Rosada.
                Gli arredamenti, in legno, cos&igrave; come gli stucchi, la carta da parati, 
                sembravano appartenere ad un'altra epoca, e lo stato di manutenzione lasciava
                parecchio a desiderare. Ma nulla poteva sostituire l'odore di antico che
                poteva presentire, gonfiando quel tanto che bastava il petto, privo della 
                naturale pulsazione del cuore gi&agrava; da quasi un secolo.<br />
                La sua scorta sarebbe stata considerata inverosimilmente scarna fino a
                qualche settimana fa, ma gli eventi imponevano una gestione pi&ugrave; austera
                delle proprie risorse.<br />
                La futura Principe del Dominio lo stava ormai facendo aspettare da pi&ugrave; 
                di mezz'ora. Avrebbe considerato un'ora di tempo minimo. Stava giocando con le 
                ombre della stanza, e ne era gi&agrave; avvolto, quando percep&igrave; la vettura.
                Elettrica. I sue due asserviti non si erano ancora mossi.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Forse aveva scelto male di quali disfarsi.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Rimase immobile. Riusc&iagrave; a sentire la porta del piano terra aprirsi, che i due
                si mossero. Avrebbe normalmente respirato profondamente, in segno di delusione; 
                non ne sarebbe valsa la pena.<br />
                Gli ospiti salirono le scale con passo cadenzato, lento. Poteva quasi vederli,
                controllare ogni piccola fessura della rampa di scale dell'edificio del primo 
                Novecento. Non aveva bisogno di nulla di tutto questo. Non gli avrebbe dato nemmeno 
                molta pena abbandonare i due ghoul che si era portato dietro.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Passata la fanfara delle presentazioni, l'obbligo burocratico, il pallido tentativo
                di affermare la propria superiorit&agrave; con vuoti titoli senza significato,
                si sedettero. Assist&eacute; a tutta la cerimonia con un lieve, enigmatico,
                rispettoso sorriso, com'era abituato a fare coi gerarchi, nella Seconda Guerra
                Mondiale. Non si sarebbe ricordato della met&agrave; dei titoli, ma gli diede tempo
                di pensare. Un ritardo di una sola mezz'ora significava che la situazione stava
                realmente precipitando.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Mezz'ora di discorsi politici per arrivare finalmente a ci&ograve; che, per il 
                modo di vedere il mondo di un Ventrue, forse, era un sacrilegio. &Aacute;vila doveva morire.
                Mentre la <b>Sforza</b> elencava le sue varie giustificazioni, la frase 
                faceva eco alle parole dei <i>Freunde der Nacht</i> che gli tornarono alla mente.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                <i>&Aacute;vila doveva morire</i>.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Era pi&ugrave; importante la politica momentanea di una non-vita di servit&ugrave;.<br/>
                La Via dei Fratelli.<br />
                Provava un accenno di pena per il suo compagno di clan. Affond&ograve; nella sensazione,
                la lasci&ograve; espandersi, per quanto poteva. L'avrebbe aiutato a rendere pi&ugrave; 
                credibile la farsa di cui sarebbe stato protagonista; a fingere dubbio.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                <b>"Avr&ograve; bisogno di tre diverse squadre di PFA. Una di ghoul."</b>
            </Typography>

            <Typography paragraph sx={storyStyle}>
                <b>"Accordato."</b>
            </Typography>

            <Typography paragraph sx={storyStyle}>
                <b>"Il nostro prezzo sar&agrave; la Primogenitura nel nuovo Dominio."</b>
            </Typography>

            <Typography paragraph sx={storyStyle}>
                <i>Silenzio</i>.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                <b>"Accordato."</b>
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Pur col suo statuario controllo, dovette impegnarsi a fondo per non lasciar
                trapelare la sorpresa per qualcosa che l'aveva colto completamente alla
                sprovvista. Una resa cos&igrave; incondizionata non poteva che dipendere
                da qualcosa di estremamente grave.
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Qualcosa che lui non sapeva.
            </Typography>

            <Typography paragraph sx={liStyle}>
                Nella cornice offerta dagli eventi descritti nella sezione Globale dell'ambientazione,
                si inserisce la nostra, incentrata sugli eventi di Buenos Aires. La citt&agrave; 
                porteña, una delle pi&ugrave; grandi dell'America Latina, luogo d'immigrazione 
                per le pi&ugrave; disparate popolazioni mondiali prima, durante e a seguito
                delle grandi guerre che hanno sconvolto l'Europa e l'Occidente, ha svolto un
                ruolo analogo anche nei tempi moderni per i Fratelli in fuga dai problemi sorti
                nei Domini pi&ugrave; tradizionali della Camarilla.
            </Typography>

            <Typography paragraph>
                <h2>
                    Ventesimo Secolo
                </h2>
            </Typography>

            <Typography paragraph sx={liStyle}>
                Prima degli eventi descritti nella versione 5 dei manuali di Vampiri: la Masquerade&trade;,
                descritti nella sezione <Link to={GuideRoutes.environment}>precedente</Link> della guida,
                gli Anziani della Camarilla hanno a pi&ugrave; riprese tentato di colonizzare parte delle
                citt&agrave; di Montevideo e Buenos Aires, nel disperato tentativo di attenuare la stretta
                morsa che il Sabbat manteneva nell'intero continente sudamericano.<br />
                Il dispendio fu enorme, e incluse anche una serie di accordi col clan Giovanni, in cui il 
                clan della Morte si impegnava a gestire il trasporto di risorse e cainiti dal Vecchio 
                Continente al Nuovo in tutta sicurezza, in cambio di maggiore influenza negli stabili 
                Domini europei.
            </Typography>

            <Typography paragraph>
                <h4>
                    La Constitución de 1994
                </h4>
            </Typography>

            <Typography paragraph sx={liStyle}>
                Fino al 1994, la Camarilla in congiunzione col clan Giovanni - accusato a pi&ugrave; 
                riprese, pi&ugrave; o meno velatamente, di doppiogiochismo col Sabbat - ottenne pochi 
                successi, largamente oscurati dalle ripetute sconfitte. Poi, grazie anche ad una intensa
                e dispendiosa opera di costruzione di influenze politiche, arriv&ograve; la Costituzione
                del 1994, che, tra le altre cose, rese organismo amministrativo indipendente la Capital
                Federal, ovvero quello che &grave; considerato il centro dell'area metropolitana di
                Buenos Aires.
            </Typography>

            <Typography paragraph sx={liStyle}>
                Pochi nel Sabbat si resero conto delle ripercussioni che questo avrebbe avuto
                nella politica cainita: Capital Federal divenne centro di numerose riforme
                volte ad accrescere il valore della citt&agrave;, ma soprattutto l'organizzazione
                della polizia venne potenziata: covi Sabbat vennero divelti, e l'organizzazione
                venne sempre di pi&ugrave; spinta verso la Provincia, ovvero la parte dell'area
                metropolitana periferica.
            </Typography>

            <Typography paragraph>
                <h2>
                    Ventunesimo secolo
                </h2>
            </Typography>

            <Typography paragraph sx={liStyle}>
                La presenza della Camarilla nel Rio del Plata divenne sempre pi&ugrave; consistente,
                e in pochi nel Sabbat riuscirono ad opporre una forte resistenza. Anche i Giovanni
                non poterono sfruttare appieno l'influenza che i contratti con la Camarilla portarono
                per la violenta opposizione dei Seguaci di Set, che, intuendo il cambio nella 
                politica porteña, vollero concorrere coi Giovanni per l'appoggio della Camarilla -
                cosa che alla Camarilla andava pi&ugrave; che bene.<br />
                Il successo della campagna fu cos&igrave; imporante che gli Anziani in Europa
                vollero influire nelle decisioni politiche del Dominio: ancora una volta, 
                le Ancillae, a cui andava tutto il merito dell'impresa, correvano il rischio
                di venir private del loro premio.
            </Typography>

            <Typography paragraph sx={liStyle}>
                Due furono gli accadimenti che avrebbero potuto cementare la situazione politica,
                e rendere stabile la presenza della Camarilla nell'America del Sud.<br />
                Venne costituito un Principato in piena regola, appoggiato dalle forze degli 
                Anziani, a Montevideo: venne scelta <b>Maria Augusta Carvalho Sforza</b>, componente
                in vita della nobilt&agrave; portoghese di stanza in Brasile, Abbracciata
                da un potente anziano del Principato francese di Villon.<br />
                In gran segreto, poi, vennero intavolate trattative con l'Arcivescovo Lasombra
                di Buenos Aires Juan Antonio &Aacute;vila per negoziare il suo tradimento
                al Sabbat, con successiva istituzione di un Principato sotto la sua egida,
                sul modello di quanto fu fatto gi&agrave; a Milano con Gian Galeazzo Visconti.
            </Typography>

            <Typography paragraph sx={liStyle}>
                Poi arrivarono gli accadimenti delle Ultime Notti.
            </Typography>

            <Typography paragraph>
                <h2>
                    Ultime Notti
                </h2>
            </Typography>

            <Typography paragraph sx={liStyle}>
                Poi arrivarono gli accadimenti delle Ultime Notti. Il Sabbat, nel 2005, 
                dovette cominciare ad organizzare la logistica della traversata verso il 
                Medio Oriente, per la grande Guerra della Gehenna. &Aacute;vila venne
                colto nel bel mezzo delle contrattazioni dalla notizia partita dai Cardinali
                a Citt&agrave; del Messico, ed i suoi tentativi di ritardare la partenza
                vennero percepiti come segnali di debolezza dai Vescovi.
            </Typography>

            <Typography paragraph sx={liStyle}>
                Nel giro di un mese tutto precipit&ograve;. Il Sabbat si divise, 
                cominci&ograve; a circolare come semplice diceria il sospetto che 
                l'Arcivescovo stesse trattando con la Camarilla, e la reazione degli altri
                Vescovi fu quella di organizzare comunque la partenza, ma non prima di 
                inficiare gli sforzi di un Arcivescovo ormai barricato nel suo rifugio.<br />
                La parte pi&ugrave; consistente sarebbe partita via nave alla volta del
                Medio Oriente, ma non prima di aver fatto scalo a Montevideo per 
                organizzare una serie di consistenti brecce alla Masquerade.
                Il gruppo scelto che rimase temporaneamente a Buenos Aires avrebbe
                dovuto colpire allo stesso modo la Camarilla, approfittando 
                del disordine per infliggere la Morte Ultima all'Arcivescovo traditore.
            </Typography>

            <Typography paragraph sx={liStyle}>
                Montevideo venne abbandonata dopo soli cinque giorni dalla comparsa 
                della Seconda Inquisizione, guidata dall'Entit&agrave;, il servizio
                segreto del Vaticano, e dalla reintegrata Societ&agrave; di San 
                Leopoldo. Buenos Aires venne salvata con un altro accordo: al 
                Vescovo <b>Heinrich H&uuml;nger</b>, pedina degli <b>Amici Noctis</b>,
                sarebbe stata concessa la Primogenitura nel nuovo Dominio
                in cambio del disinnesco della cellula terroristica sabbatica
                e della Morte Ultima dell'ex Arcivescovo &Aacute;vila.
                A condurre le trattative per la Camarilla fu la stessa
                <b>Maria Augusta Carvalho Sforza</b>, ormai ex Principe di 
                Montevideo.
                I Lasombra ottennero in cambio anche la soppressione, nel
                Dominio di Buenos Aires, della clausola di Chicago, per cui 
                per ogni Lasombra Abbracciato, un altro anziano avrebbe dovuto
                subire la Morte Ultima.
            </Typography>

            <Typography paragraph sx={liStyle}>
                Il piano riusc&igrave;, e si evit&ograve; una disastrosa
                serie di brecce alla Masquerade, che avrebbero significato
                la fine del Dominio ancor prima della sua nascita.
            </Typography>

            <Typography paragraph sx={liStyle}>
                Mentre la via per la Camarilla era ormai delineata, restava
                comunque da organizzare il Dominio, la relativa distribuzione
                di cariche, e la costruzione di influenze. Molti dei Fratelli
                che facevano parte del Dominio di Montevideo raggiunsero il nuovo
                Dominio, altri invece, sentendosi traditi dal trattamento di
                favore concesso ai pochi Lasombra integrati nella Camarilla,
                si unirono ai pochi sopravvissuti del Sabbat rimasti e formarono
                l'embrione della prima cellula Anarchica di Buenos Aires.
            </Typography>

            <Typography paragraph sx={liStyle}>
                Nel frattempo, i Giovanni e i Seguaci di Set, anche nella
                remota regione sudamericana, hanno subito l'eco degli eventi
                che hanno interessato i loro clan.<br />
                I Giovanni soffrirono il contraccolpo finanziario legato 
                al nome della famiglia.
                Si affidarono sempre di pi&ugrave; alla branca della 
                famiglia Pisanob in fuga dalla rappresaglia Cappadocia 
                come prestanome, ed al <i>rebranding</i> del 
                cambio di nome in Hecata. Riuscirono a sopravvivere
                anche grazie alla loro utilit&agrave; per la Camarilla,
                data dalla loro influenza tra molti dei discendenti 
                italiani della citt&agrave; nei luoghi di potere.
                I Seguaci di Set, ora i Ministri di Set, rifiutati dalla 
                Camarilla, allacciarono le loro sorti a quelle 
                dell'embrione Anarchico che si stava creando, aiutandolo
                e, di fatto, consentendogli di svilupparsi nelle regioni 
                periferiche della Provincia, una volta occupata dal Sabbat.
            </Typography>
        </>
    );
}

export default GuidesEnvironmentBaires;
