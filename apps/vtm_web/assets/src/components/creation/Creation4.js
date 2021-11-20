// @flow

import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {UtilityContext} from "../../contexts";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DisciplinesControl from "./controls/DisciplinesControl";
import PredatorTypeControl from "./controls/PredatorTypeControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useFragment, useRelayEnvironment} from "react-relay";
import {characterConcealedInfoFragment} from "../../services/queries/character/CharacterFragments";
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
import type {
  CharacterFragments_characterConcealedInfo,
  CharacterFragments_characterConcealedInfo$key,
} from "../../services/queries/character/__generated__/CharacterFragments_characterConcealedInfo.graphql";

type InternalElementProps = {
    character: any;
    children: any => any;
};

const InternalElement = ({character, children}: InternalElementProps): any => {
    const infoFragment = useFragment<CharacterFragments_characterConcealedInfo$key>(
        characterConcealedInfoFragment,
        character);

    return (
        <>
            {children(infoFragment)}
        </>
    );
};

const Creation4ValidationSchema = (isVampire: boolean, hasDiscplines: boolean) => {
    let shape = {
        advantages: string("Please, write your character advantages").required("Devi aggiungere almeno 5 punti di Vantaggi per il tuo personaggio"),
        notes: string("Add the notes you want to communicate to the masters").nullable().notRequired(),
        firstConvinction: string("Add the first convinctions").required("Devi aggiungere tutte e tre le Convinzioni del tuo personaggio"),
        secondConvinction: string("Add the second convinctions").required("Devi aggiungere tutte e tre le Convinzioni del tuo personaggio"),
        thirdConvinction: string("Add the third convinctions").required("Devi aggiungere tutte e tre le Convinzioni del tuo personaggio")
    };

    if (isVampire) {
        shape = {
            ...shape,
            predatorType: string("Please select your character predator type").required("Il tuo personaggio deve essere di un tipo di predatore particolare")
        };
    }

    if (hasDiscplines) {
        shape = {
            ...shape,
            disciplinePowers: string("Scrivi quali poteri di Disciplina vuoi acquisire").required("Devi specificare i poteri di Disciplina del tuo personaggio"),
            discipline1: string("Select your character first discipline").required("Devi specificare il primo potere di Disciplina del tuo personaggio"),
            discipline2: string("Select your character second discipline").required("Devi specificare il secondo potere di Disciplina del tuo personaggio")
        }
    }

    return object().shape(shape);
}

const Creation4EmptyObject = (isVampire: boolean, hasDisciplines: boolean) => {
    let initialValue = {
        advantages: "",
        notes: "",
        firstConvinction: "",
        secondConvinction: "",
        thirdConvinction: ""
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
            disciplinePowers: "",
            discipline1: "",
            discipline2: ""
        }
    }

    return initialValue;
};

const capitalizeFirst = (s: string): string => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

const buildConvinctions = (first: string, second: string, third: string): string => 
    `- ${capitalizeFirst(first)}\n- ${capitalizeFirst(second)}\n- ${capitalizeFirst(third)}`;

const Creation4 = (): any => {
    const {showUserNotification} = useContext(UtilityContext);
    const classes = useStyles();
    const history = useHistory();
    const environment = useRelayEnvironment();

    const submit = (character: CharacterFragments_characterConcealedInfo) => ({
        disciplinePowers,
        discipline1,
        discipline2,
        predatorType,
        advantages,
        firstConvinction,
        secondConvinction,
        thirdConvinction,
        notes
    }) => {
        const disciplinesOk = !characterHasDisciplines(character) ||
            (discipline1 &&
            discipline2);

        const predatorTypeOk = !characterIsVampire(character) || predatorType;

        if (disciplinesOk &&
            predatorTypeOk &&
            advantages &&
            firstConvinction &&
            secondConvinction &&
            thirdConvinction) {

                let request = {
                    newStage: 4,
                    characterId: String(character?.id),
                    request: {
                        predatorTypeId: predatorType,
                        advantages: advantages,
                        notes: notes,
                        convinctions: buildConvinctions(firstConvinction, secondConvinction, thirdConvinction)
                    }
                };

                if (characterHasDisciplines(character)) {
                    request = {
                        ...request,
                        request: {
                            ...request.request,
                            disciplinePowers: disciplinePowers
                        },
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
                                        disciplinePowers={formik.values["disciplinePowers"]}
                                        firstError={formik.touched["discipline1"] && Boolean(formik.errors["discipline1"])}
                                        secondError={formik.touched["discipline2"] && Boolean(formik.errors["discipline2"])}
                                        disciplinePowersErrors={formik.touched["disciplinePowers"] && Boolean(formik.errors["disciplinePowers"])}
                                        onFirstDisciplineChange={formik.handleChange}
                                        onSecondDisciplineChange={formik.handleChange}
                                        onDisciplinePowersChange={formik.handleChange} />
                    <PredatorTypeControl characterInfo={characterInfo}
                                         classes={classes}
                                         formik={formik} />
                    <Grid item xs={12}>
                        <Typography className={classes.defaultParagraph}>
                            I vantaggi non possono essere selezionati automaticamente, poich&eacute; dovranno essere
                            vagliati dal master che controller&agrave; la tua scheda. I vantaggi sono la somma di
                            Background, Pregi e Difetti, di cui puoi trovare una lista completa
                            nella <Link to={GuideRoutes.attributes}
                                        target="_blank"
                                        rel="noreferrer">guida</Link>. Per la guida su come associare i Vantaggi
                            al tuo personaggio, consulta invece questa <Link to={GuideRoutes.creation}
                                                                             target="_blank"
                                                                             rel="noreferrer">sezione</Link>,
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
                            In questa sezione dovrai inserire le tre <b>Convinzioni</b> del tuo
                            personaggio. Puoi sceglierle tra quelle proposte nella&nbsp;
                            <Link to={GuideRoutes.creation} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  style={{color: "#C92929"}}>guida</Link>.
                            Se hai delle richieste particolari per il tuo personaggio, aggiungile alla definizione
                            delle Convinzioni, saranno vagliate dal master che controller&agrave; la tua scheda.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Prima Convinzione"
                            type="text"
                            id="firstConvinction"
                            name="firstConvinction"
                            value={formik.values["firstConvinction"]}
                            onChange={formik.handleChange}
                            error={formik.touched["firstConvinction"] && Boolean(formik.errors["firstConvinction"])}
                            helperText={formik.touched["firstConvinction"] && formik.errors["firstConvinction"]} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Seconda Convinzione"
                            type="text"
                            id="secondConvinction"
                            name="secondConvinction"
                            value={formik.values["secondConvinction"]}
                            onChange={formik.handleChange}
                            error={formik.touched["secondConvinction"] && Boolean(formik.errors["secondConvinction"])}
                            helperText={formik.touched["secondConvinction"] && formik.errors["secondConvinction"]} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Terza Convinzione"
                            type="text"
                            id="secondConvinction"
                            name="thirdConvinction"
                            value={formik.values["thirdConvinction"]}
                            onChange={formik.handleChange}
                            error={formik.touched["thirdConvinction"] && Boolean(formik.errors["thirdConvinction"])}
                            helperText={formik.touched["thirdConvinction"] && formik.errors["thirdConvinction"]} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.defaultParagraph}>
                            Infine, se hai delle richieste particolari per i master che dovranno visionare
                            la tua scheda, puoi inserirle in questa sezione.
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
                    <Grid item xs={12} sx={{margin: "1rem"}}>
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
