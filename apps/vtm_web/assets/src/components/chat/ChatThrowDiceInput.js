// @flow

import React, {useState, useEffect} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import useAttributesSlimQuery from "../../services/queries/info/AttributesSlimQuery";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import {materialize, range} from "../../_base/utils";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {isUserMaster} from "../../services/base-types";
import {useSession} from "../../services/session-service";

export type ChatDiceRequest = {
    attributeId: string;
    abilityId: string;
    freeThrow: number;
    difficulty: number;
    master: boolean;
};

type ChatThrowDiceInputProps = {
    isOpen: boolean;
    onDialogClosing: () => void;
    onDialogFormSubmit: ChatDiceRequest => void;
};

const ChatThrowDiceInput = (props: ChatThrowDiceInputProps): any => {
    const attributes = useAttributesSlimQuery()?.attributes ?? [];
    const [user,] = useSession();
    const [open, setOpen] = useState(props.isOpen);
    const [masterThrow, setMasterThrow] = useState(false);
    const [attribute, setAttribute] = useState("");
    const [skill, setSkill] = useState("");
    const [freeThrow, setFreeThrow] = useState(0);
    const [difficulty, setDifficulty] = useState(2);

    const filterAttribute = (name, section) =>
        attributes.filter(a =>
            a?.attributeType?.name === name &&
            a?.attributeType?.section === section);

    const buildSelectItems = name => {
        const mapAttribute = a => (<MenuItem key={a?.id} value={a?.id}>{a?.name}</MenuItem>);
        const physicals = filterAttribute(name, "Physical")?.map(mapAttribute)
        const socials = filterAttribute(name, "Social")?.map(mapAttribute);
        const mentals = filterAttribute(name, "Mental")?.map(mapAttribute);

        return [(<MenuItem key={0} value="">None</MenuItem>)]
            .concat([<ListSubheader key={1}>Physicals</ListSubheader>])
            .concat(physicals)
            .concat([<ListSubheader key={2}>Socials</ListSubheader>])
            .concat(socials)
            .concat([<ListSubheader key={3}>Mentals</ListSubheader>])
            .concat(mentals);
    }

    const freeThrowItems = () =>
        materialize(range(0, 10))
            .map(i => <MenuItem key={i} value={i}>{i === 0 ? "None" : String(i)}</MenuItem>);

    useEffect(() => {
        setOpen(_ => props.isOpen);
    }, [props.isOpen]);

    const onAttributeChanged = ({target: {value}}) => setAttribute(value);

    const onSkillChanged = ({target: {value}}) => setSkill(value);

    const onFreeThrowChanged = ({target: {value}}) => setFreeThrow(value);

    const onDifficultyChanged = ({target: {value}}) => setDifficulty(value);

    const handleClose = () => {
        setOpen(false);
        props.onDialogClosing();
    };

    const resetForm = () => {
        setAttribute("");
        setSkill("");
        setFreeThrow(0);
        setDifficulty(2);
    }

    const handleThrow = () => {
        const request: ChatDiceRequest = {
            attributeId: attribute,
            abilityId: skill,
            freeThrow: Number(freeThrow),
            difficulty: Number(difficulty),
            master: masterThrow
        };

        props.onDialogFormSubmit(request);

        resetForm();
        handleClose();
    }

    const masterChecker = () => {
        if (isUserMaster(user)) {
            return (
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={
                            <Checkbox defaultChecked
                                      checked={masterThrow}
                                      onChange={_ => setMasterThrow(p => !p)} />
                        } label="Master throw"/>
                    </FormGroup>
                </Grid>
            );
        }

        return <></>;
    }

    const attributeAndSkill = () =>
        !masterThrow
            ? (
                <>
                    <Grid item xs={12} sm={6} sx={{
                        padding: "10px"
                    }}>
                        <FormControl fullWidth>
                            <InputLabel id="attribute-label">Attribute</InputLabel>
                            <Select
                                labelId="attribute-label"
                                id="attribute"
                                value={attribute}
                                label="Attribute"
                                onChange={onAttributeChanged}>
                                {buildSelectItems("Attribute")}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{
                        padding: "10px"
                    }}>
                        <FormControl fullWidth>
                            <InputLabel id="skill-label">Skill</InputLabel>
                            <Select
                                labelId="skill-label"
                                id="skill"
                                value={skill}
                                label="Skill"
                                onChange={onSkillChanged}>
                                {buildSelectItems("Ability")}
                            </Select>
                        </FormControl>
                    </Grid>
                </>
            )
            : <></>;
    
    const difficultyControl = () =>
        !masterThrow
            ? (
                <Grid item xs={12} sx={{
                    padding: "10px"
                }}>
                    <FormControl fullWidth>
                        <InputLabel id="difficulty-label">Difficulty</InputLabel>
                        <Select
                            labelId="difficulty-label"
                            id="difficulty"
                            value={difficulty}
                            label="Difficulty"
                            onChange={onDifficultyChanged}>
                            {freeThrowItems()}
                        </Select>
                    </FormControl>
                </Grid>
            )
            : <></>

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Throw Dices</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Select Attribute and Skill, or input a custom amount of dices you want to throw.
                </DialogContentText>
                <Grid container>
                    {masterChecker()}
                    {attributeAndSkill()}
                    <Grid item xs={12} sx={{
                        padding: "10px"
                    }}>
                        <FormControl fullWidth>
                            <InputLabel id="free-throw-label">Free Throw</InputLabel>
                            <Select
                                labelId="free-throw-label"
                                id="freeThrow"
                                value={freeThrow}
                                label="Free Throw"
                                onChange={onFreeThrowChanged}>
                                {freeThrowItems()}
                            </Select>
                        </FormControl>
                    </Grid>
                    {difficultyControl()}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleThrow} color="primary">
                    Throw
                </Button>
            </DialogActions>
        </Dialog>);
};

export default ChatThrowDiceInput;