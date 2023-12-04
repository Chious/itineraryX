import axios from 'axios';
import moment from 'moment';
import { useContext, createContext, useReducer } from 'react';

const baseUrl = import.meta.env.VITE_BASE_URL;
const token = import.meta.env.VITE_USER_TOKEN;
const config = { headers: { Authorization: `Bearer ${token}` } };

//////////////////// axios ////////////////////

//  透過 id 取得指定行程的資訊
export const getItinerary = async (id) => {
  const url = baseUrl + `/itineraries/${id}`;

  try {
    const res = await axios.get(url, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 透過行程的 id & 日期 獲取行程景點資料
export const getDestinations = async (id, date) => {
  try {
    const url = baseUrl + `/destinations/?itineraryId=${id}&date=${date}`;
    const res = await axios.get(url, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 新增Place資料
export const postMaps = async (placeId) => {
  try {
    const url = baseUrl + `/maps`;
    const reqBody = { placeId: placeId };
    const res = await axios.post(url, reqBody, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
// 新增Destination資料
export const postDestinations = async (itineraryId, datetime, placeId) => {
  try {
    const url = baseUrl + `/destinations`;
    const reqBody = {
      itineraryId: itineraryId,
      date: datetime,
      placeId: placeId,
    };
    const res = await axios.post(url, reqBody, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 修改Destination資料
export const patchDestinations = async (destinationId, date) => {
  try {
    const url = baseUrl + `/destinations`;
    const reqBody = {
      destinationId: destinationId,
      date: date,
    };
    const res = await axios.patch(url, reqBody, config);
  } catch (error) {
    console.log(error);
  }
};

// 刪除Destination資料
export const deleteDestinations = async (destinationId) => {
  try {
    const url = baseUrl + `/destinations/${destinationId}`;
    const res = await axios.delete(url, config);
  } catch (error) {
    console.log(error);
  }
};

// 取得兩個景點間的交通路線資訊
export const getRoutes = async (itId, oId, dId) => {
  try {
    const url =
      baseUrl +
      `/routes/?itineraryId=${itId}&originId=${oId}&destinationId=${dId}`;
    const res = await axios.get(url, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 新增兩個景點之間的交通路線資訊
export const postRoutes = async (reqBody) => {
  try {
    const url = baseUrl + `/routes`;
    const res = await axios.post(url, reqBody, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

// 修改兩個景點之間的交通方式
export const patchRoutes = async (routeId, mode) => {
  try {
    const url = baseUrl + `/routes`;
    const reqBody = {
      routeId: routeId,
      transportationMode: mode,
    };
    const res = await axios.patch(url, reqBody, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

//////////////////// reducer ////////////////////

const TripInfoContext = createContext();
const TripInfoDispatchContext = createContext();
const RoutesContext = createContext();
const RoutesDispatchContext = createContext();
const PlaceInfoContext = createContext();
const PlaceInfoDispatchContext = createContext();

export const tripInfo_actions = {
  SET_IS_Loaded: 'SET_IS_Loaded',
  SET_ITINERARY: 'SET_ITINERARY', // 儲存行程的資訊
  ADD_DAY: 'ADD_DAY', // 新增天數
  DELETE_DAY: 'DELETE_DAY', // 刪除天數
  SET_DESTINATIONS: 'SET_DESTINATIONS', // 儲存行程中的所有景點
  ADD_DESTINATION: 'ADD_DESTINATION', // 將景點加入行程
  CHANGE_DESTINATION_TIME: 'CHANGE_DESTINATION_TIME', // 修改景點的抵達時間
  DELETE_DESTINATION: 'DELETE_DESTINATION', // 刪除行程中的景點
};

export const routes_actions = {
  SET_IS_Loaded: 'SET_IS_Loaded',
  SET_ROUTES: 'SET_ROUTES', // 儲存交通路線資訊陣列
};

export const placeInfo_actions = {
  // GET_PLACE_INFO: 'GET_PLACE_INFO', // 取得搜尋景點的資訊
  SET_PLACE_INFO: 'SET_PLACE_INFO', // 暫存搜尋景點的資訊
  DELETE_PLACE_INFO: 'DELETE_PLACE_INFO', // 刪除搜尋景點的資訊
};

function tripInfoReducer(tripInfo, action) {
  switch (action.type) {
    case tripInfo_actions.SET_IS_Loaded: {
      const newTripInfo = JSON.parse(JSON.stringify(tripInfo));
      newTripInfo.isLoaded = action.payload;
      return newTripInfo;
    }
    case tripInfo_actions.SET_ITINERARY: {
      const newTripInfo = JSON.parse(JSON.stringify(tripInfo));
      const newItinerary = JSON.parse(JSON.stringify(action.payload));
      newTripInfo.itinerary = newItinerary;
      return newTripInfo;
    }
    case tripInfo_actions.SET_DESTINATIONS: {
      const newTripInfo = JSON.parse(JSON.stringify(tripInfo));
      const newDestinations = JSON.parse(JSON.stringify(action.payload));
      newTripInfo.destinations = newDestinations;
      return newTripInfo;
    }
    case tripInfo_actions.ADD_DESTINATION: {
      const { day, date, id, Place } = action.payload;
      const utcDate = moment(date).utc(); // 將時間轉為UTC時間
      const newTripInfo = JSON.parse(JSON.stringify(tripInfo));
      const destinationsByDay = newTripInfo.destinations[day];
      // 尋找新景點的插入位置
      let insertionId = undefined;
      destinationsByDay.forEach((_, index) => {
        const beforeDate = moment(destinationsByDay[index].date).utc();
        const afterDate = moment(destinationsByDay[index + 1]?.date).utc();
        if (index === 0 && utcDate.isBefore(beforeDate)) insertionId = 0;
        if (beforeDate.isBefore(utcDate) && afterDate.isAfter(utcDate))
          insertionId = index + 1;
      });
      if (insertionId === undefined) insertionId = destinationsByDay.length;
      // 將新景點插入景點陣列
      const newDestination = {
        ...Place, // id 為 placeId
        destinationId: id, // destinationId 為 destinationId
        date: date,
      };
      newTripInfo.destinations[day].splice(insertionId, 0, newDestination);
      return newTripInfo;
    }
    case tripInfo_actions.CHANGE_DESTINATION_TIME: {
      const { destinationId, datetime } = action.payload;
      const newDestinations = tripInfo.destinations.map((destinationsByDay) => {
        return destinationsByDay.map((destination) => {
          if (destination.destinationId === destinationId)
            return {
              ...destination,
              date: datetime, // utc time
            };
          // 將景點時間修改成新的時間
          else return destination;
        });
      });
      // 重新排序景點
      newDestinations.forEach((destinationsByDay) =>
        destinationsByDay.sort(function (a, b) {
          return moment(a.date).diff(moment(b.date));
        })
      );
      const newTripInfo = JSON.parse(JSON.stringify(tripInfo));
      newTripInfo.destinations = newDestinations;
      return newTripInfo;
    }
    case tripInfo_actions.DELETE_DESTINATION: {
      const { dayIndex, order } = action.payload;
      const newTripInfo = JSON.parse(JSON.stringify(tripInfo));
      newTripInfo.destinations[dayIndex].splice(order, 1);
      return newTripInfo;
    }
    default: {
      console.log('tripInfo dispatch error');
      break;
    }
  }
}

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

export function TripInfoProvider({ children }) {
  const [tripInfo, tripInfoDispatch] = useReducer(tripInfoReducer, {
    isLoaded: false,
    itinerary: {},
    destinations: [],
  });

  return (
    <TripInfoContext.Provider value={tripInfo}>
      <TripInfoDispatchContext.Provider value={tripInfoDispatch}>
        {children}
      </TripInfoDispatchContext.Provider>
    </TripInfoContext.Provider>
  );
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

export function useTripInfo() {
  return useContext(TripInfoContext);
}

export function useTripInfoDispatch() {
  return useContext(TripInfoDispatchContext);
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
