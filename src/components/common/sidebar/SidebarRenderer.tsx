import React from "react";

import Sidebar from "./Sidebar";
import MSidebar from "./MSidebar";

function SidebarRenderer() {
  const isSmallScreen = window.innerWidth <= 1280;

  return (
    <>
    {isSmallScreen ? <MSidebar/> : <Sidebar/>}
    </>
  );
}

export default SidebarRenderer;