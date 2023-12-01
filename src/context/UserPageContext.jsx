import { createContext, useContext, useEffect, useState } from "react";

const defaultItineraries = {}

const ItinerariesContext = createContext(defaultItineraries)
export const useItineraries = () => useContext(ItinerariesContext)

export const ItinerariesProvider = ({children}) => {
  const [itineraries, setItineraries] = useState(defaultItineraries)

  return <ItinerariesContext.Provider value={{
    itineraries: itineraries,
    setItineraries: setItineraries
  }} >
    {children}
  </ItinerariesContext.Provider>
}