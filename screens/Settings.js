import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Switch, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { useTheme } from "styled-components";

import { changeOpacity } from "../utils/colors";
import Divider from "../components/Divider";
import Icon from "../components/Icon";
import ModalPopup from "../components/ModalPopup";
import RadioButton from "../components/RadioButton";

export default function Settings() {
	const theme = useTheme();

	const [hideScores, setHideScores] = useState(false);
	const [themeSaved, setThemeSaved] = useState("auto");
	const [themeSelected, setThemeSelected] = useState(themeSaved);
	const [themeSelectorOpen, setThemeSelectorOpen] = useState(false);
	const [apiKey, setApiKey] = useState("");
	const [apiKeyInput, setApiKeyInput] = useState(apiKey);
	const [apiKeySelectorOpen, setApiKeySelectorOpen] = useState(false);

	useEffect(() => {
		const getHideScores = async () => {
			try {
				const initHideScores = await AsyncStorage.getItem("hideScores");
				if (initHideScores !== null && initHideScores !== hideScores) {
					setHideScores(initHideScores === "true");
				}
			} catch (e) {
				console.log("Error getting item:", e);
			}
		};
		getHideScores();
		const getTheme = async () => {
			try {
				const initTheme = await AsyncStorage.getItem("theme");
				if (initTheme !== null && initTheme !== themeSaved) {
					setThemeSaved(initTheme);
				}
			} catch (e) {
				console.log("Error getting item:", e);
			}
		};
		getTheme();
		const getApiKey = async () => {
			try {
				const initApiKey = await AsyncStorage.getItem("apiKey");
				if (initApiKey !== null && initApiKey !== apiKey) {
					setApiKey(initApiKey);
				}
			} catch (e) {
				console.log("Error getting item:", e);
			}
		};
		getApiKey();
	}, []);

	useEffect(() => {
		saveSetting("hideScores", hideScores ? "true" : "false");
	}, [hideScores]);

	useEffect(() => {
		setThemeSelected(themeSaved);
		saveSetting("theme", themeSaved);
	}, [themeSaved]);

	useEffect(() => {
		setApiKeyInput(apiKey);
		saveSetting("apiKey", apiKey);
	}, [apiKey]);

	const saveSetting = async (name, value) => {
		try {
			await AsyncStorage.setItem(name, value);
		} catch (e) {
			console.log("Error saving setting:", e);
		}
	};

	return (
		<>
			<ModalPopup
				open={themeSelectorOpen}
				setOpen={setThemeSelectorOpen}
				onClose={() => {
					setThemeSelected(themeSaved);
					setThemeSelectorOpen(false);
				}}
				onConfirm={() => {
					setThemeSaved(themeSelected);
					setThemeSelectorOpen(false);
				}}
				title={"Choose Theme"}
				subtitle={"Requires an app restart."}
				body={
					<>
						<RadioButton
							selected={themeSelected === "auto"}
							label="Auto"
							onSelect={() => {
								setThemeSelected("auto");
							}}
						/>
						<RadioButton
							selected={themeSelected === "light"}
							label="Light"
							onSelect={() => {
								setThemeSelected("light");
							}}
						/>
						<RadioButton
							selected={themeSelected === "dark"}
							label="Dark"
							onSelect={() => {
								setThemeSelected("dark");
							}}
						/>
					</>
				}
			/>
			<ModalPopup
				open={apiKeySelectorOpen}
				setOpen={setApiKeySelectorOpen}
				onClose={() => {
					setApiKeyInput(apiKey);
					setApiKeySelectorOpen(false);
				}}
				onConfirm={() => {
					setApiKey(apiKeyInput);
					setApiKeySelectorOpen(false);
				}}
				title={"Provide API Key"}
				body={
					<>
						<Input
							placeholder={
								apiKey
									? apiKey
									: "Key from your API-Sports account."
							}
							autoCorrect={false}
							autoComplete="off"
							autoCapitalize="none"
							value={apiKeyInput}
							onChangeText={setApiKeyInput}
							placeholderTextColor={changeOpacity(
								theme.text,
								0.5
							)}
						/>
					</>
				}
			/>
			<Container>
				<CategoryContainer>
					<CategoryHeader>
						<CategoryIcon>
							<Icon
								name="settings"
								iosName="cog-outline"
								color={theme.accent}
							/>
						</CategoryIcon>
						<CategoryTitle>General</CategoryTitle>
					</CategoryHeader>
					<SwitchContainer>
						<SettingHeader>Hide Scores</SettingHeader>
						<Switch
							value={hideScores}
							onValueChange={setHideScores}
							thumbColor={theme.accent}
							trackColor={{
								false: changeOpacity(theme.text, 0.25),
								true: changeOpacity(theme.accent, 0.5),
							}}
						/>
					</SwitchContainer>
					<InputContainer
						onPress={() => {
							setApiKeySelectorOpen(true);
						}}
					>
						<SettingHeader>API Key</SettingHeader>
						<SettingText>
							{!_.isEmpty(apiKey) ? apiKey : "None"}
						</SettingText>
					</InputContainer>
				</CategoryContainer>
				<Divider />
				<CategoryContainer>
					<CategoryHeader>
						<CategoryIcon>
							<Icon
								name="palette"
								iosName="color-palette"
								color={theme.accent}
							/>
						</CategoryIcon>
						<CategoryTitle>Appearance</CategoryTitle>
					</CategoryHeader>
					<InputContainer
						onPress={() => {
							setThemeSelectorOpen(true);
						}}
					>
						<SettingHeader>Theme</SettingHeader>
						<SettingText>{_.startCase(themeSaved)}</SettingText>
					</InputContainer>
				</CategoryContainer>
			</Container>
		</>
	);
}

const Container = styled.ScrollView`
	background-color: ${(props) => props.theme.background};
`;

const CategoryContainer = styled.View`
	padding: 24px;
`;

const CategoryHeader = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;
`;

const CategoryIcon = styled.View`
	margin-right: 20px;
`;

const CategoryTitle = styled.Text`
	font-size: 16px;
	color: ${(props) => props.theme.text};
`;

const InputContainer = styled.Pressable`
	padding-left: 44px;
	margin-bottom: 16px;
`;

const Input = styled.TextInput`
	border-width: 1px;
	border-color: ${(props) => changeOpacity(props.theme.text, 0.5)};
	border-radius: 4px;
	color: ${(props) => props.theme.text};
	padding: 2px;
	padding-left: 4px;
`;

const SettingText = styled.Text`
	opacity: 0.75;
	color: ${(props) => props.theme.text};
`;

const SettingHeader = styled.Text`
	color: ${(props) => props.theme.text};
`;

const SwitchContainer = styled.View`
	height: 20px;
	padding-left: 44px;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 16px;
`;
