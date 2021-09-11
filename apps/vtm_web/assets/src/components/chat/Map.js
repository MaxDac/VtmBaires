// @flow

import React from 'react';
import Container from '@material-ui/core/Container';
import MainLayout from '../Main.Layout';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import type {MapLocationSlim} from "../../services/queries/chat/ChatQueries";
import {useHistory} from "react-router-dom";
import {Routes} from "../../AppRouter";
import {useMaps} from "../../services/hooks/useMaps";

import type { Element, AbstractComponent } from "react";
import type {MainLayoutProps} from "../Main.Layout";

type MapProps = {
    setError: (string, string) => void;
    id: string;
}

const Map = ({ setError, id }: MapProps): Element<AbstractComponent<MainLayoutProps>> => {
    const history = useHistory();
    const maps = useMaps(id);

    const subHeader = () =>
        <ListSubheader component="div" id="nested-list-subheader">
            Locations
        </ListSubheader>

    const openMap = (id: string) => _ => history.push(Routes.chat(id));

    const mapLinks = () => {
        const mapLink = ({ id, name }: MapLocationSlim) =>
            <ListItem key={id} button onClick={openMap(id)}>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>;

        return maps?.map(mapLink) ?? [];
    }

    return (
        <MainLayout>
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

export default Map;
