// @flow

import React, {useState} from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CookieFreePolicy from "./CookieFreePolicy";

const CookieAcceptedKey = "cookie-accepted";

const NoCookieBar = (): any => {
    const [showCookiePolicy, setShowCookiePolicy] = useState(true);

    const onCookieCloseClick = _ => {
        setShowCookiePolicy(false);
    }

    if (showCookiePolicy) {
        return (
            <Box sx={{
                position: "absolute",
                left: "0px",
                right: "0px",
                bottom: "0px",
                height: "61px",
                backgroundColor: "black",
                color: "white",
                opacity: "0.7"
            }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onCookieCloseClick}
                        aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <CookieFreePolicy/>
                </Toolbar>
            </Box>
        );
    }

    return (<></>);
}

export default NoCookieBar;
