import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setCurrentVideoId } from '../common/data/videoidReducer';
import { GetVideoListCategoryIdAPI, getChannelVideoIds, VideoDetailAPI, VideoData } from '../common/data/YoutubeAPI';
import { getTimeAgo, getFormattedViewCount } from '../common/data/Common';

import './renderlist.css';

const RenderList = () => {
  console.log("RenderList called")
  const { categoryId } = useParams<{ categoryId: string }>();
  console.log(categoryId, " categoryId")
  const [listVideos, setListVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const updateVideoList = async () => {
      const videoList = await GetVideoListCategoryIdAPI(categoryId);
                return videoList;
    };

    const getVideoList = async () => {
      try {
        const videoList = await updateVideoList();
        const videoDetailsPromises = videoList.map(async (videoId: string) => {
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
        setListVideos(fetchedVideoDetails);
      } catch (error) {
        console.error(error);
      }
    };

    getVideoList();
  }, [categoryId]);



  return (
    <div className="videolist_container">
    <div className="contents">
      <div className="contents_grid_renderer">
        <div className="contents_grid_row">
          {listVideos.map((video: any, index) => (
           <div key={index} className="videocard_container">
           <div className="videocard_container_item">
             <Link to={`/watch/${video.id}`}>
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
        </div>
      </div>
    </div>
  
  </div>
  )
};

export default RenderList;