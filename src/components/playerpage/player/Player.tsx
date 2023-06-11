// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// import "./player.css";

// declare global {
//   interface Window {
//     YT: any;
//     onYouTubeIframeAPIReady: () => void;
//   }
// }

// // ... imports and other code ...

// const Player = () => {
//   const { videoId } = useParams<{ videoId: string }>();

//   useEffect(() => {
//     const tag = document.createElement("script");
//     tag.src = "https://www.youtube.com/iframe_api";
//     const firstScriptTag = document.getElementsByTagName("script")[0];
//     if (firstScriptTag) {
//       firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
//     }

//     const onPlayerReady = (event: any) => {
//       event.target.playVideo();
//     };

//     const onPlayerStateChange = (event: any) => {
//     };

//     window.onYouTubeIframeAPIReady = () => {
//       const player = new window.YT.Player("player", {
//         height: "500px",
//         width: "500px",
//         overflow: "hidden",
//         videoId: videoId,
//         events: {
//           onReady: onPlayerReady,
//           onStateChange: onPlayerStateChange,
//         },
//       });
//     };

//     if (window.YT && window.YT.Player) {
//       // If the YouTube API script has already loaded and the player instance exists
//       // Update the videoId of the player manually
//       const player = new window.YT.Player("player", {
//         height: "500px",
//         width: "500px",
//         overflow: "hidden",
//         videoId: videoId,
//         events: {
//           onReady: onPlayerReady,
//           onStateChange: onPlayerStateChange,
//         },
//       });
//     }

//     return () => {
//       // Cleanup logic if needed
//     };
//   }, [videoId]);

//   return (
//     <div className="player-container">
//       <div className="player-aspect-ratio">
//         <div id="player"></div>
//       </div>
//     </div>
//   );
// };

// export default Player;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./player.css";

const Player = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const apiKey = process.env.REACT_APP_API_KEY;
  const [videoUrl, setVideoUrl] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className="player-container">
      <div className="player-aspect-ratio">
        <div className="player" dangerouslySetInnerHTML={{ __html: videoUrl }} />
      </div>
    </div>
  );
};

export default Player;
