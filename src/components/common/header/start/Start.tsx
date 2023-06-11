import React, { useState } from "react";
import { Link } from "react-router-dom";
import BurgerIcon from "./BurgerIcon";
import Youtubelogo from "./Youtubelogo";

import Sidebar from "../../sidebar/Sidebar";

import "./start.css";

const Start = () => {
  const [isOpen, setIsOpen] = useState(false);

  const burgerClicked = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="start_container">
      <div id="start_container_burgericon" onClick={burgerClicked}>
        <BurgerIcon />
      </div>
      <Link to={"/"}>
        <Youtubelogo />
      </Link>
    </div>
  );
};

export default Start;
