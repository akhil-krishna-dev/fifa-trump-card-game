import React from "react";

const MatchEnded = ({ matchWinner }) => {
	const containerClassName =
		"match-ended-container w-100 h-100 d-flex justify-content-center align-items-center position-absolute top-0 left-0";
	const textClassName = "p-3 px-5  rounded-2 text-light";
	return (
		<div className={containerClassName}>
			<h1
				className={`${textClassName} ${
					matchWinner !== "user" ? "bg-danger" : "bg-success"
				}`}
			>
				{matchWinner !== "user"
					? "You have lost this match better luck next time!"
					: "Congratulation You have won this Match!"}
			</h1>
		</div>
	);
};

export default MatchEnded;
