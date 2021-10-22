// @flow

import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import JackOfAllTradesSkillForm from "../strategies/JackOfAllTradesSkillForm";
import BalancedSkillForm from "../strategies/BalancedSkillForm";
import SpecialistSkillForm from "../strategies/SpecialistSkillForm";
import useStyles from "../../Main.Layout.Style";

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
        <div className={classes.centeredContainer}>
            <Typography>
                In questa sezione della creazione del personaggio, dovrai scegliere le sue Abilit&agrave;.
            </Typography>
            <Typography>
                Seguendo le nuove regole imposte dai manuali v5 di Vampiri: la Masquerade&trade;, dovrai scegliere quale tipo di personaggio vuoi interpretare.
                Puoi scegliere tra le seguenti opzioni:
            </Typography>
            <Typography>
                <ui>
                    <li>
                        <b>Specialista</b>: lo specialista si &egrave; concentrato nell'avanzamento di poche abilit&agrave; ad alto livello.
                        &Egrave; l'unico tipo di personaggio in cui &egrave; possibile definire una abilit&agrave; a livello 4.
                    </li>
                    <li>
                        <b>Bilanciato</b>: un personaggio bilanciato, come suggerisce la parola, &egrave; una commistione dei due tipi di personaggio.
                    </li>
                    <li>
                        <b>Tuttofare</b>: il personaggio tuttofare ha un grande ventaglio di abilit&agrave;, ma poche ad un livello eccellente.
                    </li>
                </ui>
            </Typography>
            <div style={{
                padding: "20px",
                textAlign: "center"
            }}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="select-label">Tipo di Personaggio</InputLabel>
                    <Select labelId="select-label"
                            id="character-type"
                            name="character-type"
                            fullWidth
                            sx={{width: "200px"}}
                            value={characterType}
                            onChange={changeCharacterType}>
                        <MenuItem value={1}>Tuttofare</MenuItem>
                        <MenuItem value={2}>Bilanciato</MenuItem>
                        <MenuItem value={3}>Specialista</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {getForm(classes)}
        </div>
    )
}

export default Creation3;
