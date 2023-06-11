import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTimeAgo, getFormattedViewCount } from "../../common/data/Common";
import { setCurrentVideoId, VideoId } from "../../common/data/videoidReducer";
import { useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import {
  RelateVideoListAPI,
  VideoDetailAPI,
} from "../../common/data/YoutubeAPI";

import "./list.css";

const List = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [videoLists, setVideoLists] = useState<any[]>([]);
  const [fullVideoData, setFullVideoData] = useState<{ [id: string]: any }>({});

  const dispatch = useDispatch();

  const handleVideoClick = (id: string | undefined) => {
    dispatch(setCurrentVideoId(id));
  };

  useEffect(() => {
    const fetchVideoList = async () => {
      const response = await RelateVideoListAPI(videoId);

      if (!response.length) {
        return;
      }

      await Promise.all(
        response.map(async (video: any, index: number) => {
          await new Promise((resolve) => setTimeout(resolve, index * 100));
          if (!video.id) {
            return null;
          }
          const {
            title,
            description,
            channelTitle,
            defaultthumbnails,
            highthumbnails,
            maxresthumbnails,
            mediumthumbnails,
            standardthumbnails,
            viewCount,
            publishedAt,
          } = await VideoDetailAPI(video.id);

          setFullVideoData((prevState) => ({
            ...prevState,
            [video.id]: {
              id: video.id,
              title,
              description,
              channelTitle,
              defaultthumbnails,
              highthumbnails,
              maxresthumbnails,
              mediumthumbnails,
              standardthumbnails,
              viewCount,
              publishedAt,
            },
          }));
        })
      );

      setVideoLists(response);
    };

    fetchVideoList();
  }, [videoId]);

  return (
    <div className="list_card_outer_container">
      {videoLists.map((item, index) => (
        <div key={index} className="list_card_outer_inner_margin">
          <Link to={`/watch/${item.id}`} onClick={() => handleVideoClick(item.id)} className="list_card_container">
            <div className="list_card_left">
              <img
                id="player_list_thumbnails"
                src={fullVideoData[item.id]?.defaultthumbnails}
                alt="video_thumbnail"
              />
            </div>
            <div className="list_card_right">
              <div className="videocard_title">
                {fullVideoData[item.id]?.title}
              </div>
              <div className="videocard_channel">
                {fullVideoData[item.id]?.channelTitle}
              </div>
              <div className="videocard_right_statics">
                {getFormattedViewCount(fullVideoData[item.id]?.viewCount)} • {getTimeAgo(fullVideoData[item.id]?.publishedAt)}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default List;
