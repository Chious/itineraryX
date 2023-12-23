import { createContext, useContext, useReducer } from 'react';

//////////////////// reducer ////////////////////

export const auth_actions = {
  SET_CAN_EDIT: 'SET_CAN_EDIT', // set edit-permission
};

function authReducer(auth, action) {
  switch (action.type) {
    case auth_actions.SET_CAN_EDIT: {
      const newAuth = {
        canEdit: action.payload,
      };
      return newAuth;
    }
    default: {
      console.log('auth dispatch error');
      break;
    }
  }
}

//////////////////// context ////////////////////

const AuthContext = createContext();
const AuthDispatchContext = createContext();

export function AuthProvider({ children }) {
  const [auth, authDispatch] = useReducer(authReducer, { canEdit: false });

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={authDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}
