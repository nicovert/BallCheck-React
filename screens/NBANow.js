import _ from "lodash";
import React, { useState, useEffect } from "react";
import { RefreshControl } from "react-native";
import styled from "styled-components";
import moment from "moment-timezone";
import { getCalendars } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { fetchNBAGames } from "../api/NBA";
import ScoreCard from "../components/ScoreCard";
import { showMessage } from "../utils/message";
import HeaderIconDate from "../components/HeaderIconDate";

export default function NBANow({ navigation }) {
	const [isFetching, setIsFetching] = useState(false);
	const [gamesData, setGamesData] = useState([]);

	const refreshGames = async (dateProvided) => {
		console.log("refreshGames");
		setIsFetching(true);
		const date = dateProvided
			? dateProvided
			: await AsyncStorage.getItem("date");
		const day = await fetchNBAGames(date);
		console.log("day response?", day);
		const dateTomorrow = moment(date, "YYYY-MM-DD")
			.add(1, "days")
			.format("YYYY-MM-DD");
		const nextDay = await fetchNBAGames(dateTomorrow);
		if (!_.isEmpty(_.get(day, "errors.token", ""))) {
			if (
				_.startsWith(
					_.get(day, "errors.token", ""),
					"Error/Missing application key."
				)
			) {
				showMessage(
					"Provide your API key in Settings",
					"Missing API Key"
				);
			} else {
				showMessage("Error Fetching Data");
			}
		}
		const dayGames = _.get(day, "response", []);
		const nextDayGames = _.get(nextDay, "response", []);
		const games = [...dayGames, ...nextDayGames];
		const gamesFiltered = _.filter(games, (game) => {
			console.log("game", game);
			const startDateUTC = _.get(game, "date.start", null); //Default UTC
			const timezone = _.get(_.head(getCalendars()), "timeZone");
			const startDateLocal = moment
				.tz(startDateUTC, timezone)
				.format("YYYY-MM-DD");
			console.log(
				"startDateUTC",
				startDateUTC,
				"startDateLocal",
				startDateLocal
			);
			return _.isEqual(startDateLocal, date);
		});
		setGamesData(gamesFiltered);
		console.log("gamesFiltered?", gamesFiltered);
		setIsFetching(false);
	};

	const refreshNow = () => {
		refreshGames(moment().format("YYYY-MM-DD"));
	};

	useEffect(() => {
		console.log("update gamesData", gamesData);
	}, [gamesData]);

	useEffect(() => {
		navigation.setOptions({
			headerRight: (props) => (
				<HeaderIconDate {...props} onChangeDate={refreshGames} />
			),
		});
	}, [navigation]);

	return (
		<Container
			refreshControl={
				<RefreshControl
					refreshing={isFetching}
					onRefresh={refreshNow}
				/>
			}
		>
			{_.map(
				_.orderBy(
					gamesData,
					[
						(game) => {
							return _.get(game, "status.short", 0) === 2;
						},
						(game) => {
							return _.get(game, "status.short", 0) === 1;
						},
						(game) => {
							return _.get(game, "status.short", 0) === 3;
						},
					],
					["desc", "desc", "desc"]
				),
				(game) => {
					const homeTeam = {
						triHome: _.get(game, "teams.home.code", "UNK"),
						scoreHome: _.get(game, "scores.home.points", 0),
					};
					const awayTeam = {
						triAway: _.get(game, "teams.visitors.code", "UNK"),
						scoreAway: _.get(game, "scores.visitors.points", 0),
					};
					const clockData = {
						status: _.get(game, "status"),
						periods: _.get(game, "periods"),
						scores: _.get(game, "scores"),
						date: _.get(game, "date"),
					};
					const gameId = _.get(game, "id", `game-${Math.random()}`);
					return (
						<ScoreCard
							key={gameId}
							homeTeam={homeTeam}
							awayTeam={awayTeam}
							clockData={clockData}
						/>
					);
				}
			)}
		</Container>
	);
}

const Container = styled.ScrollView`
	background-color: ${(props) => props.theme.background};
	padding: 8px;
`;
