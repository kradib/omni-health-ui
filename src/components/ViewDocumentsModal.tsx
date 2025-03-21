import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import theme from "../theme";
import DownloadIcon from "@mui/icons-material/Download";
import { downloadFile } from "../api/document";
import { downloadFileFromResponse } from "../utils/Utils";
import ModalComponent from "./ModalComponent";
import dayjs from "dayjs";

interface ViewDocumentsModalProps {
    show: boolean;
    appointmentId: number;
    appointmentDocuments: any;
    onClose: any;
}

const ViewDocumentsModal: React.FC<ViewDocumentsModalProps> = ({
    show,
    appointmentId,
    appointmentDocuments,
    onClose,
}) => {
    const handleDownloadDocument = async (docId: number) => {
        const response = await downloadFile(docId, appointmentId);
        downloadFileFromResponse(response.data.file, response.data.filename);
    };

    return (
        <ModalComponent
            open={show}
            onClose={onClose}
            title="Appointment Reports"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {appointmentDocuments.map((doc: any, index: number) => (
                <>
                    <Stack
                        sx={{ justifyContent: "space-between", alignItems: "center" }}
                        direction="row"
                        spacing={2}
                        key={index}
                    >
                        <Stack
                            sx={{ justifyContent: "left", alignItems: "center" }}
                            direction="row"
                            spacing={2}
                        >
                            <Typography variant="body1">{doc.documentName}</Typography>
                        </Stack>
                        <Typography variant="body1">
                            {dayjs(doc.dateUploaded).format("DD-MM-YYYY")}
                        </Typography>
                        <IconButton
                            sx={{ color: theme.palette.primary.main }}
                            onClick={() => handleDownloadDocument(doc.id)}
                        >
                            <DownloadIcon />
                        </IconButton>
                    </Stack>
                </>
            ))}
        </ModalComponent>
    );
};

export default ViewDocumentsModal;
