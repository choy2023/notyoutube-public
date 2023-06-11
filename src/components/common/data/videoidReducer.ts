import { AnyAction } from "redux";

export interface VideoId {
  videoId: string | undefined;
}

const initialState: VideoId = {
  videoId: undefined,
};

// Define action types
const SET_CURRENT_VIDEO_ID = "SET_CURRENT_VIDEO_ID";

// Define action creators
export const setCurrentVideoId = (videoId: string | undefined): AnyAction => ({
  type: SET_CURRENT_VIDEO_ID,
  payload: { videoId },
});


// Define reducer
const videoIdReducer = (state: VideoId = initialState, action: AnyAction): VideoId => {
  switch (action.type) {
    case SET_CURRENT_VIDEO_ID:
      return { ...state, videoId: action.payload.videoId };
    default:
      return state;
  }
};

export default videoIdReducer;