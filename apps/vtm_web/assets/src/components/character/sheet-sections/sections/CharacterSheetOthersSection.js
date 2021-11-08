// @flow

import React from "react";
import {useFragment} from "react-relay";
import {characterStateFragment} from "../../../../services/queries/character/CharacterFragments";
import Typography from "@mui/material/Typography";
import type {
    CharacterFragments_characterState$key
} from "../../../../services/queries/character/__generated__/CharacterFragments_characterState.graphql";
import ParsedText from "../../../../_base/components/ParsedText";
import {mainFontFamily} from "../../../Main.Layout.Style";

type Props = {
    characterQuery: any
};

const sectionTitleStyle = {
    fontFamily: 'DefaultTypewriter',
    color: "secondary.light",
    fontSize: "24px",
};

const PredatorType = ({sheet}) => (
    <>
        <Typography sx={sectionTitleStyle}>
            Tipo di Predatore
        </Typography>
        <Typography sx={{
            ...mainFontFamily,
            marginBottom: "10px"
        }}>
            {sheet?.predatorType?.name}
        </Typography>
    </>
);

const Clan = ({sheet}) => (
    <>
        <Typography sx={sectionTitleStyle}>
            Clan
        </Typography>
        <Typography sx={{
            ...mainFontFamily,
            marginBottom: "10px"
        }}>
            {sheet?.clan?.name}
        </Typography>
    </>
);

const Experience = ({sheet}) => (
    <>
        <Typography sx={sectionTitleStyle}>
            Esperienza
        </Typography>
        <Typography sx={{
            ...mainFontFamily,
            marginBottom: "10px"
        }}>
            {sheet?.experience} punti esperienza
        </Typography>
    </>
);

const Biography = ({sheet}) => (
    <>
        <Typography sx={{
            ...sectionTitleStyle,
            fontSize: "2rem",
            marginTop: "1rem"
        }}>
            Biografia
        </Typography>
        <ParsedText text={sheet?.biography} sx={mainFontFamily} />
    </>
);

const Advantages = ({sheet}) => (
    <>
        <Typography sx={sectionTitleStyle}>
            Vantaggi
        </Typography>
        <ParsedText text={sheet?.advantages} sx={{
            ...mainFontFamily,
            marginBottom: "10px"
        }} />
    </>
);

const Notes = ({sheet}) => (
    <>
        <Typography sx={sectionTitleStyle}>
            Note
        </Typography>
        <ParsedText text={sheet?.notes} sx={mainFontFamily} />
    </>
);

const CharacterSheetOthersSection = ({characterQuery}: Props): any => {
    const sheet = useFragment<?CharacterFragments_characterState$key>(
        characterStateFragment,
        characterQuery);

    return (
        <>
            <Clan sheet={sheet} />
            <Experience sheet={sheet} />
            <PredatorType sheet={sheet} />
            <Biography sheet={sheet} />
            <Advantages sheet={sheet} />
            <Notes sheet={sheet} />
        </>
    );
}

export default CharacterSheetOthersSection;
