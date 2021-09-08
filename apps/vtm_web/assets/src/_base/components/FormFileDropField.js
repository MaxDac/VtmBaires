// @flow

import React, {useMemo, useState} from 'react';
import {useDropzone} from "react-dropzone";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import {toBase64} from "../file-utils";

import type {Base64Result} from "../file-utils";

export type FormFileDropFieldProps = {
    changed: Base64Result => void;
    fieldName: string;
    acceptedFiles?: ?string[];
    showPreview?: ?boolean;
};

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#33333',
    color: '#33333',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const FormFileDropField = (props: FormFileDropFieldProps): any => {
    const classes = useStyles();
    const [preview, setPreview] = useState<Base64Result>("");

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: props.acceptedFiles?.join(', ') ?? 'image/png',
        onDrop: acceptedFiles => {
            if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 0) {
                toBase64(acceptedFiles[0])
                    .then(result => {
                        setPreview(result);
                        props.changed(result);
                    })
                    .catch(error => {
                        console.log("Error while uploading the file: ", error);
                    });
            }
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const showPreview = () => {
        if (props.showPreview && preview && preview !== "") {
            return (
                <>
                    <br />
                    <div style={{
                        margin: '0 auto',
                        width: '40px'
                    }}>
                        <Avatar alt="preview" src={preview} className={classes.large} />
                    </div>
                </>);
        }
        else {
            return <></>
        }
    }

    return (
        <>
            <section className="container">
                <div {...getRootProps({style})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <em>(Only *.png images will be accepted)</em>
                </div>
            </section>
            {showPreview()}
        </>
    );
}

export default FormFileDropField;
