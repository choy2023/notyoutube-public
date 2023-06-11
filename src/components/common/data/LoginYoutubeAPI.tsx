import axios from "axios";

// Get User Info
export const GetUserInfoAPI = async (accessToken:any) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/channels',
      {
        params: {
          part: 'contentDetails',
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Process the response data here
    console.log(response.data);
  } catch (error) {
    // Handle error
    console.error(error);
  }
};

// Get LikedVideos
export const GetLikedVideosAPI = async (accessToken: any) => {
  try {
    const likedVideosResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?`,
      {
        params: {
          myRating: "like",
          part: "snippet",
          maxResults: 1,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(likedVideosResponse)

    const videoItems = likedVideosResponse.data.items.map(
      (item: any) => item.id
    );

    console.log("videoItems",videoItems)

    return videoItems;
  } catch (error) {
    console.error("Error retrieving video IDs:", error);
  }
};

// Get Subscribe List
export const getSubscriptionListAPI = async (accessToken: any) => {
  try {
    const getSubscribeResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/subscriptions",
      {
        params: {
          mine: true,
          part: "snippet",
          maxResults: 2,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const subscribeList = getSubscribeResponse.data.items || [];

    if (!subscribeList || subscribeList.length === 0) {
      return [];
    }
    return subscribeList.map((item: any) => {
      const { channelId }: any = item.snippet.resourceId;

      return {
        id: channelId,
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Add Subscribe
export const addSubscriptionAPI = async (accessToken: any, channelId: string) => {
  try {
    const addSubscriptionResponse = await axios.post(
      'https://www.googleapis.com/youtube/v3/subscriptions',
      {
        snippet: {
          resourceId: {
            channelId: channelId
          }
        }
      },
      {
        params: {
          part: 'snippet'
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    console.log('Subscription added:', addSubscriptionResponse.data);

    return addSubscriptionResponse.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE Subscribe
export const deleteSubscriptionAPI = async (accessToken: any, channelId: string) => {
  try {
    const deleteSubscriptionResponse = await axios.delete(
      'https://www.googleapis.com/youtube/v3/subscriptions',
      {
        params: {
          part: 'snippet',
          channelId: channelId
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    console.log('Subscription deleted:', deleteSubscriptionResponse.data);
    return deleteSubscriptionResponse.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getUserProfileAPI = async (accessToken: any) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet",
          mine: true,
          maxResults: 2,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response)
    const channel = response.data.items[0];

    const profileId = channel.id;
    const profileImageURL = channel.snippet.thumbnails.default.url;

    return { profileImageURL, profileId };
  } catch (error) {
    console.error("Error retrieving user profile:", error);
  }
};


