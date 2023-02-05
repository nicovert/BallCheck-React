import _ from "lodash";
import moment from "moment-timezone";
import styled from "styled-components";
import { getCalendars } from "expo-localization";

export default function Clock({ clockData }) {
	const { status, periods, scores, date } = clockData;
	const clockString = getClockString(status, periods, scores, date);

	return (
		<Container>
			<Text>{clockString}</Text>
		</Container>
	);
}

const getClockString = (status, periods, scores, date) => {
	const state = _.get(status, "short");
	const scheduled = state === 1;
	const live = state === 2;
	const finished = state === 3;
	//API does not correctly report overtime periods,
	// need to get it from the linescore
	const realCurrentPeriod = _.get(scores, "home.linescore", []).length;

	if (finished) {
		const overtime = realCurrentPeriod - 4;
		if (overtime > 0) return `FINAL/${overtime === 1 ? "" : overtime}OT`;
		else return "FINAL";
	}
	if (live) {
		if (_.get(status, "halftime", false)) {
			return "HALFTIME";
		} else if (realCurrentPeriod > 4) {
			//Overtime
			const overtime = realCurrentPeriod - 4;
			return `${overtime === 1 ? "" : overtime}OT ${_.get(
				status,
				"clock",
				""
			)}`;
		} else {
			const quarter = _.get(periods, "current");
			let quarterString = "";
			if (quarter === 1) quarterString = "1ST";
			if (quarter === 2) quarterString = "2ND";
			if (quarter === 3) quarterString = "3RD";
			if (quarter === 4) quarterString = "4TH";
			const endOfQuarter = _.get(periods, "endOfperiod", false);
			const clockString = endOfQuarter
				? "END"
				: _.get(status, "clock", "");
			return `${quarterString} ${
				_.isNull(clockString) ? "Q" : clockString
			}`;
		}
	}
	if (scheduled) {
		const startDateUTC = _.get(date, "start", null); //Default UTC
		if (_.isNull(startDateUTC)) return "SOON";
		const timezone = _.get(_.head(getCalendars()), "timeZone");
		const startDateLocal = moment.tz(startDateUTC, timezone).format("LT");
		return startDateLocal;
	}
};

const Container = styled.View`
	background-color: ${(props) => props.theme.background};
	border-radius: 4px;
	padding: 2px 8px;
	align-items: center;
	margin-left: auto;
	margin-right: auto;
`;

const Text = styled.Text`
	color: ${(props) => props.theme.text};
	font-size: 24px;
`;
