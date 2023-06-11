import { AnyAction } from 'redux';

export interface ErrorMessage {
    errorMessage: string | undefined;
}

const initialState: ErrorMessage = {
    errorMessage: ""
};

// Define action types
const SET_CURRENT_ERROR_MESSAGE = "SET_CURRENT_ERROR_MESSAGE";

// Define action creators
export const setCurrentErrorMessage = (errorMessage: string | undefined): AnyAction => ({
    type: SET_CURRENT_ERROR_MESSAGE,
    payload: { errorMessage },
});

// Define reducer
const errorMessageReducer = (state: ErrorMessage = initialState, action: AnyAction): ErrorMessage => {
    switch (action.type) {
        case SET_CURRENT_ERROR_MESSAGE:
            return { ...state, errorMessage: action.payload.errorMessage };
        default:
            return state;
    }
};

export default errorMessageReducer;
