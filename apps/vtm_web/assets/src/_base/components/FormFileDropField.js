// @flow

import React, {useMemo, useState} from 'react';
import {useDropzone} from "react-dropzone";
import Avatar from "@mui/material/Avatar";
import {makeStyles} from "@mui/styles";
import {compressImage} from "../file-utils";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type FormFileDropFieldProps = {
    changed: (?string, ?string) => void;
    fieldName: string;
    acceptedFiles?: ?string[];
    showLargePreview?: ?boolean;
    showChatPreviews?: ?boolean;
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
    const [largePreview, setLargePreview] = useState<string>("");
    const [preview, setPreview] = useState<string>("");

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: props.acceptedFiles?.join(', ') ?? 'image/png',
        onDrop: async acceptedFiles => {
            if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 0) {
                const large = await compressImage(acceptedFiles[0], 200, 200);
                const small = await compressImage(acceptedFiles[0], 50, 50);

                setLargePreview(large);
                setPreview(small);

                props.changed(large, small);
            }
        }
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        // $FlowFixMe
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const showPreview = () => {
        console.log("props", props.showChatPreviews);
        if ((props.showLargePreview || props.showChatPreviews) && preview && preview !== "") {
            const wrapStackItem = (item: any): any => (
                <Box sx={{padding: "1rem"}}>
                    {item}
                </Box>
            );

            const buildStackItems = () => {
                const previews = [];

                if (props.showLargePreview) {
                    previews.push(
                        wrapStackItem(
                            <img key={1} src={largePreview} alt="original size" />
                        )
                    );
                }

                if (props.showChatPreviews) {
                    previews.push(
                        wrapStackItem(
                            <img src={preview} alt="original size" />
                        ),
                        wrapStackItem(
                            <Avatar alt="preview" src={preview} className={classes.large} />
                        )
                    );
                }

                if (previews.length > 0) {
                    return [
                        <Typography sx={{padding: "1rem"}}>Previews: </Typography>,
                        ...previews
                    ];
                }

                return previews;
            };

            return (<Stack direction="row">{buildStackItems()}</Stack>);
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
                    <p>Trascina un file su questa area, o clicca per aggiungere un'immagine.</p>
                    <em>(Saranno accettati solo file png)</em>
                </div>
            </section>
            {showPreview()}
        </>
    );
}

export default FormFileDropField;
