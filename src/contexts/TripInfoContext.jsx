import { useContext, createContext, useReducer } from 'react';
import moment from 'moment';

//////////////////// actions ////////////////////

export const tripInfo_actions = {
  SET_IS_FAILED: 'SET_IS_FAILED', // set true if data-fetching failed
  SET_IS_Loaded: 'SET_IS_Loaded', // set true if data-fetching completed
  SET_ITINERARY: 'SET_ITINERARY', // 儲存行程的資訊
  SET_DESTINATIONS: 'SET_DESTINATIONS', // 儲存行程中的所有景點
  ADD_DESTINATION: 'ADD_DESTINATION', // 將景點加入行程
  CHANGE_DESTINATION_TIME: 'CHANGE_DESTINATION_TIME', // 修改景點的抵達時間
  DELETE_DESTINATION: 'DELETE_DESTINATION', // 刪除行程中的景點
};

//////////////////// reducer ////////////////////

function tripInfoReducer(tripInfo, action) {
  switch (action.type) {
    case tripInfo_actions.SET_IS_FAILED: {
      const newTripInfo = JSON.parse(JSON.stringify(tripInfo));
      newTripInfo.isFailed = action.payload;
      return newTripInfo;
    }
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
      const newDestination = action.payload;
      const { day, date } = newDestination;
      const newDate = moment(date);
      const newTripInfo = JSON.parse(JSON.stringify(tripInfo));
      const destinationsByDay = newTripInfo.destinations[day - 1];
      // 尋找新景點的插入位置
      let insertId = destinationsByDay.length;
      destinationsByDay.forEach((_, index) => {
        const beforeDate = moment(destinationsByDay[index].date);
        const afterDate = moment(destinationsByDay[index + 1]?.date);
        if (index === 0 && newDate.isBefore(beforeDate)) insertId = 0;
        if (beforeDate.isBefore(newDate) && afterDate.isAfter(newDate))
          insertId = index + 1;
      });
      // 將新景點插入景點陣列
      newTripInfo.destinations[day - 1].splice(insertId, 0, newDestination);
      return newTripInfo;
    }
    case tripInfo_actions.CHANGE_DESTINATION_TIME: {
      const { destinationId, datetime } = action.payload;
      const newDestinations = tripInfo.destinations.map((destinationsByDay) =>
        destinationsByDay.map((destination) => {
          if (destination.destinationId === destinationId)
            return {
              ...destination,
              date: datetime, // 將景點時間修改成新的時間
            };
          else return destination;
        })
      );
      // 重新排序景點順序
      newDestinations.forEach((destinationsByDay) =>
        destinationsByDay.sort((a, b) => moment(a.date).diff(moment(b.date)))
      );
      const newTripInfo = JSON.parse(JSON.stringify(tripInfo));
      newTripInfo.destinations = newDestinations;
      return newTripInfo;
    }
    case tripInfo_actions.DELETE_DESTINATION: {
      const destinationId = action.payload;
      const newDestinations = tripInfo.destinations.map((destinationsByDay) =>
        destinationsByDay.filter(
          (destination) => destination.destinationId !== destinationId
        )
      );
      const newTripInfo = JSON.parse(JSON.stringify(tripInfo));
      newTripInfo.destinations = newDestinations;
      return newTripInfo;
    }
    default: {
      console.log('tripInfo dispatch error');
      break;
    }
  }
}

//////////////////// context ////////////////////

const TripInfoContext = createContext();
const TripInfoDispatchContext = createContext();

export function TripInfoProvider({ children }) {
  const [tripInfo, tripInfoDispatch] = useReducer(tripInfoReducer, {
    isFailed: false,
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

export function useTripInfo() {
  return useContext(TripInfoContext);
}

export function useTripInfoDispatch() {
  return useContext(TripInfoDispatchContext);
}
