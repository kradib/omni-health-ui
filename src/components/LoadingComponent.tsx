import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingComponentProps {
    isLoading: boolean;
    children?: React.ReactNode;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
    isLoading,
    children,
}) => {
    return (
        <>
            {!isLoading && children}
            {isLoading && (
                <Box display="flex" justifyContent="center" alignItems="center" ml={2}>
                    <CircularProgress size={24} sx={{ marginLeft: 2 }} />
                </Box>
            )}
        </>
    );
};

export default LoadingComponent;
