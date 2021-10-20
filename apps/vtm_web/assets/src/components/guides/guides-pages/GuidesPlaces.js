// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import { guideStyle, titleStyle } from "../GuidesStyles";
import { Box } from "@mui/system";

type Props = {

}

const GuidesPlaces = (props: Props): any => {
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
                    La Provincia &egrave; parte integrante dell'area metropolitana, anche se &egrave; stata subito
                    snobbata dalla Camarilla. Gli Anarchici conoscevano troppo bene la citt&agrave; per compiere 
                    tale errore di valutazione.
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
                La Camarilla vanta infatti influeza nella Policia Federal e negli Ospedali di Capital Federal grazie
                all'influenza Ventrue ed all'opera Malkavian. Tra gli edifici che per&ograve; pi&ugrave; 
                contraddistinguono la presenza della Setta nella citt&agrave; &egrave; il suo Elysium.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Installato in un palazzo da lungo tempo abbandonato a due passi dal Parlamento, gli asserviti 
                della Primogenita Isabela Ruiz Diaz hanno coordinato la costituzione di una societ&agrave; di 
                investimenti in grado di muovere grandi quantit&grave; di denaro, e di dollari, valuta estremamente
                richiesta negli ambienti pi&grave; altolocati della politica argentina. Questo ha garantito 
                non solo discrezione, ma anche la protezione del luogo da parte dei servizi speciali della 
                Polizia di Stato. Il luogo &egrave; praticamente inespugnabile.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Un altro edificio degno di nota &egrave; il vecchio Sanatorio abbandonato occupato dal Primogenito
                Malkavian, riadibito nella sua ala pi&ugrave; moderna a centro per analisi del sangue ed
                epidemiologico, per garantire un flusso costante di sangue in caso di emergenza.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <h2 style={titleStyle}>
                    Provincia Norte
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Non &egrave; stato difficile per Manoukian prendere possesso di uno dei locali periferici 
                pi&ugrave; frequentati dalla feccia di Buenos Aires. Da l&igrave;, il controllo delle <i>Villas</i>
                &egrave; stata solo un'operazione di ristabilimento di antiche alleanze, riscossione di favori
                e rinvigorimento nel controllo del territorio.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Nonostante la Camarilla si vanti di avere il controllo della Capital Federal, chi tra gli 
                ex Sabbat, ora Anarchici, ha il polso della situazione nelle strade della capitale sa che 
                la Camarilla &egrave; stretta tra i palazzi di Puerto Madero, di Recoleta, Palermo, ma sar&agrave;
                solo questione di tempo prima che gli Anarchici possano riprendere il controllo e sfondare
                i confini di Capital Federal.<br />
                Per ora, comunque, la comune Anarchica sembra voler radunare e contare le forze, riogranizzare
                i vecchi traffici e trovare l'equilibrio con la nuova alleanza coi Ministri di Set a Quilmes.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Tra gli edifici degni di nota di questa zona c'&egrave; sicuramente il <b>Zona Este</b>, il 
                locale gestito dal branco di Manoukian, e centro nevralgico della maggior parte dei traffici 
                di droga da e per la capitale. La Policia della Provincia &egrave; molto differente da quella
                di Capital Federal, e l'esperienza di molti decenni di dominio Sabbat li ha messi a conoscenza
                del fatto che alcune zone &egrave; sempre meglio non controllarle.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <h2 style={titleStyle}>
                    Avellaneda - Boca
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Gli Hecata sono riusciti, dopo aver respinto l'offensiva dei Ministri a seguito della debacle 
                finanziaria di Giovanni e Dunsirn, grazie all'intervento dei Pisanob rifugiatisi in citt&grave;,
                a strappare dalle mani degli avversari la regione residenziale di alto profilo a sud di Capital 
                Federal, e la regione del porto della Boca.<br />
                Le pretese degli Hecata sono state accontentate in virt&ugrave; di due fortunose decisioni della
                Torre d'Avorio: la prima avvenuta quasi cinquecento anni fa, quando, assediata come ora dalla
                Inquisizione, decise di firmare il famoso trattato di non belligeranza col neonato clan Giovanni.
                La seconda, quando a livello globale hanno optato per accettare il clan dei Banu Haquim, 
                e di rifiutare la richiesta avanzata dai Ministri di far parte della Setta.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il riverbero della decisione, e l'esito di sostanziale pareggio del conflitto tra i due clan
                hanno fatto propendere la Camarilla per lasciare il territorio attualmente occupato dagli Hecata
                come cuscinetto contro la possibile avanzata dei Ministri.<br />
                La Portavoce del clan, Mercedes Pisanob, ha immediatamente disposto la messa in sicurezza dei 
                territori, ed ha cominciato la trattativa per la gestione di un importante sito per gli Hecata:
                il Cementerio Monumental di Recoleta, manovra tuttora osteggiata dalla Primogenita Tremere.
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

            <Typography paragraph sx={guideStyle}>
                I Ministri di Set avrebbero potuto vincere la loro guerra di influenze contro gli Hecata, se
                la Camarilla non si fosse intromessa, assieme agli Anarchici. Questo &egrave; quello che pensano
                gli ex Seguaci di Set, che ora controllano il quartiere industriale a sud della capitale.<br />
                Nel conflitto per il controllo del territorio, sanno di essere arrivati ultimi e di aver perso...
                per ora. La piccola rappresentanza rimasta a Buenos Aires &egrave; ancora indecisa sull'esito
                e sul futuro dell'alleanza con gli Anarchici, paradigma che sembra star diventando globalmente 
                accettato e perpetrato, ed uno dei fronti del difficile equilibrio sar&agrave; sicuramente 
                il controllo del traffico di narcotici e di... altro.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Pochi sono i luoghi di interesse in questa parte della citt&grave; accessibili a chi non abbraccia
                il culto del clan: il Tempio &egrave; ubicato in uno stabile interrato e protetto, virutalmente 
                inaccessibile per chiunque non sappia cosa sta cercando.
            </Typography>
        </>
    );
}

export default GuidesPlaces;
