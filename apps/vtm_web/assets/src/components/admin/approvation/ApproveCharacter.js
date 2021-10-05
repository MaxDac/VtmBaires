// @flow

import React from "react";
import MainLayout from "../../MainLayout";
import {
    useCharacterCompleteQuery
} from "../../../services/queries/character/GetCharacterCompleteQuery";

type Props = {
    id: string;
}

const ApproveCharacter = ({id}: Props): any => {
    const character = useCharacterCompleteQuery(id);

    return (
        <MainLayout>
            {character.name}
        </MainLayout>
    );
}

export default ApproveCharacter;
