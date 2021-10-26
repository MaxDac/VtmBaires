// @flow

import React from "react";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from '@mui/material/Collapse';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HomeIcon from '@mui/icons-material/Home';
import ListItemText from "@mui/material/ListItemText";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HelpIcon from '@mui/icons-material/Help';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import {useHistory} from "react-router-dom";
import {GuideRoutes} from "./GuidesMain";
import {LoginRoutes} from "../login/LoginRouter";

type Props = {

}

const GuidesMenu = (props: Props): any => {
    const history = useHistory();
    const [environmentOpen, setEnvironmentOpen] = useState(true);

    return (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem button onClick={_ => history.push(LoginRoutes.login)}>
                    <ListItemIcon>
                        <LockOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Torna al Login" />
                </ListItem>
                <ListItem button onClick={_ => history.push(GuideRoutes.home)}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={_ => history.push(GuideRoutes.generalRules)}>
                    <ListItemIcon>
                        <AssignmentLateIcon />
                    </ListItemIcon>
                    <ListItemText primary="Regole generali" />
                </ListItem>
                <ListItem button onClick={_ => setEnvironmentOpen(p => !p)}>
                    <ListItemIcon>
                        <TheaterComedyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ambientazione" />
                </ListItem>
                <Collapse in={environmentOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button sx={{ pl: 4 }} onClick={_ => history.push(GuideRoutes.glossary)}>
                            <ListItemText primary="Glossario" />
                        </ListItem>
                        <ListItem button sx={{ pl: 4 }} onClick={_ => history.push(GuideRoutes.environment)}>
                            <ListItemText primary="Globale" />
                        </ListItem>
                        <ListItem button sx={{ pl: 4 }} onClick={_ => history.push(GuideRoutes.environmentBaires)}>
                            <ListItemText primary="Buenos Aires" />
                        </ListItem>
                        <ListItem button sx={{ pl: 4 }} onClick={_ => history.push(GuideRoutes.environmentSects)}>
                            <ListItemText primary="Sette" />
                        </ListItem>
                    </List>
                </Collapse>
                <ListItem button onClick={_ => history.push(GuideRoutes.npcs)}>
                    <ListItemIcon>
                        <SupervisedUserCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Personaggi" />
                </ListItem>
                <Divider />
                <ListItem button onClick={_ => history.push(GuideRoutes.places)}>
                    <ListItemIcon>
                        <LocationCityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Luoghi" />
                </ListItem>
                <ListItem button onClick={_ => history.push(GuideRoutes.siteHelp)}>
                    <ListItemIcon>
                        <HelpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Help del Sito" />
                </ListItem>
                <ListItem button onClick={_ => history.push(GuideRoutes.faqs)}>
                    <ListItemIcon>
                        <QuestionAnswerIcon />
                    </ListItemIcon>
                    <ListItemText primary="FAQ" />
                </ListItem>
                <ListItem button onClick={_ => history.push(GuideRoutes.credits)}>
                    <ListItemIcon>
                        <BookmarkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Credits" />
                </ListItem>
                <Divider />
            </List>
        </div>
    );
}

export default GuidesMenu;
