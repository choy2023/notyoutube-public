import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { setCurrentchannelId } from "../common/data/channelIdReducer";
import { getSubscriptionListAPI } from "../common/data/LoginYoutubeAPI";
import { GetChannelDetailAPI } from "../common/data/YoutubeAPI";

import { useDispatch } from "react-redux";

import Contents from "../channelpage/Contents";

import "./subscriptions.css";

const Subscriptions = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn);
  const storedAccessToken: any = localStorage.getItem("access_token");

  const [subChannelVideos, setSubChannelVideos] = useState([]);

  useEffect(() => {
    const getSubChannelVideos = async () => {
      try {
        if (isLoggedIn === true) {
          const channelList = await getSubscriptionListAPI(storedAccessToken);
          const channelDetailsPromises = channelList.map(
            async (channel: any) => {
              const { channelcustomUrl } =
                await GetChannelDetailAPI(channel.id);

              return {
                channelId: channel.id,
                channelcustomUrl,
              };
            }
          );

          const fetchedChannelDetails: any = await Promise.all(
            channelDetailsPromises
          );
          setSubChannelVideos(fetchedChannelDetails);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getSubChannelVideos();
  }, [isLoggedIn]);

  return (
    <div className="videolist_container">
      <div className="contents">
        <div className="contents_grid_renderer">
          <div className="contents_grid_row">
            {subChannelVideos.map((channel: any) => (
              <Contents channelId={channel.channelId} key={channel.channelId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
