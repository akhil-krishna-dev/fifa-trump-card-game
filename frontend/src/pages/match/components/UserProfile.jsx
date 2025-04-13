import React from "react";

const UserProfile = (props) => {
	const { name, Icon, card = true, height = "19rem" } = props;
	if (Icon) {
		return (
			<div
				className={card ? "card" : ""}
				style={{ width: "15rem", height: height }}
			>
				<Icon
					className="card-body p-5"
					style={{ width: "100%", height: "220px" }}
				/>
				<div className="card-body">
					<p className="card-text fw-bold text-center">{name}</p>
				</div>
			</div>
		);
	}
};

export default UserProfile;
