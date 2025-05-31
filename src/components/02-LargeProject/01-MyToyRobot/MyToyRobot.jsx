import React from "react";
import Header from "./components/Header/Header";
import Game from "./components/Game/Game";
import "./MyToyRobot.scss"; // Assuming you have a CSS file for styles

const MyToyRobot = () => {
  return (
    <div id="my-toy-robot">
      <div className="container">
        App
        <Header />
        <Game />
      </div>
    </div>
  );
};

export default MyToyRobot;
