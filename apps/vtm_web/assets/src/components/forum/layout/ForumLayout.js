// @flow

import React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

type Props = {
    title: string;
    description?: ?string;
    children: any
}

const ForumLayout = ({title, description, children}: Props): any => {
    const showDescription = () => {
        if (description != null && description !== "") {
            return (
                <Typography paragraph sx={{
                    fontFamily: 'GabrieleLightRibbon',
                }}>
                    {description}
                </Typography>
            );
        }

        return (<></>);
    }

    return (
        <>
            <h1 style={{fontFamily: 'GabrieleLightRibbon'}}>
                {title}
            </h1>
            {showDescription()}
            <List sx={{width: "100%", color: "background.paper"}}>
                {children}
            </List>
        </>
    );
}

export default ForumLayout;
