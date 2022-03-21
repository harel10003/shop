import './Header.css';
import ShopContext from '../context/ShopConetext';
import { useContext, useEffect, useState } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { withRouter } from 'react-router-dom';
import { Drawer } from '@mui/material';
import DrawerCart from '../drawer/DrawerCart';
import { handleBreakpoints } from '@mui/system';

const pages = ['Home', 'About'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header(props) {
	const { history } = props;
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleMenuClick = (page) => {
		if (page === 'About') {
			history.push('about');
		} else {
			history.push('/');
		}
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const [
		cartList,
		setCartlist,
		productsList,
		minPrice,
		setMinPrice,
		maxPrice,
		setMaxPrice,
		updataRange,
		setVal,
		val,
		minP,
		maxP,
		thisProduct,
		sumTotal,
		TotalPrice,
		catgoryNow,
		filteredList,
		showMinus,
		removeProduct,
		categories,
		filterCategory,
	] = useContext(ShopContext);

	return (
		<nav className="product-filter" style={{ position: 'relative' }}>
			<AppBar
				position="fixed"
				style={{ background: 'white', color: 'black' }}
			>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'flex', md: 'flex' },
							}}
						>
							{isMobile ? (
								<>
									<IconButton
										size="large"
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={handleOpenNavMenu}
										color="inherit"
									>
										<MenuIcon />
									</IconButton>

									<Menu
										_id="menu-appbar"
										anchorEl={anchorElNav}
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'left',
										}}
										keepMounted
										transformOrigin={{
											vertical: 'top',
											horizontal: 'left',
										}}
										open={Boolean(anchorElNav)}
										onClose={() => anchorElNav(null)}
										sx={{
											display: {
												xs: 'block',
												md: 'flex',
											},
										}}
									>
										{pages.map((page, index) => (
											<MenuItem key={index}>
												<Typography
													textAlign="center"
													onClick={() =>
														handleMenuClick(page)
													}
												>
													{page}
												</Typography>
											</MenuItem>
										))}
									</Menu>
								</>
							) : (
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleOpenNavMenu}
									color="inherit"
								>
									{pages.map((page, index) => (
										<MenuItem key={index}>
											<Typography
												textAlign="center"
												onClick={() =>
													handleMenuClick(page)
												}
											>
												{page}
											</Typography>
										</MenuItem>
									))}
								</IconButton>
							)}
						</Box>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{
								flexGrow: 1,
								display: { xs: 'flex', md: 'flex' },
							}}
						>
							Shop Store
						</Typography>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'none', md: 'flex' },
							}}
						>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={() => handleMenuClick(page)}
									sx={{
										my: 2,
										color: 'white',
										display: 'block',
									}}
								>
									{page}
								</Button>
							))}
						</Box>

						<div style={{ margin: '10px', display: 'inline' }}>
							{TotalPrice().toFixed(2)}$
						</div>
						<DrawerCart />
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<Drawer
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}
								>
									<Avatar
										alt="Remy Sharp"
										src="/static/images/avatar/2.jpg"
									/>
								</Drawer>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								_id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem
										key={setting}
										onClick={handleCloseUserMenu}
									>
										<Typography textAlign="center">
											{setting}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</nav>
	);
}
export default withRouter(Header);
