import React, { useContext, useEffect, useRef, useState } from "react";
import "./InMatchUserCardStatus.css";
import { FaUserCircle } from "react-icons/fa";
import { HiDesktopComputer } from "react-icons/hi";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { RiWifiOffLine } from "react-icons/ri";
import { AppContext } from "../../../App";
import { MatchContext } from "../Match";

const InMatchUserCardStatus = ({ callingUser, userCards, user }) => {
	const { opponentType } = useContext(AppContext);
	const { isOpponentOffline } = useContext(MatchContext);

	const [visibleIcon, setVisibleIcon] = useState(false);
	const previousCardsLengthRef = useRef(0);
	const [cardCountStatus, setCardCountStatus] = useState("");
	const profileIconBorderColor = useRef("");

	useEffect(() => {
		setTimeout(() => {
			setVisibleIcon(false);
		}, 1300);

		if (previousCardsLengthRef.current < userCards.length) {
			previousCardsLengthRef.current = userCards.length;
			setVisibleIcon(true);
			setCardCountStatus("plus");
		} else if (previousCardsLengthRef.current > userCards.length) {
			previousCardsLengthRef.current = userCards.length;
			setVisibleIcon(true);
			setCardCountStatus("minus");
		}
	}, [userCards.length]);

	useEffect(() => {
		if (visibleIcon) return;
		if (user === callingUser) {
			profileIconBorderColor.current = "#25db56";
		} else {
			profileIconBorderColor.current = "white";
		}
	}, [visibleIcon]);

	const renderClassName = () => {
		if (user === "opponent") return "flex-row-reverse";
		return "";
	};

	const renderCardLength = () => {
		if (visibleIcon) {
			if (cardCountStatus === "minus") {
				return userCards.length + 1;
			} else {
				return userCards.length - 1;
			}
		}
		return userCards.length;
	};

	const renderUserName = () => {
		if (user === "opponent") {
			if (opponentType === "cpu") return "CPU";
			return "Opponent User";
		}
		return "You";
	};

	const renderUserCardCountText = () => {
		if (user === "opponent") {
			if (opponentType === "cpu") return "CPU";
			return "Opponent";
		}
		return "Your";
	};

	const UserIcon = () => (
		<FaUserCircle className="p-1" style={styles.playerIcon} size={45} />
	);

	const renderPlayerIcon = () => {
		if (user === "user") return <UserIcon />;
		if (opponentType === "cpu") {
			return (
				<HiDesktopComputer
					className="p-1"
					style={styles.playerIcon}
					size={45}
				/>
			);
		}
		if (isOpponentOffline) {
			return (
				<>
					<span style={{ position: "absolute", left: "40%" }}>
						<RiWifiOffLine
							className="opponent-offline p-1"
							color="red"
							size={40}
						/>
						Offline
					</span>
					<UserIcon />
				</>
			);
		}
		return <UserIcon />;
	};

	const styles = {
		playerIcon: {
			borderRadius: "10px",
			border: "solid 3px",
			borderColor: profileIconBorderColor.current,
		},
	};

	return (
		<div className="px-4">
			<div
				className={`mb-3 d-flex align-items-center justify-content-end ${renderClassName()}`}
			>
				<span className="user-name position-relative ">
					{renderUserName()}
				</span>
				&nbsp;
				{renderPlayerIcon()}
			</div>
			<h3
				className={` mb-5 text-end d-flex justify-content-end ${renderClassName()}`}
			>
				<span>{renderUserCardCountText()} card count</span> &nbsp;
				<span className="badge bg-info text-dark">
					{renderCardLength()}
				</span>
				&nbsp;
				<span
					hidden={!visibleIcon}
					className={`plus-icon-popup text-${
						cardCountStatus === "plus" ? "success" : "danger"
					} ${
						user === "opponent"
							? "opponent-card-status-icon"
							: "your-card-status-icon"
					} `}
					style={{ position: "absolute" }}
				>
					{cardCountStatus === "plus" ? (
						<FaPlus />
					) : cardCountStatus === "minus" ? (
						<FaMinus />
					) : null}{" "}
					1
				</span>
			</h3>
		</div>
	);
};

export default InMatchUserCardStatus;
