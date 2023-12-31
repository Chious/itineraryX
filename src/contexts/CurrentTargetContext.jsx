import { useContext, createContext, useReducer } from 'react';

//////////////////// actions ////////////////////

export const currentTarget_actions = {
  SET_TARGET_DAY: 'SET_TARGET_DAY', // set the target day the user select
  SET_TARGET_PLACE: 'SET_TARGET_PLACE', // store the search result from Google Map Autocomplete
  DELETE_TARGET_PLACE: 'DELETE_TARGET_PLACE', // delete the search result
};

//////////////////// reducer ////////////////////

function currentTargetReducer(currentTarget, action) {
  switch (action.type) {
    case currentTarget_actions.SET_TARGET_DAY: {
      const targetDay = action.payload;
      return { ...currentTarget, targetDay: targetDay };
    }
    case currentTarget_actions.SET_TARGET_PLACE: {
      const targetPlace = action.payload;
      return { ...currentTarget, targetPlace: targetPlace };
    }
    case currentTarget_actions.DELETE_TARGET_PLACE: {
      return { ...currentTarget, targetPlace: {} };
    }
    default: {
      console.log('currentTarget dispatch error');
      break;
    }
  }
}

//////////////////// context ////////////////////

const CurrentTargetContext = createContext();
const CurrentTargetDispatchContext = createContext();

export function CurrentTargetProvider({ children }) {
  const [currentTarget, currentTargetDispatch] = useReducer(
    currentTargetReducer,
    { targetDay: 0, targetPlace: {} }
  );

  return (
    <CurrentTargetContext.Provider value={currentTarget}>
      <CurrentTargetDispatchContext.Provider value={currentTargetDispatch}>
        {children}
      </CurrentTargetDispatchContext.Provider>
    </CurrentTargetContext.Provider>
  );
}

export function useCurrentTarget() {
  return useContext(CurrentTargetContext);
}

export function useCurrentTargetDispatch() {
  return useContext(CurrentTargetDispatchContext);
}
