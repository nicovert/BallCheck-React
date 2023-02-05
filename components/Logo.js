import Unknown from "../assets/teamLogos/unknown.svg";
import SeventySixers from "../assets/teamLogos/nba/76ers.svg";
import Bucks from "../assets/teamLogos/nba/bucks.svg";
import Bulls from "../assets/teamLogos/nba/bulls.svg";
import Cavaliers from "../assets/teamLogos/nba/cavaliers.svg";
import Celtics from "../assets/teamLogos/nba/celtics.svg";
import Clippers from "../assets/teamLogos/nba/clippers.svg";
import Grizzlies from "../assets/teamLogos/nba/grizzlies.svg";
import Hawks from "../assets/teamLogos/nba/hawks.svg";
import Heat from "../assets/teamLogos/nba/heat.svg";
import Hornets from "../assets/teamLogos/nba/hornets.svg";
import Jazz from "../assets/teamLogos/nba/jazz.svg";
import Kings from "../assets/teamLogos/nba/kings.svg";
import Knicks from "../assets/teamLogos/nba/knicks.svg";
import Lakers from "../assets/teamLogos/nba/lakers.svg";
import Magic from "../assets/teamLogos/nba/magic.svg";
import Mavericks from "../assets/teamLogos/nba/mavericks.svg";
import Nets from "../assets/teamLogos/nba/nets.svg";
import Nuggets from "../assets/teamLogos/nba/nuggets.svg";
import Pacers from "../assets/teamLogos/nba/pacers.svg";
import Pelicans from "../assets/teamLogos/nba/pelicans.svg";
import Pistons from "../assets/teamLogos/nba/pistons.svg";
import Raptors from "../assets/teamLogos/nba/raptors.svg";
import Rockets from "../assets/teamLogos/nba/rockets.svg";
import Spurs from "../assets/teamLogos/nba/spurs.svg";
import Suns from "../assets/teamLogos/nba/suns.svg";
import Thunder from "../assets/teamLogos/nba/thunder.svg";
import Timberwolves from "../assets/teamLogos/nba/timberwolves.svg";
import Trailblazers from "../assets/teamLogos/nba/trailblazers.svg";
import Warriors from "../assets/teamLogos/nba/warriors.svg";
import Wizards from "../assets/teamLogos/nba/wizards.svg";
import _ from "lodash";

export default function Logo({
	shortName,
	tricode,
	width = 130,
	height = 130,
	away,
}) {
	switch (_.toLower(shortName) || _.toLower(tricode)) {
		case "76ers":
		case "phi":
			return <SeventySixers width={width} height={height} />;
		case "bucks":
		case "mil":
			return <Bucks width={width} height={height} />;
		case "bulls":
		case "chi":
			return <Bulls width={width} height={height} />;
		case "cavaliers":
		case "cle":
			return <Cavaliers width={width} height={height} />;
		case "celtics":
		case "bos":
			return <Celtics width={width} height={height} />;
		case "clippers":
		case "lac":
			return <Clippers width={width} height={height} />;
		case "grizzlies":
		case "mem":
			return <Grizzlies width={width} height={height} />;
		case "hawks":
		case "atl":
			return <Hawks width={width} height={height} />;
		case "heat":
		case "mia":
			return <Heat width={width} height={height} />;
		case "hornets":
		case "cha":
			return <Hornets width={width} height={height} />;
		case "jazz":
		case "uta":
			return (
				<Jazz
					width={width}
					height={height}
					style={away ? { transform: [{ scaleX: -1 }] } : {}}
				/>
			);
		case "kings":
		case "sac":
			return <Kings width={width} height={height} />;
		case "knicks":
		case "nyk":
			return <Knicks width={width} height={height} />;
		case "lakers":
		case "lal":
			return <Lakers width={width} height={height} />;
		case "magic":
		case "orl":
			return (
				<Magic
					width={width}
					height={height}
					style={!away ? { transform: [{ scaleX: -1 }] } : {}}
				/>
			);
		case "mavericks":
		case "dal":
			return <Mavericks width={width} height={height} />;
		case "nets":
		case "bkn":
			return <Nets width={width} height={height} />;
		case "nuggets":
		case "den":
			return <Nuggets width={width} height={height} />;
		case "pacers":
		case "ind":
			return <Pacers width={width} height={height} />;
		case "pelicans":
		case "nop":
			return <Pelicans width={width} height={height} />;
		case "pistons":
		case "det":
			return <Pistons width={width} height={height} />;
		case "raptors":
		case "tor":
			return <Raptors width={width} height={height} />;
		case "rockets":
		case "hou":
			return <Rockets width={width} height={height} />;
		case "spurs":
		case "sas":
			return <Spurs width={width} height={height} />;
		case "suns":
		case "phx":
			return (
				<Suns
					width={width}
					height={height}
					style={!away ? { transform: [{ scaleX: -1 }] } : {}}
				/>
			);
		case "thunder":
		case "okc":
			return <Thunder width={width} height={height} />;
		case "timberwolves":
		case "min":
			return <Timberwolves width={width} height={height} />;
		case "trailblazers":
		case "por":
			return <Trailblazers width={width} height={height} />;
		case "warriors":
		case "gsw":
			return <Warriors width={width} height={height} />;
		case "wizards":
		case "was":
			return <Wizards width={width} height={height} />;
		default:
			return <Unknown width={width} height={height} />;
	}
}
