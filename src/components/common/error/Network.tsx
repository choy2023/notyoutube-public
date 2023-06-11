import React from "react";

import "./network.css";

import { useSelector } from "react-redux";

const Network = () => {
  const errorMessage = useSelector(
    (state: any) => state.errorMessage.errorMessage
  );

  return (
    <div className="error_container">
      <div className="error_icon">X</div>
      <div className="error_message">{errorMessage}</div>
    </div>
  );
};

export default Network;
