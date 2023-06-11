import { AnyAction } from "redux";

export interface ChannelId {
    channelId: string | undefined;
}

const initialState: ChannelId = {
    channelId: undefined
};

// Define action types
const SET_CURRENT_CHANNEL_ID = "SET_CURRENT_CHANNEL_ID";

// Define action creators
export const setCurrentchannelId = (channelId: string | undefined): AnyAction => ({
    type: SET_CURRENT_CHANNEL_ID,
    payload: { channelId },
  });

// Define reducer
const channelIdReducer = (state: ChannelId = initialState, action: AnyAction): ChannelId => {
    switch (action.type) {
        case SET_CURRENT_CHANNEL_ID:
            return { ...state, channelId: action.payload.channelId };
        default:
            return state;
    }
};

export default channelIdReducer;