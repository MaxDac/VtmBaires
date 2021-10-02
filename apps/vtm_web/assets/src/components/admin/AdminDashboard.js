// @flow

import * as React from "react";
import MainLayout from "../MainLayout";
import {useHistory} from "react-router-dom";
import {pushAdmin} from "../../AppRouter";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AdminOnly from "../../_base/components/AdminOnly";
import {useContext} from "react";
import {UtilityContext} from "../../contexts";
import useStyles from "../Main.Layout.Style";

const ListItemLink = (props) => <ListItem button component="a" {...props} />;

const AdminDashboard = (): any => {
    const history = useHistory();
    const classes = useStyles();
    const {openDialog} = useContext(UtilityContext);

    return (
        <AdminOnly>
            <MainLayout openDialog={openDialog}>
                <div className={classes.centeredContainer}>
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItemLink onClick={pushAdmin(history, "guides")}>
                            <ListItemText primary="Spam" />
                        </ListItemLink>
                    </List>
                    <Divider />
                    <List component="nav" aria-label="secondary mailbox folders">
                    </List>
                </div>
            </MainLayout>
        </AdminOnly>
    )
}

export default AdminDashboard;
