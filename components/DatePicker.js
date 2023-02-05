import _ from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import styled, { useTheme } from "styled-components";
import buildCalender, { zeroPad } from "../utils/calendar";
import { changeOpacity } from "../utils/colors";
import Icon from "./Icon";

export default function DatePicker({ date, setDate }) {
	const theme = useTheme();
	const weekDayLabels = ["S", "M", "T", "W", "T", "F", "S"];

	const [dateYear, setDateYear] = useState(null);
	const [dateMonth, setDateMonth] = useState(null);
	const [dateDay, setDateDay] = useState(null);

	useEffect(() => {
		console.log("date", date);
		setDateYear(moment(date).year());
		setDateMonth(moment(date).month() + 1);
		setDateDay(moment(date).date());
	}, [date]);

	const prevMonth = () => {
		setDate(moment(date).subtract(1, "months"));
	};

	const nextMonth = () => {
		setDate(moment(date).add(1, "months"));
	};

	const CalWeekContainer = ({ days, weekIndex }) => {
		return (
			<Week>
				{_.map(days, (day, i) => {
					const selYear = _.isEqual(`${dateYear}`, `${day[0]}`);
					const selMonth = _.isEqual(
						`${dateMonth}`,
						`${_.trimStart(day[1], "0")}`
					);
					const selDay = _.isEqual(
						`${dateDay}`,
						`${_.trimStart(day[2], "0")}`
					);
					const isYear = _.isEqual(
						`${moment().year()}`,
						`${_.trimStart(day[0], "0")}`
					);
					const isMonth = _.isEqual(
						`${moment().month() + 1}`,
						`${_.trimStart(day[1], "0")}`
					);
					const isToday = _.isEqual(
						`${moment().date()}`,
						`${_.trimStart(day[2], "0")}`
					);
					return (
						<DayButton
							key={`week-${weekIndex}-day-${i}`}
							onPress={() => {
								setDate(
									`${day[0]}-${zeroPad(day[1], 2)}-${zeroPad(
										day[2],
										2
									)}`
								);
							}}
						>
							<CalDay
								selMonth={selYear && selMonth}
								selected={selYear && selMonth && selDay}
								today={isYear && isMonth && isToday}
							>
								{_.trimStart(day[2], "0")}
							</CalDay>
						</DayButton>
					);
				})}
			</Week>
		);
	};

	const CalContainer = ({ chunkedDates }) => {
		return (
			<Calendar>
				{_.map(chunkedDates, (week, i) => {
					return (
						<CalWeekContainer
							key={`week-${i}`}
							weekIndex={i}
							days={week}
						/>
					);
				})}
			</Calendar>
		);
	};

	return (
		<View>
			<NavigationContainer>
				<MonthYearBack onPress={prevMonth}>
					<Icon name="chevron-left" color={theme.text} />
				</MonthYearBack>
				<MonthYearContainer>
					<MonthLabel>{moment(date).format("MMMM")}</MonthLabel>
					<YearLabel>{moment(date).format("YYYY")}</YearLabel>
				</MonthYearContainer>
				<MonthYearNext onPress={nextMonth}>
					<Icon name="chevron-right" color={theme.text} />
				</MonthYearNext>
			</NavigationContainer>
			<WeekDaysContainer>
				{_.map(weekDayLabels, (day, i) => {
					return (
						<WeekDay key={`day-label-${day}${i}`}>
							<WeekDayLabel>{day}</WeekDayLabel>
						</WeekDay>
					);
				})}
			</WeekDaysContainer>
			<CalContainer
				chunkedDates={
					dateMonth && dateYear
						? _.chunk(buildCalender(dateMonth, dateYear), 7)
						: []
				}
			/>
		</View>
	);
}

const WeekDay = styled.View`
	color: #0000ff;
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const WeekDaysContainer = styled.View`
	flex-direction: row;
	margin-top: 24px;
	margin-bottom: 4px;
`;

const WeekDayLabel = styled.Text`
	color: ${(props) => changeOpacity(props.theme.text, 0.5)};
`;

const NavigationContainer = styled.View`
	flex-direction: row;
	align-items: center;
`;

const MonthYearBack = styled.Pressable`
	flex: 0.5;
	align-items: flex-start;
`;

const MonthYearNext = styled.Pressable`
	flex: 0.5;
	align-items: flex-end;
`;

const MonthYearContainer = styled.View`
	flex: 2;
	justify-content: center;
	flex-direction: row;
`;

const MonthLabel = styled.Text`
    font-size: 16px
    color: ${(props) => props.theme.text};
    margin-right: 2px
`;

const YearLabel = styled.Text`
	font-size: 16px;
	color: ${(props) => props.theme.text};
	margin-left: 2px;
`;

const Calendar = styled.View`
	flex-direction: column;
`;

const Week = styled.View`
	display: flex;
	flex-direction: row;
`;

const DayButton = styled.Pressable`
	flex: 1;
	margin: 8px;
`;

const CalDay = styled.Text`
	color: ${(props) => {
		return props.selected
			? props.theme.dark
				? props.theme.background
				: props.theme.foreground
			: props.today
			? props.theme.accent
			: !props.selMonth
			? changeOpacity(props.theme.text, 0.3)
			: props.theme.text;
	}};
    background-color: ${(props) => {
		return props.selected ? props.theme.accent : "unset";
	}}
    border-radius: 50px;
	text-align: center;
`;
