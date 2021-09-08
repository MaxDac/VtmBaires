// @flow

import React, {useState} from "react";

import type {DefaultComponentProps} from "../../_base/types";
import {useSession} from "../../services/hooks/useSession";
import {useHistory} from "react-router-dom";
import MainLayout from "../main/Main.Layout";
import Typography from "@material-ui/core/Typography";
import {usePreloadedQuery} from "react-relay";
import {attributesQuery, preloadedQuery} from "../../services/queries/info/attributes-query";
import Grid from "@material-ui/core/Grid";

import AttributeSelectionField from "./AttributeSelectionField";
import Button from "@material-ui/core/Button";
import appendAttributesMutation from "../../services/queries/character/append-attributes-mutation";

import type { CharacterAttributeRequest } from "../../services/queries/character/append-attributes-mutation";
import {Routes} from "../../AppRouter";
import useCharacterStage from "../../services/hooks/useCharacterStage";

import type {Attributes} from "./strategies/attribute-helpers";

type FormAttributes = {
    attribute4: string;
    attribute31: string;
    attribute32: string;
    attribute33: string;
    attribute21: string;
    attribute22: string;
    attribute23: string;
    attribute24: string;
    attribute1: string;
};

const Creation2 = ({ setError }: DefaultComponentProps): any => {
    const history = useHistory();
    const { character: ch } = useSession(history);
    const character = useCharacterStage(ch?.id);
    const { attributes: data }: Attributes = usePreloadedQuery(attributesQuery, preloadedQuery);

    if (character?.stage) {
        if (character?.stage > 1) {
            history.push(Routes.creation3);
        }
    }

    const [values, setValues] = useState<FormAttributes>({
        attribute4: "",
        attribute31: "",
        attribute32: "",
        attribute33: "",
        attribute21: "",
        attribute22: "",
        attribute23: "",
        attribute24: "",
        attribute1: ""
    });

    const [errors, setErrors] = useState<any>({});

    const selectFields = () => {
        const attrs = data
            .filter(({ attributeType: { name } }) => name === "Attribute")
            .map(({ id, name}) => [String(id), name]);

        return [["", " "]].concat(attrs);
    };

    const checkAttributes = (propertyName, propertyValue, setControlValue, setControlError) => {
        if (Object.values(values).some(x => x === propertyValue)) {
            setControlValue("");
            setControlError("Attribute already taken");

            setErrors(e => {
                e[propertyName] = "Attribute already taken";
                return e;
            });

            setValues(vs => {
                vs[propertyName] = "";
                return vs;
            });
        }
        else {
            setControlError("");

            setErrors(e => {
                delete e[propertyName];
                return e;
            });

            setValues(vs => {
                vs[propertyName] = propertyValue;
                return vs;
            });
        }
    }

    const getAttributeSelector = (fieldName: string, label: string): any =>
        <AttributeSelectionField fieldName={fieldName}
                                 label={label}
                                 value={values[fieldName]}
                                 values={selectFields}
                                 onChange={checkAttributes} />;

    const onSubmit = setError => _ => {
        if (errors && Object.keys(errors).length > 0) {
            console.log("error1", errors);
            return;
        }

        if (Object.values(values).some(v => v === "")) {
            console.log("error2", values);
            return;
        }

        const generateRequest = (attributeId: string, value: number): CharacterAttributeRequest => ({
            attributeId,
            characterId: String(ch?.id),
            value
        });

        const request: Array<CharacterAttributeRequest> = [
            generateRequest(values.attribute4, 4),
            generateRequest(values.attribute31, 3),
            generateRequest(values.attribute32, 3),
            generateRequest(values.attribute33, 3),
            generateRequest(values.attribute21, 2),
            generateRequest(values.attribute22, 2),
            generateRequest(values.attribute23, 2),
            generateRequest(values.attribute24, 2),
            generateRequest(values.attribute1, 1)
        ];

        appendAttributesMutation(request, 2)
            .then(c => {
                console.log("passing", c);
                history.push(Routes.creation3);
            })
            .catch(e => setError(e, "There was an error while updating the character."));
    }

    const contained = () => {
        return (
            <>
                <Grid item xs={12}>
                    <Typography>
                        You can choose one attribute at 4 levels:
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {getAttributeSelector("attribute4", "Attribute at 4")}
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        ... three at 3 level:
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    {getAttributeSelector("attribute31", "Attribute at 3")}
                </Grid>
                <Grid item xs={12} md={4}>
                    {getAttributeSelector("attribute32", "Attribute at 3")}
                </Grid>
                <Grid item xs={12} md={4}>
                    {getAttributeSelector("attribute33", "Attribute at 3")}
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        ... four at 2 level:
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    {getAttributeSelector("attribute21", "Attribute at 2")}
                </Grid>
                <Grid item xs={12} md={3}>
                    {getAttributeSelector("attribute22", "Attribute at 2")}
                </Grid>
                <Grid item xs={12} md={3}>
                    {getAttributeSelector("attribute23", "Attribute at 2")}
                </Grid>
                <Grid item xs={12} md={3}>
                    {getAttributeSelector("attribute24", "Attribute at 2")}
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        ... and finally, one attribute at 1:
                    </Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    {getAttributeSelector("attribute1", "Attribute at 1")}
                </Grid>
            </>);
    }

    return (
        <MainLayout>
            { (classes: any) =>
                <div className={classes.centeredContainer}>
                    <Typography>
                        Now you will have to select the attributes and abilities of your character.
                    </Typography>
                    <Grid container>
                        {contained()}
                    </Grid>
                    <Button type="submit" 
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmit(setError)}>
                        Continue!
                    </Button>
                </div>
            }
        </MainLayout>
    )
}

export default Creation2;