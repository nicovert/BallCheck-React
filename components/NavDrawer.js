import _ from "lodash";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import styled, { useTheme } from "styled-components";

import Divider from "./Divider";
import Icon from "./Icon";
import { NBALogo } from "./SvgIcons";

export default function NavDrawer(props) {
	const theme = useTheme();
	const { navigation, state } = props;
	const { index } = state;

	return (
		<Container>
			<DrawerContentScrollView {...props}>
				<NavContainer>
					<DrawerItem
						label={"NBA"}
						labelStyle={{
							color: index === 0 ? theme.accent : theme.text,
						}}
						activeTintColor={theme.accent}
						focused={index === 0}
						icon={() => {
							return (
								<NBALogo
									color={
										index === 0 ? theme.accent : theme.text
									}
								/>
							);
						}}
						onPress={() => {
							navigation.navigate("NBA");
						}}
					/>
				</NavContainer>
				<Divider />
				<MetaContainer>
					<DrawerItem
						label={"Settings"}
						labelStyle={{
							color: index === 1 ? theme.accent : theme.text,
						}}
						activeTintColor={theme.accent}
						focused={index === 1}
						icon={() => {
							return (
								<Icon
									name="settings"
									iosName="cog-outline"
									color={
										index === 1 ? theme.accent : theme.text
									}
								/>
							);
						}}
						onPress={() => {
							navigation.navigate("SettingsStack");
						}}
					/>
					<DrawerItem
						label={"About"}
						labelStyle={{
							color: index === 2 ? theme.accent : theme.text,
						}}
						activeTintColor={theme.accent}
						focused={index === 2}
						icon={() => {
							return (
								<Icon
									name="info"
									iosName="information-circle-outline"
									color={
										index === 2 ? theme.accent : theme.text
									}
								/>
							);
						}}
						onPress={() => {
							navigation.navigate("AboutStack");
						}}
					/>
				</MetaContainer>
			</DrawerContentScrollView>
		</Container>
	);
}

const Container = styled.View`
	background-color: ${(props) => props.theme.foreground};
	height: 100%;
`;

const NavContainer = styled.View``;

const MetaContainer = styled.View``;
