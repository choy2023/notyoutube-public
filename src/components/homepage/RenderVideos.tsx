import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./rendervideos.css";

import { setCurrentchannelId } from "../common/data/channelIdReducer";


import { getTimeAgo, getFormattedViewCount } from "../common/data/Common";




const RenderVideos = ({ videos, handleVideoClick }: any) => {

  const dispatch = useDispatch();

  const channelLinkClicked = (channelId:any) => {
    dispatch(setCurrentchannelId(channelId));
  
  };

  return videos?.map((video: any, index: any) => {
    return (
      <div key={index} className="videocard_container">
        <div className="videocard_container_item">
          <Link
            to={`/watch/${video.id}`}
            onClick={() => handleVideoClick(video.id)}
          >
            <img
              className={`videocard_thumbnail`}
              src={video.mediumthumbnails}
              alt={video.title}
            />
          </Link>

          <div className="detail_renderer">
            <div className="videocard_left">
              <Link to={`/channel/${video.channelUrl}`}>
                <img
                  className={`videocard_left_thumbnail`}
                  src={video.channelThumbnail}
                  alt={video.title}
                  onClick={() => channelLinkClicked(video.channelId)}
                />
              </Link>
            </div>
            <div className="videocard_right">
              <Link
                to={`/watch/${video.id}`}
                onClick={() => handleVideoClick(video.id)}
              ></Link>

              <div className={`videocard_title`}>{video.title}</div>
              <div className="videocard_right_subdetails">
                <div className={`videocard_channel`}>{video.channelTitle}</div>
                <div className={`videocard_right_statics`}>
                  {getFormattedViewCount(video.viewCount)} •{" "}
                  {getTimeAgo(video.publishedAt)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default RenderVideos;
