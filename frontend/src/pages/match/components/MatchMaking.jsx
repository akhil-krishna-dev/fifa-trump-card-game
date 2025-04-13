import React, { useContext, useEffect, useState } from "react";
import UserProfile from "./UserProfile";
import { AppContext } from "../../../App";
import Loader from "../../../components/Loader";
import { HiMiniCpuChip } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";

const MatchMaking = ({
	setMatchMaking,
	isOpponentReady,
	setIsOpponentReady,
}) => {
	const { opponentType } = useContext(AppContext);
	const [matchMakingTimeOut, setMatchMakingTimeOut] = useState(false);

	const renderOponentName = () => {
		if (opponentType === "cpu") {
			setTimeout(() => {
				setMatchMaking(false);
			}, 3000);
			return "CPU";
		}
		return "User ";
	};

	useEffect(() => {
		setTimeout(() => {
			setMatchMakingTimeOut(true);
		}, 1000 * 60 * 1);
	}, []);

	useEffect(() => {
		if (opponentType === "cpu") {
			setTimeout(() => {
				setIsOpponentReady(true);
			}, 1000);
		}
	}, [opponentType]);

	const renderOponentIcon = () => {
		if (opponentType === "cpu") {
			return HiMiniCpuChip;
		}
		return FaUser;
	};

	const renderMatchMakingStatus = () => {
		if (matchMakingTimeOut) {
			return <div>"Can't find any user retry!"</div>;
		}
		return (
			<>
				<Loader size="100px" />
				<div> Searching user</div>
			</>
		);
	};

	const containerClass =
		"user-profile-container d-flex justify-content-center align-items-center gap-5";

	return (
		<div className={containerClass}>
			<UserProfile name="You" Icon={FaUser} />
			<h1 className="text-white">Vs</h1>

			{!isOpponentReady ? (
				<div
					className="card d-flex flex-wrap justify-content-center align-items-center"
					style={{ width: "15rem", height: "19rem" }}
				>
					{renderMatchMakingStatus()}
				</div>
			) : (
				<UserProfile
					name={renderOponentName()}
					Icon={renderOponentIcon()}
				/>
			)}
		</div>
	);
};

export default MatchMaking;
