import React, { useContext, useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import { AppContext } from "../../../App";
import InMatchUserCardStatus from "./InMatchUserCardStatus";
import DummyCover from "./DummyCover";
import { selectARandomFieldFromCurrentCard } from "../../../utils/inMatchUtils";
import MatchEnded from "./MatchEnded";

export const InMatchContenx = React.createContext();
const InMatch = (props) => {
	const {
		webSocketRef,
		currentUserCards,
		opponentCards,
		setCurrentUserCards,
		setOpponentCards,
		isRoomCreator,
		webSocketMessage,
	} = props;

	const { opponentType } = useContext(AppContext);

	const [matchWinner, setMatchWinner] = useState("");

	const [currentlyViewedCard, setCurrentlyViewedCard] = useState({
		currentUser: {},
		opponent: {},
	});

	const [nextCard, setNextCard] = useState({
		currentUser: {},
		opponent: {},
	});

	const [lastCardWon, setLastCardWon] = useState("");

	const [isCardsReady, setIsCardsReady] = useState(false);
	const [isUserCalled, setIsUserCalled] = useState(false);

	const getCallingUserInitialState = () => {
		if (opponentType === "cpu") return "user";
		if (isRoomCreator) return "user";
		return "opponent";
	};

	const [callingUser, setCallingUser] = useState(
		getCallingUserInitialState()
	);

	const [currentCalledState, setCurrentCalledState] = useState("");

	const getFirstCard = (cardArray) => {
		if (cardArray.length > 0) {
			return cardArray[0];
		}
	};
	const getNextCard = (cardArray) => {
		if (cardArray.length > 1) {
			return cardArray[1];
		}
	};

	useEffect(() => {
		if (currentUserCards.length === 0) {
			setMatchWinner("opponent");
		} else if (opponentCards.length === 0) {
			setMatchWinner("user");
		}
		if (currentUserCards.length > 0 && !isCardsReady) {
			setTimeout(() => {
				setIsUserCalled(false);
				setCurrentCalledState("");
			}, 1900);
			setTimeout(() => {
				updateCurrentlyViewedAndNextCards();
			}, 2000);
		}
	}, [isCardsReady, currentUserCards]);

	useEffect(() => {
		if (
			isCardsReady &&
			!isUserCalled &&
			opponentType === "cpu" &&
			callingUser === "opponent"
		) {
			setTimeout(() => {
				CPUCall();
			}, 2000);
		}
	}, [isUserCalled, isCardsReady]);

	useEffect(() => {
		if (
			webSocketMessage.type === "card_call" &&
			callingUser === "opponent"
		) {
			handleUserCall(webSocketMessage.data.keyName);
		}
	}, [webSocketMessage]);

	const handleUserCall = (keyName) => {
		if (opponentType === "user" && callingUser === "user") {
			webSocketRef.current.send(
				JSON.stringify({
					type: "card_call",
					data: { keyName },
				})
			);
		}
		setIsUserCalled(true);
		setCurrentCalledState(keyName);
		setTimeout(() => {
			changeCardsBasedOnUserCall(keyName);
			setIsCardsReady(false);
		}, 1500);
	};

	const CPUCall = () => {
		const keyName = selectARandomFieldFromCurrentCard();
		setCurrentCalledState(keyName);
		handleUserCall(keyName);
	};

	const changeCardsBasedOnUserCall = (keyName) => {
		const { currentUser, opponent } = currentlyViewedCard;
		const currentUserValue = currentUser[keyName];
		const opponentValue = opponent[keyName];

		if (currentUserValue > opponentValue) {
			setLastCardWon("user");
			setCallingUser("user");
			setCurrentUserCards((prevState) => {
				return [
					...prevState.filter((pc) => pc.id !== currentUser.id),
					opponent,
					currentUser,
				];
			});
			setOpponentCards((prevState) => {
				return prevState.filter((pc) => pc.id !== opponent.id);
			});

			return;
		}
		if (currentUserValue < opponentValue) {
			setLastCardWon("opponent");
			setCallingUser("opponent");
			setCurrentUserCards((prevState) => {
				return prevState.filter((pc) => pc.id !== currentUser.id);
			});
			setOpponentCards((prevState) => {
				return [
					...prevState.filter((pc) => pc.id !== opponent.id),
					currentUser,
					opponent,
				];
			});
			return;
		}
		if (currentUserValue === opponentValue) {
			setLastCardWon("");
			setCurrentUserCards((prevState) => {
				return [
					...prevState.filter((pc) => pc.id !== currentUser.id),
					currentUser,
				];
			});
			setOpponentCards((prevState) => {
				return [
					...prevState.filter((pc) => pc.id !== opponent.id),
					opponent,
				];
			});
			return;
		}
	};

	function updateCurrentlyViewedAndNextCards() {
		setCurrentlyViewedCard({
			currentUser: getFirstCard(currentUserCards),
			opponent: getFirstCard(opponentCards),
		});
		setNextCard({
			currentUser: getNextCard(currentUserCards),
			opponent: getNextCard(opponentCards),
		});
		setIsCardsReady(true);
	}

	const getLastCardWonForUser = () => {
		if (lastCardWon === "opponent") return "user-lost";
		return "";
	};

	const getLastCardWonForOpponent = () => {
		if (lastCardWon === "user") return "opponent-lost";
		return "";
	};

	const nextCardClassName = "next-card";

	const contextValues = {
		handleUserCall,
		isUserCalled,
		currentCalledState,
	};

	const inMatchContainer =
		"in-match-container d-flex justify-content-between w-75 gap-5";

	const styles = {
		cardContainer: { width: "40%" },
	};

	if (matchWinner) {
		return <MatchEnded matchWinner={matchWinner} />;
	}
	return (
		<div className={inMatchContainer}>
			<InMatchContenx.Provider value={contextValues}>
				<div
					className="user-card-container position-relative"
					style={styles.cardContainer}
				>
					<InMatchUserCardStatus
						user={"user"}
						callingUser={callingUser}
						userCards={currentUserCards}
					/>

					<PlayerCard
						playerCard={nextCard.currentUser}
						lastCardWon={getLastCardWonForUser()}
						user="user"
						callingUser={"no-user"}
						customClasslassName={nextCardClassName}
					/>
					<PlayerCard
						playerCard={currentlyViewedCard.currentUser}
						lastCardWon={getLastCardWonForUser()}
						user="user"
						callingUser={callingUser}
					/>
				</div>

				<div
					className="opponent-card-container position-relative"
					style={styles.cardContainer}
				>
					<InMatchUserCardStatus
						user={"opponent"}
						callingUser={callingUser}
						userCards={opponentCards}
					/>

					<DummyCover zIndex={100} />
					<PlayerCard
						playerCard={currentlyViewedCard.opponent}
						lastCardWon={getLastCardWonForOpponent()}
						setLastCardWon={setLastCardWon}
						user="opponent"
						callingUser={callingUser}
					/>

					{!isUserCalled && <DummyCover zIndex={1001} />}
				</div>
			</InMatchContenx.Provider>
		</div>
	);
};

export default InMatch;
