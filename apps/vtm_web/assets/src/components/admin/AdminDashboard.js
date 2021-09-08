// @flow

import * as React from "react";
import MainLayout from "../main/Main.Layout";
import {useHistory} from "react-router-dom";
import {pushAdmin} from "../../AppRouter";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AdminOnly from "../../_base/components/AdminOnly";

export type AdminDashboardProps = {
    setError: (string, string) => void;
};

const ListItemLink = (props) => <ListItem button component="a" {...props} />;

const AdminDashboard = (props: AdminDashboardProps): any => {
    const history = useHistory();

    return (
        <AdminOnly>
            <MainLayout>
                { (classes: any) =>
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
                }
            </MainLayout>
        </AdminOnly>
    )
}

export default AdminDashboard;
