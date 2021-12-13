// @flow

import React from "react";
import useForumSections from "../../services/queries/forum/GetForumSectionsQuery";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ForumLayout from "./layout/ForumLayout";
import {useHistory} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {MainRoutes} from "../MainRouter";
import { ForumSectionDescription } from "./layout/ForumListItem";
import Box from "@mui/material/Box";

const ForumSections = (): any => {
    const history = useHistory();

    const forumSections = useForumSections()
        ?.getForumSections;

    const toSection = sectionId => {
        if (sectionId != null) {
            history.push(MainRoutes.forumSection(sectionId));
        }
    };

    const showForumSections = () => forumSections
        ?.map(s => (
            <Box component="div" key={s?.section?.id}>
                <Divider />
                <ListItem
                          alignItems="flex-start"
                          button
                          onClick={_ => toSection(s?.section?.id)}>
                    <ListItemText primary={s?.section?.title}
                                  secondary={<ForumSectionDescription description={s?.section?.description}
                                                                      lastThreadId={s?.lastThread?.id}
                                                                      lastThreadTitle={s?.lastThread?.title}
                                                                      lastThreadUpdatedAt={s?.lastThread?.updatedAt} />}
                                  sx={{
                                      color: "white",
                                      fontFamily: 'DefaultTypewriter',
                                      fontSize: "24px",
                                      padding: "5px"
                                  }} />
                </ListItem>
                <Divider />
            </Box>
        ));
        
        
        // <ForumListItem key={s?.id}
        //                           item={s}
        //                           onClick={toSection} />);

    return (
        <ForumLayout title="Forum (beta)">
            <Typography sx={{
                color: "#C9C9C9",
                fontSize: "13px"
            }}>
                Questo Forum non ha per ora il gran numero di funzionalit&agrave; che 
                un forum dovrebbe offrire. &Egrave; disponibile una Community su Discord chiamata&nbsp;
                <b>VTM Baires</b> che offre supporto e aiuto ai nuovi arrivati nella land.<br />
                &Egrave; fortemente consigliato richiedere l'iscrizione alla Community Discord
                se necessitate di qualsiasi aiuto, o se avete un problema o un dubbio riguardo
                il sito.
            </Typography>
            <List sx={{width: "100%", color: "background.paper"}}>
                {showForumSections()}
            </List>
        </ForumLayout>
    );
}

export default ForumSections;
