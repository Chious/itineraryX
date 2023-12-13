import { useContext, createContext, useReducer } from 'react';

//////////////////// actions ////////////////////

export const routesInfo_actions = {
  SET_IS_Loaded: 'SET_IS_Loaded', // 設置載入的狀態
  SET_ROUTES: 'SET_ROUTES', // 儲存交通路線資訊陣列
};

//////////////////// reducer ////////////////////

function routesInfoReducer(routesInfo, action) {
  switch (action.type) {
    case routesInfo_actions.SET_IS_Loaded: {
      const newRoutesInfo = JSON.parse(JSON.stringify(routesInfo));
      const true_or_false = action.payload;
      newRoutesInfo.isLoaded = true_or_false;
      return newRoutesInfo;
    }
    case routesInfo_actions.SET_ROUTES: {
      const newRoutesInfo = JSON.parse(JSON.stringify(routesInfo));
      const newRoutes = JSON.parse(JSON.stringify(action.payload));
      newRoutesInfo.routes = newRoutes;
      return newRoutesInfo;
    }
    default: {
      console.log('routesInfo dispatch error');
      break;
    }
  }
}

//////////////////// context ////////////////////

const RoutesInfoContext = createContext();
const RoutesInfoDispatchContext = createContext();

export function RoutesInfoProvider({ children }) {
  const [routesInfo, routesInfoDispatch] = useReducer(routesInfoReducer, {
    isLoaded: false,
    routes: [],
  });

  return (
    <RoutesInfoContext.Provider value={routesInfo}>
      <RoutesInfoDispatchContext.Provider value={routesInfoDispatch}>
        {children}
      </RoutesInfoDispatchContext.Provider>
    </RoutesInfoContext.Provider>
  );
}

export function useRoutesInfo() {
  return useContext(RoutesInfoContext);
}

export function useRoutesInfoDispatch() {
  return useContext(RoutesInfoDispatchContext);
}
