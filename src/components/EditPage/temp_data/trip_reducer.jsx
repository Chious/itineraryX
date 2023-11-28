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

// 取得兩個景點間的交通資訊
// export const getRoutes = async({ originId, destinationId }) => {

// };

// 新增兩個景點之間的交通資訊
// export const postDistances = async ({ reqBody }) => {
//   try {
//     const url = baseUrl + `/maps/distanceMatrix`;
//     const res = await axios.post(url, reqBody, config);
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

//////////////////// reducer ////////////////////

const IsLoadingContext = createContext();
const IsLoadingDispatchContext = createContext();
const ItineraryContext = createContext();
const ItineraryDispatchContext = createContext();
const DestinationsContext = createContext();
const DestinationsDispatchContext = createContext();
// const RoutesContext = createContext();
// const RoutesDispatchContext = createContext();
const PlaceInfoContext = createContext();
const PlaceInfoDispatchContext = createContext();

export const isLoading_actions = {
  SET_TRUE: 'SET_TRUE',
  SET_FALSE: 'SET_FALSE',
};

export const itinerary_actions = {
  ADD_DAY: 'ADD_DAY', // 新增天數
  SET_ITINERARY: 'SET_ITINERARY', // 儲存行程的資訊
  DELETE_DAY: 'DELETE_DAY', // 刪除天數
};

export const destinations_actions = {
  SET_DESTINATIONS: 'SET_DESTINATIONS', // 儲存行程中的所有景點
  ADD_DESTINATION: 'ADD_DESTINATION', // 將景點加入行程
  // GET_PLACE: 'GET_PLACE', // 搜尋景點
  CHANGE_DESTINATION_TIME: 'CHANGE_DESTINATION_TIME', // 修改景點的抵達時間
  DELETE_DESTINATION: 'DELETE_DESTINATION', // 刪除行程中的景點
};

// export const routes_actions = {
//   SET_START_END_POINTS: 'SET_START_END_POINTS', // 設置起終點陣列
//   SET_ROUTES: 'SET_ROUTES',
//   GET_ROUTES: 'GET_ROUTES', // 取得兩個景點間的交通資訊
//   ADD_ROUTES: 'ADD_ROUTES', // 新增兩個景點間的交通資訊
// };

export const placeInfo_actions = {
  // GET_PLACE_INFO: 'GET_PLACE_INFO', // 取得搜尋景點的資訊
  SET_PLACE_INFO: 'SET_PLACE_INFO', // 暫存搜尋景點的資訊
  DELETE_PLACE_INFO: 'DELETE_PLACE_INFO', // 刪除搜尋景點的資訊
};

function isLoadingReducer(isLoading, action) {
  switch (action.type) {
    case isLoading_actions.SET_TRUE:
      return true;
    case isLoading_actions.SET_FALSE:
      return false;
    default:
      console.log('isLoading dispatch error');
      break;
  }
}

function itineraryReducer(itinerary, action) {
  switch (action.type) {
    case itinerary_actions.SET_ITINERARY:
      const data = action.payload;
      const itinerary_data = JSON.parse(JSON.stringify(data));
      return itinerary_data;
    default:
      console.log('itinerary dispatch error');
      break;
  }
}

