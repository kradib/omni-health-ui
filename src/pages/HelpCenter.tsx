import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const HelpCenter = () => {
    return (
        <>
            <Stack spacing={2}>
                <Typography variant="h1">Contact Us</Typography>
                <Typography variant="body1">For more information or support reach out to:</Typography>
                <Typography variant="body1"><b>Phone Number:{` `}</b>+12-1234567890</Typography>
                <Typography variant="body1"><b>Email:{` `}</b>support@omnihealth.com</Typography>
            </Stack>
        </>
    )
}

export default HelpCenter
