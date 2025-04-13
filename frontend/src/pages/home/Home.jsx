import React from "react";
import "./Home.css";
import MatchSelectBox from "./components/MatchSelectBox";

function Home() {
	return (
		<div className="home-container d-flex justify-content-center  gap-5">
			<MatchSelectBox title="Online Match" opponentType="user" />
			<MatchSelectBox title="CPU Match" opponentType="cpu" />
		</div>
	);
}

export default Home;
