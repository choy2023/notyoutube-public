import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentVideoId, VideoId } from "../common/data/videoidReducer";
import { useDispatch } from "react-redux";
import { VideoDetailAPI, VideoData } from "../common/data/YoutubeAPI";
import { GetLikedVideosAPI } from "../common/data/LoginYoutubeAPI";
import { getTimeAgo, getFormattedViewCount } from "../common/data/Common";
import Contents from "../channelpage/Contents";

import './likedpage.css'

const LikedPage = () => {
  const [likedVideos, setLikedVideos] = useState<VideoData[]>([]);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn);
  const storedAccessToken: any = localStorage.getItem("access_token");

  useEffect(() => {
    const getLikedVideos = async () => {
      try {
        if (isLoggedIn === true) {
          const likedVideoList = await GetLikedVideosAPI(storedAccessToken);

          console.log(likedVideoList,"likedVideoList")

          const videoDetailsPromises = likedVideoList.map(async (videoId: string) => {
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


          setLikedVideos(fetchedVideoDetails);
          console.log(likedVideos,"likedVideos")
        }
      } catch (error) {
        console.error(error);
      }
    };

    getLikedVideos();
  }, [isLoggedIn]);

  const handleVideoClick = (id: string | undefined) => {
    dispatch(setCurrentVideoId(id));
  };

  return (
    <div className="videolist_container">
      {isLoggedIn? <>  <div className="contents">
        <div className="contents_grid_renderer">
          <div className="contents_grid_row">
            {likedVideos.map((video: any, index) => (
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
          </div>
        </div>
      </div></>:<>Please Login First</>}
    
    </div>
  );
};

export default LikedPage;
