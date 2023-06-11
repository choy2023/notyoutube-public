import React from "react";

import { deleteSubscriptionAPI } from "./data/LoginYoutubeAPI";

const cancelbtn = ({ channelId }: { channelId: string }) => {
  const deleteSubscription = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        await deleteSubscriptionAPI(accessToken, channelId);
        console.log("Subscription deleted successfully");
      }
    } catch (error) {
      console.error("Error deleteing subscription:", error);
    }
  };

  return <div onClick={deleteSubscription}>cancelbtn</div>;
};

export default cancelbtn;
