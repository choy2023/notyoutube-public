import React from "react";

import { addSubscriptionAPI } from "./data/LoginYoutubeAPI";

const AppendBtn = ({ channelId }: { channelId: string }) => {
  const addSubscription = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        await addSubscriptionAPI(accessToken, channelId);
        console.log("Subscription added successfully");
      }
    } catch (error) {
      console.error("Error adding subscription:", error);
    }
  };

  return <div onClick={addSubscription}>appendbtn</div>;
};

export default AppendBtn;
