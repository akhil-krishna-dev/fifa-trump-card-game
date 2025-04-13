export const shuffleArray = (array) => {
	const updatedArr = [...array];

	for (let i = updatedArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[{ ...updatedArr[i] }, { ...updatedArr[j] }] = [
			{ ...updatedArr[j] },
			{ ...updatedArr[i] },
		]; // Swap elements
	}

	const mid = updatedArr.length / 2;
	const currentUser = updatedArr.slice(0, mid);
	const opponent = updatedArr.slice(mid);

	const matchCards = {
		currentUser,
		opponent,
	};

	return matchCards;
};
