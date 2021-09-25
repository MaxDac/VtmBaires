// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {useCharacterStatsQuery} from "../../../services/queries/character/GetCharacterStatsQuery";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import AttributeStat from "../controls/AttributeStat";

export type RefreshedQueryOption = {
    fetchKey: number;
    fetchPolicy: "network-only" | "network-or-store"
};

type Props = {
    characterId: string;
    queryOptions?: ?RefreshedQueryOption;
}

const sectionStyle = {
    fontFamily: 'GabrieleLightRibbon',
    color: "red",
    fontSize: "20px",
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "5px"
};

const CharacterSheetStatsSection = ({characterId, queryOptions}: Props): any => {
    console.log("options", queryOptions);

    const stats = useCharacterStatsQuery(characterId, queryOptions);

    const filterAttributes = (type, section) => stats?.attributes
        ?.filter(({type: t, section: s}) => t === type && s === section)
        ?.map(s => <AttributeStat stat={s} />);

    const hasDisciplines = () => (stats?.disciplines?.length ?? 0) > 0;

    const disciplines = () => stats?.disciplines
        ?.map(d => (
            <Grid item xs={12} sm={6} md={4}>
                <AttributeStat stat={d} />
            </Grid>
        ));

    const showDisciplines = () => {
        if (hasDisciplines()) {
            return (
                <>
                    <Grid item xs={12}>
                        <Typography sx={sectionStyle}>
                            Disciplines
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            {disciplines()}
                        </Grid>
                    </Grid>
                </>);
        }

        return (<></>);
    }

    const responsiveProperties = {
        xs: 12,
        sm: 4,
        sx: {
            textAlign: {
                xs: "center",
                sm: "left"
            }
        }
    };

    return (
        <>
            <Typography sx={{
                fontFamily: 'GabrieleLightRibbon',
                color: "red",
                fontSize: "24px"
            }}>
                Stats
            </Typography>
            <Grid container>
                <Grid item xs={12}>
                    <Typography sx={sectionStyle}>
                        Attributes
                    </Typography>
                </Grid>
                <Grid item {...responsiveProperties}>
                    <List dense>
                        {filterAttributes("Attribute", "Physical")}
                    </List>
                </Grid>
                <Grid item {...responsiveProperties}>
                    <List dense>
                        {filterAttributes("Attribute", "Social")}
                    </List>
                </Grid>
                <Grid item {...responsiveProperties}>
                    <List dense>
                        {filterAttributes("Attribute", "Mental")}
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <Typography sx={sectionStyle}>
                        Skills
                    </Typography>
                </Grid>
                <Grid item {...responsiveProperties}>
                    <List dense>
                        {filterAttributes("Ability", "Physical")}
                    </List>
                </Grid>
                <Grid item {...responsiveProperties}>
                    <List dense>
                        {filterAttributes("Ability", "Social")}
                    </List>
                </Grid>
                <Grid item {...responsiveProperties}>
                    <List dense>
                        {filterAttributes("Ability", "Mental")}
                    </List>
                </Grid>
                {showDisciplines()}
            </Grid>
        </>
    );
}

export default CharacterSheetStatsSection;
