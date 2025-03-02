import { Box, Typography } from "@mui/material"

export default function Footer(){
    const company = "Generic Company (Example INC) "
    return(
        <Box component='footer' sx={{}} >
            <Typography>
                ©{company}
            </Typography>
        </Box>
    )
}