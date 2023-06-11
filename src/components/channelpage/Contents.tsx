import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { getChannelVideoIds, VideoDetailAPI, VideoData } from '../common/data/YoutubeAPI';
import { setCurrentVideoId, VideoId } from '../common/data/videoidReducer';
import { getTimeAgo, getFormattedViewCount } from '../common/data/Common';

import './contents.css';

const Contents = ({channelId}:any) => {
  const dispatch = useDispatch();

  // const channelId = useSelector((state: any) => state.channelId.channelId);
  const [videoDetails, setVideoDetails] = useState<VideoData[]>([]);

  const handleVideoClick = (id: string | undefined) => {
    dispatch(setCurrentVideoId(id));
  };

  useEffect(() => {
    async function fetchVideos() {
      try {
        const videoIds = await getChannelVideoIds(channelId);
        const videoDetailsPromises = videoIds.map(async (videoId: string) => {
          const {
            title,
            description,
            channelTitle,
            publishedAt,
            viewCount,
            standardthumbnails,
            mediumthumbnails,
            maxresthumbnails,
            highthumbnails,
            defaultthumbnails,
          } = await VideoDetailAPI(videoId);

          return {
            id: videoId,
            title,
            description,
            thumbnails: '',
            channelTitle,
            viewCount,
            likeCount: '',
            channelThumbnail: '',
            publishedAt,
            defaultthumbnails,
            highthumbnails,
            maxresthumbnails,
            mediumthumbnails,
            standardthumbnails,
          };
        });

        const fetchedVideoDetails = await Promise.all(videoDetailsPromises);

        setVideoDetails(fetchedVideoDetails);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVideos();
  }, [channelId]);

  return (
    <>
      {videoDetails.map((video: VideoData, index: number) => (
        <div key={index} className="videocard_container">
          <div className="videocard_container_item">
            <Link to={`/watch/${video.id}`} onClick={() => handleVideoClick(video.id)}>
              <img
                className="videocard_thumbnail"
                src={video.mediumthumbnails}
                alt={video.title}
              />
              <div className="detail_renderer">
                <div className="videocard_left">
                  <img
                    className="videocard_left_thumbnail"
                    loading='lazy'
                    srcSet='
                    mediumthumbnails 500w,
                    highthumbnails 1000w,
                    maxresthumbnails 2000w'
                    sizes='(max-width: 600px) 400px,
                    (max-width: 1200) 800px,
                    1400px'
                    src={video.channelThumbnail}
                    alt={video.title}
                  />
                </div>
                <div className="videocard_right">
                  <div className="videocard_title">{video.title}</div>
                  <div className="videocard_right_subdetails">
                    <div className="videocard_channel">{video.channelTitle}</div>
                    <div className="videocard_right_statics">
                      {getFormattedViewCount(video.viewCount)} • {getTimeAgo(video.publishedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Contents;
