import { AnyAction } from "redux";

export interface VideoIds {
    videoIds: string[];
}

const initialState: VideoIds = {
    videoIds: [],
};

// Define action types
const SET_CURRENT_VIDEO_IDS = "SET_CURRENT_VIDEO_IDS";

export const setCurrentVideoIds = (videoIds: string[]): AnyAction => ({
    type: SET_CURRENT_VIDEO_IDS,
    payload: { videoIds },
});

// Define reducer
const shortVideoIdReducer = (state: VideoIds = initialState, action: AnyAction): VideoIds => {
    switch (action.type) {

        case SET_CURRENT_VIDEO_IDS:
            return { ...state, videoIds: action.payload.videoIds };
        default:
            return state;
    }
};

export default shortVideoIdReducer;

