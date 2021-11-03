// @flow

import React from "react";
import ForumFormLayout from "../layout/ForumFormLayout";
import FormTextField from "../../../_base/components/FormTextField";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/styles";

type Props = {
    title: string;
    description: string;
    goBack: () => void;
    formik: any;
}

const ThreadForm = ({title, description, goBack, formik}: Props): any => {
    const theme = useTheme();

    return (
        <ForumFormLayout title={title}
                         description={description}
                         goBack={goBack}>
            <form style={{
                width: '100%', // Fix IE 11 issue.
                marginTop: "10px",
            }} noValidate onSubmit={formik.handleSubmit}>
                <FormTextField formik={formik} fieldName="title" label="Titolo" fullWidth />
                <FormTextField formik={formik} fieldName="description" label="Descrizione" fullWidth rows={4} />
                <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    sx={{
                        margin: theme.spacing(3, 0, 2),
                    }}>
                    Crea thread
                </Button>
            </form>
        </ForumFormLayout>
    );
}

export default ThreadForm;
