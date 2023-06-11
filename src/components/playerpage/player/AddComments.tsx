import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import axios from "axios";
import "./addcomments.css";

const AddComments = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [commentText, setCommentText] = useState("");
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn);

  const handleCommentSubmit = async (event: any) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("access_token");
    const apiKey = process.env.REACT_APP_API_KEY;

    if (accessToken) {
      try {
        const response = await axios.post(
          `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&key=${apiKey}`,
          {
            snippet: {
              topLevelComment: {
                snippet: {
                  videoId: videoId,
                  textOriginal: commentText,
                },
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Access token not available");
    }
  };

  const handleInputChange = (event: any) => {
    setCommentText(event.target.value);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <div id="add_comments_container">
            <img
              id="add_comments_image"
              alt="Default profile photo"
              src="https://yt3.ggpht.com/a/default-user=s88-c-k-c0x00ffffff-no-rj"
            />
            <div className="flex_row">
              <form onSubmit={handleCommentSubmit} id="comments_form">
                <input
                  id="comment_textarea"
                  value={commentText}
                  onChange={handleInputChange}
                  placeholder="Add a comment..."
                ></input>
              </form>
              <div className="comment_extraspace"></div>
            </div>
          </div>
        </>
      ) : (
        <>
         <div id="add_comments_container">
            <img
              id="add_comments_image"
              alt="Default profile photo"
              src="https://yt3.ggpht.com/a/default-user=s88-c-k-c0x00ffffff-no-rj"
            />
            <div className="flex_row">
              PleaseLogin First
              <div className="comment_extraspace"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddComments;
