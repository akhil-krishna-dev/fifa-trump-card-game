import React from "react";
import "./MenuButton.css";
import { IoIosCloseCircle } from "react-icons/io";
import { TiThMenu } from "react-icons/ti";

const MenuButton = ({ state, handleMenuClick }) => {
	return (
		<button
			id="menu-icon"
			className="btn btn-primary"
			onClick={handleMenuClick}
		>
			{state.isUserClickedMenu ? (
				<IoIosCloseCircle size={30} />
			) : (
				<TiThMenu size={30} />
			)}
		</button>
	);
};

export default MenuButton;
