import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeaderIconDrawer from "../components/HeaderIconDrawer";
import Settings from "../screens/Settings";
import { useTheme } from "styled-components";

const Stack = createNativeStackNavigator();

export default function SettingsStack({ navigation }) {
	const theme = useTheme();

	return (
		<Stack.Navigator
			initialRouteName="Settings"
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.foreground,
					color: theme.text,
				},
				headerTintColor: theme.text,
			}}
		>
			<Stack.Screen
				name="Settings"
				component={Settings}
				options={{
					headerLeft: (props) => (
						<HeaderIconDrawer {...props} navigation={navigation} />
					),
				}}
			/>
		</Stack.Navigator>
	);
}
