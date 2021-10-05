// @flow

import React from "react";
import IconButton from "@mui/material/IconButton";
import PeopleIcon from "@mui/icons-material/People";
import {listSessionQuery} from "../../services/queries/accounts/SessionQuery";
import {useTheme} from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Fade from "@mui/material/Fade";
import {useMediaQuery} from "@mui/material";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import type {
    SessionQuery
} from "../../services/queries/accounts/__generated__/SessionQuery.graphql";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />
});

const OnlineControlDialog = () => {
    const online = useCustomLazyLoadQuery<SessionQuery>(listSessionQuery, {}, {
        fetchPolicy: "store-and-network"
    })?.sessionsList;

    const onlineRow = o => (
        <ListItem key={o?.user?.id} button>
            <ListItemText
                primary={`${o?.user?.name ?? ""}${
                    !!o?.character?.name
                        ? ` (${o?.character?.name})`
                        : ""}`}
                secondary={o?.location?.name}
            />
        </ListItem>
    );

    const showOnline = () => online?.map(o => onlineRow(o)) ?? (<></>);

    return showOnline();
}

const OnlineControl = (): any => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => setOpen(_ => false);

    return (
        <>
            <IconButton aria-label="Online" onClick={_ => setOpen(_ => true)}>
                <PeopleIcon />
            </IconButton>
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
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Utenti Online
                        </Typography>
                    </Toolbar>
                </AppBar>
                <List>
                    <OnlineControlDialog />
                </List>
            </Dialog>
        </>
    );
}

export default OnlineControl;
