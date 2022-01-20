// @flow

import React from "react";
import MeetingRoomTwoToneIcon from "@mui/icons-material/MeetingRoomTwoTone";
import {menuIconStyle} from "../_layout/menu/menu-base-utils";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import ListItemText from "@mui/material/ListItemText";
import {defaultFormatDate} from "../../_base/date-utils";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import type {HavenEvent} from "../../services/queries/haven/HavenEventFragment";

const EventIcon = ({controlTriggered}) =>
    controlTriggered
        ? (<MeetingRoomTwoToneIcon sx={menuIconStyle} />)
        : (<ReportProblemTwoToneIcon sx={menuIconStyle} />);

const getTooltipFromEvent = ({controlTriggered}) =>
    controlTriggered
        ? "Intrusione"
        : "Attenzione richiamata";

const getTitleFromEvent = (isMaster, {controlTriggered, character, haven}) =>
    isMaster
        ? (controlTriggered
            ? `${character?.name ?? ""} è entrato nel tuo dominio di ${haven?.character?.name ?? ""} per cacciare`
            : `${character?.name ?? ""} è stato intercettato nel Dominio di ${haven?.character?.name ?? ""}`)
        : (controlTriggered
            ? `${character?.name ?? "Qualcuno"} è entrato nel tuo dominio per cacciare`
            : `${character?.name ?? "Qualcuno"} è stato intercettato nel tuo Dominio`);

const actions = ({id}, onClick) => {
    return (
        <Button onClick={_ => onClick(id)}>
            Ignora / Risolto
        </Button>);
};

const eventListItem = (isMaster: boolean, e: ?HavenEvent, resolveEvent: string => void) => {
    if (e != null) {
        return (
            <>
                <ListItem disablePadding secondaryAction={actions(e, resolveEvent)}>
                    <ListItemButton>
                        <ListItemIcon>
                            <Tooltip title={getTooltipFromEvent(e)}>
                                <EventIcon controlTriggered={e.controlTriggered}
                                           dangerTriggered={e.dangerTriggered}/>
                            </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary={getTitleFromEvent(isMaster, e)}
                                      secondary={defaultFormatDate(e?.insertedAt)} />
                    </ListItemButton>
                </ListItem>
                <Divider/>
            </>
        );
    }

    return (<></>);
};

type Props = {
    isMaster: boolean;
    events: ?$ReadOnlyArray<?HavenEvent>;
    resolveEvent: string => void;
}

const HavenEventsList = ({isMaster, events, resolveEvent}: Props): any => {
    const rows = () =>
        events?.map(e => eventListItem(isMaster, e, resolveEvent)) ?? [];

    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center"
        }}>
            <List sx={{
                width: {
                    sx: "100%",
                    md: "100%"
                },
                bgcolor: 'background.paper',
            }}>
                {rows()}
            </List>
        </Box>
    );
}

export default HavenEventsList;
