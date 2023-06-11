interface LoginState {
  isLoggedIn: boolean;
  accessToken: string | null;
}

const initialState: LoginState = {
  isLoggedIn: false,
  accessToken: null,
};

enum ActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

interface LoginAction {
  type: ActionTypes.LOGIN;
  payload: {
    accessToken: string;
  };
}

interface LogoutAction {
  type: ActionTypes.LOGOUT;
}

type Action = LoginAction | LogoutAction;

const loginReducer = (state: LoginState = initialState, action: Action): LoginState => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        accessToken: action.payload.accessToken,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        accessToken: null,
      };
    default:
      return state;
  }
};

export const loginAction = (accessToken: string): LoginAction => ({
  type: ActionTypes.LOGIN,
  payload: {
    accessToken,
  },
});

export const logoutAction = (): LogoutAction => ({
  type: ActionTypes.LOGOUT,
});

export default loginReducer;
