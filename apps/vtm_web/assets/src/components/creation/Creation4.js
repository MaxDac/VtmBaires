// @flow

import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {UtilityContext} from "../../contexts";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DisciplinesControl from "../sheet/controls/DisciplinesControl";
import PredatorTypeControl from "../sheet/controls/PredatorTypeControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useFragment, useRelayEnvironment} from "react-relay";
import type {
    CharacterFragments_characterInfo$key
} from "../../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";
import {characterInfoFragment} from "../../services/queries/character/CharacterFragments";
import type {CharacterFragments_characterInfo} from "../../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";
import CharacterFragmentProvider from "../_data/CharacterFragmentProvider";
import {object, string} from "yup";
import {useFormik} from "formik";
import useStyles from "../Main.Layout.Style";
import AddAdvantagesMutation from "../../services/mutations/characters/AddAdvantagesMutation";
import {
  characterHasDisciplines,
  characterIsVampire,
} from "../../_base/utils";
import {MainRoutes} from "../MainRouter";
import {Link} from "react-router-dom";
import { GuideRoutes } from "../guides/GuidesMain";

type InternalElementProps = {
    character: any;
    children: any => any;
};

const InternalElement = ({character, children}: InternalElementProps): any => {
    const infoFragment = useFragment<CharacterFragments_characterInfo$key>(
        characterInfoFragment,
        character);

    return (
        <>
            {children(infoFragment)}
        </>
    );
};

const Creation4ValidationSchema = (isVampire: boolean, hasDiscplines: boolean) => {
    let shape = {
        advantages: string("Please, write your character advantages").required("Required"),
        notes: string("Add the notes you want to communicate to the masters").required("Required")
    };

    if (isVampire) {
        shape = {
            ...shape,
            predatorType: string("Please select your character predator type").required("Required")
        };
    }

    if (hasDiscplines) {
        shape = {
            ...shape,
            discipline1: string("Select your character first discipline").required("Required"),
            discipline2: string("Select your character second discipline").required("Required")
        }
    }

    return object().shape(shape);
}

const Creation4EmptyObject = (isVampire: boolean, hasDisciplines: boolean) => {
    let initialValue = {
        advantages: "",
        notes: "",
    };

    if (isVampire) {
        initialValue = {
            ...initialValue,
            predatorType: ""
        };
    }

    if (hasDisciplines) {
        initialValue = {
            ...initialValue,
            discipline1: "",
            discipline2: ""
        }
    }

    return initialValue;
}

