import _ from "lodash";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components";

import Clock from "./Clock";
import Icon from "./Icon";
import Logo from "./Logo";

export default function ScoreCard({
	clockData = {},
	homeTeam = {},
	awayTeam = {},
}) {
	const { triHome = "UNK", scoreHome = "103" } = homeTeam;
	const { triAway = "UNK", scoreAway = "113" } = awayTeam;
	const [hideScores, setHideScores] = useState(false);

	useEffect(() => {
		const getHideScores = async () => {
			try {
				const initHideScores = await AsyncStorage.getItem("hideScores");
				if (initHideScores !== null) {
					setHideScores(initHideScores === "true");
				}
			} catch (e) {
				console.log("Error getting item:", e);
			}
		};
		getHideScores();
	}, []);

	return (
		<Container>
			<Card>
				<LogoContainerAway>
					<Logo tricode={triAway} away={true} />
				</LogoContainerAway>
				<InfoContainer>
					<ClockContainer>
						<Clock clockData={clockData} />
					</ClockContainer>
					<ScoresContainer>
						<ScoreContainerAway>
							<Score numberOfLines={1}>
								{hideScores ? " ?" : scoreAway}
							</Score>
						</ScoreContainerAway>
						<ScoreDividerContainer>
							<ScoreDivider />
						</ScoreDividerContainer>
						<ScoreContainerHome>
							<Score numberOfLines={1}>
								{hideScores ? "? " : scoreHome}
							</Score>
						</ScoreContainerHome>
					</ScoresContainer>
					<NamesContainer>
						<NameContainerAway>
							<Name>{_.toUpper(triAway)}</Name>
						</NameContainerAway>
						<NameDividerContainer>
							<NameDivider>
								{scoreAway > scoreHome ? (
									<Icon iosName="caret-back" />
								) : scoreHome > scoreAway ? (
									<Icon iosName="caret-forward" />
								) : (
									<Icon name="alternate-email" iosName="at" />
								)}
							</NameDivider>
						</NameDividerContainer>
						<NameContainerHome>
							<Name>{_.toUpper(triHome)}</Name>
						</NameContainerHome>
					</NamesContainer>
				</InfoContainer>
				<LogoContainerHome>
					<Logo tricode={triHome} />
				</LogoContainerHome>
			</Card>
		</Container>
	);
}

const Container = styled.View``;

const Card = styled.View`
	padding: 8px 0px;
	background-color: ${(props) => props.theme.foreground};
	border-radius: 4px;
	overflow: hidden;
	flex-direction: row;
	justify-content: space-between;
	max-height: 200px;
`;

const LogoContainerAway = styled.View`
	margin-left: -33px;
	justify-content: center;
`;

const LogoContainerHome = styled.View`
	margin-right: -33px;
	justify-content: center;
`;

const InfoContainer = styled.View`
	justify-content: space-between;
	flex: 1;
	padding-bottom: 8px;
`;

const ClockContainer = styled.View``;

const ScoresContainer = styled.View`
	flex-direction: row;
	align-items: center;
`;

const ScoreContainerAway = styled.View`
	flex: 10;
	align-items: flex-start;
	padding-left: 4px;
`;

const ScoreContainerHome = styled.View`
	flex: 10;
	align-items: flex-end;
	padding-right: 4px;
`;

const ScoreDividerContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const Score = styled.Text`
	font-size: 40px;
	color: ${(props) => props.theme.text};
	include-font-padding: false;
`;

const ScoreDivider = styled.View`
	width: 2px;
	height: 40%;
	border-radius: 4px;
	background-color: ${(props) => props.theme.background};
`;

const NamesContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const NameContainerAway = styled.View`
	flex: 1;
	align-items: flex-end;
	padding-left: 4px;
`;

const NameContainerHome = styled.View`
	flex: 1;
	align-items: flex-start;
	padding-right: 4px;
`;

const NameDividerContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const Name = styled.Text`
	color: ${(props) => props.theme.text};
	font-size: 18px;
`;

const NameDivider = styled.View`
	margin: 0px 8px;
`;
