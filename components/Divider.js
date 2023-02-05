import _ from "lodash";
import React from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components";

export default function Divider({ color }) {
	return <DividerView style={color ? { backgroundColor: color } : {}} />;
}

const DividerView = styled.View`
	height: ${_.ceil(StyleSheet.hairlineWidth)}px;
	width: 100%;
	margin-top: 8px;
	margin-bottom: 8px;
	background-color: ${(props) => props.theme.text};
	opacity: 0.5;
`;
