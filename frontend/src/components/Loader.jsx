import React from "react";
import "./Loader.css";

const Loader = ({ size = "75px", bgColor = "white", color = "" }) => {
	return (
		<div
			className="loader-container"
			style={{
				width: size,
				height: size,
				backgroundColor: bgColor,
			}}
		>
			<div className="loader"></div>
		</div>
	);
};

export default Loader;
