import { useContext, createContext, useReducer } from 'react';

//////////////////// actions ////////////////////

export const routes_actions = {
  SET_IS_Loaded: 'SET_IS_Loaded', // 設置載入的狀態
  SET_ROUTES: 'SET_ROUTES', // 儲存交通路線資訊陣列
};

//////////////////// reducer ////////////////////

function routesReducer(routes, action) {
  switch (action.type) {
    case routes_actions.SET_IS_Loaded: {
      const newRoutesState = JSON.parse(JSON.stringify(routes));
      const true_or_false = action.payload;
      newRoutesState.isLoaded = true_or_false;
      return newRoutesState;
    }
    case routes_actions.SET_ROUTES: {
      const newRoutesState = JSON.parse(JSON.stringify(routes));
      const newRoutes = JSON.parse(JSON.stringify(action.payload));
      newRoutesState.routes = newRoutes;
      return newRoutesState;
    }
    default: {
      console.log('routes dispatch error');
      break;
    }
  }
}

//////////////////// context ////////////////////

const RoutesContext = createContext();
const RoutesDispatchContext = createContext();

export function RoutesProvider({ children }) {
  const [routes, routesDispatch] = useReducer(routesReducer, {
    isLoaded: false,
    routes: [],
  });

  return (
    <RoutesContext.Provider value={routes}>
      <RoutesDispatchContext.Provider value={routesDispatch}>
        {children}
      </RoutesDispatchContext.Provider>
    </RoutesContext.Provider>
  );
}

export function useRoutes() {
  return useContext(RoutesContext);
}

export function useRoutesDispatch() {
  return useContext(RoutesDispatchContext);
}
