import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import "./Error.css"

const Error = () => {
	return (
		<Box sx={{ bgcolor: "#C51D34", height: "100vh", borderRadius:5 }}>
			<Typography
				variant='h2'
				textAlign='center'
                paddingTop="1em"
			>
				404
			</Typography>
			<Typography textAlign='center'>Stránka nenalezena</Typography>
			<Typography
				textAlign='center'
				marginTop='1em'
			>
				<Link
					to='/'
				>
					Zpět na domovskou stránku
				</Link>
			</Typography>
		</Box>
	)
}

export default Error
