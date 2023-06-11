import React, { useState } from "react";
import { connect } from "react-redux";
import { setSearchQuery } from "../../data/searchqueryReducer";
import { useNavigate } from 'react-router-dom';

import Searchicon from "./search/Searchicon";
import "./center.css";

const Center = ({ searchQuery, setSearchQuery }: any) => {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
    navigate("/");
  };

  const handleInputChange = (e: any) => {
    setLocalSearchQuery(e.target.value);
  };

  return (
    <div className="search_box">
      <form className="search_form" onSubmit={handleSubmit}>
        <div className="search_container">
          <div className="search_input">
            <input
              id="search"
              name="search_query"
              type="text"
              placeholder="Search"
              aria-haspopup="false"
              aria-autocomplete="list"
              dir="ltr"
              className="ytd_searchbox"
              value={localSearchQuery}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
      <button aria-label="search" className="ytd_searchicon" onClick={handleSubmit}>
        <Searchicon />
      </button>
    </div>
  );
};

export default connect(null, { setSearchQuery })(Center);
