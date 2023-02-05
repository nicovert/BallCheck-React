import _ from "lodash";

export const changeOpacity = (color, opacity) => {
	if (
		!_.isNumber(opacity) ||
		opacity < 0 ||
		opacity > 1 ||
		color === "unset"
	) {
		return color;
	}
	if (opacity === 1) opacity = 0.999;
	if (_.startsWith(color, "#")) {
		//Hex
		const opacityHex = _.floor(opacity * 256).toString(16);
		return `${color}${opacityHex.length === 1 ? "0" : ""}${opacityHex}`;
	}
};
