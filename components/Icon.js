import React from "react";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Icon(props) {
	const { name, size, iosName, ...rest } = props;
	if (Platform.OS === "ios" || (iosName && !name)) {
		return <Ionicons name={iosName || name} size={size || 24} {...rest} />;
	} else {
		return <MaterialIcons name={name} size={size || 24} {...rest} />;
	}
}
