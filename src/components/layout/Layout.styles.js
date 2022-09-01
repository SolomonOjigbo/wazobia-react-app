import styled from "styled-components";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const HeaderContainer = styled.div`
	display: flex;
	position: fixed;
	margin-top: 0;
	box-sizing: border-box;
	width: 100%;
	font-family: inherit;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	background-color: whitesmoke;
	color: black;
`;

export const HeaderLeft = styled.div`
	flex: 0.8;
	display: flex;
	align-items: center;
	margin-left: 5px;
`;

export const HeaderRight = styled.div`
	flex: 0.2;
	display: flex;
	justify-content: right;

	> .h4 > .MuiSvgIcon {
		margin-left: auto;
		margin-right: 25px;
		display: flex;
		font-size: 18px;
	}
`;

export const HeaderAvatar = styled(ArrowDropDownIcon)`
	cursor: pointer;
	:hover {
		opacity: 0.8;
	}
`;
