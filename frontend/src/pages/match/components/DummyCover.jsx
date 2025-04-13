import React from "react";

const DummyCover = ({ zIndex }) => {
	const cardContainerClassName = "card shadow border border-success border-5";

	return (
		<div
			style={{
				width: "30rem",
				height: "35rem",
				position: "absolute",
				top: "144px",
				left: "0px",
				backgroundColor: "black",
				zIndex: zIndex,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			className={cardContainerClassName}
		>
			<h5 className="text-white">
				Opponent card will be visible after the call
			</h5>
		</div>
	);
};

export default DummyCover;
