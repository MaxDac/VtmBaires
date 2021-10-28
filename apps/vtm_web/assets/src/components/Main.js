// @flow

import Box from '@mui/system/Box';
import React, {useEffect, useState} from 'react';
import CenteredBox from "../_base/components/CenteredBox";
import Typography from '@mui/material/Typography';

export default function Main(): any {
    const [firstPhrase, setFirstPhrase] = useState("");
    const [secondPhrase, setSecondPhrase] = useState("");
    const [thirdPhrase, setThirdPhrase] = useState("");

    const firstLinePhrase = "Buenos Aires by Night";
    const secondLinePhrase = "Benvenuto";
    const thirdLinePhrase = "It is a world of Darkness. The sin of Caine, has spawn a cursed horror that stalks the night" +
        " in search of living blood. The kindreds have long been a secret influence through all ages of human history," +
        " plotting against each other in a never-ending Jihad. Their immortal progeny are among us to this day, hidden" +
        " from the eyes of humanity, by an elaborate... Masquerade.";

    useEffect(() => {
        const typeWriteLine = (setter: (string => string) => void, phrase: string, caret: number, onCompleted?: () => void) => {
            if (caret <= phrase.length) {
                const newPhrase = phrase.substring(0, caret);
                const time = newPhrase.substring(newPhrase.length - 1, newPhrase.length) === "." ? 300 : 150;

                setTimeout(() => {
                    setter(_ => newPhrase);
                    typeWriteLine(setter, phrase, caret + 1, onCompleted);
                }, time * Math.random());
            }
            else {
                if (onCompleted != null) {
                    setTimeout(onCompleted, 1000);
                }
            }
        };

        typeWriteLine(setFirstPhrase, firstLinePhrase, 0, () => {
            typeWriteLine(setSecondPhrase, secondLinePhrase, 0, () => {
                typeWriteLine(setThirdPhrase, thirdLinePhrase, 0);
            });
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
                <Typography sx={{
                    fontFamily: 'GabrieleLightRibbon',
                    color: "#C9C9C9",
                    fontSize: "16px",
                    paddingTop: "20px"
                    // opacity: 0,
                    // animation: "opacityAppear 2s ease-in-out forwards",
                    // animationDelay: "3000ms"
                }}>
                    {thirdPhrase}
                </Typography>
            </CenteredBox>
        </Box>
    )
}
