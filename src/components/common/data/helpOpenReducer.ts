const OPEN_HELPER = "OPEN_HELPER";
const CLOSE_HELPER = "CLOSE_HELPER";

export const initialState = {
    isOpen: false,
  };
  
  const helpOpenReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case OPEN_HELPER:
        return {
          ...state,
          isOpen: true,
        };
      case CLOSE_HELPER:
        return {
          ...state,
          isOpen: false,
        };
      default:
        return state;
    }
  };
  
  export const openHelper = () => ({
    type: OPEN_HELPER,
  });
  
  export const closeHelper = () => ({
    type: CLOSE_HELPER,
  });
  
  export default helpOpenReducer;