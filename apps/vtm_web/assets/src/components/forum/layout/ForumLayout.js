// @flow

import React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import type {GenericReactComponent} from "../../../_base/types";

type Props = {
    title: string;
    description?: ?string;
    controls?: any;
    children: any;
}

const ForumLayout = ({title, description, controls, children}: Props): GenericReactComponent => {
    const showDescription = () => {
        if (description != null && description !== "") {
            return (
                <Typography paragraph sx={{
                    fontFamily: 'Disturbed',
                }}>
                    {description}
                </Typography>
            );
        }

        return (<></>);
    }

    return (
        <>
            <Stack direction="row">
                <h1 style={{
                    fontFamily: 'Disturbed',
                    marginRight: "20px"
                }}>
                    {title}
                </h1>
                <Box sx={{display: "inline-flex"}}>
                    <Stack direction="row" sx={{marginTop: "auto", marginBottom: "auto"}}>
                        {controls}
                    </Stack>
                </Box>
            </Stack>
            {showDescription()}
            <List sx={{width: "100%", color: "background.paper"}}>
                {children}
            </List>
        </>
    );
}

export default ForumLayout;
