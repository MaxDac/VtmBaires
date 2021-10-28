// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {guideStyle, liStyle, titleStyle} from "../GuidesStyles";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {AttributesCompleteQuery} from "../../../services/queries/info/__generated__/AttributesCompleteQuery.graphql";
import {attributesCompleteQuery} from "../../../services/queries/info/AttributesCompleteQuery";

const GuidesAttributes = (): any => {
    const attributes = useCustomLazyLoadQuery<AttributesCompleteQuery>(attributesCompleteQuery, {}, {
        fetchPolicy: "store-and-network"
    })?.attributes ?? [];

    const showAttributes = (name: string) =>
        attributes
            .filter(a => a?.attributeType?.name === name)
            .map(a => (
                <li style={liStyle} key={a?.id}><b>{a?.name}</b>: {a?.description}</li>
            ));

    return (
        <>
            <Typography paragraph>
                <h1 style={titleStyle}>
                    Abilit&agrave; e Attributi
                </h1>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <i>In costruzione</i>
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Attributi
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <ul>
                    {showAttributes("Attribute")}
                </ul>
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Abilit&agrave;
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <ul>
                    {showAttributes("Ability")}
                </ul>
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Discipline
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <ul>
                    {showAttributes("Discipline")}
                </ul>
            </Typography>

            <Typography paragraph>
                <h3 style={titleStyle}>
                    Vantaggi
                </h3>
            </Typography>

            <Typography paragraph sx={guideStyle}>
                <ul>
                    {showAttributes("Advantage")}
                </ul>
            </Typography>
        </>
    );
}

export default GuidesAttributes;
