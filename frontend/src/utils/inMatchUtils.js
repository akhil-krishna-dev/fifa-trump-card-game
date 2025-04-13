export const selectARandomFieldFromCurrentCard = () => {
	const data = [
		"goals_for_clubs",
		"goals_for_country",
		"ballon_d_or",
		"matches_for_country",
		"matches_for_clubs",
		"assist_for_country",
	];
	return data[Math.floor(Math.random() * data.length)];
};
