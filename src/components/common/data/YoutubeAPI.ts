import axios from 'axios';



const apiKey = process.env.REACT_APP_API_KEY;
// const apiHost = process.env.REACT_APP_API_HOST

// const headers = {
//     'X-RapidAPI-Key': apiKey,
//     'X-RapidAPI-Host': apiHost
// }

// Get Most Popular Videos

export interface VideoListData {
  id: string | undefined
}

export const GetVideoListAPI = async () => {

  const videoListResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=1&key=${apiKey}`
  );


  const contents = videoListResponse.data.items || [];

  const videoSearchData = contents.map((content: any) => ({
    id: content.id,
  }));

  return videoSearchData;
}

export const GetRegionCategoriesAPI = async (regionCode:any, maxResults:any) => {
  try {
    let categories:any = [];
    let nextPageToken = '';

    while (categories.length < maxResults) {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=${regionCode}&key=${apiKey}&maxResults=10&pageToken=${nextPageToken}`);
      const categoryItems = response.data.items;

      categories = categories.concat(categoryItems.map((category:any) => ({
        id: category.id,
        title: category.snippet.title,
      })));

      nextPageToken = response.data.nextPageToken;

      if (!nextPageToken) {
        break; 
      }
    }

    categories = categories.slice(0, maxResults);

    return categories;
  } catch (error) {
    console.log("Error in GetRegionCategoriesAPI", error);
    return [];
  }
};

export const GetVideoListCategoryIdAPI = async (categoryId: any) => {
  const videoListResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=1&key=${apiKey}&videoCategoryId=${categoryId}`
  )

  const contents = videoListResponse.data.items || [];

  const videoIds = contents.map((content: any) => content.id);

  return videoIds;
}

export const GetShortsListAPI = async () => {
  const shortListResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=3&key=${apiKey}`
  );

  const contents = shortListResponse.data.items || [];

  const shortIds = contents.map((content: any) => content.id);

  return shortIds;
};

// Get Video Tags

export const GetVideoTagsAPI = async (videoId: string) => {

  const videoTagsResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
  );
  const tags = videoTagsResponse.data.items[0].snippet.tags || [];
  return tags.slice(0, 1)

}


// Search Videos

export const GetSearchListAPI = async (searchquery: any) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchquery}&maxResults=1&key=${apiKey}`
    );

    const items = response.data.items || [];

    const videoSearchData = items.map((item: any) => ({
      id: item.id.videoId,
    }));

    return videoSearchData;
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      throw new Error("Queries per day exceeded. Please come back tomorrow.");
    } else {
      throw new Error(`Error occurred in GetSearchListAPI: ${error}`);
    }
  }
};


// Get Video details
export interface VideoData {
  id: string | undefined
  title: string
  description: string
  thumbnails: string
  channelTitle: string
  viewCount: number
  likeCount: string
  channelThumbnail: string
  publishedAt: string
  defaultthumbnails: string
  highthumbnails: string
  maxresthumbnails: string
  mediumthumbnails: string
  standardthumbnails: string
}


export const VideoDetailAPI = async (videoId: string | undefined) => {
  const videoDetailsResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=${apiKey}`
  );

  const video = videoDetailsResponse.data.items[0];

  if (!video || !video.snippet) {
    return {};
  }

  console.log(video)

  const categoryId = video.snippet.categoryId;
  const channelId = video.snippet.channelId;
  const channelTitle = video.snippet.channelTitle;
  const description = video.snippet.description;
  const publishedAt = video.snippet.publishedAt;
  const title = video.snippet.title;
  const commentCount = video.statistics?.commentCount;
  const likeCount = video.statistics?.likeCount;
  const viewCount = video.statistics?.viewCount;
  const defaultthumbnails = video.snippet.thumbnails?.default?.url;
  const highthumbnails = video.snippet.thumbnails?.high?.url;
  const maxresthumbnails = video.snippet.thumbnails?.maxres?.url;
  const mediumthumbnails = video.snippet.thumbnails?.medium?.url;
  const standardthumbnails = video.snippet.thumbnails?.standard?.url;

  return {
    title,
    description,
    channelTitle,
    publishedAt,
    commentCount,
    likeCount,
    viewCount,
    channelId,
    defaultthumbnails,
    highthumbnails,
    maxresthumbnails,
    mediumthumbnails,
    standardthumbnails,
  };
};

export const GetChannelDetailAPI = async (channelId: string) => {
  const channelDetailsResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=brandingSettings,snippet,statistics&key=${apiKey}`
  );

  const channelDetails = channelDetailsResponse.data.items[0];
  const channelThumbnail = channelDetails.snippet.thumbnails.default.url;
  const channelcustomUrl = channelDetails.snippet.customUrl;
  const channelDescription = channelDetails.snippet.description;
  const channelTitle = channelDetails.snippet.title;
  const subscriberCount = channelDetails.statistics.subscriberCount;
  const channelbrandingBackground = channelDetails.brandingSettings.image.bannerExternalUrl;
  const channelVideoCount = channelDetails.statistics.videoCount;



  return { channelbrandingBackground, channelThumbnail, subscriberCount, channelcustomUrl, channelTitle, channelDescription, channelVideoCount };
}



// Get List of videoId with channelId

export const getChannelVideoIds = async (channelId: any) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`
    )

    const videoIds = response.data.items.map((item: any) => item.id.videoId);
    return videoIds;
  } catch (error) {
    console.error('Error retrieving video IDs:', error);
  }
}







// Get List of related Videos


export const RelateVideoListAPI = async (videoId: string | undefined) => {
  try {
    const relatedVideosResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=${apiKey}&maxResults=2`
    );

    const relatedVideos = relatedVideosResponse.data.items;

    if (!relatedVideos || relatedVideos.length === 0) {
      return [];
    } return relatedVideos.map((item: any) => {
      const { id } = item;
      return {
        id: id.videoId,
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};


// Get List of video Comments

export const VideoComentsAPI = async (videoId: string | undefined) => {
  try {
    const videoCommentsResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=2`
    );
    const comment = videoCommentsResponse.data.items[0];
    if (!comment || !comment.snippet) {
      return {};
    }

    const comments = videoCommentsResponse.data.items.map((item: any) => {
      if (!item || !item.snippet || !item.snippet.topLevelComment || !item.snippet.topLevelComment.snippet) {
        return {};
      }

      const commentId = item.id;
      const authorChannelId = item.snippet.topLevelComment.snippet.authorChannelId;
      const authorChannelUrl = item.snippet.topLevelComment.snippet.authorChannelUrl;
      const authorDisplayName = item.snippet.topLevelComment.snippet.authorDisplayName;
      const authorProfileImageUrl = item.snippet.topLevelComment.snippet.authorProfileImageUrl;
      const likeCount = item.snippet.topLevelComment.snippet.likeCount;
      const publishedAt = item.snippet.topLevelComment.snippet.publishedAt;
      const textDisplay = item.snippet.topLevelComment.snippet.textDisplay;
      const updatedAt = item.snippet.topLevelComment.snippet.updatedAt;
      const totalReplyCount = item.snippet.topLevelComment.totalReplyCount;


      return { commentId, authorChannelId, authorChannelUrl, authorDisplayName, authorProfileImageUrl, likeCount, publishedAt, textDisplay, updatedAt, totalReplyCount };
    });

    return comments;
  } catch (error) {
    console.error(error);
    return [];
  }
};


