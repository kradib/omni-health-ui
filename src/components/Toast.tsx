import Snackbar from "@mui/material/Snackbar";
import { SNACKBAR_TIMEOUT } from "../Constants";
import Alert from "@mui/material/Alert";

const Toast = (props: any) => {
    return (
        <>
            <Snackbar
                open={props.open}
                autoHideDuration={SNACKBAR_TIMEOUT}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                onClose={props.onClose}
            >
                <Alert
                    onClose={props.onClose}
                    severity={props.severity}
                    sx={{ width: "100%" }}
                >
                    {props.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Toast;
