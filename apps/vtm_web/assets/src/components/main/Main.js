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
import {usePreloadedQuery} from "react-relay";
import {mainMapsQuery, preloadedMainMapsQuery} from "../../services/queries/chat/ChatQueries";
import {Routes} from "../../AppRouter";

export default function Main(): any {
    const history = useHistory();
    const { mainMaps: data } = usePreloadedQuery(mainMapsQuery, preloadedMainMapsQuery);

    const subHeader = () =>
        <ListSubheader component="div" id="nested-list-subheader">
            Locations
        </ListSubheader>

    const openMap = (id: string) => _ => history.push(Routes.subMap(id));

    const mapLinks = () => {
        const mapLink = ({ id, name }: MapLocationSlim) =>
            <ListItem key={id} button onClick={openMap(id)}>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>;

        return data?.map(mapLink) ?? [];
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
}
