// @flow

import React from "react";
import IconButton from "@mui/material/IconButton";
import PeopleIcon from "@mui/icons-material/People";
import {listSessionQuery} from "../../services/queries/accounts/SessionQuery";
import {useTheme} from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AttributionIcon from '@mui/icons-material/Attribution';
import MessageIcon from '@mui/icons-material/Message';
import RoomIcon from '@mui/icons-material/Room';
import Fade from "@mui/material/Fade";
import {useMediaQuery} from "@mui/material";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import type {SessionQuery} from "../../services/queries/accounts/__generated__/SessionQuery.graphql";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../MainRouter";
import Tooltip from '@mui/material/Tooltip';
import {isUserMaster} from "../../services/base-types";
import Stack from "@mui/material/Stack";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
});

const OnlineControlDialog = ({closePopup}) => {
    const history = useHistory();
    const online = useCustomLazyLoadQuery<SessionQuery>(listSessionQuery, {}, {
        fetchPolicy: "network-only"
    })?.sessionsList ?? [];

    const trySendMessageToUser = user =>
        _ => {
            console.log("user", user);
            if (user?.id != null) {
                history.push(MainRoutes.newMessageTo(user.id));
            }
            else {
                history.push(MainRoutes.newMessage());
            }

            closePopup();
        };

    const tryGoToLocation = location =>
        _ => {
            if (location?.id != null) {
                history.push(MainRoutes.chat(location?.id));
            }

            closePopup();
        };

    const userMasterIcon = user =>
        user?.role === "MASTER"
            ? (
                <Tooltip title="Master">
                    <ListItemIcon>
                        <AttributionIcon />
                    </ListItemIcon>
                </Tooltip>
            )
            : (<></>);

    const secondaryActions = o => (
        <Stack direction="row" spacing={2}>
            <Tooltip title="Invia messaggio">
                <IconButton edge="end"
                            aria-label="Messaggio"
                            onClick={trySendMessageToUser(o?.user)}>
                    <MessageIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Vai alla chat">
                <IconButton edge="end"
                            aria-label="Chat"
                            onClick={tryGoToLocation(o?.location)}>
                    <RoomIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );

    const onlineRow = o => (
        <ListItem key={o?.user?.id}
                  secondaryAction={secondaryActions(o)}>
            {userMasterIcon(o?.user)}
            <ListItemText inset={!isUserMaster(o?.user)}
                          primary={`${o?.user?.name ?? ""}${
                              !!o?.character?.name
                                  ? ` (${o?.character?.name})`
                                  : ""}`}
                          secondary={o?.location?.name}
            />
        </ListItem>
    );

    const onlineUserSorter = (a, b) => {
        const masterRoleAsNumber = u => u?.user?.role === "MASTER" ? 0 : 1;
        const [aRole, bRole] = [masterRoleAsNumber(a), masterRoleAsNumber(b)];

        if (aRole > bRole) {
            return 1;
        }

        if (aRole < bRole) {
            return -1;
        }

        const [aName, bName] = [a?.user?.name ?? "", b?.user?.name ?? ""];

        if (aName > bName) {
            return 1;
        }

        return -1;
    };

    // Used the rest operator because the read only array doesn't have a sort method
    const showOnline = () => [...online]
        ?.sort((a, b) => onlineUserSorter(a, b))
        ?.map(o => onlineRow(o)) ?? (<></>);

    return showOnline();
}

const OnlineControl = (): any => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => setOpen(_ => false);

    return (
        <>
            <Tooltip title="Online" placement="bottom">
                <IconButton aria-label="Online" onClick={_ => setOpen(_ => true)}>
                    <PeopleIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                fullScreen={fullScreen}
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Utenti Online
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <OnlineControlDialog closePopup={_ => setOpen(_ => false)} />
                </List>
            </Dialog>
        </>
    );
}

export default OnlineControl;
