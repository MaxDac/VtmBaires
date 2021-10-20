// @flow

import React, {useContext, useState} from "react";
import Grid from "@mui/material/Grid";
import {mainFontFamily} from "../../Main.Layout.Style";
import {useTheme} from "@mui/styles";
import {useCharacterStatsQuery} from "../../../services/queries/character/GetCharacterStatsQuery";
import AttributeFormControl from "./AttributeFormControl";
import type {Attribute} from "../../../services/queries/info/AttributesQuery";
import Button from "@mui/material/Button";
import {handleMutation} from "../../../_base/utils";
import AssignNpcAttributesMutation from "../../../services/mutations/npcs/AssignNpcAttributesMutation";
import {useRelayEnvironment} from "react-relay";
import {UtilityContext} from "../../../contexts";
import { StarRateSharp } from "@mui/icons-material";

type Props = {
    characterId: string;
}

const AssignNpcAttributes = ({characterId}: Props): any => {
    const environment = useRelayEnvironment();
    const {showUserNotification} = useContext(UtilityContext);
    const theme = useTheme();
    const stats = useCharacterStatsQuery(characterId, {
        fetchPolicy: "network-only"
    })?.attributes ?? [];

    const [savedStates, setSavedStats] = useState<Array<Attribute>>(StarRateSharp);

    const subTitleStyle = ({
        ...mainFontFamily,
        textAlign: "center",
        fontSize: theme.spacing(2)
    });

    const titleStyle = ({
        ...subTitleStyle,
        color: "red",
        fontSize: theme.spacing(3),
        margin: "10px"
    });

    const onAttributeChanged = a =>
        // $FlowFixMe
        setSavedStats(p => p.reduce((acc, current) =>
            current.id === a.id
                ? [...acc, a]
                : [...acc, current], []));

    const onSave = () => {
        // $FlowFixMe
        const attributes = savedStates.map(({id, value}) => ({id, value: Number(value)}));

        handleMutation(() => AssignNpcAttributesMutation(environment, characterId, {
            attributes: attributes
        }), showUserNotification, {});
    };

    const filterAttributes = (type: "Attribute" | "Ability", section: "Physical" | "Social" | "Mental") => stats
        ?.filter(({type: t, section: s}) => t === type && s === section)
        ?.map(s => (<AttributeFormControl characterId={characterId}
                                          attribute={s}
                                          onChange={onAttributeChanged}
                                          maxValue={5} />));

    return (
        <Grid container>
            <Grid item xs={12} sx={titleStyle}>
                Attributi
            </Grid>
            <Grid item xs={12} md={4}>
                {filterAttributes("Attribute", "Physical")}
            </Grid>
            <Grid item xs={12} md={4}>
                {filterAttributes("Attribute", "Social")}
            </Grid>
            <Grid item xs={12} md={4}>
                {filterAttributes("Attribute", "Mental")}
            </Grid>
            <Grid item xs={12} sx={titleStyle}>
                Abilità
            </Grid>
            <Grid item xs={12} md={4}>
                {filterAttributes("Ability", "Physical")}
            </Grid>
            <Grid item xs={12} md={4}>
                {filterAttributes("Ability", "Social")}
            </Grid>
            <Grid item xs={12} md={4}>
                {filterAttributes("Ability", "Mental")}
            </Grid>
            <Grid item xs={12} sx={{
                textAlign: "center",
                padding: theme.spacing(3)
            }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={_ => onSave()}>
                    Salva
                </Button>
            </Grid>
        </Grid>
    );
}

export default AssignNpcAttributes;
