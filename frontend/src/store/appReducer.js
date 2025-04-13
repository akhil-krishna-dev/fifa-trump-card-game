export const initialState = {
	playersCard: [],
	isUserClickedMenu: false,
	isUserInMatch: false,
	page: "home",
	opponentType: "cpu",
};

export const appReducer = (state, action) => {
	switch (action.type) {
		case "home-page":
			return {
				...state,
				page: "home",
				isUserClickedMenu: false,
				isUserInMatch: false,
			};

		case "match-page":
			return { ...state, page: "match" };
		case "menu-clicked":
			return { ...state, isUserClickedMenu: !state.isUserClickedMenu };
		case "match-started":
			return { ...state, isUserInMatch: true };

		case "opponent-cpu":
			return { ...state, opponentType: "cpu" };
		case "opponent-user":
			return { ...state, opponentType: "user" };

		case "match-eded":
			return { ...state, isUserInMatch: false };
		case "players-card":
			return { ...state, playersCard: action.payload };
		default:
			return initialState;
	}
};
