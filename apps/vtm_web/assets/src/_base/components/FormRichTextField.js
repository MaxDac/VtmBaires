// @flow

import React from "react";
import SunEditor from "suneditor-react";

const FormRichTextField = (): any => {
    const onComponentChange = e =>
        console.log("event", e);
    
    return (
        <SunEditor onChange={onComponentChange} />
    );
};

export default FormRichTextField;
