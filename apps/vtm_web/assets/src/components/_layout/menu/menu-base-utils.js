// @flow

import React from 'react';
import Typography from "@mui/material/Typography";

export type MenuProps = {
    drawerDone: () => void;
    reloadCount: number;
    onUpdate: () => void;
}

const whiteOnHover = {
    transitionProperty: "color",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease-in-ease-out",
    "&:hover": {
        color: "white"
    }
}

export const menuIconStyle = {
    ...whiteOnHover,
    color: "primary.main"
};

export const menuTextStyle = {
    ...whiteOnHover,
    fontFamily: "Disturbed",
    fontSize: "1.1rem",
    color: "primary.light",
    textShadow: "5px 5px 5px black",
};

export const menuTextStyleHover = {
    ...menuTextStyle,
    color: "white"
};

export type MenuSecondaryTypeProps = {
    text: ?string;
    hover?: boolean;
}

export const MenuSecondaryText = ({text, hover}: MenuSecondaryTypeProps): any => (
    <Typography component="span" sx={!!hover ? menuTextStyleHover : menuTextStyle}>
        {text ?? ""}
    </Typography>
);
