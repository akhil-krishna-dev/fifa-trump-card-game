import React from "react";
import PlayerState from "./PlayerState";
import "./PlayerCard.css";
import { stringToStandardText } from "../../../utils/stringUtils";
import { getCardObjectReleventKeys } from "../../../utils/objectUtils";

const PlayerCard = (props) => {
	const {
		customClasslassName,
		playerCard,
		lastCardWon,
		setLastCardWon,
		callingUser,
		user,
	} = props;

	const cardContainerClassName = "card shadow border border-success border-5";

	const handleLoadElement = () => {
		if (setLastCardWon) {
			setLastCardWon("");
		}
	};

	const renderZIndex = () => {
		if (callingUser !== "no-user") {
			return "999";
		}
	};

	const renderClassName = () => {
		if (customClasslassName) {
			return `${customClasslassName} ${lastCardWon}`;
		}
		return `current-card-${lastCardWon}`;
	};

	const renderPlayerState = () => {
		if (playerCard === undefined) return;
		return getCardObjectReleventKeys(playerCard).map((key) => (
			<PlayerState
				key={key}
				keyName={key}
				text={stringToStandardText(key)}
				id={playerCard[key]}
				value={playerCard[key]}
				callingUser={callingUser}
				user={user}
			/>
		));
	};

	return (
		<div
			onLoad={handleLoadElement}
			className={`${cardContainerClassName} ${renderClassName()}`}
			style={{
				width: "30rem",
				height: "35rem",
				zIndex: renderZIndex(),
			}}
		>
			<br />
			<div className="card-body">
				<div
					style={{
						position: "relative",
						height: "200px",
						borderRadius: "10px",
						overflow: "hidden",
					}}
				>
					<img
						style={{
							position: "absolute",
							top: "0px",
							left: "0px",
						}}
						className="card-img-top"
						src={playerCard?.image}
					/>
				</div>
			</div>
			<div
				className="card-body bg-white d-flex flex-wrap justify-content-between gap-3"
				style={{
					backgroundColor: "white",
					zIndex: "100",
				}}
			>
				<h5 className="card-title w-100 px-1 d-flex justify-content-between ">
					<div> {playerCard?.name}</div>
					<div>
						{" "}
						{playerCard?.age ? `Age ${playerCard?.age}` : null}
					</div>
				</h5>

				{renderPlayerState()}
			</div>
		</div>
	);
};

export default PlayerCard;
