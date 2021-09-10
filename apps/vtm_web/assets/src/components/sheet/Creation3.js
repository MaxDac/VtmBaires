// @flow

import React, {useState} from "react";
import type {DefaultComponentProps} from "../../_base/types";
import MainLayout from "../Main.Layout";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import JackOfAllTradesSkillForm from "./strategies/JackOfAllTradesSkillForm";
import BalancedSkillForm from "./strategies/BalancedSkillForm";
import SpecialistSkillForm from "./strategies/SpecialistSkillForm";

const Creation3 = ({ setError }: DefaultComponentProps): any => {
    const [characterType, setCharacterType] = useState(1);

    const changeCharacterType = ({ target: { value } }) => setCharacterType(value);

    const getForm = classes => {
        if (characterType === 1) {
            return (
                <JackOfAllTradesSkillForm classes={classes} setError={setError} />
            )
        }
        if (characterType === 2) {
            return (
                <BalancedSkillForm classes={classes} setError={setError} />
            )
        }

        return (
            <SpecialistSkillForm classes={classes} setError={setError} />
        )
    }

    return (
        <MainLayout>
            { (classes: any) =>
                <div className={classes.centeredContainer}>
                    <Typography>
                        Select the type of character you want to create:
                    </Typography>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="select-label">Character Type</InputLabel>
                        <Select
                            labelId="select-label"
                            id="character-type"
                            name="character-type"
                            fullWidth
                            value={characterType}
                            onChange={changeCharacterType}>
                            <MenuItem value={1}>Jack of All Trades</MenuItem>
                            <MenuItem value={2}>Balanced</MenuItem>
                            <MenuItem value={3}>Specialist</MenuItem>
                        </Select>
                    </FormControl>
                    {getForm(classes)}
                </div>
            }
        </MainLayout>
    )
}

export default Creation3;
