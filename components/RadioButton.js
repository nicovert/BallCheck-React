import _ from "lodash";
import styled from "styled-components";

export default function RadioButton(props) {
	const { selected, onSelect, label } = props;

	return (
		<Container
			onPress={() =>
				_.isFunction(onSelect) ? onSelect(!selected) : null
			}
		>
			<Outer>{selected && <Inner />}</Outer>
			{label && <Label>{label}</Label>}
		</Container>
	);
}

const Container = styled.Pressable`
	flex-direction: row;
	margin-bottom: 16px;
`;

const Outer = styled.View`
	height: 24px;
	width: 24px;
	border-radius: 12px;
	border-width: 2px;
	border-color: ${(props) => props.theme.accent};
	align-items: center;
	justify-content: center;
`;

const Inner = styled.View`
	height: 12px;
	width: 12px;
	border-radius: 6px;
	background-color: ${(props) => props.theme.accent};
`;

const Label = styled.Text`
	margin-left: 16px;
	color: ${(props) => props.theme.text};
`;
