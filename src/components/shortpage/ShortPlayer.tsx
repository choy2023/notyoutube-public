import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from "../common/header/Header";
import Sidebar from "../common/sidebar/Sidebar";
import { Link, useLocation, useParams } from 'react-router-dom';
import { VideoData, VideoDetailAPI } from "../common/data/YoutubeAPI";
import { setCurrentVideoId, VideoId } from '../common/data/videoidReducer';
import axios from "axios";

import './shortplayer.css'

const ShortPlayer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSkeleton, setIsSkeleton] = useState(false);
    const { videoId }:any = useParams();
    const [isError, setIsError] = useState(false);
    const [video, setVideo] = useState<VideoData | null>(null);
    const dispatch = useDispatch();
    const [videoUrl, setVideoUrl] = useState("");
    const apiKey = process.env.REACT_APP_API_KEY;
  
    const location = useLocation();
  
    useEffect(() => {
      const fetchVideoUrl = async () => {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=player&key=${apiKey}`
          );
          const videoData = response.data.items[0];
          if (videoData) {
            let modifiedVideoUrl = videoData.player.embedHtml
              .replace(/(width|height)="[\d]+"/gi, "")
              .replace('src="', 'src="https:');
  
            modifiedVideoUrl = modifiedVideoUrl.replace(
              "<iframe",
              `<iframe width="100%" height="100%" overflow="hidden"`
            );
  
            setVideoUrl(modifiedVideoUrl);
          }
        } catch (error) {
          console.error("Failed to fetch video URL from YouTube API", error);
        }
      };
  
      fetchVideoUrl();
    }, [apiKey, videoId]);
  
    return (
      <div className="player-container" id="short_player_container">
      <div className="player-aspect-ratio">
        <div className="player" dangerouslySetInnerHTML={{ __html: videoUrl }} />
      </div>
    </div>
    );
  };

export default ShortPlayer