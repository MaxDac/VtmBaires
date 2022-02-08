// @flow

import React from "react";
import ForumFormLayout from "../layout/ForumFormLayout";
import FormTextField from "../../../_base/components/FormTextField";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";
import type {GenericReactComponent} from "../../../_base/types";
import {useSession} from "../../../services/session-service";
import {isUserMaster} from "../../../services/base-types";
import FormCheckboxField from "../../../_base/components/FormCheckboxField";
import {boolean, object, string, array} from "yup";
import CharactersSelectControl from "../../_base/CharactersSelectControl";
import Box from "@mui/material/Box";

type Props = {
    title: string;
    description: string;
    onGame: ?boolean;
    goBack: () => void;
    formik: any;
    buttonText: string;
};

export const CreateNewThreadValidationSchema = (isMaster: boolean): any => {
    const defaultShape = {
        title: string("Il titolo del thread").required("Richiesto"),
        description: string("La descrizione del thread")
    };

    const shape =
        isMaster
            ? {
                ...defaultShape,
                highlighted: boolean().required(),
                characterIds: array("I personaggi autorizzati").of(string())
            }
            : defaultShape;

    return object().shape(shape);
};

const ThreadForm = ({title, description, onGame, goBack, formik, buttonText}: Props): GenericReactComponent => {
    const theme = useTheme();
    const [user,] = useSession();

    const isMaster = isUserMaster(user);

    const highlightedControl = () =>
        isMaster
            ? (<FormCheckboxField formik={formik}
                                  fieldName="highlighted"
                                  label="Importante" />)
            : (<></>);

    const selectCharacterControl = () =>
        isMaster && onGame === true
            ? (
                <Box sx={{textAlign: "center"}}>
                    <CharactersSelectControl formik={formik}
                                             multiple
                                             fieldName="characterIds"
                                             label="Personaggi autorizzati"
                                             containerSx={{
                                                 width: "70%"
                                             }} />
                </Box>
            )
            : (<></>);

    return (
        <ForumFormLayout title={title}
                         description={description}
                         goBack={goBack}>
            <form style={{
                width: '100%',
                marginTop: "10px",
            }} noValidate onSubmit={formik.handleSubmit}>
                <FormTextField formik={formik} fieldName="title" label="Titolo" fullWidth />
                <FormTextField formik={formik} fieldName="description" label="Descrizione" fullWidth />
                {highlightedControl()}
                {selectCharacterControl()}
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    sx={{
                        margin: theme.spacing(3, 0, 2),
                    }}>
                    {buttonText}
                </Button>
            </form>
        </ForumFormLayout>
    );
}

export default ThreadForm;
