import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from "../screens/About";
import HeaderIconDrawer from "../components/HeaderIconDrawer";
import { useTheme } from "styled-components";

const Stack = createNativeStackNavigator();

export default function AboutStack({ navigation }) {
	const theme = useTheme();

	return (
		<Stack.Navigator
			initialRouteName="About"
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.foreground,
					color: theme.text,
				},
				headerTintColor: theme.text,
			}}
		>
			<Stack.Screen
				name="About"
				component={About}
				options={{
					headerLeft: (props) => (
						<HeaderIconDrawer {...props} navigation={navigation} />
					),
					cardStyle: {
						backgroundColor: theme.background,
					},
				}}
			/>
		</Stack.Navigator>
	);
}
