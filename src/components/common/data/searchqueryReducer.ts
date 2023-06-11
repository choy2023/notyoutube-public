import { AnyAction } from "redux";

export interface SearchQuery {
  searchQuery: string | undefined;
}

const initialState: SearchQuery = {
  searchQuery: ""
};

const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";

export const setSearchQuery = (query: any): AnyAction => {
  return {
    type: SET_SEARCH_QUERY,
    payload: query,
  };
};

const searchQueryReducer = (state: SearchQuery = initialState, action: AnyAction): SearchQuery => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }

};

export default searchQueryReducer;
