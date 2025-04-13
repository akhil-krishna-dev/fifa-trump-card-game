import React, { useContext, useEffect, useState } from "react";
import "./Match.css";
import useWebSocket from "../../hooks/useWebSocket";
import MatchMaking from "./components/MatchMaking";
import InMatch from "./components/InMatch";
import { AppContext } from "../../App";
import { shuffleArray } from "../../utils/shuffleArrayUtils";

export const MatchContext = React.createContext();

const Match = () => {
	const webSocketRef = useWebSocket("match");

	const [matchMaking, setMatchMaking] = useState(true);
	const { playersCard } = useContext(AppContext);

	const [currentUserCards, setCurrentUserCards] = useState([]);
	const [opponentCards, setOpponentCards] = useState([]);

	const [readyState, setReadyState] = useState(0);

	const [isRoomCreator, setIsRoomCreator] = useState(false);

	const [webSocketMessage, setWebSocketMessage] = useState("");

	const [isOpponentOffline, setIsOpponentOffline] = useState(false);

	const [isOpponentReady, setIsOpponentReady] = useState(false);

	useEffect(() => {
		if (playersCard && playersCard.length > 0) {
			const { currentUser, opponent } = shuffleArray(playersCard);
			setCurrentUserCards(currentUser);
			setOpponentCards(opponent);
		}
	}, [playersCard]);

	useEffect(() => {
		if (webSocketRef.current) {
			webSocketRef.current.onmessage = (event) => {
				const data = JSON.parse(event.data);
				if (data.type === "room_creator") {
					setIsRoomCreator(true);
				}
				if (data.type === "room_ready_to_play") {
					if (isRoomCreator && opponentCards.length > 0) {
						const data = {
							type: "shuffled_cards",
							data: { currentUserCards, opponentCards },
						};
						if (webSocketRef.current && readyState === 1) {
							webSocketRef.current.send(JSON.stringify(data));
						}
					}
				}
				if (!isRoomCreator && data.type === "shuffled_cards") {
					const { currentUserCards, opponentCards } = data.data;
					setCurrentUserCards(opponentCards);
					setOpponentCards(currentUserCards);
					webSocketRef.current.send(
						JSON.stringify({
							type: "start_game",
						})
					);
				}
				if (data.type === "start_game") {
					setTimeout(() => {
						setIsOpponentReady(true);
					}, 1000);
					setTimeout(() => {
						setMatchMaking(false);
					}, 3000);
				}
				if (data.type === "opponent_left") {
					setIsOpponentOffline(true);
				} else {
					setWebSocketMessage(data);
				}
			};

			webSocketRef.current.onopen = (event) => {
				setReadyState(1);
			};
		}
	}, [webSocketRef, currentUserCards, opponentCards, isRoomCreator]);

	const renderComponent = () => {
		if (matchMaking) {
			return (
				<MatchMaking
					setMatchMaking={setMatchMaking}
					setIsOpponentReady={setIsOpponentReady}
					isOpponentReady={isOpponentReady}
				/>
			);
		}
		return (
			<InMatch
				webSocketRef={webSocketRef}
				currentUserCards={currentUserCards}
				setCurrentUserCards={setCurrentUserCards}
				opponentCards={opponentCards}
				setOpponentCards={setOpponentCards}
				isRoomCreator={isRoomCreator}
				webSocketMessage={webSocketMessage}
			/>
		);
	};

	const contextValues = {
		setMatchMaking,
		webSocketRef,
		isOpponentOffline,
	};

	const containerClassName =
		"match-container w-100 h-100 d-flex justify-content-center align-items-center";

	return (
		<MatchContext.Provider value={contextValues}>
			<div
				className={`${containerClassName} ${
					!matchMaking ? "bg-light" : ""
				}`}
			>
				{renderComponent()}
			</div>
			;
		</MatchContext.Provider>
	);
};

export default Match;
