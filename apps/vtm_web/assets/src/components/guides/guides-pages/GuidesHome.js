// @flow

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { guideStyle, titleStyle } from "../GuidesStyles";

type Props = {

}

const GuidesHome = (props: Props): any => {
    return (
        <Box>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Guide di Buenos Aires by Night
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Lo staff di Buenos Aires by Night vi d&agrave; il benvenuto nella sua comunit&agrave; online,
                e vi ringrazia del tempo che dedicherete fin da ora al suo sviluppo ed alla sua evoluzione.
                La guida che state per leggere non ambisce a coprire tutte le informazioni contenute nella 
                manualistica della <b>White Wolf</b>&trade;
                riguardo <b>Vampiri: la Masquerade</b>&trade;, vi rimandiamo ai relativi manuali, nella loro ultima versione v5,
                ai quali la comunit&agrave; si ispira e tenta di implementare nel (a volte) limitante contesto online.
            </Typography>
            <Typography paragraph sx={guideStyle}>
                In questa comunit&agrave; &egrave; indispensabile per giocare un vampiro, avere una estesa conoscenza
                dell'ambientazione di Vampiri: la Masquerade&trade;. Questo non vuol dire che giocatori privi di questa
                conoscenza siano esclusi automaticamente: potranno cominciare giocando personaggi umani, ed essere
                introdotti lentamente al mondo, alla terminologia ed alle conoscenze del mondo dei vampiri.
            </Typography>
            <Typography paragraph sx={guideStyle}>
                Vi invitiamo comunque a leggere la guida per apprendere quali adattamenti sono stati ritenuti necessari
                nello sviluppo della land, quali limitazioni sono stati poste all'ambientazione, e le sue caratteristiche.
            </Typography>
            <Typography paragraph sx={guideStyle}>
                La guida si svilupper&agrave; in questo modo:
                <ul>
                    <li>
                        Verranno elencate le regole generali del gioco, come si consiglia di condurre 
                        l'interpretazione dei personaggi, cosa &egrave; consentito e cosa no.
                    </li>
                    <li>
                        Verr&agrave; descritta l'ambientazione di partenza in generale, e come questa si allaccia e si
                        configura all'interno di quella definita nei manuali di Vampiri: la Masquerade v5.
                    </li>
                    <li>
                        Saranno quindi presi in considerazione i personaggi non giocanti principali, i loro ruoli e
                        un abbozzo della loro biografia.
                    </li>
                    <li>
                        L'ultima sezione della guida riguarder&agrave; informazioni di natura generale, per coadiuvare
                        l'interpretazione dei vostri personaggi.
                    </li>
                </ul>
            </Typography>
            <Typography paragraph sx={guideStyle}>
                Rinnoviamo i nostri ringraziamenti per averci scelto, e alla White Wolf (il cui link potete trovare
                nella sezione dei <i>Credits</i>) che ha reso possibile giocare.
            </Typography>
        </Box>
    );
}

export default GuidesHome;
