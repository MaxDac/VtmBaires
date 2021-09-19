// @flow

import React, {useState} from "react";
import Box from "@mui/material/Box";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import RoomIcon from "@mui/icons-material/Room";
import {useTheme} from "@mui/material/styles";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import Bloodtype from "@mui/icons-material/Bloodtype";
import Bolt from "@mui/icons-material/Bolt";

type Props = {
    openMapModal: () => void;
};

const ChatControls = ({openMapModal}: Props): any => {
    const theme = useTheme();

    const [expand, setExpand] = useState(false);

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const FloatButton = ({top, right, isIn, children, label, handler}) =>
        <Box sx={{
            position: 'absolute',
            top: theme.spacing(top),
            right: theme.spacing(right)
        }}>
            <Zoom timeout={transitionDuration}
                  in={isIn}
                  sx={{ transitionDelay: transitionDuration.exit }}
                  unmountOnExit>
                <Fab color="secondary"
                     aria-label={label}
                     onClick={handler}>
                    {children}
                </Fab>
            </Zoom>
        </Box>

    return (
        <>
            <FloatButton top={10}
                         right={2}
                         isIn={!expand}
                         label="expand"
                         handler={() => setExpand(true)}>
                <KeyboardArrowDown />
            </FloatButton>
            <FloatButton top={10}
                         right={2}
                         isIn={expand}
                         label="expand"
                         handler={() => setExpand(false)}>
                <KeyboardArrowUp />
            </FloatButton>
            <FloatButton top={20}
                         right={2}
                         isIn={expand}
                         label="map"
                         handler={openMapModal}>
                <RoomIcon />
            </FloatButton>
            <FloatButton top={30}
                         right={2}
                         isIn={expand}
                         label="map"
                         handler={openMapModal}>
                <Bloodtype />
            </FloatButton>
            <FloatButton top={40}
                         right={2}
                         isIn={expand}
                         label="map"
                         handler={openMapModal}>
                <Bolt />
            </FloatButton>
        </>
    );
}

export default ChatControls;
