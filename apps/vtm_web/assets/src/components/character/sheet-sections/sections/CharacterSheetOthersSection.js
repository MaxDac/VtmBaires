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
            <b>{sheet?.experience}</b> punti esperienza disponibili su <b>{sheet?.totalExperience}</b>
        </Typography>
    </>
);

type InfoElementProps = {
    title: string;
    text: ?string;
    titleSx?: any;
    textSx?: any;
}

const InfoElement = ({title, text, titleSx, textSx}: InfoElementProps) => (
    <>
        <Typography sx={{
            ...sectionTitleStyle,
            ...titleSx
        }}>
            {title}
        </Typography>
        <ParsedText text={text ?? ""} sx={{
            ...mainFontFamily,
            ...textSx
        }} />
    </>
);

const Biography = ({sheet}) => (
    <InfoElement title="Biografia" text={sheet?.biography} titleSx={{
        fontSize: "2rem",
        marginTop: "1rem"
    }} />
);

const DisciplinePowers = ({sheet}) => (
    <InfoElement title="Poteri" text={sheet?.disciplinePowers} textSx={{
        marginBottom: "10px"
    }} />
);

const Specialties = ({sheet}) => (
    <InfoElement title="Specialità" text={sheet?.specialties} textSx={{
        marginBottom: "10px"
    }} />
);

const Advantages = ({sheet}) => (
    <InfoElement title="Vantaggi" text={sheet?.advantages} textSx={{
        marginBottom: "10px"
    }} />
);

const Convictions = ({sheet}) => (
    <InfoElement title="Convinzioni" text={sheet?.convictions} textSx={{
        marginBottom: "10px"
    }} />
);

const Objects = ({sheet}) => (
    <InfoElement title="Oggetti posseduti" text={sheet?.objects} textSx={{
        marginBottom: "10px"
    }} />
);

const Notes = ({sheet}) => (
    <InfoElement title="Note" text={sheet?.notes} textSx={{
        marginBottom: "10px"
    }} />
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
            <DisciplinePowers sheet={sheet} />
            <Specialties sheet={sheet} />
            <Advantages sheet={sheet} />
            <Convictions sheet={sheet} />
            <Objects sheet={sheet} />
            <Notes sheet={sheet} />
        </>
    );
}

export default CharacterSheetOthersSection;
