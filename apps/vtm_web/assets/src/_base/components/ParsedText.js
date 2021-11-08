// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import ReactMarkdown from 'react-markdown'
import {replaceAll} from "../utils";

type Props = {
    text: ?string;
    sx?: any;
    components?: any;
    ignoreDefaultComponents?: boolean;
}

type Transformation = Array<Transformation> => string => any;

export const markdownComponents: any = {
    h1: "h2",
    em: ({node, ...props}) => <span style={{color: 'red'}} {...props} />
}

const ParsedText = ({text, sx, components, ignoreDefaultComponents}: Props): any => {
    const parseComponents = () => {
        if (!!components) {
            return components;
        }

        if (ignoreDefaultComponents === true) {
            return null;
        }

        return markdownComponents;
    }

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
                        <ReactMarkdown key={index} components={parseComponents()}>
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
