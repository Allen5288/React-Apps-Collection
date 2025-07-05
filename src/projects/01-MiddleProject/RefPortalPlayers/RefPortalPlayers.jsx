import { Link } from "react-router-dom";
import Player from "./components/Player.jsx";
import TimerChallenge from "./components/TimerChallenge.jsx";
import "./RefPortalPlayers.css";

function RefPortalPlayers() {
  return (
    <div id="ref-portal-players">
      <Player />
      <div id="challenges">
        <TimerChallenge title="Easy" targetTime={1} />
        <TimerChallenge title="Not easy" targetTime={5} />
        <TimerChallenge title="Getting tough" targetTime={10} />
        <TimerChallenge title="Pros only" targetTime={15} />
      </div>
    </div>
  );
}

export default RefPortalPlayers;
