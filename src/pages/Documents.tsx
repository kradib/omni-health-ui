import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import TablePagination from "@mui/material/TablePagination";
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
import { getDocuments } from "../api/document";
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

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(0);

    const getAllDocuments = () => {
        setLoading(true);
        const response = getDocuments(pageNumber + 1, pageSize);
        setLoading(false);

        if (response.success) {
            setDocuments(response.data?.data.documents);
            setTotalCount(response.data?.data.totalElements);
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
    };

    useEffect(() => {
        getAllDocuments();
    }, [pageNumber, pageSize]);

    const noDocumentsComponent = () => {
        if (documents.length == 0 && !isLoading) {
            return (
                <>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                        You have no documents uploaded yet
                    </Typography>
                </>
            );
        }
    };

    const documentListComponent = () => {
        const handleChangePage = (_event: any, page: number) => {
            setPageNumber(page);
        };

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
                            {documents.map((doc, index) => (
                                <TableRow key={index}>
                                    <TableCell>{doc.name}</TableCell>
                                    <TableCell>{doc.dateUploaded}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            sx={{ color: theme.palette.primary.main }}
                                            onClick={() => {
                                                console.log(doc.identifier);
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
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={pageSize}
                    page={pageNumber}
                    onPageChange={(_event, page) => setPageNumber(page)}
                    onRowsPerPageChange={(event) =>
                        setPageSize(parseInt(event.target.value))
                    }
                />
            </>
        );
    };

    return (
        <>
            {noDocumentsComponent()}
            {documentListComponent()}
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
