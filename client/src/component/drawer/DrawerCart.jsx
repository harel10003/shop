import React, { useContext } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Cart from '../cart/Cart';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import shopContext from '../context/ShopConetext';
import IconCart from '../cart/IconCart';
import { FaMoneyBillWaveAlt } from 'react-icons/fa';

function DrawerCart() {
	const [state, setState] = useState({
		// top: false,
		// left: false,
		// bottom: false,
		right: false,
	});

	const { TotalPrice, cartList } = useContext(shopContext);
	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	// const list = (anchor) => (
	// 	<Box
	// 		sx={{
	// 			width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250,
	// 		}}
	// 		role="presentation"
	// 		onClick={toggleDrawer(anchor, false)}
	// 		onKeyDown={toggleDrawer(anchor, false)}
	// 	>
	// 		<List>
	// 			{['Inbox', 'Starred', 'Send email', 'Drafts'].map(
	// 				(text, index) => (
	// 					<ListItem button key={text}>
	// 						<ListItemIcon>
	// 							{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
	// 						</ListItemIcon>
	// 						<ListItemText primary={text} />
	// 					</ListItem>
	// 				)
	// 			)}
	// 		</List>
	// 		<Divider />
	// 		<List>
	// 			{['All mail', 'Trash', 'Spam'].map((text, index) => (
	// 				<ListItem button key={text}>
	// 					<ListItemIcon>
	// 						{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
	// 					</ListItemIcon>
	// 					<ListItemText primary={text} />
	// 				</ListItem>
	// 			))}
	// 		</List>
	// 	</Box>
	// );

	// if (cartList.length === 0) {
	// 	return (
	// 		<Stack sx={{ width: '100%' }} spacing={2}>
	// 			<Alert
	// 				severity="info"
	// 				style={{ width: '200px', flexDirection: 'row-reverse' }}
	// 			>
	// 				your cart is empty
	// 			</Alert>
	// 		</Stack>
	// 	);
	// } else
	return (
		<div style={{ display: cartList.length === 0 ? 'none' : 'block' }}>
			{['right'].map((anchor) => (
				<React.Fragment key={anchor}>
					<div onClick={toggleDrawer(anchor, true)}>
						<IconCart />
					</div>
					<Drawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
					>
						{/* {list(anchor)} */}

						<div style={{ margin: ' 15px auto', fontSize: '35px' }}>
							My Cart
						</div>
						<button
							style={{
								position: 'fixed',
								top: 20,
								right: 20,
								fontSize: 20,
								borderRadius: '50%',
								border: 'none',
							}}
							onClick={toggleDrawer(anchor, false)}
						>
							x
						</button>
						<Cart />
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: ' space-around',
								margin: 30,
							}}
						>
							<FaMoneyBillWaveAlt />
							<div>total payment</div>
							<div>{TotalPrice().toFixed(2)}$</div>
						</div>
						<Button
							style={{ margin: ' 0 30px' }}
							variant="contained"
						>
							Your Cart
						</Button>
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}

export default DrawerCart;
