import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import {
    MAX_PERMISSIBLE_UPLOAD_FILE_SIZE_MB,
    SUPPORTED_FILE_TYPES_FOR_UPLOAD,
} from "../Constants";
interface UploadFileComponentProps {
    file: any;
    onFileDelete: any;
    onFileUpload: any;
}

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const UploadFileComponent: React.FC<UploadFileComponentProps> = ({
    file,
    onFileDelete,
    onFileUpload,
}) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const validateFileExtensions = (uploadedFile: any) => {
        if (uploadedFile) {
            const validTypes = SUPPORTED_FILE_TYPES_FOR_UPLOAD;
            if (!validTypes.includes(uploadedFile.type)) {
                return false;
            }
        }
        return true;
    };

    const handleFileUpload = (event: any) => {
        if (event.target.files) {
            if (!validateFileExtensions(event.target.files[0])) {
                setErrorMessage("Invalid file type. Please upload a PDF or JPG.");
                return;
            }
            const selectedFile = event.target.files[0];
            const fileSizeMB = selectedFile.size / (1024 * 1024); // Convert size to MB
            if (fileSizeMB > MAX_PERMISSIBLE_UPLOAD_FILE_SIZE_MB) {
                setErrorMessage(
                    `File size must be less than ${MAX_PERMISSIBLE_UPLOAD_FILE_SIZE_MB}MB.`
                );
                return;
            }
            setErrorMessage(null);
            onFileUpload(event.target.files[0]);
        }
    };

    const fileComponent = () => {
        return (
            <>
                <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", alignItems: "center" }}
                >
                    <Typography variant="subtitle1" component="h2">
                        {file.name}
                    </Typography>
                    <IconButton onClick={onFileDelete}>
                        <CloseIcon sx={{ color: "red", fontWeight: "bold" }} />
                    </IconButton>
                </Stack>
            </>
        );
    };
    return (
        <>
            {file && fileComponent()}
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                {`Upload file (Only PDF, JPG Max ${MAX_PERMISSIBLE_UPLOAD_FILE_SIZE_MB} MB)`}
                <VisuallyHiddenInput
                    accept=".pdf, .jpg, .jpeg"
                    type="file"
                    onChange={handleFileUpload}
                />
            </Button>
            {errorMessage && (
                <Typography variant="subtitle1" sx={{ color: "red" }}>
                    {errorMessage}
                </Typography>
            )}
        </>
    );
};

export default UploadFileComponent;
