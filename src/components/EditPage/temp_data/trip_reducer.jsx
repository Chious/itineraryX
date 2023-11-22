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
export const getDestination = async (id, date) => {
  try {
    const url = baseUrl + `/destinations/?itineraryId=${id}&date=${date}`;
    const res = await axios.get(url, config);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

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

const ItineraryContext = createContext();
const ItineraryDispatchContext = createContext();
const DestinationsContext = createContext();
const DestinationsDispatchContext = createContext();
// const DistancesContext = createContext();
// const DistancesDispatchContext = createContext();

export const itinerary_actions = {
  ADD_DAY: 'ADD_DAY', // 新增天數
  GET_ITINERARY: 'GET_ITINERARY', // 取得指定行程的資訊
  DELETE_DAY: 'DELETE_DAY', // 刪除天數
};

export const destinations_actions = {
  GET_DESTINATIONS: 'GET_DESTINATIONS', // 取得行程中的所有景點
  ADD_DESTINATION: 'ADD_DESTINATION', // 將景點加入行程
  GET_PLACE: 'GET_PLACE', // 搜尋景點
  CHANGE_DESTINATION_TIME: 'CHANGE_DESTINATION_TIME', // 修改景點的抵達時間
  DELETE_DESTINATION: 'DELETE_DESTINATION', // 刪除行程中的景點
};

// export const distances_actions = {
//   GET_DISTANCE: 'GET_DISTANCE', // 取得兩個景點間的交通資訊
//   ADD_DISTANCE: 'ADD_DISTANCE', // 新增兩個景點間的交通資訊
// };

function itineraryReducer(itinerary, action) {
  switch (action.type) {
    case itinerary_actions.GET_ITINERARY:
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
    case destinations_actions.GET_DESTINATIONS:
      const data = action.payload;
      const destinations_data = JSON.parse(JSON.stringify(data));
      return destinations_data;
    default:
      console.log('destinations dispatch error');
      break;
  }
}

// function distancesReducer(distances, action) {
//   switch (action.type) {
//     case distances_actions.ADD_DISTANCE:
//       const data = actions.payload;
//       const distances_data = JSON.parse(JSON.stringify(data));
//       return [...distances, distances_data];
//     default:
//       console.log('distances dispatch error');
//       break;
//   }
// }

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
