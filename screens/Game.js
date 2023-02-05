import React from "react";
import { Text, Pressable } from "react-native";
import styled from "styled-components";

export default function Game(props) {
	const { navigation } = props;
	return (
		<TextContainer>
			<Pressable
				onPress={() => {
					navigation.navigate("NBANow");
				}}
			>
				<Text>A Game</Text>
			</Pressable>
		</TextContainer>
	);
}

const TextContainer = styled.View`
	padding: 24px;
`;
