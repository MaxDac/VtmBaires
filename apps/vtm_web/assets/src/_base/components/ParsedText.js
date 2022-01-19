// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReactMarkdown from 'react-markdown';
import {replaceAll} from "../utils";
import type {GenericReactComponent} from "../types";

type Props = {
    text: ?string;
    sx?: any;
    internalDivSx?: any;
    components?: any;
    ignoreDefaultComponents?: boolean;
    useDivsInsteadOfParagraphs?: boolean;
    useNaturalNewLine?: boolean;
}

type Transformation = Array<Transformation> => string => any;

export const markdownComponents: any = {
    h1: "h2",
    em: ({node, ...props}) => <span style={{color: 'red'}} {...props} />
}

const ParsedText = ({
                        text,
                        sx,
                        internalDivSx,
                        components,
                        ignoreDefaultComponents,
                        useDivsInsteadOfParagraphs,
                        useNaturalNewLine
}: Props): GenericReactComponent => {
    const parseComponents = () => {
        if (!!components) {
            return components;
        }

        if (ignoreDefaultComponents === true) {
            return null;
        }

        return markdownComponents;
    };

    const ParagraphMapper = ({children}) => (
        <Typography component="div" paragraph sx={internalDivSx}>
            {children}
        </Typography>
    );

    const DivMapper = ({children}) => (
        <Box component="div" sx={internalDivSx}>
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
                        <ReactMarkdown components={parseComponents()}>
                            {f}
                        </ReactMarkdown>
                    );

                    return useDivsInsteadOfParagraphs
                        ? (<DivMapper key={index}>{markdown}</DivMapper>)
                        : (<ParagraphMapper key={index}>{markdown}</ParagraphMapper>)
                });

        return (
            <>
                {components()}
            </>
        )
    };

    const formattedText = text => {
        if (useNaturalNewLine) {
            return (
                <ReactMarkdown components={parseComponents()}>
                    {text}
                </ReactMarkdown>
            );
        }

        return applyNewLine(text);
    };

    return (
        <Typography component="div" sx={sx}>
            {formattedText(text ?? "")}
        </Typography>
    );
}

export default ParsedText;