const Creation4 = (): any => {
    const {showUserNotification} = useContext(UtilityContext);
    const classes = useStyles();
    const history = useHistory();
    const environment = useRelayEnvironment();

    const submit = (character: CharacterFragments_characterInfo) => ({
        discipline1,
        discipline2,
        predatorType,
        advantages,
        notes
    }) => {

        const disciplinesOk = !characterHasDisciplines(character) ||
            (discipline1 &&
            discipline2);

        const predatorTypeOk = !characterIsVampire(character) || predatorType;

        if (disciplinesOk &&
            predatorTypeOk &&
            advantages &&
            notes) {

                let request = {
                    newStage: 4,
                    characterId: String(character?.id),
                    request: {
                        predatorTypeId: predatorType,
                        advantages: advantages,
                        notes: notes
                    }
                };

                if (characterHasDisciplines(character)) {
                    request = {
                        ...request,
                        attributes: [{
                            attributeId: discipline1,
                            characterId: String(character?.id),
                            value: 2
                        }, {
                            attributeId: discipline2,
                            characterId: String(character?.id),
                            value: 1
                        }]
                    };
                }

                if (characterIsVampire(character)) {
                    request = {
                        ...request,
                        request: {
                            ...request.request,
                            predatorTypeId: predatorType
                        }
                    };
                }

                AddAdvantagesMutation(environment, request)
                    .then(_ => history.push(MainRoutes.creation5))
                    .catch(e => {
                        console.error("error!", e);
                        showUserNotification({
                            type: "error",
                            graphqlError: e,
                            message: "There was an error while saving the character"
                        })
                    });
        }
    }

    const InnerComponent = ({classes, characterInfo}) => {
        const [isVampire, hasDisciplines] = [characterIsVampire(characterInfo), characterHasDisciplines(characterInfo)];

        const formik = useFormik({
            initialValues: Creation4EmptyObject(
                isVampire,
                hasDisciplines
            ),
            validationSchema: Creation4ValidationSchema(
                isVampire,
                hasDisciplines),
            onSubmit: submit(characterInfo)
        });

        return (
            <form className={classes.centeredContainer} noValidate onSubmit={formik.handleSubmit}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={classes.defaultParagraph}>
                            In questa sezione puoi scegliere gli ultimi attributi della scheda del tuo personaggio, prima dei ritocchi finali.
                        </Typography>
                    </Grid>
                    <DisciplinesControl characterInfo={characterInfo}
                                        classes={classes}
                                        firstDiscipline={formik.values["discipline1"]}
                                        secondDiscipline={formik.values["discipline2"]}
                                        firstError={formik.touched["discipline1"] && Boolean(formik.errors["discipline1"])}
                                        secondError={formik.touched["discipline2"] && Boolean(formik.errors["discipline2"])}
                                        onFirstDisciplineChange={formik.handleChange}
                                        onSecondDisciplineChange={formik.handleChange} />
                    <PredatorTypeControl characterInfo={characterInfo}
                                         classes={classes}
                                         value={formik.values["predatorType"]}
                                         onChange={formik.handleChange}
                                         error={formik.touched["predatorType"] && Boolean(formik.errors["predatorType"])} />
                    <Grid item xs={12}>
                        <Typography className={classes.defaultParagraph}>
                            I vantaggi non possono essere selezionati automaticamente, poich&eacute; dovranno essere
                            vagliati dal master che controller&agrave; la tua scheda. I vantaggi sono la somma di
                            Background, Pregi e Difetti, di cui puoi trovare una lista completa
                            nella <Link to={GuideRoutes.attributes}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{color: "#C91919"}}>guida</Link>. Per la guida su come associare i Vantaggi
                            al tuo personaggio, consulta invece questa <Link to={GuideRoutes.creation}
                                                                             target="_blank"
                                                                             rel="noreferrer"
                                                                             style={{color: "#C91919"}}>sezione</Link>,
                            ricorda in breve che hai <b>sette punti a disposizione</b> da assegnare.
                            Scrivi nel controllo di seguito tutti i vantaggi che vuoi assegnare al tuo personaggio, e
                            ricorda che se ti trovi in difficolt&agrave;, puoi sempre contattare un master via messaggio
                            o via Discord, tramite il link che puoi trovare nel menu a sinistra: la procedura di
                            iscrizione &egrave; comunque stata salvata fin qui!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Vantaggi"
                            type="text"
                            id="advantages"
                            name="advantages"
                            multiline={true}
                            rows={5}
                            value={formik.values["advantages"]}
                            onChange={formik.handleChange}
                            error={formik.touched["advantages"] && Boolean(formik.errors["advantages"])}
                            helperText={formik.touched["advantages"] && formik.errors["advantages"]} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.defaultParagraph}>
                            Se hai scelto di interpretare un personaggio <b>vampiro</b>, in questa sezione dovrai
                            inserire le tre <b>Convinzioni</b> e le <b>Ancore</b> del tuo personaggio. Puoi sceglierle
                            tra quelle proposte nella&nbsp;
                            <Link to={GuideRoutes.rules} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  style={{color: "#C92929"}}>guida</Link>.<br />
                            Se hai delle richieste particolari per il tuo personaggio, aggiungile alla definizione
                            delle Convinzioni, saranno vagliate dal master che controller&agrave; la tua scheda.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Note"
                            type="text"
                            id="notes"
                            name="notes"
                            multiline={true}
                            rows={5}
                            value={formik.values["notes"]}
                            onChange={formik.handleChange}
                            error={formik.touched["notes"] && Boolean(formik.errors["notes"])}
                            helperText={formik.touched["notes"] && formik.errors["notes"]} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="primary"
                            className={classes.submit}
                            onClick={submit(characterInfo)}>
                            Conferma
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }

    return (
        <CharacterFragmentProvider showWarningWhenNoCharacterSelected={true}>
            {characterQuery =>
                <InternalElement character={characterQuery}>
                    { character =>
                        <InnerComponent characterInfo={character} classes={classes} />
                    }
                </InternalElement>
            }
        </CharacterFragmentProvider>
    );
}

export default Creation4;