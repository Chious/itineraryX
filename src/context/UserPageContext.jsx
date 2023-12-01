import { createContext, useContext, useEffect, useState } from "react";
import { getItineraries } from "../api/userpage";

const defaultItineraries = {}

const ItinerariesContext = createContext(defaultItineraries)
export const useItineraries = () => useContext(ItinerariesContext)

export const ItinerariesProvider = ({children}) => {
  const [itineraries, setItineraries] = useState(defaultItineraries)

  useEffect(()=>{
    getItineraries()
    .then(data => {
      setItineraries(data)
      console.log(data)
    })
  }, [])

  return <ItinerariesContext.Provider value={{
    itineraries: itineraries,
    setItineraries: setItineraries
  }} >
    {children}
  </ItinerariesContext.Provider>
}