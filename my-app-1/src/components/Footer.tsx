import { Box, Typography } from "@mui/material"

export default function Footer(){
    const company = "Generic Company (Example INC) "
    return(
       <footer>
            <Box >
            <Typography>
                ©{company}
            </Typography>
            </Box>
       </footer>
    )
}