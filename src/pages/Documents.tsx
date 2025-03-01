import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";
import UploadDocumentModal from "../components/UploadDocumentModal";
import Toast from "../components/Toast";

const Documents = () => {
    const theme = useTheme();

    const [showUploadModal, setShowUploadModal] = useState(false);

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );

    const handleCloseModal = () => {
        setShowUploadModal(false);
    };

    const handleCloseSnackbar = () => {
        setOpenToast(false);
    };

    const handleUploaded = (message: string, severity: "success" | "error") => {
        setToastMessage(message);
        setToastSeverity(severity);
        setOpenToast(true);
        setShowUploadModal(false);
    };

    return (
        <>
            <IconButton
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: "#ffffff",
                    borderRadius: "50%",
                    position: "fixed", // Fixed position
                    bottom: 20, // Distance from the bottom
                    right: 20, // Distance from the right
                    width: 56,
                    height: 56,
                    boxShadow: 2,
                    "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                    },
                }}
                onClick={() => setShowUploadModal(true)}
            >
                <UploadFileIcon />
            </IconButton>

            {showUploadModal && (
                <UploadDocumentModal
                    show={showUploadModal}
                    onClose={handleCloseModal}
                    onUploaded={handleUploaded}
                />
            )}

            <Toast
                open={openToast}
                severity={toastSeverity}
                message={toastMessage}
                onClose={handleCloseSnackbar}
            />
        </>
    );
};

export default Documents;
