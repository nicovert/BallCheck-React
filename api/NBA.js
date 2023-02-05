import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = "https://v2.nba.api-sports.io";
const endpoint = {
	games: "/games",
};

export const fetchNBAGames = async (date) => {
	const url = `${baseUrl}${endpoint.games}?date=${date}`;
	const key = await AsyncStorage.getItem("apiKey");
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"x-rapidapi-key": key,
		},
	});

	return response.json();
};
