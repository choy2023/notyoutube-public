import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeSidebar } from "./data/sidebarReducer";
import "./dialog.css";

const Overlay = () => {
  const isOpen = useSelector((state:any) => state.sidebarState.isOpen);
  const dispatch = useDispatch();
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event:any) => {
    //   if (dialogRef.current && !dialogRef.current.contains(event.target)) {
    //     dispatch(closeSidebar());
    //   }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  return (
    <>
      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog" ref={dialogRef}>
            {/* Dialog content */}
          </div>
        </div>
      )}
    </>
  );
};

export default Overlay;