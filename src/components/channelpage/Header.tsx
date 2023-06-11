import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetChannelDetailAPI } from "../common/data/YoutubeAPI";
import { getFormattedSubscribeCount } from "../common/data/Common";

import SubscribeBtn from "../common/Subscribebtn";

const Header = () => {
    const channelId = useSelector((state: any) => state.channelId.channelId);
    const [channelData, setChannelData] = useState<any>(null);
  
    useEffect(() => {
      const fetchChannelData = async () => {
        try {
          if (channelId) {
            const data = await GetChannelDetailAPI(channelId);
            setChannelData(data);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchChannelData();
    }, [channelId]);
  
    if (!channelData) {
      return <div>Loading...</div>;
    }
  
    const {
      channelThumbnail,
      channelTitle,
      channelDescription,
      subscriberCount,
      channelcustomUrl,
      channelVideoCount,
    } = channelData;
  return (
    <>
         <div className="channel_Header">
        <div className="channel_Header_contents">
          <img className="header_thumbnail_img" src={channelThumbnail} alt="" />
          <div className="header_contants_center">
            <div className="header_channelTitle">{channelTitle}</div>
            <div className="header_contents_statics">
              <div className="header_channel_text">{channelcustomUrl}</div>
              <div className="header_channel_text">{getFormattedSubscribeCount(subscriberCount)} subscribers</div>
              <div className="header_channel_text">{channelVideoCount} videos</div>
            </div>
            <div className="header_channel_text">{channelDescription}</div>

          </div>
          <><SubscribeBtn channelId={channelId}/></>

        </div>
      </div>
    </>
  )
}

export default Header