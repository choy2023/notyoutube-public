import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../common/data/searchqueryReducer";

const Headertags = ({ tag }: any) => {

  const dispatch = useDispatch();


  const tagClick = () => {
    if (tag === "All") {
      dispatch(setSearchQuery(undefined));
    } else {
      dispatch(setSearchQuery(tag));
    }
  };

  return (
    <div className="tag_inner" onClick={tagClick}>
      {tag}
    </div>
  );
};

export default Headertags;
