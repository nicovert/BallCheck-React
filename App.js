import "react-native-gesture-handler";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { Appearance, StatusBar, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ThemeProvider } from "styled-components";
import * as SplashScreen from "expo-splash-screen";

import NBAStack from "./routes/NBAStack";
import AboutStack from "./routes/AboutStack";
import SettingsStack from "./routes/SettingsStack";
import NavDrawer from "./components/NavDrawer";

SplashScreen.preventAutoHideAsync();
const Drawer = createDrawerNavigator();
const deviceTheme = Appearance.getColorScheme();

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);
	const [colors, setColors] = useState({
		background: "#F2F2F2",
		foreground: "#FFFFFF",
		accent: "#EE7A28",
		text: "#000000",
		dark: false,
	});

	useEffect(() => {
		async function prepare() {
			try {
				// Pre-load fonts, make any API calls you need to do here
				// await Font.loadAsync(Entypo.font);
				// Artificially delay for two seconds to simulate a slow loading
				// experience. Please remove this if you copy and paste the code!
				await new Promise((resolve) => setTimeout(resolve, 500));
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	useEffect(() => {
		const hideSplash = async () => {
			if (appIsReady) {
				await SplashScreen.hideAsync();
			}
		};
		hideSplash();
	}, [appIsReady]);

	useEffect(() => {
		const getTheme = async () => {
			try {
				const userTheme = await AsyncStorage.getItem("theme");
				const theme = _.isEqual(userTheme, "auto")
					? _.isNull(deviceTheme)
						? "light"
						: deviceTheme
					: userTheme;
				const dark = _.isEqual(theme, "dark");
				setColors({
					background: dark ? "#121212" : "#F2F2F2",
					foreground: dark ? "#424242" : "#FFFFFF",
					accent: dark ? "#C7C7C7" : "#EE7A28",
					text: dark ? "#C7C7C7" : "#000000",
					dark: dark,
				});
			} catch (e) {
				console.log("Error getting item:", e);
			}
		};
		getTheme();
	}, [deviceTheme]);

	if (!appIsReady) {
		return null;
	}

	return (
		<ThemeProvider theme={colors}>
			<StatusBar
				barStyle={
					!_.isEqual(colors.text, "#000000")
						? "light-content"
						: "dark-content"
				}
				backgroundColor={colors.foreground}
			/>
			<NavigationContainer>
				<Drawer.Navigator
					initialRouteName="NBA"
					drawerContent={(props) => <NavDrawer {...props} />}
					screenOptions={{
						headerShown: false,
					}}
					contentOptions={{
						activeTintColor: colors.accent,
						activeBackgroundColor: colors.accent,
					}}
				>
					<Drawer.Screen name="NBA" component={NBAStack} />
					<Drawer.Screen
						name="SettingsStack"
						component={SettingsStack}
						options={{ title: "Settings" }}
					/>
					<Drawer.Screen
						name="AboutStack"
						component={AboutStack}
						options={{ title: "About" }}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
}
