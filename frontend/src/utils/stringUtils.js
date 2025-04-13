export const stringToStandardText = (stringText) => {
	if (!stringText || stringText.length < 2) return stringText;
	const replacedStr = stringText
		.substr(1, stringText.length)
		.replaceAll("_", " ");
	const startLetter = stringText[0].toUpperCase();
	const starndardText = startLetter + replacedStr;
	return starndardText;
};
