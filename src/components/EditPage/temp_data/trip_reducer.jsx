//////////////////// reducer ////////////////////

import moment from 'moment';
import { useContext, createContext, useReducer } from 'react';

const RoutesContext = createContext();
const RoutesDispatchContext = createContext();
const PlaceInfoContext = createContext();
const PlaceInfoDispatchContext = createContext();

export const routes_actions = {
  SET_IS_Loaded: 'SET_IS_Loaded',
  SET_ROUTES: 'SET_ROUTES', // 儲存交通路線資訊陣列
};

export const placeInfo_actions = {
  // GET_PLACE_INFO: 'GET_PLACE_INFO', // 取得搜尋景點的資訊
  SET_PLACE_INFO: 'SET_PLACE_INFO', // 暫存搜尋景點的資訊
  DELETE_PLACE_INFO: 'DELETE_PLACE_INFO', // 刪除搜尋景點的資訊
};

function routesReducer(routes, action) {
  switch (action.type) {
    case routes_actions.SET_IS_Loaded: {
      const newRoutesState = JSON.parse(JSON.stringify(routes));
      newRoutesState.isLoaded = action.payload;
      return newRoutesState;
    }
    case routes_actions.SET_ROUTES: {
      const newRoutesState = JSON.parse(JSON.stringify(routes));
      const newRoutes = JSON.parse(JSON.stringify(action.payload));
      newRoutesState.routes = newRoutes;
      return newRoutesState;
    }
    default:
      console.log('routes dispatch error');
      break;
  }
}

function placeInfoReducer(placeInfo, action) {
  switch (action.type) {
    case placeInfo_actions.SET_PLACE_INFO:
      const data = action.payload;
      return { ...placeInfo, ...data };
    case placeInfo_actions.DELETE_PLACE_INFO:
      return {};
    default:
      console.log('placeInfo dispatch error');
      break;
  }
}

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

export function PlaceInfoProvider({ children }) {
  const [placeInfo, placeInfoDispatch] = useReducer(placeInfoReducer, {});

  return (
    <PlaceInfoContext.Provider value={placeInfo}>
      <PlaceInfoDispatchContext.Provider value={placeInfoDispatch}>
        {children}
      </PlaceInfoDispatchContext.Provider>
    </PlaceInfoContext.Provider>
  );
}

export function useRoutes() {
  return useContext(RoutesContext);
}

export function useRoutesDispatch() {
  return useContext(RoutesDispatchContext);
}

export function usePlaceInfo() {
  return useContext(PlaceInfoContext);
}

export function usePlaceInfoDispatch() {
  return useContext(PlaceInfoDispatchContext);
}
