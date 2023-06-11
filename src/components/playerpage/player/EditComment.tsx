import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditComment = ({
  commentId,
  initialCommentText,
  
}: any) => {
  const [commentText, setCommentText] = useState(initialCommentText);

  const handleCommentSubmit = async (event: any) => {
    event.preventDefault();
  
    const accessToken = localStorage.getItem("access_token");
    const apiKey = process.env.REACT_APP_API_KEY;
  
    if (accessToken) {
      try {
        const response = await axios.put(
          `https://youtube.googleapis.com/youtube/v3/comments?part=snippet&key=${apiKey}`,
          {
            id: commentId,
            snippet: {
              textOriginal: commentText,
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

  console.log(commentId)


  return (
    <>
      <div className="flex_row">
        <form onSubmit={handleCommentSubmit} id="comments_form">
          <input
            id="comment_textarea"
            value={commentText}
            onChange={handleInputChange}
            placeholder={initialCommentText}
          ></input>
          <button type="submit">Update</button>
        </form>
        <div className="comment_extraspace"></div>
      </div>
    </>
  );
};

export default EditComment;
