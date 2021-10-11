// @flow

import React from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CreationBase from "../strategies/CreationBase";
import MainLayout from "../../MainLayout";
import useStyles from "../../Main.Layout.Style";
import {useSession} from "../../../services/session-service";
import TemplateSelectionControl from "../controls/TemplateSelectionControl";

const Creation2 = (): any => {
    const classes = useStyles();
    const [, character] = useSession();

    const emptyAttributes = {
        attribute4: "",
        attribute31: "",
        attribute32: "",
        attribute33: "",
        attribute21: "",
        attribute22: "",
        attribute23: "",
        attribute24: "",
        attribute1: ""
    };

    const getAttributesToSave = (values, generateRequest) => [
        generateRequest(values.attribute4, 4),
        generateRequest(values.attribute31, 3),
        generateRequest(values.attribute32, 3),
        generateRequest(values.attribute33, 3),
        generateRequest(values.attribute21, 2),
        generateRequest(values.attribute22, 2),
        generateRequest(values.attribute23, 2),
        generateRequest(values.attribute24, 2),
        generateRequest(values.attribute1, 1)
    ];

    const form = getAttributeSelector =>
        <>
            <Grid item xs={12}>
                <Typography>
                    Scegli un attributo a cui assegnare 4 livelli di Attributo
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {getAttributeSelector("attribute4", "Attribute at 4")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... 3 al livello 3:
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("attribute31", "Attribute at 3")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("attribute32", "Attribute at 3")}
            </Grid>
            <Grid item xs={12} md={4}>
                {getAttributeSelector("attribute33", "Attribute at 3")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... quattro a livello 2:
                </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("attribute21", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("attribute22", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("attribute23", "Attribute at 2")}
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("attribute24", "Attribute at 2")}
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    ... e infine, uno a livello 1:
                </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
                {getAttributeSelector("attribute1", "Attribute at 1")}
            </Grid>
        </>;

    const getForm = () => {
        if (character?.id != null) {
            return (
                <div className={classes.centeredContainer}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography>
                                In questa e nella prossima sezione, potrai scegliere Attributi e Abilità del tuo personaggio.
                                Invece di sceglierle manualmente, puoi invece selezionare uno dei <i>templates</i> proposti in seguito.
                                Ricorda che, sia selezionando manualmente Attributi e Abilità, sia selezionanto uno dei <i>template</i> a disposizione,
                                alla fine della creazione ti sarà data la possibilità di sistemare la scheda avendo a disposizione tutti i valori inseriti,
                                sempre nel rispetto delle regole di creazione.
                            </Typography>
                            <Typography>
                                Se vuoi selezionare un <i>template</i>, selezionalo nel controllo in basso, altrimenti ignoralo, inserisci gli Attributi
                                e continua con la creazione del personaggio.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{
                            margin: "20px"
                        }}>
                            <TemplateSelectionControl characterId={character.id} />
                        </Grid>
                        <Grid item xs={12}>
                            <CreationBase classes={classes}
                                          characterId={character.id}
                                          currentStage={2}
                                          attributeTypeName="Attribute"
                                          emptyAttributes={emptyAttributes}
                                          getAttributesToSave={getAttributesToSave}>
                                {form}
                            </CreationBase>
                        </Grid>
                    </Grid>
                </div>
            );
        }
        
        return <></>;
    }

    return (
        <MainLayout>
            {getForm()}
        </MainLayout>
    );
}

export default Creation2;