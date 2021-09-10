// @flow

import React, {useState} from "react";

import {useSession} from "../../../services/hooks/useSession";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {usePreloadedQuery} from "react-relay";
import {attributesQuery, preloadedQuery} from "../../../services/queries/info/attributes-query";
import Grid from "@material-ui/core/Grid";

import AttributeSelectionField from "../AttributeSelectionField";
import Button from "@material-ui/core/Button";
import appendAttributesMutation from "../../../services/queries/character/append-attributes-mutation";

import type { CharacterAttributeRequest } from "../../../services/queries/character/append-attributes-mutation";
import {Routes} from "../../../AppRouter";
import useCharacterStage from "../../../services/hooks/useCharacterStage";

import type {Attributes} from "./attribute-helpers";
import type { AttributeTypeNames } from "../../../services/queries/info/attributes-query";

export type CreationBaseProps<TFormAttributes> = {
    classes: any;
    setError: (string, string) => void;
    currentStage: number;
    attributeTypeName: AttributeTypeNames;
    emptyAttributes: TFormAttributes;
    getAttributesToSave: (TFormAttributes, (string, number) => CharacterAttributeRequest) => Array<CharacterAttributeRequest>;
    children: ((string, string) => any) => any;
}

const CreationBase = <TFormAttributes>(props: CreationBaseProps<TFormAttributes>): any => {
    const history = useHistory();
    const { character: ch } = useSession(history);
    const character = useCharacterStage(ch?.id);
    const { attributes: data }: Attributes = usePreloadedQuery(attributesQuery, preloadedQuery);

    if (character?.stage) {
        if (character?.stage > props.currentStage) {
            history.push(Routes[`creation${props.currentStage + 1}`]);
        }
    }

    const [values, setValues] = useState<TFormAttributes>(props.emptyAttributes);
    const [errors, setErrors] = useState<any>({});

    const selectFields = () => {
        const attrs = data
            .filter(({ attributeType: { name } }) => name === props.attributeTypeName)
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
                (vs: any)[propertyName] = "";
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
                (vs: any)[propertyName] = propertyValue;
                return vs;
            });
        }
    }

    const getAttributeSelector = (fieldName: string, label: string): any =>
        <AttributeSelectionField fieldName={fieldName}
                                 label={label}
                                 value={(values: any)[fieldName]}
                                 values={selectFields}
                                 onChange={checkAttributes} />;

    const onSubmit = setError => _ => {
        if (errors && Object.keys(errors).length > 0) {
            return;
        }

        if (Object.values(values).some(v => v === "")) {
            return;
        }

        const generateRequest = (attributeId: string, value: number): CharacterAttributeRequest => ({
            attributeId,
            characterId: String(ch?.id),
            value
        });

        const request: Array<CharacterAttributeRequest> = props.getAttributesToSave(values, generateRequest);

        appendAttributesMutation(request, props.currentStage)
            .then(_ => history.push(Routes.creation3))
            .catch(e => setError(e, "There was an error while updating the character."));
    }

    return (
        <>
            <Typography>
                Now you will have to select the attributes and abilities of your character.
            </Typography>
            <Grid container>
                {props.children(getAttributeSelector)}
            </Grid>
            <Button type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={props.classes.submit}
                    onClick={onSubmit(props.setError)}>
                Continue!
            </Button>
        </>
    )
}

export default CreationBase;
