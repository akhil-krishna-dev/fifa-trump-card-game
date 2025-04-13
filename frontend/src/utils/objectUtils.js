export const getCardObjectReleventKeys = (object) => {
	const keys = [];
	for (let key in object) {
		if (!"id name age image country".includes(key)) {
			keys.push(key);
		}
	}
	return keys;
};
