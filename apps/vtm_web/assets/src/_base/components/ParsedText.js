// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import ReactMarkdown from 'react-markdown'

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
    const applyNewLine = text =>
        text.split("\\n")
            .reduce((acc, element, index) => {
                if (index === 0) {
                    return (
                        <>
                            <ReactMarkdown components={markdownComponents}>
                                {element}
                            </ReactMarkdown>
                        </>
                    );
                }

                return (
                    <>
                        {acc}
                        <br />
                        <ReactMarkdown components={markdownComponents}>
                            {element}
                        </ReactMarkdown>
                    </>
                );
            }, <></>);

    return (
        <Typography sx={sx}>
            {applyNewLine(text ?? "")}
        </Typography>
    );
}

export default ParsedText;
