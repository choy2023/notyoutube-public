import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetChannelDetailAPI } from "../common/data/YoutubeAPI";
import { getFormattedSubscribeCount } from "../common/data/Common";

import Network from "../common/error/Network";

import "./channel.css";
import Header from "./Header";
import Contents from "./Contents";

const Channel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(false);
  const [isError, setIsError] = useState(false);

  const channelId = useSelector((state: any) => state.channelId.channelId);


  return (
    <div className="videolist_container">
      <Header/>
      <div className="contents">
        <div className="contents_grid_renderer">
          <div className="contents_grid_row">
            {isLoading ? (
              <div className="videocard_container"></div>
            ) : isError ? (
              <div className="videocard_container">
                <Network />
              </div>
            ) : (
              <div className="channelpage_render_contents">
                <Contents channelId={channelId}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channel;
