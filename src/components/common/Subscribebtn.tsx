import React, { useEffect, useState } from "react";
import { getSubscriptionListAPI } from "./data/LoginYoutubeAPI";
import AppendBtn from "./appendbtn";
import CancelBtn from "./cancelbtn";

const SubscribeBtn = ({ channelId }: { channelId: string }) => {
  const accessToken = localStorage.getItem("access_token");
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchSubscriptionList = async () => {
      try {
        const subscriptionList: any[] = await getSubscriptionListAPI(accessToken);
        const subscribedChannels = subscriptionList.map((item: any) => item.id);
        setIsSubscribed(subscribedChannels.includes(channelId));
      } catch (error) {
        console.error(error);
      }
    };

    if (accessToken) {
      fetchSubscriptionList();
    }
  }, [accessToken, channelId]);

  return (
    <div>
      {isSubscribed ? <CancelBtn channelId={channelId}/> : <AppendBtn channelId={channelId}/>}
    </div>
  );
};

export default SubscribeBtn;