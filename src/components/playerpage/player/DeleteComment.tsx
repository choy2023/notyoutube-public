import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const DeleteComment = ({
  commentId,

}: any) => {

  const handleCommentSubmit = async (event: any) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("access_token");
    const apiKey = process.env.REACT_APP_API_KEY;

    if (accessToken) {
      try {
        const response = await axios.delete(
          `https://youtube.googleapis.com/youtube/v3/comments?id=${commentId}&key=${apiKey}`,
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


  const handleCancelbtn = () => {
  };


  console.log(commentId)


  return (
    <div className="Dialog_delete_comment">
        <div>Are You Sure to Delete</div>
        <button onClick={handleCommentSubmit}>Delete</button>
        <button onClick={handleCancelbtn}>Cancel</button>
      <div className="flex_row">
        <div className="comment_extraspace"></div>
      </div>
    </div>
  );
};

export default DeleteComment;
