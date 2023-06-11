import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Section from "./sections/Section";
import sectiondata from "./sectiondata";
import { closeSidebar, openSidebar } from "../data/sidebarReducer";

import Start from "../header/start/Start";
import "./sidebar.css";

function MSidebar() {
  const location = useLocation();
  const currentLink = location.pathname;
  const data = sectiondata(currentLink);
  const isOpen = useSelector((state: any) => state.sidebarState.isOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeSidebar());
  }, [dispatch]);

  const overlayClicked = () => {
    dispatch(closeSidebar());
  };

  return (
    <>
      <div
        className={
          isOpen
            ? "sidebar_container_M open_sidebar"
            : "sidebar_container_M close_sidebar"
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
      <div
        className={
          isOpen
            ? "background_cover_overlay open_sidebar_right"
            : "background_cover_overlay open_sidebar_left"
        }
        onClick={overlayClicked}
      ></div>
    </>
  );
}

export default MSidebar;
