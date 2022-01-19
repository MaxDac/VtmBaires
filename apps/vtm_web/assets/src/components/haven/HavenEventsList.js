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
import Stack from "@mui/material/Stack";
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

const getTextFromEvent = ({controlTriggered, character}) =>
    controlTriggered
        ? `${character?.name ?? "Qualcuno"} è entrato nel tuo dominio per cacciare`
        : `${character?.name ?? "Qualcuno"} è stato intercettato nel tuo Dominio`;

const actions = ({id}, onClick) => {
    return (
        <Button onClick={_ => onClick(id)}>
            Ignora / Risolto
        </Button>);
};

const eventListItem = (e, resolveEvent) => {
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
                        <ListItemText primary={getTextFromEvent(e)}
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
    events: ?$ReadOnlyArray<?HavenEvent>;
    resolveEvent: string => void;
}

const HavenEventsList = ({events, resolveEvent}: Props): any => {
    const rows = () =>
        events?.map(e => eventListItem(e, resolveEvent)) ?? [];

    return (
        <Stack direction="column">
            <h1 style={{
                fontFamily: 'Disturbed',
                marginRight: "20px"
            }}>
                Eventi nel Dominio
            </h1>

            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
            }}>
                <List sx={{
                    width: {
                        sx: "100%",
                        md: "70%"
                    },
                    bgcolor: 'background.paper',
                }}>
                    {rows()}
                </List>
            </Box>
        </Stack>
    );
}

export default HavenEventsList;
