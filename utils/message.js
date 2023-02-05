import { Alert, Platform, ToastAndroid } from "react-native";

export const showMessage = (message = "Unknown Error", iosTitle = "Error") => {
	if (Platform.OS === "ios") {
		Alert.alert(iosTitle, message, [{ text: "OK" }], { cancelable: true });
	} else if (Platform.OS === "android") {
		ToastAndroid.show(message, ToastAndroid.SHORT);
	}
};
