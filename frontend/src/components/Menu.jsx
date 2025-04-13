import React from "react";
import "./Menu.css";
import { IoMdHome } from "react-icons/io";
import { updatePageToHome } from "../store/appActions";

const Menu = (props) => {
	const { state, dispatch } = props;

	const handleGoToHome = () => {
		dispatch(updatePageToHome());
	};
	return (
		<div className="menu-container">
			<button onClick={handleGoToHome} className="btn btn-lg btn-danger">
				{state.isUserInMatch ? "End Match" : <IoMdHome size={90} />}
			</button>
		</div>
	);
};

export default Menu;
