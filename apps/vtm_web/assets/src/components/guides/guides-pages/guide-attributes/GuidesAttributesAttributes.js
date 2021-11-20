// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {guideStyle, titleStyle} from "../../GuidesStyles";

type Props = {
    showAttributes: (string, string) => any[];
}

const GuidesAttributesAttributes = ({showAttributes}: Props): any => {
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
            <Grid container>
                {showAttributeColumns("Attribute", "Attributi")}
                {showAttributeColumns("Ability", "Abilità")}

                <Grid item xs={12} id="specialties">
                    <Typography paragraph>
                        <h3 style={titleStyle}>
                            Specialit&agrave;
                        </h3>
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography paragraph style={guideStyle}>
                        Le <b>Specialit&agrave;</b> sono delle specializzazioni in una determinata Abilit&agrave; del personaggio,
                        delle particolari classi di sapienza o di addestramento in cui il personaggio eccelle. Ogni specialit&agrave;
                        costituir&agrave; <b>un particolare sottoinsieme di una Abilit&agrave;</b>: ad esempio, una possibile 
                        specialit&agrave; dell'Abilit&agrave; <b>Accademiche</b> potrebbe essere <b>Storia</b>, una di <b>Finanza</b>
                        invece potrebbe essere <b>Criptomonete</b>, o <b>Mercato Azionario</b>. Non potr&agrave; invece essere 
                        considerata una Specialit&agrave; consentita una forma di arte marziale per <b>Rissa</b>: una particolare
                        arte marziale si applica a tutte le manovre di attacco o difesa, non una in particolare.
                    </Typography>

                    <Typography paragraph style={guideStyle}>
                        (<b>Home Rule</b>) Ogni personaggio acquisir&agrave; automaticamente entrambe le Specialit&agrave; in funzione 
                        del Tipo di Predatore selezionato, e potr&agrave; acquistarne altre con Punti Esperienza, a patto che abbia 
                        <b>almeno 3 pallini</b> in quella Abilit&agrave;. Ogni specialit&agrave; garantir&agrave; un dado supplementare 
                        all'ammontare dei dadi applicato ai tiri per la specialit&agrave; del personaggio, e si potr&agrave; usare una sola 
                        specialit&agrave; per tiro.
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default GuidesAttributesAttributes;
