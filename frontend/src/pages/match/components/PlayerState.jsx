import React, { useContext } from "react";
import { InMatchContenx } from "./InMatch";
import { MatchContext } from "../Match";

const PlayerState = ({ keyName, id, value, text, user, callingUser }) => {
	const statesContanerClassName = "btn btn-outline-primary";
	const { handleUserCall, isUserCalled, currentCalledState } =
		useContext(InMatchContenx);

	const { isOpponentOffline } = useContext(MatchContext);

	const handleHandleUserCall = () => {
		if (isOpponentOffline) return;
		if (!isUserCalled) {
			if (user === callingUser) {
				handleUserCall(keyName);
			}
		}
	};

	const renderClassName = () => {
		if (keyName === currentCalledState) {
			if (callingUser === "no-user") return "";
			return "active";
		}
		if (isUserCalled) {
			return "disabled";
		}
		if (callingUser === "no-user" || callingUser !== user)
			return "disabled";
	};

	return (
		<span
			className={`${statesContanerClassName} ${renderClassName()}`}
			onClick={handleHandleUserCall}
			style={{ width: "48%" }}
		>
			{text} {value}
		</span>
	);
};

export default PlayerState;
