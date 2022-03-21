// import loading from '../layout/asset/loading.gif';
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Spinner() {
	return (
		<div>
			{/* <img
				width={180}
				className="text-center mx-auto"
				src={loading}
				alt="Loading.."
			/> */}

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '30%',
				}}
			>
				<CircularProgress />
			</Box>
		</div>
	);
}

export default Spinner;
