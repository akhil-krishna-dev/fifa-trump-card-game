export const updatePageToHome = () => {
	return {
		type: "home-page",
	};
};

export const updatePageToMatch = () => {
	return {
		type: "match-page",
	};
};

export const updateOpponent = (opponent) => {
	return {
		type: "opponent-" + opponent,
	};
};
