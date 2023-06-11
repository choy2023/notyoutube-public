import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentchannelId } from "../../data/channelIdReducer";
import { getSubscriptionListAPI } from "../../data/LoginYoutubeAPI";
import {
  GetChannelDetailAPI,
  VideoListData,
  GetShortsListAPI,
} from "../../data/YoutubeAPI";
import { setCurrentVideoId, VideoId } from "../../data/videoidReducer";
import { VideoIds, setCurrentVideoIds } from "../../data/shortVideoIdReducer";
import { openHelper } from "../../data/helpOpenReducer";
import Help from "../../popup/Help";

import { GetRegionCategoriesAPI } from "../../data/YoutubeAPI";

import "./section.css";

const Section = ({ section, currentLink }: any) => {
  const { links, id } = section;
  const dispatch = useDispatch();

  const videoId = useSelector((state: VideoId) => state.videoId) as string;

  const sectionheader = id.length >= 2;
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn);

  const storedAccessToken: any = localStorage.getItem("access_token");

  const [channelDetails, setChannelDetails] = useState([]);
  const [videoIds, setVideoIds] = useState([]);

  const [categoryIds, setCategoryIds] = useState([]);


  const currentVideoIds = useSelector((state: VideoIds) => state.videoIds);

  useEffect(() => {
    const getChannelDetails = async () => {
      try {
        if (isLoggedIn === true) {
          const channelList = await getSubscriptionListAPI(storedAccessToken);
          const channelDetailsPromises = channelList.map(
            async (channel: any) => {
              const { channelThumbnail, channelcustomUrl, channelTitle } =
                await GetChannelDetailAPI(channel.id);
              return {
                channelId: channel.id,
                channelThumbnail,
                channelcustomUrl,
                channelTitle,
              };
            }
          );

          const fetchedChannelDetails: any = await Promise.all(
            channelDetailsPromises
          );
          setChannelDetails(fetchedChannelDetails);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getChannelDetails();
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchVideoIds = async () => {
      try {
        const shortsList = await GetShortsListAPI();
        setVideoIds(shortsList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideoIds();
  }, []);

  useEffect(() => {
    const getCategoryIds = async () => {
      try {
        const regionCode = navigator.language.split("-")[1];
        const maxResults = 7;
        const categoryList = await GetRegionCategoriesAPI(regionCode, maxResults);
        
        const ids = categoryList.map((category:any) => ({
          id: category.id,
          name: category.title
        }));
        setCategoryIds(ids);
      } catch (error) {
        console.log("Caught error at ExploreList.tsx", error);
      }
    };
  
    getCategoryIds();
  }, []);

  async function shortClicked() {
    await dispatch(setCurrentVideoIds(videoIds));
  }

  const channelLinkClicked = (channelId: any) => {
    dispatch(setCurrentchannelId(channelId));
  };

  const rendersubscribelist = () => {
    return (
      <div className="nav_style_outer">
        {isLoggedIn ? (
          <>
            {channelDetails.map((channel: any) => (
              <Link
                to={`/channel/${channel.channelcustomUrl}`}
                className={`nav_style_inner`}
                onClick={() => channelLinkClicked(channel.channelId)}
              >
                <div className="nav_style">
                  <div className="nav_link_icon">
                    <img
                      src={channel.channelThumbnail}
                      alt="Channel Thumbnail"
                      className="style-scope yt-icon channel_icon_small"
                    />
                  </div>
                  <div className="nav_link_text">{channel.channelTitle}</div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <div className="text_change_white">
            You need to login to see sublist;
          </div>
        )}
      </div>
    );
  };

  const renderExploreLinks = () => {
    return (
      <div className="nav_style_outer">
        {categoryIds.map((category:any) => (
          <Link
            to={`/explore/${category.id}`}
            className="nav_style_inner"
            key={category.id}
          >
            <div className="nav_style">
              <div className="nav_link_icon"></div>
              <div className="nav_link_text">{category.name}</div>
            </div>
          </Link>
        ))}
      </div>
    );
  };


  const showhelpform = () => {
    dispatch(openHelper());
    console.log("showhelpformcalled from section.tsx");
  };

  const renderlinks = () => {
    return (
      <div className="nav_style_outer">
        {links.map((link: any, index: string) => {
          if (link.id === "shorts") {
            return (
              <Link
                key={index}
                to={`/shorts/${videoIds[0]}`}
                className={`nav_style_inner`}
                onClick={shortClicked}
              >
                <div className="nav_style">
                  <div className="nav_link_icon">
                    <svg
                      viewBox="0 0 24 24"
                      preserveAspectRatio="xMidYMid meet"
                      focusable="false"
                      className="style-scope yt-icon"
                    >
                      <g className="style-scope yt-icon">
                        <path d={link.g} className="style-scope yt-icon"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="nav_link_text">{link.text}</div>
                </div>
              </Link>
            );
          } else if (link.id === "Help") {
            return (
              <Link
                key={index}
                to={link.link}
                className={`nav_style_inner`}
                onClick={showhelpform}
              >
                <div className="nav_style">
                  <div className="nav_link_icon">
                    <svg
                      viewBox="0 0 24 24"
                      preserveAspectRatio="xMidYMid meet"
                      focusable="false"
                      className="style-scope yt-icon"
                    >
                      <g className="style-scope yt-icon">
                        <path d={link.g} className="style-scope yt-icon"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="nav_link_text">{link.text}</div>
                </div>
              </Link>
            );
          } else {
            return (
              <Link key={index} to={link.link} className={`nav_style_inner`}>
                <div className="nav_style">
                  <div className="nav_link_icon">
                    <svg
                      viewBox="0 0 24 24"
                      preserveAspectRatio="xMidYMid meet"
                      focusable="false"
                      className="style-scope yt-icon"
                    >
                      <g className="style-scope yt-icon">
                        <path d={link.g} className="style-scope yt-icon"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="nav_link_text">{link.text}</div>
                </div>
              </Link>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="section_renderer">
      <div className="section_container">
        {sectionheader && <div className="section_id">{id}</div>}
        {id === "Subscribelist" ? (
          <>{rendersubscribelist()}</>
        ) : id === "Explore" ? (
          <>{renderExploreLinks()}</>
        ) : (
          <>{renderlinks()}</>
        )}
      </div>
    </div>
  );
};

export default Section;
