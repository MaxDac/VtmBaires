// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import { guideStyle, liStyle, titleStyle } from "../GuidesStyles";

type Props = {

}

const GuidesEnvironment = (props: Props): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Ambientazione
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Con questa sezione, comincia la parte di regolamento dedicata alle inforamzioni in gioco. Verr&agrave;
                spiegata la storia, e il suo intreccio con quella descritta nei manuali di Vampiri: la Masquerade&trade; v5,
                e verr&agrave; anche scritto quanto della pi&ugrave; aggioranta manualistica sar&agrave; considerato,
                e cosa no.
            </Typography>

            <Typography paragraph>
                <h2 style={titleStyle}>
                    V5
                </h2>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Cominceremo col riassumere cosa considereremo dell'ambientazione a livello globale introdotta nell'ultima
                versione dei manuali. Vi invitiamo comunque a leggere i manuali rilasciati dalla White Wolf&trade;.
                Nella sezione <b>Credits</b> troverete tutti i link relativi. Quanto segue non prentede essere un riassunto
                di quanto descritto nei manuali citati, ma sar&agrave; il punto di partenza dell'ambientazione di
                Buenos Aires by Night.

                <ul>
                    <li style={liStyle}>
                        Il <i>Beckoning</i>, la chiamata degli Anziani di tutto il mondo a partecipare alla Guerra della
                        Gehenna iniziata dal Sabbat circa nella met&agrave; del primo decennio di questo secolo, &egrave;
                        avvenuta. Questo vuol dire che l'ambientazione non prevede il gioco Sabbat (non ancora almeno).
                        Questo vuole anche dire che il gioco politico della Camarilla &egrave; reso pi&ugrave; interessante
                        dal fatto che non ci sono pi&ugrave; Anziani arroccati in posizioni di potere prima inaccessibili.
                    </li>

                    <li style={liStyle}>
                        Come conseguenza, gli Anarchici hanno trovato maggiore spazio politico
                        all'interno della societ&agrave; cainita. Sono loro, nelle Notti Moderne, i veri antagonisti
                        e la vera alternativa al potere della Camarilla, soprattutto dopo la defezione del clan Brujah.
                        I rapporti con la Camarilla, comunque, non soffrono della stessa natura antagonistica che la Setta
                        sperimentava col Sabbat nel ventesimo secolo, anche se conti aperti rimangono, come la defezione
                        di Theo Bell, il famoso Brujah che ha ucciso Hardestadt, il <i>deus ex machina</i> dietro la
                        creazione della Camarilla, e probabilmente anche il suo infante, Jan Pieterszoon.
                    </li>

                    <li style={liStyle}>
                        La Seconda Inquisizione, miscuglio di servizi segreti vaticani, Societ&agrave; di Leopoldo,
                        ed altre organizzazioni governative statali e interstatali, ha colpito fortemente la societ&agrave;
                        cainita e minato la sua sicurezza nella dominazione dei mortali. Dopo il colpo inferto al
                        clan Tremere con la distruzione della Chantry viennese, Londra &egrave; stata purgata della
                        presenza cainita, Berlino e altre citt&agrave; europee stanno subendo la stessa sorte. Tra
                        questa minaccia e il <i>Beckoning</i>, il Richiamo soprannaturale subito da molti degli Anziani
                        (dalla nona generazione fino ai Matusalemme di quarta generazione), la Camarilla &egrave;
                        rimasta doppiamente sguarnita.
                    </li>

                    <li style={liStyle}>
                        La temporanea sparizione del Sabbat nella Societ&agrave; dei Fratelli, il <i>Beckoning</i> e la
                        persecuzione della Seconda Inquisizione hanno stravolto la geografia politica del potere cainita.
                        Ad approfittarne sono stati Neonati ed Ancillae, un tempo meri esecutori della volont&agrave;
                        dei loro sire, che hanno dovuto assumere le responsabilit&agrave; del potere. Poi, gli
                        Anarchici, che un tempo faticavano a ritagliarsi uno spazio al di fuori dello Stato Libero
                        organizzato in California, ed ora possono addirittura puntare ad assumere il controllo dei
                        domini europei.
                    </li>

                    <li style={liStyle}>
                        Una delle caratteristiche pi&ugrave; significative descritte nei nuovi manuali V5 riguarda
                        il sostanziale abbandono, da parte della gerarchia della Camarilla, di tutte le nuove
                        tecnologie, inclusi smartphone, ma anche personal computer, e in generale tutto ci&ograve;
                        che abbia una fotocamera ed una connessione ad internet. Questo dettaglio verr&agrave;
                        ritenuto significativo, e nel corso delle giocate, l'utilizzo di apparecchiatura elettronica
                        verr&agrave; considerato come potenziale infrazione delle "raccomandazioni" della Camarilla.
                    </li>

                    <li style={liStyle}>
                        In questo contesto, si immerge l'ambientazione della citt&agrave; di Buenos Aires, descritta in
                        seguito. Non verr&agrave; considerato, nello stilare l'ambientazione iniziale, nessun manuale
                        particolare, al di fuori dei seguenti:

                        <ul>
                            <li>Corebook v5</li>
                            <li>Chicago by Night</li>
                            <li>I Culti del Sangue</li>
                        </ul>

                        Considerare troppi manuali sarebbe controproducente, in quanto giocatori meno esperti verrebbero
                        penalizzati, e l'ambientazione verrebbe limitata dalla grande mole di informazioni.
                    </li>
                </ul>
            </Typography>
        </>
    );
}

export default GuidesEnvironment;
