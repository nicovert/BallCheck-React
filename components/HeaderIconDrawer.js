import React from "react";
import styled, { useTheme } from "styled-components";
import Icon from "./Icon";

export default function HeaderIconDrawer({ navigation }) {
	const theme = useTheme();

	return (
		<Container onPress={() => navigation.toggleDrawer()}>
			<Icon name="menu" color={theme.text} />
		</Container>
	);
}

const Container = styled.Pressable`
	margin-right: 24px;
`;
