import React, { useEffect, useReducer } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Home from "./pages/home/Home";
import { appReducer, initialState } from "./store/appReducer";
import MenuButton from "./components/MenuButton";
import Match from "./pages/match/Match";

export const AppContext = React.createContext();

const App = () => {
	const [state, dispatch] = useReducer(appReducer, initialState);
	const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

	useEffect(() => {
		fetch(apiUrl + "cards", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((res) => {
				dispatch({
					type: "players-card",
					payload: res,
				});
			});
	}, []);

	const handleMenuClick = () => {
		dispatch({
			type: "menu-clicked",
		});
	};

	const renderMenu = () => {
		if (state.isUserClickedMenu) {
			return <Menu state={state} dispatch={dispatch} />;
		}
	};

	const renderPages = () => {
		if (state.page === "match") {
			return <Match />;
		}
		return <Home />;
	};

	const contextValues = {
		playersCard: state.playersCard,
		opponentType: state.opponentType,
		dispatch,
	};

	return (
		<main>
			<MenuButton state={state} handleMenuClick={handleMenuClick} />
			{renderMenu()}
			<AppContext.Provider value={contextValues}>
				{renderPages()}
			</AppContext.Provider>
		</main>
	);
};

export default App;
