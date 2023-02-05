import React from "react";
import styled from "styled-components";

import Divider from "../components/Divider";

export default function About() {
	return (
		<Container>
			<Title>Ball Check</Title>
			<Subtitle>Author: Nico Covert</Subtitle>
			<Subtitle>Version: 2.0</Subtitle>
			<Text>
				This app is not affiliated with the NBA, WNBA, or any NBA teams
				or organizations.
				{"\n"}
				All content and logos are the property of their respective
				owners, and are used for identification purposes only.
			</Text>
			<Divider />
			<Title>Thanks</Title>
			<ThanksContainer>
				<Subtitle>NBA Sense</Subtitle>
				<Text>Copyright 2021 Jason Roman</Text>
			</ThanksContainer>
			<ThanksContainer>
				<Subtitle>Plain Text Sports</Subtitle>
				<Text>CodeIsTheEnd</Text>
			</ThanksContainer>
		</Container>
	);
}

const Container = styled.ScrollView`
	padding: 24px;
	height: 100%;
	background-color: ${(props) => props.theme.background};
`;

const ThanksContainer = styled.View`
	margin-bottom: 8px;
`;

const Title = styled.Text`
	font-size: 24px;
	color: ${(props) => props.theme.text};
`;

const Subtitle = styled.Text`
	font-size: 16px;
	color: ${(props) => props.theme.text};
`;

const Text = styled.Text`
	color: ${(props) => props.theme.text};
`;
