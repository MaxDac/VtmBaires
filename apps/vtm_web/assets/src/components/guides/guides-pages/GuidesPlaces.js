// @flow

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {guideStyle, titleStyle} from "../GuidesStyles";
import type {GenericReactComponent} from "../../../_base/types";

const GuidesPlaces = (): GenericReactComponent => {
    return (
        <>
            <Typography paragraph sx={guideStyle}>
                <h1 style={titleStyle}>
                    Luoghi
                </h1>
            </Typography>

            <Box sx={{minHeight: "600px"}}>
                <img src="/GuideMap.webp" 
                     alt="Mappa" 
                     hspace="10px"
                     vspace="10px"
                     align="left"
                     style={{
                         width: "100%",
                         maxWidth: "800px",
                         height: "auto"
                     }} />

                <Typography paragraph sx={guideStyle}>
                    Buenos Aires non &egrave; solo Capital Federal (all'interno del perimetro rosso nella cartina).
                    La Provincia &egrave; parte integrante dell'area metropolitana. Gli Anarchici sfruttano la loro 
                    conoscenza di questa periferia per sfuggire alla Seconda Inquisizione, saldamente in controllo 
                    delle attivit&agrave; nella Capital Federal.
                </Typography>

                <Typography paragraph sx={guideStyle}>
                    La divisione dei territori ha avuto luogo nel giro di qualche settimana dal ritorno del branco
                    de <b>Las Calaveras</b>, ed &egrave; stato il frutto di negoziazioni serrate tra le Sette, 
                    che si sono spartite i territori che furono della Diocesi sabbatica.
                </Typography>

                <Typography paragraph sx={guideStyle}>
                    Questa sezione della guida fornir&agrave; una dettagliata descrizione di questa divisione, 
                    assieme ai luoghi d'interesse per la politica e la non-vita nel nuovo Dominio di Buenos Aires.
                </Typography>
            </Box>

            <Typography paragraph sx={guideStyle}>
                <h2 style={titleStyle}>
                    Capital Federal
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il cuore pulsante della politica e dell'economia argentina &egrave; condensato tra la Boca, Liniers 
                e Belgrano, la <b>Capital Federal</b>. La Camarilla, approfittando della relativa debolezza di Ministri
                ed Hecata, spremette ogni oncia di influenza che aveva costruito nella citt&agrave; dai tempi della
                Constituci&oacute;n per insediarvisi e stabilizzare il proprio Dominio attraverso l'oculata 
                compravendita di immobili strategici per il controllo della citt&agrave;.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                La Capital Federal, dopo la fuga della Camarilla dal Dominio, &egrave; controllata capillarmente dalla
                Seconda Inquisizione. &Egrave; veramente difficile per i Cainiti transitare, men che meno cacciare
                indisturbati in centro senza correre il rischio di venire individuati, schedati e cacciati dai mortali.
                I luoghi di ritrovo come l'Elysium, o il Palacio Pompadour, giacciono disabitati o divelti dagli 
                attentati alla Masquerade perpetrati da Rinaldi.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <h4 style={titleStyle}>
                    Hollywood
                </h4>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il quartiere chiamato "Hollywood" si estende per una decina di <i>quadras</i> a Palermo, ed &egrave;
                una delle mete predilette per la vita notturna di Buenos Aires. Dedicato a chi vuole passare una 
                serata tranquilla, tra ristoranti, librerie e piccoli teatri aperti fino a tardi.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <h4 style={titleStyle}>
                    Barracas
                </h4>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Un po' pi&ugrave; a sud, sempre in Capital Federal, si trova il quartiere chiamato <b>Barracas</b>, che
                nonostante il suo nome, vanta oggi una quantit&agrave; di locali notturni ineguagliato in tutta Buenos
                Aires. L'area &egrave; stata recentemente ripulita dallo stato di abbandono e degrado che gli abitanti
                hanno sempre condannato, ma ancora adesso, nel transito tra un bar e l'altro, c'&egrave; sempre il 
                pericolo di venire derubati. O peggio.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <h2 style={titleStyle}>
                    Provincia Norte
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Non &egrave; stato difficile per <b>Manoukian</b> prendere possesso di uno dei locali periferici 
                pi&ugrave; frequentati dalla feccia di Buenos Aires. Da l&igrave;, il controllo delle <i>Villas</i>&nbsp;
                &egrave; stata solo un'operazione di ristabilimento di antiche alleanze, riscossione di favori
                e rinvigorimento nel controllo del territorio.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Nonostante la Camarilla si vanti di avere il controllo della Capital Federal, chi tra gli 
                ex Sabbat, ora Anarchici, ha il polso della situazione nelle strade della capitale sa che 
                la Camarilla &egrave; stretta tra i palazzi di Puerto Madero, di Recoleta, Palermo, ma sar&agrave;
                solo questione di tempo prima che gli Anarchici possano riprendere il controllo e sfondare
                i confini di Capital Federal.
            </Typography>

            <img src="/night-club.webp"
                 alt="Zona Este"
                 align="right"
                 vspace="10px"
                 hspace="10px"
                 style={{
                     width: "270px",
                     height: "auto"
                 }} />

            <Typography paragraph sx={guideStyle}>
                Tra gli edifici degni di nota di questa zona c'&egrave; sicuramente il <b>Zona Este</b>, il 
                locale gestito dal branco di Manoukian, e centro nevralgico della maggior parte dei traffici 
                di droga da e per la capitale. 
                A conti fatti, il locale &egrave; l'unico punto di ritrovo pi&ugrave; o meno ufficiale per i Cainiti 
                della citt&agrave;, dove tutti gli altri punti di ritrovo, come l'Elysium, sono stati requisiti o
                abbandonati. La Policia della Provincia &egrave; molto differente da quella
                di Capital Federal, e l'esperienza di molti decenni di dominio Sabbat li ha messi a conoscenza
                del fatto che alcune zone &egrave; sempre meglio non controllarle.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <h4 style={titleStyle}>
                    Zona Este
                </h4>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il Night Club sorge nella zona nord della Provincia, a poca distanza dai confini della Capital
                Federal. Il locale &egrave; occupa una zona molto grande del confine con una zona disastrata, 
                una <i>villa</i>. Con un'estensione di circa un migliaio di metri quadrati, si sviluppa in due piani,
                con un palco, una sala da ballo, diversi priv&eacute;e e un piano superiore, una balconata 
                che corre lungo tre delle quattro pareti del locale, accessibile solo al personale, 
                ai proprietari ed agli invitati.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <h2 style={titleStyle}>
                    Avellaneda - Boca
                </h2>
            </Typography>

            <img src="/giovannis-mansion.webp"
                 alt="Magione Giovanni"
                 align="left"
                 vspace="10px"
                 hspace="10px"
                 style={{
                     width: "270px",
                     height: "auto"
                 }} />

            <Typography paragraph sx={guideStyle}>
                Gli Hecata sono riusciti, dopo aver respinto l'offensiva dei Ministri a seguito della debacle 
                finanziaria di Giovanni e Dunsirn, grazie all'intervento dei Pisanob rifugiatisi in citt&agrave;,
                a strappare dalle mani degli avversari la regione residenziale di alto profilo a sud di Capital 
                Federal, e la regione del porto della Boca.<br />
                Le pretese degli Hecata sono state accontentate in virt&ugrave; di due fortunose decisioni della
                Torre d'Avorio: la prima avvenuta quasi cinquecento anni fa, quando, assediata come ora dalla
                Inquisizione, decise di firmare il famoso trattato di non belligeranza col neonato clan Giovanni.
                La seconda, quando a livello globale hanno optato per accettare il clan dei Banu Haqim, 
                e di rifiutare la richiesta avanzata dai Ministri di far parte della Setta.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il riverbero della decisione, e l'esito di sostanziale pareggio del conflitto tra i due clan
                hanno fatto propendere la Camarilla per lasciare il territorio attualmente occupato dagli Hecata
                come cuscinetto contro la possibile avanzata dei Ministri.<br />
                La Portavoce del clan, <b>Mercedes Pisanob</b>, ha immediatamente disposto la messa in sicurezza dei 
                territori, ed ha cominciato la trattativa per la gestione di un importante sito per gli Hecata:
                il <b>Cementerio Monumental di Recoleta</b>, manovra tuttora osteggiata dalla Primogenita Tremere.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Grazie ai contatti tra le famiglie italiane emigrate nel corso dei decenni, i Giovanni
                del clan Hecata hanno potuto avere in concessione una magione di modeste dimensioni, ma 
                facilmente difendibile e vicino ai principali snodi e luoghi di interesse del territorio 
                appena fuori dalla Capital Federal.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <h2 style={titleStyle}>
                    Quilmes
                </h2>
            </Typography>

            <img src="/industrial-complex.webp"
                 alt="Complesso Industriale"
                 align="right"
                 vspace="10px"
                 hspace="10px"
                 style={{
                     width: "270px",
                     height: "auto"
                 }} />

            <Typography paragraph sx={guideStyle}>
                Quilmes, per poco tempo, &egrave; stata la sede dei Ministri di Set, che hanno tentato di stringere
                un'alleanza con gli Anarchici. L'organizzazione in quanto tale si &egrave; definitivamente sciolta
                in seguito all'arrivo della Seconda Inquisizione, di fatto unendosi alla Fazione Anarchica di 
                Manoukian, perdendo ogni organizzazione di clan interna, al contrario del clan Hecata, che continua ad
                operare. Quilmes, quindi, rimane per lo pi&ugrave; disabitata.
            </Typography>
        </>
    );
}

export default GuidesPlaces;
