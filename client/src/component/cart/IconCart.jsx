import { IconButton } from '@mui/material';
import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import shopContext from '../context/ShopConetext';

function IconCart() {
	const { cartList } = React.useContext(shopContext);
	const StyledBadge = styled(Badge)(({ theme }) => ({
		'& .MuiBadge-badge': {
			right: -1,
			top: 20,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: '0 4px',
		},
	}));

	return (
		<div>
			<IconButton
				aria-label="cart"
				style={{
					display: 'flex ',
					justifyContent: 'justify-content: flex-start',
				}}
			>
				<StyledBadge badgeContent={cartList.length} color="secondary">
					<ShoppingCartIcon />
				</StyledBadge>
			</IconButton>
		</div>
	);
}

export default IconCart;
