import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {
	HeaderAvatar,
	HeaderContainer,
	HeaderLeft,
	HeaderRight,
} from "./Layout.styles";

function Header() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const menuId = "account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Logout</MenuItem>
		</Menu>
	);

	return (
		<HeaderContainer>
			<HeaderLeft>
				<h3>Dashboard</h3>
			</HeaderLeft>

			<HeaderRight>
				<h4>Username</h4>
				<HeaderAvatar onClick={handleProfileMenuOpen} />
				{renderMenu}
			</HeaderRight>
		</HeaderContainer>
	);
}

export default Header;
