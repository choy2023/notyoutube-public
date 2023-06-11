export const getTimeAgo = (time: string | Date) => {
  const now = new Date();
  const diff = now.getTime() - new Date(time).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365.25);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 4) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else if (years >= 1) {
    return `${years} years ago`;
  }
};

  export function getFormattedViewCount(viewCount: number): string {
    if (viewCount >= 1000000) {
      return `${Math.floor(viewCount / 1000000)}m views`;
    } else if (viewCount >= 1000) {
      return `${Math.floor(viewCount / 1000)}k views`;
    } else {
      return `${viewCount} views`;
    }
  }
  

  export function getFormattedSubscribeCount(subscriberCount: number): string {
    if (subscriberCount >= 1000000) {
      return `${Math.floor(subscriberCount / 1000000)}m subscribers`;
    } else if (subscriberCount >= 1000) {
      return `${Math.floor(subscriberCount / 1000)}k subscribers`;
    } else {
      return `${subscriberCount} subscribers`;
    }
  }
  
  export function getFormattedCommentsCount(commentCount: number): string {
    if (commentCount >= 1000000) {
      return `${Math.floor(commentCount / 1000000)}m Comments`;
    } else if (commentCount >= 1000) {
      return `${Math.floor(commentCount / 1000)}k Comments`;
    } else {
      return `${commentCount} Comments`;
    }
  }
  