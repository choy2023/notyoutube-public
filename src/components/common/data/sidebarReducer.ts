const OPEN_SIDEBAR = "OPEN_SIDEBAR";
const CLOSE_SIDEBAR = "CLOSE_SIDEBAR";

// Get the initial isOpen state based on the current link
const initialIsOpen = window.location.pathname === "/";

// Initial state
export const initialState = {
  isOpen: initialIsOpen,
};

// Reducer function
const sidebarReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        isOpen: true,
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

// Action creators
export const openSidebar = () => ({
  type: OPEN_SIDEBAR,
});

export const closeSidebar = () => ({
  type: CLOSE_SIDEBAR,
});

export default sidebarReducer;