import { useContext, createContext, useReducer } from 'react';

//////////////////// actions ////////////////////

export const placeInfo_actions = {
  SET_PLACE_INFO: 'SET_PLACE_INFO', // 暫存景點搜尋結果 (from Google Map Autocomplete)
  DELETE_PLACE_INFO: 'DELETE_PLACE_INFO', // 刪除景點搜尋結果
};

//////////////////// reducer ////////////////////

function placeInfoReducer(placeInfo, action) {
  switch (action.type) {
    case placeInfo_actions.SET_PLACE_INFO: {
      const placeData = action.payload;
      return { ...placeData };
    }
    case placeInfo_actions.DELETE_PLACE_INFO: {
      return {};
    }
    default: {
      console.log('placeInfo dispatch error');
      break;
    }
  }
}

//////////////////// context ////////////////////

const PlaceInfoContext = createContext();
const PlaceInfoDispatchContext = createContext();

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

export function usePlaceInfo() {
  return useContext(PlaceInfoContext);
}

export function usePlaceInfoDispatch() {
  return useContext(PlaceInfoDispatchContext);
}
