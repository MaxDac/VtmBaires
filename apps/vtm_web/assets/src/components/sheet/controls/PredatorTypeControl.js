// @flow

import React, {useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import {PredatorTypesQuery} from "../../../services/queries/info/PredatorTypesQuery";
import type {PredatorTypesQueryResponse} from "../../../services/queries/info/__generated__/PredatorTypesQuery.graphql";
import {characterIsVampire} from "../Creation4";
import type {GetCharacterQueryResponse} from "../../../services/queries/character/__generated__/GetCharacterQuery.graphql";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

type Props = {
    character: ?GetCharacterQueryResponse;
    classes: any;
    onChange?: ?(string => void);
}

const PredatorTypeControl = ({ character, classes, onChange }: Props): any => {
    const {predatorTypes}: PredatorTypesQueryResponse = useCustomLazyLoadQuery(PredatorTypesQuery, {});

    const [predatorType, setPredatorType] = useState("")

    const showPredatorTypes = () => {
        const options = [<MenuItem key="None" value=" ">None</MenuItem>];

        if (predatorTypes && predatorTypes.length > 0) {
            return [...options, ...predatorTypes.map(d => <MenuItem key={d?.id} value={d?.id}>{d?.name}</MenuItem>)];
        }

        return options;
    }

    const predatorTypeSelector = () => {
        if (characterIsVampire(character)) {
            return (
                <>
                    <Grid item xs={12} className={classes.defaultParagraph}>
                        Choose your character predator type.
                    </Grid>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="predator-type-label">Predator Type</InputLabel>
                            <Select labelId="predator-type-label"
                                    id="predator-type"
                                    name="predator-type"
                                    value={predatorType}
                                    onChange={({target: {value}}) => {
                                        setPredatorType(value);

                                        if (onChange) {
                                            onChange(value);
                                        }
                                    }}
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
