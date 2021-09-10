// @flow

import React, {useEffect} from "react";
import {useMap} from "../../services/hooks/useMaps";
import MainLayout from "../Main.Layout";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useChatEntries from "../../services/hooks/useChatEntries";
import subscriptionPromise from "../../services/queries/chat/chat-subscription";

type ChatProps = {
    setError: (string, string) => void;
    id: string;
}

const Chat = ({ setError, id }: ChatProps): any => {
    const map = useMap(id);
    const entries = useChatEntries(id);

    useEffect(() => {
        const subscription = subscriptionPromise(id).subscribe({
            next: value => console.log("got value", value),
            error: (error, uncaught) => console.error("got error from subscription", error),
            complete: () => console.log("completed"),
            closed: false
        });

        return () => subscription.unsubscribe();
    }, [id]);

    const getEntryLayout = entry => <li>{entry.text}</li>;

    const showEntries = () => {
        if (entries && entries.map) {
            return entries?.map(getEntryLayout);
        }

        return [];
    }

    return (
        <MainLayout>
            { (classes: any) =>
                <Container className={classes.chatRootContainer}>
                    <Grid container spacing={24} className={classes.chatEntriesContainer}>
                        <Grid item xs={12}>
                            <ul>
                                {showEntries()}
                            </ul>
                        </Grid>
                    </Grid>
                    <div className={classes.chatInputControl}>
                        Test
                    </div>
                </Container>
            }
        </MainLayout>
    );
}

export default Chat;
