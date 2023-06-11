import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Section from "./sections/Section";
import sectiondata from "./sectiondata";
import { closeSidebar, openSidebar } from "../data/sidebarReducer";
import "./sidebar.css";
import Start from "../header/start/Start";

function Sidebar() {
  const isLoggedIn = useSelector((state:any) => state.isLoggedIn);
  const accessToken = useSelector((state: any) => state.accessToken);
  

  const location = useLocation();
  const currentLink = location.pathname;
  const data = sectiondata(currentLink);
  const isOpen = useSelector((state:any) => state.sidebarState.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentLink === "/") {
      dispatch(openSidebar());
    } else {
      dispatch(closeSidebar());
    }
  }, [currentLink, dispatch]);


  return (
    <div
      className={
        isOpen ? "sidebar_container_M" : "sidebar_container_M"
      }
    >
      <div className="content_container">
          <div className="content_container_margin_15">
          <Start />

          </div>
          <div className="guide_outer_container">
            <div className="guide_spacer" />
            <div className="guide_inner_container">
              {data.map((section) => (
                <Section key={section.id} section={section} />
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}

export default Sidebar;