import React, { useContext } from "react";
import { AppContext } from "../../../App";
import { updateOpponent, updatePageToMatch } from "../../../store/appActions";
import UserProfile from "../../match/components/UserProfile";
import { FaUser } from "react-icons/fa6";
import { HiMiniCpuChip } from "react-icons/hi2";

const MatchSelectBox = (props) => {
	const { title, Icon, opponentType } = props;
	const { dispatch } = useContext(AppContext);

	const handleMatchPageChange = () => {
		dispatch(updatePageToMatch());
		dispatch(updateOpponent(opponentType));
	};

	return (
		<button
			onClick={handleMatchPageChange}
			className="card shadow  btn btn-light "
			style={{
				width: "24rem",
				backgroundColor: "rgba(255, 255, 255, 0.9)",
			}}
		>
			<div className="d-flex justify-content-center align-items-center">
				{opponentType === "cpu" ? (
					<>
						{" "}
						<UserProfile
							card={false}
							height={"13rem"}
							Icon={FaUser}
						/>{" "}
						Vs{" "}
						<UserProfile
							card={false}
							height={"13rem"}
							Icon={HiMiniCpuChip}
						/>
					</>
				) : (
					<>
						{" "}
						<UserProfile
							card={false}
							height={"13rem"}
							Icon={FaUser}
						/>{" "}
						Vs{" "}
						<UserProfile
							card={false}
							height={"13rem"}
							Icon={FaUser}
						/>
					</>
				)}
			</div>
			<hr />
			<div className="card-body">
				<h5 className="card-title text-primary p-2 text-center">
					{title}
				</h5>
			</div>
		</button>
	);
};

export default MatchSelectBox;
