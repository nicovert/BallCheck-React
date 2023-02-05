import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import DateTimePicker from "@react-native-community/datetimepicker";

import Icon from "./Icon";
import ModalPopup from "./ModalPopup";
import DatePicker from "./DatePicker";
import { Platform } from "react-native";

export default function HeaderIconDate({ onChangeDate }) {
	const theme = useTheme();

	const [datePickerOpen, setDatePickerOpen] = useState(false);
	const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
	const [selectedDate, setSelectedDate] = useState();

	useEffect(() => {
		const getDate = async () => {
			try {
				const initDate = await AsyncStorage.getItem("date");
				if (initDate !== null && initDate !== date) {
					setDate(initDate);
				}
			} catch (e) {
				console.log("Error getting item:", e);
			}
		};
		getDate();
	}, []);

	useEffect(() => {
		console.log("update date", date);
		saveSetting("date", moment(date).format("YYYY-MM-DD"));
		setSelectedDate(date);
	}, [date]);

	const onConfirmDate = () => {
		setDate(selectedDate);
		setDatePickerOpen(false);
	};
	const onCancelDate = () => {
		setSelectedDate(date);
		setDatePickerOpen(false);
	};

	const onIosChange = (event, date) => {
		if (_.get(event, "type", "") === "set") {
			console.log("ios picker confirmed: event", event, "date", date);
			onConfirmDate(date);
		} else {
			console.log("ios picker dismissed: event", event, "date", date);
			onCancelDate(date);
		}
	};

	const saveSetting = async (name, value) => {
		try {
			await AsyncStorage.setItem(name, value);
			onChangeDate();
		} catch (e) {
			console.log("Error saving setting:", e);
		}
	};

	const handleOpenDatePicker = () => {
		setDatePickerOpen(true);
	};

	return (
		<>
			{Platform.OS === "android" && datePickerOpen && (
				<ModalPopup
					open={datePickerOpen}
					setOpen={setDatePickerOpen}
					onClose={onCancelDate}
					onConfirm={onConfirmDate}
					body={
						<DatePicker
							date={selectedDate}
							setDate={setSelectedDate}
						/>
					}
				/>
			)}
			{Platform.OS === "ios" && datePickerOpen && (
				<DateTimePicker
					value={selectedDate}
					mode={"date"}
					is24Hour={false}
					onChange={onIosChange}
				/>
			)}
			<Container onPress={handleOpenDatePicker}>
				<Icon
					name="calendar-today"
					iosName="calendar-clear"
					color={theme.text}
				/>
			</Container>
		</>
	);
}

const Container = styled.Pressable`
	margin-right: 24px;
`;
