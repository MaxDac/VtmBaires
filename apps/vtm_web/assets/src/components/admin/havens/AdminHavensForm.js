// @flow

import React, {useRef} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CharactersSelectControl from "../../_base/CharactersSelectControl";
import type {Haven} from "../../../services/queries/haven/GetHavensQuery";
import type {GenericReactComponent} from "../../../_base/types";
import {object, string, number} from "yup";
import {useFormik} from "formik";
import FormSelectField from "../../../_base/components/FormSelectField";
import {rangeArray} from "../../../_base/utils";
import Grid from "@mui/material/Grid";
import type {SetHavenInfoRequest} from "../../../services/mutations/havens/__generated__/SetHavenInfoMutation.graphql";

const AdminHavensFormSchema = object().shape({
    havenCharacterId: string().nullable().notRequired(),
    danger: number().required(),
    difficulty: number().required(),
    groundControl: number().required(),
    ownerDifficulty: number().required(),
    resourcesLevel: number().required(),
});

type FormSubmitProps = {
    havenCharacterId: string,
    danger: number,
    difficulty: number,
    groundControl: number,
    ownerDifficulty: number,
    resourcesLevel: number,
};

type AdminHavensFormInternalProps = {
    haven: Haven;
    havenCharacterId?: string;
    onSubmit: FormSubmitProps => void;
};

const AdminHavensFormInternal = React.forwardRef(({haven, havenCharacterId, onSubmit}: AdminHavensFormInternalProps, ref) => {
    const generateValues = rangeArray(-2, 10).map(x => [String(x), String(x)]);

    const formik = useFormik({
        initialValues: {
            havenCharacterId: havenCharacterId,
            danger: haven.danger,
            difficulty: haven.difficulty,
            groundControl: haven.groundControl,
            ownerDifficulty: haven.ownerDifficulty,
            resourcesLevel: haven.resourcesLevel
        },
        validationSchema: AdminHavensFormSchema,
        onSubmit
    });

    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <Grid container sx={{
                paddingTop: "1rem",
                width: "100%",
                textAlign: "center"
            }}>
                <Grid item xs={12}>
                    <CharactersSelectControl label="Personaggio"
                                             fieldName="havenCharacterId"
                                             formik={formik} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormSelectField formik={formik}
                                     fieldName="difficulty"
                                     label="Difficoltà"
                                     values={generateValues} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormSelectField formik={formik}
                                     fieldName="ownerDifficulty"
                                     label="Difficoltà proprietario"
                                     values={generateValues} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormSelectField formik={formik}
                                     fieldName="groundControl"
                                     label="Controllo"
                                     values={generateValues} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormSelectField formik={formik}
                                     fieldName="resourcesLevel"
                                     label="Risorse"
                                     values={generateValues} />
                </Grid>
                <Button ref={ref}
                        type="submit"
                        sx={{display: "none"}} />
            </Grid>
        </form>
    );
});

type Props = {
    haven: ?Haven;
    open: boolean;
    handleClose: () => void;
    onSelected: (?Haven, string, SetHavenInfoRequest) => void;
    havenCharacterId?: string;
};

const AdminHavensForm = ({haven, open, handleClose, onSelected, havenCharacterId}: Props): GenericReactComponent => {
    const triggerButton = useRef();

    const triggerSubmit = _ => triggerButton.current?.click();

    const onSubmit = formInfo => {
        onSelected(haven, formInfo.havenCharacterId, {
            danger: Number(formInfo.danger),
            difficulty: Number(formInfo.difficulty),
            groundControl: Number(formInfo.groundControl),
            ownerDifficulty: Number(formInfo.ownerDifficulty),
            resourcesLevel: Number(formInfo.resourcesLevel),
        });
        handleClose();
    };

    const form = () => {
        if (haven != null) {
            return (
                <AdminHavensFormInternal haven={haven}
                                         havenCharacterId={havenCharacterId}
                                         onSubmit={onSubmit}
                                         ref={triggerButton} />
            )
        }

        return (<></>);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Assegna rifugio</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Seleziona il personaggio a cui assegnare la locazione scelta.
                </DialogContentText>
                {form()}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button onClick={triggerSubmit}>Assegna</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AdminHavensForm;
