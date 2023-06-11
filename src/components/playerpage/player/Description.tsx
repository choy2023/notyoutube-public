import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";


import { setCurrentchannelId } from "../../common/data/channelIdReducer";


import {
  VideoDetailAPI,
  GetChannelDetailAPI,
  GetVideoTagsAPI,
} from "../../common/data/YoutubeAPI";
import {
  getTimeAgo,
  getFormattedViewCount,
  getFormattedSubscribeCount,
  getFormattedCommentsCount,
} from "../../common/data/Common";
import { useParams } from "react-router-dom";

import SubscribeBtn from "../../common/Subscribebtn";

import "./description.css";

const Description = () => {
  const { videoId } = useParams<{ videoId: any }>();
  const [details, setDetails] = useState<any>({});
  const [channelThumbnail, setChannelThumbnail] = useState("");
  const [subscriberCount, setSubscriberCount] = useState<any>();
  const [customUrl, setCustomUrl] = useState<any>();
  const [videoTags, setVideoTags] = useState<string[]>([]);

  const dispatch = useDispatch();


  useEffect(() => {
    const fetchDetails = async () => {
      const videoResponse = await VideoDetailAPI(videoId);
      setDetails(videoResponse);
  
      if (videoResponse.channelId) {
        const channelResponse = await GetChannelDetailAPI(videoResponse.channelId);
        setChannelThumbnail(channelResponse.channelThumbnail);
        setSubscriberCount(channelResponse.subscriberCount);
        setCustomUrl(channelResponse.channelcustomUrl); 
      }
  
      const tagsResponse = await GetVideoTagsAPI(videoId);
      setVideoTags(tagsResponse);
    };
  
    fetchDetails();
  }, [videoId]);

  const {
    channelTitle = details.channelTitle,
    publishedAt = details.publishedAt,
    title = details.title,
    commentCount = details.commentCount,
    description = details.description,
    likeCount = details.likeCount,
    viewCount = details.viewCount,
    channelcustomUrl = details.channelcustomUrl,
    channelId = details.channelId,
  } = details.snippet || {};

  useEffect(() => {
    document.title = title;
  }, []);

  const channelLinkClicked = () => {
      dispatch(setCurrentchannelId(channelId));

  };


  return (
    <div className="container">
      <div className="videocard_title" id="videocard_title">
        {title}
      </div>
      <div id="detail_renderer">
        <div className="details_renderer_left" onClick={channelLinkClicked}>
          <Link to={`/channel/${channelcustomUrl}`}>
          <img
            className="videocard_left_thumbnail"
            src={channelThumbnail}
            alt="Channel Thumbnail"
          />
          </Link>
        
          <div className="videocard_right_subdetails">
            <div className="videocard_title">{channelTitle}</div>
            <div className="videocard_right_statics">
              {getFormattedSubscribeCount(subscriberCount)}
            </div>
          </div>
        </div>
        <div className="details_renderer_right">
          <div className="videocard_title">
            <div><SubscribeBtn channelId={channelId}/></div>
          </div>
        </div>
      </div>
      <div className="player_description_bottom_row">
        <div className="player_description_bottom_row_description">
          <div className="line_clipper">
            <div> {getFormattedViewCount(viewCount)}</div>
            <div> {getTimeAgo(publishedAt)}</div>
            <div className="videocard_right_statics" id="gap">
              {videoTags ? (
                videoTags.map((tag, index) => (
                  <span key={index}>
                    {index > 0}# {tag}
                  </span>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="line_clipper_longtext">{description}</div>
        </div>
      </div>
      <div className="videocard_title"></div>
      <div className="videocard_title" id="getFormattedCommentsCount_padding">
        {getFormattedCommentsCount(commentCount)}
      </div>
      likeCount = {getFormattedViewCount(likeCount)}
    </div>
  );
};

export default Description;
