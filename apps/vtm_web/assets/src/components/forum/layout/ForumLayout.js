// @flow

import React from "react";
import List from "@mui/material/List";

type Props = {
    title: string;
    children: any
}

const ForumLayout = ({title, children}: Props): any => {
    return (
        <>
            <h1 style={{fontFamily: 'GabrieleLightRibbon'}}>
                {title}
            </h1>
            <List sx={{width: "100%", color: "background.paper"}}>
                {children}
            </List>
        </>
    );
}

export default ForumLayout;
