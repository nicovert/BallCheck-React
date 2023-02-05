import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "styled-components";

import NBANow from "../screens/NBANow";
import Game from "../screens/Game";
import HeaderIconDrawer from "../components/HeaderIconDrawer";
import HeaderIconDate from "../components/HeaderIconDate";

const Stack = createNativeStackNavigator();

export default function NBAStack({ navigation }) {
	const theme = useTheme();

	return (
		<Stack.Navigator
			initialRouteName="NBANow"
			screenOptions={{
				presentation: "card",
				animation: "slide_from_right",
				headerStyle: {
					backgroundColor: theme.foreground,
					color: theme.text,
				},
				headerTintColor: theme.text,
			}}
		>
			<Stack.Screen
				name="NBANow"
				component={NBANow}
				options={{
					title: "Now",
					headerLeft: (props) => (
						<HeaderIconDrawer {...props} navigation={navigation} />
					),
					// headerRight: (props) => <HeaderIconDate {...props} />,
				}}
			/>
			<Stack.Screen name="Game" component={Game} />
		</Stack.Navigator>
	);
}
