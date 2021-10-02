// @flow

import React from "react";
import MainLayout from "../../MainLayout";
import List from "@mui/material/List";

type Props = {
    title: string;
    children: any
}

const ForumLayout = ({title, children}: Props): any => {
    return (
        <MainLayout>
            <h1 style={{fontFamily: 'GabrieleLightRibbon'}}>
                {title}
            </h1>
            <List sx={{width: "100%", color: "background.paper"}}>
                {children}
            </List>
        </MainLayout>
    );
}

export default ForumLayout;
