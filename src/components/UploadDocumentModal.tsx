import React, { useState } from "react";
import ModalComponent from "./ModalComponent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import UploadFileComponent from "./UploadFileComponent";
import { uploadDocument } from "../api/document";
import { uploadAppointmentDocument } from "../api/appointment";

interface UploadDocumentModalProps {
    show: boolean;
    onClose: any;
    onUploaded: any;
    appointmentId?: any;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
    show,
    onClose,
    onUploaded,
    appointmentId,
}) => {
    const [docName, setDocName] = useState("");
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const isValidInput = () => {
        return docName.length > 0 && file != null;
    };

    const handleUploadDocument = async () => {
        setLoading(true);
        let response;
        if (appointmentId) {
            response = await uploadAppointmentDocument(file, docName, appointmentId);
        } else {
            response = await uploadDocument(file, docName);
        }
        setLoading(false);
        setFile(null);
        setDocName("");
        onUploaded(response.data, response.success ? "success" : "error");
    };

    return (
        <>
            <ModalComponent
                open={show}
                onClose={onClose}
                title="Upload Document"
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <TextField
                    id="documentName"
                    label="Document Name"
                    onChange={(e) => setDocName(e.target.value)}
                    variant="outlined"
                    value={docName}
                />

                <UploadFileComponent
                    file={file}
                    onFileDelete={() => setFile(null)}
                    onFileUpload={(file: any) => {
                        setFile(file);
                    }}
                />

                <Button
                    variant="contained"
                    disabled={!isValidInput()}
                    onClick={handleUploadDocument}
                    size="large"
                    loading={loading}
                >
                    Confirm
                </Button>
            </ModalComponent>
        </>
    );
};

export default UploadDocumentModal;
