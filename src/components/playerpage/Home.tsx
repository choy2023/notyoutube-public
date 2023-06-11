import React from "react";
import { useSelector } from "react-redux";
import Player from "./player/Player";
import Comments from "./player/Comments";
import List from "./player/List";
import Description from "./player/Description";
import "./home.css";

const PlayerHome = () => {
  const isOpen = useSelector((state: any) => state.sidebarState.isOpen);

  return (
    <div>
      <div className="player_container">
        <div className="player_contents">
          <div className="player_page_player_video">
            <Player />
          </div>
          <div className="player_page_player_description">
            <Description />
          </div>
          <div className="player_page_player_right_player">
            <List />
          </div>
          <div className="player_page_comments">
            <Comments />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHome;
