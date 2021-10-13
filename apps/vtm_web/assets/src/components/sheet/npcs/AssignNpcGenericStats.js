// @flow

import React, {useContext} from "react";
import {number, object, string} from "yup";
import {usePredatorTypes} from "../../../services/queries/info/PredatorTypesQuery";
import {useFormik} from "formik";
import {handleMutation, range} from "../../../_base/utils";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormTextField from "../../../_base/components/FormTextField";
import FormSelectField from "../../../_base/components/FormSelectField";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/styles";
import {
    useCharacterStatsQuery
} from "../../../services/queries/character/GetCharacterStatsQuery";
import DefineNpcStatsMutation from "../../../services/mutations/npcs/DefineNpcStatsMutation";
import {useRelayEnvironment} from "react-relay";
import {UtilityContext} from "../../../contexts";
import {useCharacterCompleteQuery} from "../../../services/queries/character/GetCharacterCompleteQuery";

type Props = {
    characterId: string
}

const DefineNpcFormValidationSchema = object().shape({
    notes: string("Le note del personaggio"),
    advantages: string("I vantaggi del personaggio").required("Required"),
    humanity: number("Umanità").required("Required"),
    willpower: number("Forza di Volontà").required("Required"),
    bloodPotency: number("Blood Potency").required("Required"),
    generation: number("Generazione").required("Required"),
    predatorTypeId: string("Tipo di predatore").required("Required")
});

const AssignNpcGenericStats = ({characterId}: Props): any => {
    const environment = useRelayEnvironment();
    const {showUserNotification} = useContext(UtilityContext);
    const character = useCharacterCompleteQuery(characterId);
    const characterStats = useCharacterStatsQuery(characterId);
    const predatorTypes = usePredatorTypes()?.predatorTypes;
    const theme = useTheme();

    console.log("character", characterStats);

    const onSubmit = values =>
        handleMutation(
            () => DefineNpcStatsMutation(environment, characterId, values),
            showUserNotification,
            {});

    const formik = useFormik({
        initialValues: {
            notes: character?.notes,
            advantages: character?.advantages,
            humanity: 7,
            willpower: 5,
            bloodPotency: 1,
            generation: 13,
            predatorTypeId: characterStats?.predatorType?.id
        },
        validationSchema: DefineNpcFormValidationSchema,
        onSubmit
    });

    const tenthValues = () => {
        const values = [];

        for (const v of range(1, 10)) {
            values.push([v, v]);
        }

        return values;
    }

    const bloodPotencyValues = () => [
        [0, "0"],
        [1, "1"],
        [2, "2"],
        [3, "3"]
    ];

    const generationValues = () => [
        [13, "13"],
        [12, "12"],
        [11, "11"],
        [10, "10"],
        [9, "9"],
    ];

    const predatorTypeDropdownValues = () =>
        [[undefined, ""]].concat(
            predatorTypes
                ?.map(p => [p?.id, p?.name]));

    const dropdownStyle = ({
        textAlign: "center"
    });

    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography>
                        Completa il Personaggio non Giocante.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormTextField formik={formik}
                                   fieldName="notes"
                                   rows={4}
                                   label="Note"
                                   fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <FormTextField formik={formik}
                                   fieldName="advantages"
                                   rows={4}
                                   label="Vantaggi"
                                   fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} lg={2} sx={dropdownStyle}>
                    <FormSelectField formik={formik}
                                     fieldName="humanity"
                                     label="Umanità"
                                     values={tenthValues()} />
                </Grid>
                <Grid item xs={12} sm={6} lg={2} sx={dropdownStyle}>
                    <FormSelectField formik={formik}
                                     fieldName="willpower"
                                     label="Forza di Volontà"
                                     values={tenthValues()} />
                </Grid>
                <Grid item xs={12} sm={6} lg={2} sx={dropdownStyle}>
                    <FormSelectField formik={formik}
                                     fieldName="generation"
                                     label="Generazione"
                                     values={generationValues()} />
                </Grid>
                <Grid item xs={12} sm={6} lg={2} sx={dropdownStyle}>
                    <FormSelectField formik={formik}
                                     fieldName="bloodPotency"
                                     label="Potenza del Sangue"
                                     values={bloodPotencyValues()} />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={dropdownStyle}>
                    <FormSelectField formik={formik}
                                     fieldName="predatorTypeId"
                                     label="Predatore"
                                     sx={{width: theme.spacing(35)}}
                                     values={predatorTypeDropdownValues()} />
                </Grid>
                <Grid item xs={12} sx={{
                    textAlign: "center",
                    padding: theme.spacing(3)
                }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary">
                        Salva
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default AssignNpcGenericStats;
