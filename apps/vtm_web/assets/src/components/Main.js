// @flow

import Box from '@mui/system/Box';
import React, {useEffect, useState} from 'react';
import CenteredBox from "../_base/components/CenteredBox";
import Typography from '@mui/material/Typography';

export default function Main(): any {
    const [firstPhrase, setFirstPhrase] = useState("");
    const [secondPhrase, setSecondPhrase] = useState("");

    const firstLinePhrase = "Buenos Aires by Night";
    const secondLinePhrase = "Benvenuto";

    useEffect(() => {
        const typeWriteLine = (setter: (string => string) => void, phrase: string, caret: number, onCompleted?: () => void) => {
            if (caret <= phrase.length) {
                setTimeout(() => {
                    setter(_ => phrase.substring(0, caret));
                    typeWriteLine(setter, phrase, caret + 1, onCompleted);
                }, 150 * Math.random());
            }
            else {
                if (onCompleted != null) {
                    setTimeout(onCompleted, 1000);
                }
            }
        };

        typeWriteLine(setFirstPhrase, firstLinePhrase, 0, () => {
            typeWriteLine(setSecondPhrase, secondLinePhrase, 0);
        });
    }, []);

    return (
        <Box sx={{
            background: `url("/SplashScreen.webp") no-repeat center`,
            border: "1px white solid",
            height: "calc(100% - 70px)",
            backgroundSize: "cover"
        }}>
            <CenteredBox isBodyChild={false} innerBoxSx={{
                maxWidth: "500px"
            }}>
                <Typography sx={{
                    fontFamily: 'GabrieleLightRibbon',
                    color: "white",
                    fontSize: "36px",
                    // opacity: 0,
                    // animation: "opacityAppear 2s ease-in-out forwards",
                    // animationDelay: "1000ms"
                }}>
                    {firstPhrase}
                </Typography>
                <Typography sx={{
                    fontFamily: 'GabrieleLightRibbon',
                    color: "#C92929",
                    fontSize: "36px"
                    // opacity: 0,
                    // animation: "opacityAppear 2s ease-in-out forwards",
                    // animationDelay: "3000ms"
                }}>
                    {secondPhrase}
                </Typography>
            </CenteredBox>
        </Box>
    )
}
