// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import ReactMarkdown from 'react-markdown'
import {replaceAll} from "../utils";

type Props = {
    text: ?string;
    sx?: any;
}

type Transformation = Array<Transformation> => string => any;

export const markdownComponents: any = {
    h1: "h2",
    em: ({node, ...props}) => <span style={{color: 'red'}} {...props} />
}

const ParsedText = ({text, sx}: Props): any => {
    const applyNewLine = text => {
        const components = () =>
            replaceAll(replaceAll(text, "[i]", "_"), "[/i]", "_")
                .split("\n")
                .map(x => {
                    console.log("fragment", x);
                    return x;
                })
                .filter(f => f != null && f !== "")
                .map((f, index) => (
                    <Typography paragraph sx={sx}>
                        <ReactMarkdown key={index} components={markdownComponents}>
                            {f}
                        </ReactMarkdown>
                    </Typography>
                ));

        console.log("text", JSON.stringify({
            text
        }));

        return (
            <>
                {components()}
            </>
        )
    };

    return (
        <Typography component="div">
            {applyNewLine(text ?? "")}
        </Typography>
    );
}

export default ParsedText;