function destinationsReducer(destinations, action) {
  switch (action.type) {
    case destinations_actions.SET_DESTINATIONS: {
      const data = action.payload;
      const newDestinations = JSON.parse(JSON.stringify(data));
      return newDestinations;
    }
    case destinations_actions.ADD_DESTINATION: {
      const data = action.payload;
      const day = data.day;
      const newDate = moment(data.date).local();
      const destinationsByDay = destinations[day];
      let insertionId = undefined;
      destinationsByDay.forEach((_, index) => {
        const beforeDate = moment(destinationsByDay[index].date).local();
        const afterDate = moment(destinationsByDay[index + 1]?.date)?.local();
        if (index === 0 && newDate.isBefore(beforeDate)) insertionId = 0;
        if (beforeDate.isBefore(newDate) && afterDate.isAfter(newDate))
          insertionId = index + 1;
      });
      if (insertionId === undefined) insertionId = destinationsByDay.length;
      const newDestination = {
        ...data.Place, // id 為 placeId
        destinationId: data.id, // destinationId 為 destinationId
        date: data.date,
      };
      const newDestinations = JSON.parse(JSON.stringify(destinations));
      newDestinations[day].splice(insertionId, 0, newDestination);
      return newDestinations;
    }
    case destinations_actions.CHANGE_DESTINATION_TIME: {
      const { destinationId, datetime } = action.payload;
      const newDestinations = destinations.map((destinationsByDay) => {
        return destinationsByDay.map((item) => {
          if (item.destinationId === destinationId)
            return { ...item, date: datetime }; // 修改成新的景點時間
          else return item;
        });
      });
      newDestinations.map((destinationsByDay) =>
        destinationsByDay.sort(function (a, b) {
          return moment(a.date).diff(moment(b.date));
        })
      );
      return newDestinations;
    }
    case destinations_actions.DELETE_DESTINATION: {
      const dayIndex = action.dayIndex;
      const order = action.order;
      const newDestinations = JSON.parse(JSON.stringify(destinations));
      newDestinations[dayIndex].splice(order, 1);
      return newDestinations;
    }
    default:
      console.log('destinations dispatch error');
      break;
  }
}

// function routesReducer(routes, action) {
//   switch (action.type) {
//     case routes_actions.SET_ROUTES:
//       const data = action.payload;
//       const newRoutes = JSON.parse(JSON.stringify(data))
//       return newRoutes;
//     default:
//       console.log('distances dispatch error');
//       break;
//   }
// }

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

export function IsLoadingProvider({ children }) {
  const [isLoading, isLoadingDispatch] = useReducer(isLoadingReducer, true);

  return (
    <IsLoadingContext.Provider value={isLoading}>
      <IsLoadingDispatchContext.Provider value={isLoadingDispatch}>
        {children}
      </IsLoadingDispatchContext.Provider>
    </IsLoadingContext.Provider>
  );
}

export function ItineraryProvider({ children }) {
  const [itinerary, itineraryDispatch] = useReducer(itineraryReducer, {});

  return (
    <ItineraryContext.Provider value={itinerary}>
      <ItineraryDispatchContext.Provider value={itineraryDispatch}>
        {children}
      </ItineraryDispatchContext.Provider>
    </ItineraryContext.Provider>
  );
}

export function DestinationsProvider({ children }) {
  const [destinations, destinationsDispatch] = useReducer(
    destinationsReducer,
    []
  );

  return (
    <DestinationsContext.Provider value={destinations}>
      <DestinationsDispatchContext.Provider value={destinationsDispatch}>
        {children}
      </DestinationsDispatchContext.Provider>
    </DestinationsContext.Provider>
  );
}

// export function DistancesProvider({ children }) {
//   const [distances, distancesDispatch] = useReducer(distancesReducer, []);

//   return (
//     <DistancesContext.Provider value={distances}>
//       <DistancesDispatchContext.Provider value={distancesDispatch}>
//         {children}
//       </DistancesDispatchContext.Provider>
//     </DistancesContext.Provider>
//   );
// }

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

export function useIsLoading() {
  return useContext(IsLoadingContext);
}

export function useIsLoadingDispatch() {
  return useContext(IsLoadingDispatchContext);
}

export function useItinerary() {
  return useContext(ItineraryContext);
}

export function useItineraryDispatch() {
  return useContext(ItineraryDispatchContext);
}

export function useDestinations() {
  return useContext(DestinationsContext);
}

export function useDestinationsDispatch() {
  return useContext(DestinationsDispatchContext);
}

// export function useDistances() {
//   return useContext(DistancesContext);
// }

// export function useDistancesDispatch() {
//   return useContext(DestinationsDispatchContext);
// }

export function usePlaceInfo() {
  return useContext(PlaceInfoContext);
}

export function usePlaceInfoDispatch() {
  return useContext(PlaceInfoDispatchContext);
}
