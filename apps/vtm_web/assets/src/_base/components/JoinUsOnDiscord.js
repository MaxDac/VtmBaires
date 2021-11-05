// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const JoinUsOnDiscord = (): any => {
    return (
        <Box sx={{
            textAlign: "center"
        }}>
            <a href="https://discord.gg/nhk6rkjJDA"
               target="_blank"
               rel="noreferrer">
                <img src="/discord.svg" style={{
                    maxWidth: "40px",
                    height: "auto"
                }} alt="discord" />
            </a>
                <Typography variant="body2" color="textSecondary" align="center" sx={{
                    whiteSpace: "break-spaces"
                }}>
                    Stai riscontrando un problema? Contattaci su&nbsp;
                    <a href="https://discord.gg/nhk6rkjJDA"
                       target="_blank"
                       rel="noreferrer">
                        <Typography component="span" variant="body2" sx={{
                            color: "#C92929"
                        }}>
                            Discord
                        </Typography>
                    </a>
                </Typography>
        </Box>
    );
}

export default JoinUsOnDiscord;
