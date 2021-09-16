// @flow

import * as React from "react";
import MainLayout from "../Main.Layout";
import {useHistory} from "react-router-dom";
import {pushAdmin} from "../../AppRouter";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AdminOnly from "../../_base/components/AdminOnly";
import {useContext} from "react";
import {UtilityContext} from "../../App";

const ListItemLink = (props) => <ListItem button component="a" {...props} />;

const AdminDashboard = (): any => {
    const history = useHistory();
    const {openDialog} = useContext(UtilityContext);

    return (
        <AdminOnly>
            <MainLayout openDialog={openDialog}>
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
