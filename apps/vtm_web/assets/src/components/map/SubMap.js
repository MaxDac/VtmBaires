// @flow

import React, {useContext} from 'react';
import Container from '@mui/material/Container';
import MainLayout from '../Main.Layout';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from "@mui/icons-material/Send";
import {useHistory} from "react-router-dom";
import {Routes} from "../../AppRouter";
import {UtilityContext} from "../../App";
import type {Map} from "../../services/base-types";
import useStyles from "../Main.Layout.Style";

type SubMapProps = {
    maps: Array<Map>
};

const SubMap = ({ maps }: SubMapProps): any => {
    const history = useHistory();
    const classes = useStyles();

    const {
        openDialog
    } = useContext(UtilityContext);

    const subHeader = () =>
        <ListSubheader component="div" id="nested-list-subheader">
            Locations
        </ListSubheader>

    const openMap = (id: string, isChat: boolean) => _ =>
        history.push(isChat ? Routes.chat(id) : Routes.subMap(id));

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
        <MainLayout openDialog={openDialog}>
            <Container maxWidth="lg" className={classes.container}>
                <List component="nav"
                      aria-labelledby="nested-list-subheader"
                      subheader={subHeader()}
                      className={classes.listRoot}>
                    {mapLinks()}
                </List>
            </Container>
        </MainLayout>
    );
};

export default SubMap;
