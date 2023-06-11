import React, { useState, useEffect } from "react";
import { getTimeAgo } from "../../common/data/Common";
import { useSelector } from "react-redux";
import { VideoComentsAPI } from "../../common/data/YoutubeAPI";
import { useParams } from "react-router-dom";
import AddComments from "./AddComments";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import "./comments.css";

const Comments = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [comments, setComments] = useState<any[]>([]);
  const profileId = useSelector((state: any) => state.profileId.profileId);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [commentId, setCommentId] = useState<string | null>(null);
  const [initialText, setInitialText] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await VideoComentsAPI(videoId);
      setComments(response);
    };

    fetchComments();
  }, [videoId]);

  const handleEditClick = (commentId: string, initialCommentText: string) => {
    setIsEditOpen(true);
    setCommentId(commentId);
    setInitialText(initialCommentText);
  };

  const handleDeleteClick = (
    commentId: string,
    initialCommentText: string,
    isDeleteOpen: boolean
  ) => {
    setIsDeleteOpen(true);
    setCommentId(commentId);
    setInitialText(initialCommentText);
  };

  return (
    <div className="">
      <AddComments />
      {isEditOpen ? (
        <EditComment commentId={commentId} initialCommentText={initialText} />
      ) : isDeleteOpen ? (
        <DeleteComment
          commentId={commentId}

        />
      ) : (
        comments.map((comment, index) => {
          if (comment.authorChannelId.value === profileId) {
            return (
              <div key={index}>
                <div className="detail_renderer" id="player_comments_container">
                  <div className="videocard_left">
                    <img
                      className="videocard_left_thumbnail"
                      src={comment.authorProfileImageUrl}
                      alt={comment.authorDisplayName}
                    ></img>
                  </div>
                  <div className="videocard_right" id="comment_right_section">
                    <div
                      className="videocard_title"
                      id="player_comments_videocard_right"
                    >
                      {comment.authorDisplayName}
                      <br />
                      <div id="videocard_right_pusblishedat">
                        {getTimeAgo(comment.publishedAt)}
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            handleEditClick(
                              comment.commentId,
                              comment.textDisplay
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteClick(
                              comment.commentId,
                              comment.textDisplay,
                              isDeleteOpen
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="videocard_right_statics">
                      {/* {getTimeAgo(comment.updatedAt)} */}
                    </div>
                    <div className="videocard_right_textdisplay">
                      <div>{comment.textDisplay}</div>
                    </div>
                  </div>
                  {/* <div>{comment.likeCount}</div> */}
                  <div className="comment_totalreplycount">
                    {comment.totalReplyCount}
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index}>
                <div className="detail_renderer" id="player_comments_container">
                  <div className="videocard_left">
                    <img
                      className="videocard_left_thumbnail"
                      src={comment.authorProfileImageUrl}
                      alt={comment.authorDisplayName}
                    ></img>
                  </div>
                  <div className="videocard_right" id="comment_right_section">
                    <div
                      className="videocard_title"
                      id="player_comments_videocard_right"
                    >
                      {comment.authorDisplayName}
                      <br />
                      <div id="videocard_right_pusblishedat">
                        {getTimeAgo(comment.publishedAt)}
                      </div>
                    </div>
                    <div className="videocard_right_statics">
                      {/* {getTimeAgo(comment.updatedAt)} */}
                    </div>
                    <div className="videocard_right_textdisplay">
                      <div>{comment.textDisplay}</div>
                    </div>
                  </div>
                  {/* <div>{comment.likeCount}</div> */}
                  <div className="comment_totalreplycount">
                    {comment.totalReplyCount}
                  </div>
                </div>
              </div>
            );
          }
        })
      )}
    </div>
  );
};

export default Comments;
