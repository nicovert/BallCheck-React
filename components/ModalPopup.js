import _ from "lodash";
import React from "react";
import { Modal, Button } from "react-native";
import styled, { useTheme } from "styled-components";
import { changeOpacity } from "../utils/colors";

export default function ModalPopup(props) {
	const { open, setOpen, onClose, onConfirm, title, subtitle, body } = props;
	const theme = useTheme();

	return (
		<Modal
			visible={open || false}
			transparent={true}
			animationType="fade"
			onRequestClose={() => {
				setOpen(!open);
			}}
		>
			<Background>
				<Root>
					{title && (
						<Header>
							<Title>{title || ""}</Title>
							{subtitle && <Subtitle>{subtitle}</Subtitle>}
						</Header>
					)}
					{body && <Body>{body}</Body>}
					<Footer>
						{_.isFunction(onClose) && (
							<Button
								title={
									_.isFunction(onConfirm) ? "Cancel" : "Close"
								}
								color={
									theme.dark ? theme.foreground : theme.accent
								}
								onPress={onClose}
							/>
						)}
						{_.isFunction(onConfirm) && (
							<Button
								title="Confirm"
								color={
									theme.dark ? theme.foreground : theme.accent
								}
								onPress={onConfirm}
							/>
						)}
					</Footer>
				</Root>
			</Background>
		</Modal>
	);
}

const Background = styled.View`
	background-color: #00000080;
	height: 100%;
	width: 100%;
	align-items: center;
	justify-content: center;
`;

const Root = styled.View`
	width: 80%;
	background-color: ${(props) => props.theme.foreground};
	color: ${(props) => props.theme.text};
	padding: 16px;
	border-radius: 4px;
`;

const Title = styled.Text`
	color: ${(props) => props.theme.text};
	font-size: 16px;
`;

const Subtitle = styled.Text`
	color: ${(props) => changeOpacity(props.theme.text, 0.75)};
	margin-bottom: 16px;
`;

const Header = styled.View`
	margin-bottom: 16px;
`;

const Body = styled.View``;

const Footer = styled.View`
	flex-direction: row;
	margin-top: 16px;
	justify-content: space-between;
`;
