import axios from "axios";

const translateText = async (text, fromLang, toLang) => {
	try {
		if (fromLang === toLang) return text;

		const response = await axios.get(
			`https://api.mymemory.translated.net/get?q=${encodeURIComponent(
				text
			)}&langpair=${fromLang}|${toLang}`
		);

		const translatedText = response.data.responseData.translatedText;
		if (
			translatedText
				.toLowerCase()
				.includes("please select two distinct languages")
		) {
			return text;
		}

		return translatedText || text;
	} catch (error) {
		console.error("Translation Error:", error);
		return text;
	}
};

export default translateText;
