import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VideoIds } from "../common/data/shortVideoIdReducer";
import ShortPlayer from "./ShortPlayer";

import "./short.css";

const Shorts = () => {
  const videoIds = useSelector((state: any) => state.videoIds.videoIds);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleWheel = useCallback(
    (event: any) => {
      const delta = Math.sign(event.deltaY);
      if (delta > 0 && currentIndex < videoIds.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else if (delta < 0 && currentIndex > 0) {
        setCurrentIndex((prevIndex) => prevIndex - 1);
      } else if (delta > 0 && currentIndex === videoIds.length - 1) {
        console.log("This is the end of videos.");
      } else if (delta < 0 && currentIndex === 0) {
        console.log("This is the first video.");
      }
    },
    [currentIndex, videoIds.length]
  );
  useEffect(() => {
    console.log("Current video ID:", videoIds[currentIndex]);
    navigate(`/shorts/${videoIds[currentIndex]}`);
  }, [currentIndex, videoIds, navigate]);

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  return (
    <div id="short_player_container">
      <div className="text_description_short">
        This is not short, doesn't have an endpoint to get short videos<br/>
        wheel up, down to play next, previous video
      </div>
      <ShortPlayer />
    </div>
  );
};

export default Shorts;
