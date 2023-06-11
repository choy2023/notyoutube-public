import React, { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentVideoId, VideoId } from "../common/data/videoidReducer";
import { setCurrentErrorMessage } from "../common/data/errormessageReducer";
import { getTimeAgo, getFormattedViewCount } from "../common/data/Common";


import {
  GetVideoListAPI,
  VideoListData,
  VideoData,
  VideoDetailAPI,
  GetSearchListAPI,
  GetChannelDetailAPI,
  GetVideoTagsAPI,
} from "../common/data/YoutubeAPI";

import Headertags from "./Headertags";
import Network from "../common/error/Network";

import "./videolist.css";
import Skeleton from "../common/loader/Skeleton";

import RenderVideos from "./RenderVideos";

const CACHE_KEY = "most_popular_videos";

const VideoList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(false);
  const videoId = useSelector((state: VideoId) => state.videoId);
  const searchQuery = useSelector(
    (state: any) => state.searchQuery.searchQuery
  );
  const [isError, setIsError] = useState(false);

  const defaultTags = ["All", "React", "Cook", "Music", "Movie", "Minecraft"];
  const [tags, setTags] = useState<string[]>(defaultTags);

  const [videos, setVideos] = useState<VideoData[]>([]);
  const dispatch = useDispatch();

  // const isSmallScreen = useMediaQuery({ maxWidth: 480 });
  // const isMediumScreen = useMediaQuery({ minWidth: 481, maxWidth: 768 });
  // const isLargeScreen = useMediaQuery({ minWidth: 769, maxWidth: 999 });
  // const isVerylargeScreen = useMediaQuery({ minWidth: 1000 });

  const handleVideoClick = (id: string | undefined) => {
    dispatch(setCurrentVideoId(id));
  };
  useEffect(() => {
    async function fetchVideos() {
      setIsLoading(true);
      try {
        let videoListResponse: VideoListData[] = [];

        if (searchQuery !== undefined && searchQuery !== "") {
          videoListResponse = await GetSearchListAPI(searchQuery);
          console.log("searchquery", searchQuery);
        } else {
          videoListResponse = await GetVideoListAPI();
          console.log("no searchquery", videoListResponse);
        }
        const fullVideoData: any[] = await Promise.all(
          videoListResponse.map(async (video: any) => {
            if (!video.id) {
              return null;
            }

            const {
              title,
              description,
              channelTitle,
              publishedAt,
              viewCount,
              channelId,
              standardthumbnails,
              mediumthumbnails,
              maxresthumbnails,
              highthumbnails,
              defaultthumbnails,
            } = await VideoDetailAPI(video.id);

            const channelThumbnail = await GetChannelDetailAPI(channelId);
            const tags = await GetVideoTagsAPI(video.id);
            const customUrl = await GetChannelDetailAPI(channelId);
            return {
              channelId,
              id: video.id,
              title,
              description,
              channelTitle,
              publishedAt,
              viewCount,
              channelThumbnail,
              standardthumbnails,
              mediumthumbnails,
              maxresthumbnails,
              highthumbnails,
              defaultthumbnails,
              tags,
              customUrl,
            };
          })
        );

        setVideos(fullVideoData.filter((video: any) => video !== null));

        const extractedTags = fullVideoData
          .map((video: any) => video.tags)
          .flat();
        setTags([...defaultTags, ...extractedTags.slice(0, 10)]);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log("error caugh at fetchVideos. videolist.tsx");
        dispatch(
          setCurrentErrorMessage("error caugh at fetchVideos. videolist.tsx")
        );
      }
    }

    fetchVideos();
  }, [searchQuery]);

  const renderTags = () => {
    return tags.map((tag, index) => {
      const isSelected = searchQuery === (tag === "All" ? "" : tag);
      const tagContainerClass = isSelected ? "tag_style selected" : "tag_style";

      return (
        <div key={index} className={tagContainerClass}>
          <Headertags tag={tag} />
        </div>
      );
    });
  };

  return (
    <div className="videolist_container">
      <div className="header">
        <div className="tag_container">
          <div className="tag_inner_container">{renderTags()}</div>
        </div>
      </div>
      <div className="contents">
        <div className="contents_grid_renderer">
          <div className="contents_grid_row">
            {isLoading ? (
              <div className="videocard_container">
                <Skeleton />
              </div>
            ) : isError ? (
              <div className="videocard_container">
                <Network />
              </div>
            ) : (
              <RenderVideos
                videos={videos}
                handleVideoClick={handleVideoClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoList;
