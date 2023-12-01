import { createContext, useEffect, useState } from "react";
import { getItineraries } from "../api/userpage";

const defaultItineraries = {}
const ItinerariesContext = createContext(defaultItineraries)

export const ItinerariesProvider = ({children}) => {
  const [itineraries, setItineraries] = useState(defaultItineraries)
  useEffect(()=>{
    getItineraries()
    .then(data => {
      setItineraries(data)
    })
  }, [])

  return <ItinerariesContext.Provider value={itineraries} >
    {children}
  </ItinerariesContext.Provider>
}