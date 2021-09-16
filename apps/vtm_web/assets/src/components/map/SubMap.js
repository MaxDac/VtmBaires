// @flow

import React, {useContext} from 'react';
import Container from '@material-ui/core/Container';
import MainLayout from '../Main.Layout';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import {useHistory} from "react-router-dom";
import {Routes} from "../../AppRouter";
import type { Element, AbstractComponent } from "react";
import type {MainLayoutProps} from "../Main.Layout";
import {UtilityContext} from "../../App";
import type {Map} from "../../services/base-types";

type SubMapProps = {
    maps: Array<Map>
};

const SubMap = ({ maps }: SubMapProps): Element<AbstractComponent<MainLayoutProps>> => {
    const history = useHistory();

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
            { (classes: any) =>
                <Container maxWidth="lg" className={classes.container}>
                    <List component="nav"
                          aria-labelledby="nested-list-subheader"
                          subheader={subHeader()}
                          className={classes.listRoot}>
                        {mapLinks()}
                    </List>
                </Container>
            }
        </MainLayout>
    );
};

export default SubMap;
