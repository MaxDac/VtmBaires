// @flow

import React, {useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import type {ClanDisciplinesQueryResponse} from "../../../services/queries/info/__generated__/ClanDisciplinesQuery.graphql";
import {characterHasDisciplines} from "../Creation4";
import {clanDisciplinesQuery} from "../../../services/queries/info/ClanDisciplinesQuery";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {CharacterFragments_characterInfo} from "../../../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";

type Props = {
    characterInfo: CharacterFragments_characterInfo;
    classes: any;
    onChange?: ?(string, string) => void;
}

const DisciplinesControl = ({ characterInfo, classes, onChange }: Props): any => {
    const { clanDisciplines }: ClanDisciplinesQueryResponse =
        useCustomLazyLoadQuery(clanDisciplinesQuery, { clanId: characterInfo.clan?.id });

    const [firstDiscipline, setFirstDiscipline] = useState("");
    const [secondDiscipline, setSecondDiscipline] = useState("");

    const showDisciplines = () => {
        const options = [<MenuItem key="None" value=" ">None</MenuItem>];

        if (clanDisciplines && clanDisciplines.length > 0) {
            return [...options, ...clanDisciplines.map(d => <MenuItem key={d?.id} value={d?.id}>{d?.name}</MenuItem>)];
        }

        return options;
    }

    const firstControlChanged = ({target: {value}}) => {
        setFirstDiscipline(value);

        if (onChange) {
            onChange(value, secondDiscipline);
        }
    }

    const secondControlChanged = ({target: {value}}) => {
        setSecondDiscipline(value);

        if (onChange) {
            onChange(firstDiscipline, value);
        }
    }

    const disciplineSelector = () => {
        if (characterHasDisciplines(characterInfo)) {
            return (
                <>
                    <Grid item xs={12}>
                        <Typography className={classes.defaultParagraph}>
                            Please select the two Disciplines available in creation.
                            The first one will receive 2 points, the second only 1.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{textAlign: "center"}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="first-discipline-label">First Discipline</InputLabel>
                            <Select labelId="first-discipline-label"
                                    id="first-discipline"
                                    name="first-discipline"
                                    value={firstDiscipline}
                                    onChange={firstControlChanged}
                                    style={{width: "200px"}}>
                                {showDisciplines()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{textAlign: "center"}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="second-discipline-label">Second Discipline</InputLabel>
                            <Select labelId="second-discipline-label"
                                    id="second-discipline"
                                    name="second-discipline"
                                    value={secondDiscipline}
                                    onChange={secondControlChanged}
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
