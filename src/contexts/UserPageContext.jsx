import { createContext, useContext, useState } from "react";

const defaultItineraries = []

const ItinerariesContext = createContext(defaultItineraries)
export const useItineraries = () => useContext(ItinerariesContext)

export const ItinerariesProvider = ({children}) => {
  // provide user owned itineraries
  const [itineraries, setItineraries] = useState([])

  // provide user joined itineraries id
  const [joinedItineraries, setJoinedItineraries] = useState([])

  return <ItinerariesContext.Provider value={{
    itineraries: itineraries,
    setItineraries: setItineraries,
    joinedItineraries: joinedItineraries,
    setJoinedItineraries: setJoinedItineraries
  }} >
    {children}
  </ItinerariesContext.Provider>
}