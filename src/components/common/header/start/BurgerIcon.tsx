import React from 'react';
import { connect } from 'react-redux';
import { openSidebar, closeSidebar } from '../../data/sidebarReducer';

import './burgericon.css';

const BurgerIcon = ({ isOpen, openSidebar, closeSidebar }:any) => {
  const sidebarHandler = () => {
    if (isOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  return (
    <div
      onClick={sidebarHandler}
      id="guide-icon"
      className="burger_icon_container"
    >
      <svg
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
        className="burger_icon_svg"
      >
        <g className="style-scope yt-icon">
          <path
            d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"
            className="style-scope yt-icon"
          ></path>
        </g>
      </svg>
    </div>
  );
};

const mapStateToProps = (state:any) => ({
  isOpen: state.sidebarState.isOpen, 
});

export default connect(mapStateToProps, { openSidebar, closeSidebar })(BurgerIcon);