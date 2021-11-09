// @flow

import React, {useContext} from 'react';
import Container from '@mui/material/Container';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from "@mui/icons-material/Send";
import {useHistory} from "react-router-dom";
import type {Map} from "../../services/base-types";
import useStyles from "../Main.Layout.Style";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {MainRoutes} from "../MainRouter";
import {useMediaQuery, useTheme} from '@mui/material';
import {menuIconStyle} from "../_layout/Menu";
import {goToChatAndUpdateSession} from "../chat/chat-helpers";
import {SessionContext} from "../../contexts";

type SubMapProps = {
    maps: Array<Map>,
    imageUrl: string
};

const SubMapResponsive = ({classes, imageUrl, subHeader, mapLinks}) => (
    <Container maxWidth="lg" className={classes.container}>
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{
                    background: `url('${imageUrl}')`,
                    border: "1px white solid",
                    backgroundPosition: "center center"
                }}>
                    <List component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={subHeader()}
                        className={classes.listRoot}
                        sx={{backgroundColor: "#19191980"}}>
                        {mapLinks()}
                    </List>
                </Box>
            </Grid>
        </Grid>
    </Container>
);

const SubMapWide = ({classes, imageUrl, subHeader, mapLinks}) => (
    <Container maxWidth="lg" className={classes.container}>
        <Grid container>
            <Grid item xs={12} sm={8} md={9}>
                <img src={imageUrl} style={{
                    maxWidth: "70vw"
                }} alt="map" />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
                <Paper elevation={0} variant="outlined">
                    <List component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={subHeader()}
                        className={classes.listRoot}
                        sx={{backgroundColor: "#19191980"}}>
                        {mapLinks()}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    </Container>
);

const SubMap = ({ maps, imageUrl }: SubMapProps): any => {
    const history = useHistory();
    const sessionUtils = useContext(SessionContext);
    const classes = useStyles();
    const theme = useTheme();
    const showAsResponsive = useMediaQuery(theme.breakpoints.down("md"));

    const subHeader = () =>
        <ListSubheader component="div" id="nested-list-subheader">
            Locations
        </ListSubheader>

    const openMap = (id: string, name: string, isChat: boolean) => _ => {
        if (isChat) {
            goToChatAndUpdateSession(sessionUtils, history, id, name);
        }
        else {
            history.push(MainRoutes.subMap(id));
        }
    }

    const mapLinks = () => {
        const mapLink = ({id, name, isChat}: any) =>
            <ListItem key={id} button onClick={openMap(id, name, isChat)}>
                <ListItemIcon>
                    <SendIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText primary={name} primaryTypographyProps={{
                    fontFamily: "DefaultTypewriter"
                }} />
            </ListItem>;

        if (maps && maps.map) {
            return maps.map(mapLink);
        }

        return [];
    };

    if (showAsResponsive) {
        return (<SubMapResponsive classes={classes}
                                  imageUrl={imageUrl}
                                  subHeader={subHeader}
                                  mapLinks={mapLinks} />);
    }
    else {
        return (<SubMapWide classes={classes}
                            imageUrl={imageUrl}
                            subHeader={subHeader}
                            mapLinks={mapLinks} />);
    }
};

export default SubMap;
