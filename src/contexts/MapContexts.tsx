import { createContext, useState, useContext } from "react";

const defaultMapContext = {
  data: [],
  setData: () => {},
};

interface MapContextType {
  data: {
    lat: number;
    lng: number;
  }[];
  setData: React.Dispatch<
    React.SetStateAction<
      {
        lat: number;
        lng: number;
      }[]
    >
  >;
}

const MapContext = createContext<MapContextType>(defaultMapContext);

export const useMap = () => useContext(MapContext);
export const MapProvider = ({ children }) => {
  const [data, setData] = useState<{ lat: number; lng: number }[]>([
    { lat: 25.0464225, lng: 121.5148332 },
    { lat: 25.0421884, lng: 121.5057246 },
    { lat: 25.0150934, lng: 121.4605249 },
    { lat: 24.9442716, lng: 121.3700608 },
  ]);

  return (
    <MapContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
