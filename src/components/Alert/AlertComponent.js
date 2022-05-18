import { Alert, AlertTitle, Box } from "@mui/material"

export default function CustomAlert({
    dispatch,
    text,
    link,
    alertType,
    id,
    alertTitle,
}) {
    function handleClose() {
        dispatch({
            type: 'remove',
            payload: {
                id
            }
        })
    }
    return (
        <Box id={id} sx={{mb: 1}}>
            <Alert id={id} severity={alertType} onClose={handleClose}>
                {Boolean(alertTitle) && <AlertTitle>{alertTitle}</AlertTitle>}
                {link ? <a href={link} target="_blank" rel="noreferrer">{text}</a> : text}
            </Alert>
        </Box>
    );
}
