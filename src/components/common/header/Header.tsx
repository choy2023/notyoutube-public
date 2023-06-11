import React from "react";

import Start from "./start/Start";
import Center from "./center/Center";
import End from "./end/End";

import "./header.css";

const Header = () => {


  return (
      <div className="header_container">
      <div className="flex_container">
      <div className="start">
        <Start/>
      </div>
        <div className="center">
          <Center/>
        </div>

        <div className="end">
          <End/>
        </div>
      </div>
        
    </div>

  
  );
};

export default Header;
