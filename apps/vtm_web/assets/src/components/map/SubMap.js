// @flow

import React from 'react';
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
import { MainRoutes } from "../MainRouter";

type SubMapProps = {
    maps: Array<Map>,
    imageUrl: string
};

const SubMap = ({ maps, imageUrl }: SubMapProps): any => {
    const history = useHistory();
    const classes = useStyles();

    const subHeader = () =>
        <ListSubheader component="div" id="nested-list-subheader">
            Locations
        </ListSubheader>

    const openMap = (id: string, isChat: boolean) => _ =>
        history.push(isChat ? MainRoutes.chat(id) : MainRoutes.subMap(id));

    const mapLinks = () => {
        const mapLink = ({ id, name, isChat }: any) =>
            <ListItem key={id} button onClick={openMap(id, isChat)}>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>;

        if (maps && maps.map) {
            return maps.map(mapLink);
        }

        return [];
    }

    return (
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
                                className={classes.listRoot}>
                            {mapLinks()}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SubMap;
