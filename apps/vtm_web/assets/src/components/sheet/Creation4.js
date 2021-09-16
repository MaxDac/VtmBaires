// @flow

import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import MainLayout from "../Main.Layout";
import {UtilityContext} from "../../App";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DisciplinesControl from "./controls/DisciplinesControl";
import PredatorTypeControl from "./controls/PredatorTypeControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FinalizeCharacterCreationMutation from "../../services/mutations/characters/FinalizeCharacterCreationMutation";
import {Routes} from "../../AppRouter";
import {useFragment} from "react-relay";
import type {
    CharacterFragments_characterInfo$key
} from "../../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";
import {characterInfoFragment} from "../../services/queries/character/CharacterFragments";
import type {CharacterFragments_characterInfo} from "../../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";
import {log} from "../../_base/utils";
import CharacterFragmentProvider from "../_data/CharacterFragmentProvider";

export const characterIsVampire: (?CharacterFragments_characterInfo => boolean) = character =>
    character?.clan?.name !== "Human";

export const characterHasDisciplines: (?CharacterFragments_characterInfo => boolean) = character => {
    const clanName = character?.clan?.name;
    return !(clanName === "Human" || clanName === "Thin Blood");
}

type InternalElementProps = {
    character: any;
    children: any => any;
};

const InternalElement = ({character, children}: InternalElementProps): any => {
    log("character xxx", character);
    const infoFragment = useFragment<CharacterFragments_characterInfo$key>(
        characterInfoFragment,
        character);

    return (
        <>
            {children(infoFragment)}
        </>
    );
};

const Creation4 = (): any => {
    const {setError} = useContext(UtilityContext);
    const history = useHistory();

    const [firstDiscipline, setFirstDiscipline] = useState("");
    const [secondDiscipline, setSecondDiscipline] = useState("");
    const [predatorType, setPredatorType] = useState("");
    const [advantages, setAdvantages] = useState("");
    const [notes, setNotes] = useState("");

    const onDisciplineControlChanged = (discipline1, discipline2) => {
        setFirstDiscipline(discipline1);
        setSecondDiscipline(discipline2);
    }

    const onPredatorTypeControlChanged = (pt: string) => {
        setPredatorType(pt);
    };

    const isIdNull = id => !id || id.trim() === "";

    const submit = (character: CharacterFragments_characterInfo) => _ => {
        let error = false;
        if (characterHasDisciplines(character) && (isIdNull(firstDiscipline) || isIdNull(secondDiscipline))) {
            error = true;
            setError({ type: 'error', message: "You must select the two character Disciplines." });
        }

        if (firstDiscipline === secondDiscipline) {
            error = true;
            setError({ type: 'error', message: "The two disciplines must be different."});
        }

        if (characterIsVampire(character) && isIdNull(predatorType)) {
            error = true;
            setError({ type: 'error', message: "You must select a predator type." });
        }

        if (isIdNull(advantages)) {
            error = true;
            setError({ type: 'error', message: "You must fill the advantages." });
        }

        if (error) {
            return;
        }

        FinalizeCharacterCreationMutation({
            attributes: [{
                attributeId: firstDiscipline,
                characterId: String(character?.id),
                value: 2
            }, {
                attributeId: secondDiscipline,
                characterId: String(character?.id),
                value: 1
            }],
            newStage: 4,
            request: {
                predatorTypeId: predatorType,
                advantages: advantages,
                notes: notes
            }
        }).then(_ => {
            setError({ type: "success", message: "Character saved."});
            setTimeout(() => history.push(Routes.main));
        }).catch(e => setError({ type: "error", graphqlError: e, message: "There was an error while saving the character"}))
    }

    const InnerComponent = ({classes, character}) => {
        log("character inner component", character);

        return (
            <div className={classes.centeredContainer}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={classes.defaultParagraph}>
                            Now you can select the last attribute of your character.
                        </Typography>
                    </Grid>
                    <DisciplinesControl character={character}
                                        classes={classes}
                                        onChange={onDisciplineControlChanged}/>
                    <PredatorTypeControl character={character}
                                         classes={classes}
                                         onChange={onPredatorTypeControlChanged}/>
                    <Grid item xs={12}>
                        <Typography className={classes.defaultParagraph}>
                            Write all the advantages that you would like to assign to your
                            character.<br/>
                            One master will review the list and correct the character sheet
                            accordingly.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Advantages"
                            type="text"
                            id="advantages"
                            name="advantages"
                            multiline={true}
                            rows={5}
                            value={advantages}
                            onChange={({target: {value}}) => setAdvantages(value)}
                            helperText="Write down the advantages you want to assign to your character"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.defaultParagraph}>
                            If you want to ask for something in particular, please input in the
                            following.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Notes"
                            type="text"
                            id="notes"
                            name="notes"
                            multiline={true}
                            rows={5}
                            value={notes}
                            onChange={({target: {value}}) => setNotes(value)}
                            helperText="Notes for the master"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={submit(character)}>
                            Finish creation
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    return (
        <MainLayout>
            {(classes: any) =>
                <CharacterFragmentProvider>
                    {characterQuery =>
                        <InternalElement character={characterQuery}>
                            { character =>
                                <InnerComponent character={character} classes={classes} />
                            }
                        </InternalElement>
                    }
                </CharacterFragmentProvider>
            }
        </MainLayout>
    );
}

export default Creation4;
