// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReactMarkdown from 'react-markdown'
import {replaceAll} from "../utils";

type Props = {
    text: ?string;
    sx?: any;
    components?: any;
    ignoreDefaultComponents?: boolean;
    useDivsInsteadOfParagraphs?: boolean;
}

type Transformation = Array<Transformation> => string => any;

export const markdownComponents: any = {
    h1: "h2",
    em: ({node, ...props}) => <span style={{color: 'red'}} {...props} />
}

const ParsedText = ({text, sx, components, ignoreDefaultComponents, useDivsInsteadOfParagraphs}: Props): any => {
    const parseComponents = () => {
        if (!!components) {
            return components;
        }

        if (ignoreDefaultComponents === true) {
            return null;
        }

        return markdownComponents;
    };

    const paragraphMapper = (children) => (
        <Typography paragraph sx={sx}>
            {children}
        </Typography>
    );

    const divMapper = (children) => (
        <Box component="div" sx={sx}>
            {children}
        </Box>
    );

    const applyNewLine = text => {
        const components = () =>
            replaceAll(replaceAll(text, "[i]", "_"), "[/i]", "_")
                .split("\n")
                .filter(f => f != null && f !== "")
                .map((f, index) => {
                    const markdown = (
                        <ReactMarkdown key={index} components={parseComponents()}>
                            {f}
                        </ReactMarkdown>
                    );

                    return useDivsInsteadOfParagraphs
                        ? divMapper(markdown)
                        : paragraphMapper(markdown)
                });

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
