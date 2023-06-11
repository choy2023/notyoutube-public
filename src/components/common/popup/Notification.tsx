import React from "react";
import { Link } from "react-router-dom";

import "./notification.css";

const Notification = () => {
  return (
    <div className="bottom_right_container">
      <b>Notification</b>
      <p>
        Need to log in twice, technically log in once, and click the login
        button again, and then go back to the homepage to be able to log in. As
        I am getting a token with a params, I'm not sure how to solve this
        problem. I really do not want to use an external API, but if you want
        to, you can just use
        <Link
          id="link_color"
          to="https://github.com/JustinBeckwith/google-oauth2-javascript"
        >
          google-oauth2-javascript
        </Link>
        this will solve the problem very easily.
      </p>
    </div>
  );
};

export default Notification;
