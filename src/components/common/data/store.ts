// import { createStore, AnyAction } from "redux";

// export interface VideoId {
//   videoId: string | undefined;
// }

// const initialState: VideoId = {
//   videoId: ""
// };

// // Define action types
// const SET_CURRENT_VIDEO_ID = "SET_CURRENT_VIDEO_ID";

// // Define action creators
// export const setCurrentVideoId = (videoId: string | undefined): AnyAction => ({
//   type: SET_CURRENT_VIDEO_ID,
//   payload: { videoId },
// });

// // Define reducer
// const videoIdReducer = (state: VideoId = initialState, action: AnyAction): VideoId => {
//   switch (action.type) {
//     case SET_CURRENT_VIDEO_ID:
//       return { ...state, videoId: action.payload.videoId };
//     default:
//       return state;
//   }
// };

// // Define an action type constant
// const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";

// // Create an action creator function
// export const setSearchQuery = (query:any) => {
//   return {
//     type: SET_SEARCH_QUERY,
//     payload: query,
//   };
// };

// // Define the search query reducer
// const searchQueryReducer = (state = initialState, action:any) => {
//   switch (action.type) {
//     case SET_SEARCH_QUERY:
//       return {
//         ...state,
//         searchQuery: action.payload,
//       };
//     default:
//       return state;
//   }
// };


// // Create store
// const store = createStore(searchQueryReducer);

// export default store;


import videoIdReducer from "./videoidReducer";
import searchQueryReducer from "./searchqueryReducer";
import errorMessageReducer from "./errormessageReducer";
import sidebarReducer from "./sidebarReducer";
import loginReducer from "./loginReducer";
import channelIdReducer from "./channelIdReducer";
import shortVideoIdReducer from "./shortVideoIdReducer";
import profileIdReducer from "./profileIdReducer";
import helpOpenReducer from "./helpOpenReducer";

import { combineReducers } from 'redux'

const allReducers = combineReducers({
  videoId: videoIdReducer,
  searchQuery: searchQueryReducer,
  errorMessage: errorMessageReducer,
  sidebarState: sidebarReducer,
  login: loginReducer,
  channelId: channelIdReducer,
  videoIds : shortVideoIdReducer,
  profileId : profileIdReducer,
  helperOpen : helpOpenReducer,
})
export default allReducers
