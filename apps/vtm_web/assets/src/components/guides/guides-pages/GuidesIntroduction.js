// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {guideStyle, titleStyle} from "../GuidesStyles";
import {Link} from "react-router-dom";
import {GuideRoutes} from "../GuidesMain";
import type {GenericReactComponent} from "../../../_base/types";

const GuidesGlossary = (): GenericReactComponent => {
    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Introduzione
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Questo gioco si ispira, come detto, ai manuali di <b>Vampiri: la Masquerade&trade;</b>, che fanno parte
                di una collana che tratta di quello che viene chiamato il <b>Mondo di Tenebra</b>, ovvero generalmente
                un mondo che gli esseri umani sono impossibilitati a percepire. Questo mondo &egrave; popolato di ogni 
                genere di creatura fantastica dalle leggende: licantropi, maghi e fate popolano questo mondo assieme,
                appunto, ai <b>vampiri</b>.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                I vampiri ritratti da Vampiri: la Masquerade&trade; non sono troppo distanti dalle rappresentazioni
                date dalla letteratura e dalla filmografia: sono predatori soprannaturali per cui fuoco e raggi del Sole
                sono anatema, possono nutrirsi solo di sangue, ma a parte rari casi non sono influenzati da comuni 
                credenze (non sfuggono da croci o da acqua corrente) e i paletti di legno non li uccidono, ma riescono
                solo temporaneamente a bloccarli.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Nella sezione Ambientazione di questa guida potrete avere un'idea di come la loro societ&agrave; &egrave;
                organizzata, e quali sono le personalit&agrave; di riferimento e i loro nemici.
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Il <Link to={GuideRoutes.glossary}>Glossario</Link> vi fornir&agrave; un lessico basico per poter
                affrontare le altre sezioni, mentre potrete trovare informazioni sul mondo di Tenebra nella 
                sezione <Link to={GuideRoutes.environment}>Globale</Link>. 
            </Typography>

            <Typography paragraph sx={guideStyle}>
                Potrete trovare informazioni sulla citt&agrave; di Buenos Aires e la sua organizzazione nelle
                sezioni <Link to={GuideRoutes.environmentBaires}>Buenos Aires</Link> e <Link to={GuideRoutes.environmentSects}>Sette</Link>.
            </Typography>
        </>
    );
}

export default GuidesGlossary;
