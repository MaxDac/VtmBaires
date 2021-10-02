// @flow

import React, {useState} from "react";
import MainLayout from "../MainLayout";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import JackOfAllTradesSkillForm from "./strategies/JackOfAllTradesSkillForm";
import BalancedSkillForm from "./strategies/BalancedSkillForm";
import SpecialistSkillForm from "./strategies/SpecialistSkillForm";
import useStyles from "../Main.Layout.Style";

const Creation3 = (): any => {
    const classes = useStyles();
    const [characterType, setCharacterType] = useState(1);

    const changeCharacterType = ({ target: { value } }) => setCharacterType(value);

    const getForm = classes => {
        if (characterType === 1) {
            return (
                <JackOfAllTradesSkillForm classes={classes} />
            )
        }
        if (characterType === 2) {
            return (
                <BalancedSkillForm classes={classes} />
            )
        }

        return (
            <SpecialistSkillForm classes={classes} />
        )
    }

    return (
        <MainLayout>
            <div className={classes.centeredContainer}>
                <Typography>
                    Select the type of character you want to create:
                </Typography>
                <div style={{ padding: "20px" }}>
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
                </div>
                {getForm(classes)}
            </div>
        </MainLayout>
    )
}

export default Creation3;
