// @flow

import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type {ClanDisciplinesQueryResponse} from "../../../services/queries/info/__generated__/ClanDisciplinesQuery.graphql";
import {clanDisciplinesQuery} from "../../../services/queries/info/ClanDisciplinesQuery";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {CharacterFragments_characterInfo} from "../../../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";
import { characterHasDisciplines } from "../../../_base/utils";

type Props = {
    characterInfo: CharacterFragments_characterInfo;
    classes: any;
    onFirstDisciplineChange?: ?(Event) => void;
    onSecondDisciplineChange?: ?(Event) => void;
    firstDiscipline: string;
    secondDiscipline: string;
    firstError?: boolean;
    secondError?: boolean;
}

const DisciplinesControl = ({
                                characterInfo,
                                classes,
                                onFirstDisciplineChange,
                                onSecondDisciplineChange,
                                firstDiscipline,
                                secondDiscipline,
                                firstError,
                                secondError
}: Props): any => {
    const { clanDisciplines }: ClanDisciplinesQueryResponse =
        useCustomLazyLoadQuery(clanDisciplinesQuery, { clanId: characterInfo.clan?.id });

    const showDisciplines = () => {
        const options = [<MenuItem key="None" value=" ">None</MenuItem>];

        if (clanDisciplines && clanDisciplines.length > 0) {
            return [...options, ...clanDisciplines.map(d => <MenuItem key={d?.id} value={d?.id}>{d?.name}</MenuItem>)];
        }

        return options;
    }

    const disciplineSelector = () => {
        if (characterHasDisciplines(characterInfo)) {
            return (
                <>
                    <Grid item xs={12}>
                        <Typography className={classes.defaultParagraph}>
                            Seleziona le due Discipline del tuo personaggio. La prima Disciplina sar&agrave; di livello 2, la seconda di livello 1.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{textAlign: "center"}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="first-discipline-label">Prima Disciplina</InputLabel>
                            <Select labelId="first-discipline-label"
                                    id="discipline1"
                                    name="discipline1"
                                    value={firstDiscipline}
                                    onChange={onFirstDisciplineChange}
                                    error={firstError}
                                    style={{width: "200px"}}>
                                {showDisciplines()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{textAlign: "center"}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="second-discipline-label">Seconda Disciplina</InputLabel>
                            <Select labelId="second-discipline-label"
                                    id="discipline2"
                                    name="discipline2"
                                    value={secondDiscipline}
                                    onChange={onSecondDisciplineChange}
                                    error={secondError}
                                    style={{width: "200px"}}>
                                {showDisciplines()}
                            </Select>
                        </FormControl>
                    </Grid>
                </>);
        }

        return <></>;
    }

    return disciplineSelector();
}

export default DisciplinesControl;
