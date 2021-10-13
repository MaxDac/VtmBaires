// @flow

import React from "react";
import {object, string} from "yup";

type Props = {

}

const CharacterInfoFormValidationSchema = object().shape({
    name: string("Enter your character name").required("Required"),
    description: string("Enter your character description").required("Required"),
    biography: string("Enter your character biography").required("Required")
});

const CharacterInfoForm = (props: Props): any => {
    return (<></>);
}

export default CharacterInfoForm;
