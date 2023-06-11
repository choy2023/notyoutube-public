import { AnyAction } from "redux";

export interface ProfileId {
    profileId: string | undefined;
}

const initialState: ProfileId = {
    profileId: undefined
};

// Define action types
const SET_CURRENT_PROFILE_ID = "SET_CURRENT_PROFILE_ID";

// Define action creators
export const setCurrentprofileId = (profileId: string | undefined): AnyAction => ({
    type: SET_CURRENT_PROFILE_ID,
    payload: { profileId },
  });

// Define reducer
const profileIdReducer = (state: ProfileId = initialState, action: AnyAction): ProfileId => {
    switch (action.type) {
        case SET_CURRENT_PROFILE_ID:
            return { ...state, profileId: action.payload.profileId };
        default:
            return state;
    }
};

export default profileIdReducer;