import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardMedia } from '@mui/material';
import { Description } from '@mui/icons-material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 300,
	bgcolor: 'background.paper',
	border: 'none',
	borderRadius: '10px',
	boxShadow: 24,
	p: 4,
};

function Popup({ _id, image, title }) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}>
				{' '}
				<CardMedia
					component="img"
					height="320"
					image={image}
					alt={title}
				/>
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						_id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<img src={image} alt={title} width="300" />
						<br />
						{title}
					</Typography>
					<Typography
						_id="modal-modal-description"
						sx={{ mt: 0 }}
					></Typography>
					<button
						onClick={handleClose}
						style={{
							position: 'absolute',
							top: 10,
							right: 10,
							borderRadius: '50%',
							border: 'none',
							// backgroundColor: 'gray',
							color: 'gray',
							padding: '4px',
							fontSize: '20px',
							cursor: 'pointer',
						}}
					>
						x
					</button>
				</Box>
			</Modal>
		</div>
	);
}

export default Popup;
