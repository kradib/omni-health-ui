import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const HelpCenter = () => {
    return (
        <>
            <Stack spacing={2}>
                <Typography variant="h1">Contact Us</Typography>
                <Typography variant="body1">For more information or support reach out to:</Typography>
                <Typography variant="body1"><b>Phone Number:{` `}</b>+971-508811557</Typography>
                <Typography variant="body1"><b>Email:{` `}</b>omnihealthapp@gmail.com</Typography>
            </Stack>
        </>
    )
}

export default HelpCenter
