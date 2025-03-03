import { useTheme } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useEffect, useState } from "react";
import UploadDocumentModal from "../components/UploadDocumentModal";
import Toast from "../components/Toast";
import { downloadFile, getDocuments } from "../api/document";
import LoadingComponent from "../components/LoadingComponent";
import DownloadIcon from "@mui/icons-material/Download";

const Documents = () => {
    const theme = useTheme();

    const style = {
        backgroundColor: theme.palette.primary.light,
        color: "black",
        fontWeight: "bold",
    };

    const [showUploadModal, setShowUploadModal] = useState(false);

    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
        "success"
    );

    const [isLoading, setLoading] = useState(false);

    const [documents, setDocuments] = useState([]);

    const getAllDocuments = async () => {
        setLoading(true);
        const response = await getDocuments();
        setLoading(false);

        if (response.success) {
            setDocuments(response.data?.data.documentMetaData);
        }
    };

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
        getAllDocuments();
    };

    useEffect(() => {
        getAllDocuments();
    }, []);

    const handleDownloadDocument = async (docId: number) => {
        const response = await downloadFile(docId);

        // Create a Blob URL
        const url = window.URL.createObjectURL(new Blob([response.data.file]));

        // Create an invisible link and trigger the download
        const link = document.createElement("a");
        link.href = url;

        // Set the file name (you can get it from headers if needed)
        link.setAttribute("download", response.data.filename);

        // Add to the DOM, trigger click, and remove the element
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
    };

    const noDocumentsComponent = () => {
        return (
            <>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                    You have no documents uploaded yet
                </Typography>
            </>
        );
    };

    const documentListComponent = () => {
        return (
            <>
                <LoadingComponent isLoading={isLoading} />

                <TableContainer component={Paper}>
                    <Table sx={{ xs: 300, md: 600 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={style}>Document Name</TableCell>
                                <TableCell sx={style}>Date Uploaded</TableCell>
                                <TableCell sx={style}>Download</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documents.map((doc: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{doc.documentName}</TableCell>
                                    <TableCell>{doc.dateUploaded}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            sx={{ color: theme.palette.primary.main }}
                                            onClick={() => {
                                                handleDownloadDocument(doc.id);
                                            }}
                                        >
                                            <DownloadIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    };

    const isDocumentEmpty = !documents?.length;

    return (
        <>
            {isDocumentEmpty && noDocumentsComponent()}
            {!isDocumentEmpty && documentListComponent()}
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
