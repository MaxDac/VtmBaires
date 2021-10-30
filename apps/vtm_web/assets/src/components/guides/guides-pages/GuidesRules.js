// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import { guideStyle, liStyle, titleStyle } from "../GuidesStyles";

const GuidesRules = (): any => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Adattamenti rispetto alla V5
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il nuovo manuale <b>Corebook V5</b>, oltre ad introdurre una serie di cambiamenti radicali all'Ambientazione,
                ha anche rivoluzionato le meccaniche di base del gioco. Il sito cerca di implementare automaticamente i nuovi 
                regolamenti descritti nel manuale. Per i giocatori della Terza Edizione, di seguito sono elencate le differenze 
                sostanziali, e qual &egrave; lo stato di implementazione nel sito:

                <ul>
                    <li style={liStyle}>
                        Il computo dei successi cambia: la difficolt&agrave; non corrisponde pi&ugrave; al punteggio
                        da superare col singolo dado, ma al numero di dadi d10 che superano il valore 6. Ad esempio,
                        un tiro a difficolt&agrave; <b>3</b> ora verr&agrave; superato se il numero di successi (risultato
                        del dado maggiore di 6) supera o eguaglia 3. Il sito offre la possibilit&agrave; di tirare 
                        un numero di dadi determinato da Attributo e Abilit&agrave; e dadi liberi, con relativa
                        descrizione del risultato.
                    </li>

                    <li style={liStyle}>
                        I cainiti non avranno pi&ugrave; Punti Sangue a disposizione, ma un punteggio di <b>Fame</b>&nbsp;
                        variabile da 1 a 5. Ogni volta che un cainita vorr&agrave; spendere sangue, dovr&agrave;
                        tirare un dado d10. Se otterr&agrave; pi&ugrave; di 6, non subir&agrave; nessuna penalit&agrave;.
                        Un fallimento indicher&agrave; l'aumento della <b>Fame</b>. A livello 5, il cainita sar&agrave;
                        da considerare sulla soglia della Frenesia, e dovr&agrave; cibarsi immediatamente per non cadervi.<br />
                        La <b>Fame</b> avr&agrave; un riscontro anche sul risultato dei dadi. Per maggior informazioni
                        vi invitiamo a leggere il <b>Core Book</b> della versione 5. Comunque, i risultati dei dadi 
                        nel sito considereranno gi&agrave; il punteggio di <b>Fame</b> e le sue conseguenze.
                    </li>

                    <li style={liStyle}>
                        La gestione della moralit&agrave; cambia radicalmente. L'umanit&agrave; ora sar&agrave; l'unico 
                        punteggio disponibile, ma si potranno decidere tre <b>Convinzioni</b> del personaggio.
                        Ogni personaggio dovr&agrave; indicare tre convinzioni nelle note per il master in creazione.
                    </li>

                    <li style={liStyle}>
                        <i>Under construction</i>
                    </li>
                </ul>
            </Typography>
        </>
    );
}

export default GuidesRules;
