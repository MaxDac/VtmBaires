// @flow

import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import {predatorTypesQuery} from "../../../services/queries/info/PredatorTypesQuery";
import type {PredatorTypesQueryResponse} from "../../../services/queries/info/__generated__/PredatorTypesQuery.graphql";
import {characterIsVampire} from "../creation/Creation4";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {CharacterFragments_characterInfo} from "../../../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";

type Props = {
    characterInfo: CharacterFragments_characterInfo;
    classes: any;
    value: string;
    onChange?: ?(Event => void);
}

const PredatorTypeControl = ({ characterInfo, classes, value, onChange }: Props): any => {
    const {predatorTypes}: PredatorTypesQueryResponse = useCustomLazyLoadQuery(predatorTypesQuery, {});

    const showPredatorTypes = () => {
        const options = [<MenuItem key="None" value=" ">None</MenuItem>];

        if (predatorTypes && predatorTypes.length > 0) {
            return [...options, ...predatorTypes.map(d => <MenuItem key={d?.id} value={d?.id}>{d?.name}</MenuItem>)];
        }

        return options;
    }

    const predatorTypeSelector = () => {
        if (characterIsVampire(characterInfo)) {
            return (
                <>
                    <Grid item xs={12} className={classes.defaultParagraph}>
                        Choose your character predator type.
                    </Grid>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="predator-type-label">Predator Type</InputLabel>
                            <Select labelId="predator-type-label"
                                    id="predatorType"
                                    name="predatorType"
                                    value={value}
                                    onChange={onChange}
                                    style={{width: "200px"}}>
                                {showPredatorTypes()}
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            )
        }

        return <></>;
    }

    return predatorTypeSelector();
}

export default PredatorTypeControl;
