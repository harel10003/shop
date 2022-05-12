import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardMedia } from '@mui/material';
import { Description } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

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

function Popup({
	_id,
	image,
	title,
	description,
	category,
	price,
	editor,
	update,
	index,
}) {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<div onClick={handleOpen}>
				{' '}
				{editor == 'true' ? (
					<EditIcon />
				) : (
					<CardMedia
						component="img"
						height="320"
						image={image}
						alt={title}
						description={description}
						category={category}
						price={price}
						editor={editor}
					/>
				)}
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						_id="modal-modal-title"
						variant={editor == 'true' ? '15px' : 'h6'}
						component="h3"
					>
						<img
							src={image}
							alt={title}
							width={editor == 'true' ? '100' : '300'}
						/>
						<br />
						{title}
						<br />
						<br />
						<div
							style={{
								display: editor == 'true' ? 'inline' : 'none',
							}}
						>
							{`category:  ${category} `}
							<br />
							<br />
							{`price: ${price} `}
							<br />
							<br />
							{`description: ${description} `}
						</div>
						{/* : ''
						} */}
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

					{editor == 'true' ? (
						<Button
							variant="contained"
							style={{
								margin: '10px 20px',
								padding: '12px 50px',
							}}
							onClick={() => {
								update(
									_id,
									title,
									description,
									category,
									image,
									price,
									// params.row.rating.rate,
									index
								);
								handleClose();
							}}
						>
							save the change
						</Button>
					) : (
						''
					)}
				</Box>
			</Modal>
		</div>
	);
}

export default Popup;
