import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React from "react";

interface ModalComponentProps {
    open: boolean;
    onClose: any;
    title: string;
    children: any;
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 450,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const ModalComponent: React.FC<ModalComponentProps> = ({
    open,
    onClose,
    title,
    children,
}) => {
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                        }}
                        size="small"
                    >
                        <CloseOutlinedIcon fontSize="small" />
                    </IconButton>
                    <Stack spacing={2}>
                        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {title}
                            </Typography>
                        </Stack>
                        {children}
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};

export default ModalComponent;
