// @flow

import React, { Suspense, useState } from "react";
import { RelayEnvironmentProvider } from 'react-relay';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import AlertLayout from './_base/components/AlertLayout';

import environment from "./_base/relay-environment";

import type {
    Node
} from 'react';

import AppRouter from "./AppRouter";

function App(): Node {
    const darkState = useState(true);
    const palletType = darkState ? "dark" : "light";

    const darkTheme = createTheme({
        palette: {
            type: palletType,
        },
        primary: {
            main: "#1a237e",
        },
        secondary: {
            main: "#b71c1c",
        },
    });

    // const handleThemeChange = () => {
    //     setDarkState(!darkState);
    // };

    return (
        <ThemeProvider theme={darkTheme}>
            <RelayEnvironmentProvider environment={environment}>
                <Suspense fallback={"Loading... "}>
                    <AlertLayout>
                        { ({ setError, openDialog }) =>
                            <AppRouter setError={setError} openDialog={openDialog} />
                        }
                    </AlertLayout>
                </Suspense>
            </RelayEnvironmentProvider>
        </ThemeProvider>
    );
}

export default App;
