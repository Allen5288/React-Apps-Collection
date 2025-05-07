import "./reactEssentials.css";
import { Fragment } from "react";
import Header from "./components/Header/Header";
import { Link } from "react-router-dom";
import CoreConcepts from "./components/CoreConcepts";
import Examples from "./components/Examples";

function ReactEssentials() {
  return (
    <div id="reactEssentialsStyle">
      <Header />
      <main>
        <CoreConcepts />

        <h2>Time to get started!</h2>

        <Examples />
      </main>
    </div>
  );
}

export default ReactEssentials;
