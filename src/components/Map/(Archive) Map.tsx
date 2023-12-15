// import * as React from "react";
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
// import { createCustomEqual } from "fast-equals";
// import { isLatLngLiteral } from "@googlemaps/typescript-guards";
// import { getLatLng } from "../../api/map.jsx";
// import { useMap } from "../../contexts/MapContexts.jsx";

// const render = (status: Status) => {
//   return <h1>{status}</h1>;
// };

// const GoogleMap: React.FC = () => {
//   const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
//   const [zoom, setZoom] = React.useState(12); // initial zoom
//   const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
//     lat: 25.0464225,
//     lng: 121.5148332,
//   });

//   // Direction Data

//   const { setData } = useMap();

//   const onClick = (e: google.maps.MapMouseEvent) => {
//     // avoid directly mutating state
//     setClicks([e.latLng!]);
//   };

//   const onIdle = (m: google.maps.Map) => {
//     console.log("onIdle");
//     setZoom(m.getZoom()!);
//     setCenter(m.getCenter()!.toJSON());
//   };

//   // getNewData

//   const handleDirection = async () => {
//     const day = 2;
//     const itineraryId = 1;
//     const fetchData = await getLatLng({ day, itineraryId });

//     setData(fetchData);
//   };

//   const form = (
//     <div
//       style={{
//         padding: "1rem",
//         flexBasis: "250px",
//         height: "100%",
//         overflow: "auto",
//       }}
//     >
//       <label htmlFor="zoom">Zoom</label>
//       <input
//         type="number"
//         id="zoom"
//         name="zoom"
//         value={zoom}
//         onChange={(event) => setZoom(Number(event.target.value))}
//       />
//       <br />
//       <label htmlFor="lat">Latitude</label>
//       <input
//         type="number"
//         id="lat"
//         name="lat"
//         value={center.lat}
//         onChange={(event) =>
//           setCenter({ ...center, lat: Number(event.target.value) })
//         }
//       />
//       <br />
//       <label htmlFor="lng">Longitude</label>
//       <input
//         type="number"
//         id="lng"
//         name="lng"
//         value={center.lng}
//         onChange={(event) =>
//           setCenter({ ...center, lng: Number(event.target.value) })
//         }
//       />
//       <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
//       {clicks.map((latLng, i) => (
//         <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
//       ))}
//       <button onClick={() => setClicks([])}>Clear</button>
//       <button
//         onClick={async () => {
//           handleDirection();
//         }}
//       >
//         Direction
//       </button>
//     </div>
//   );

//   return (
//     <div style={{ display: "flex", height: "100%" }}>
//       <Wrapper
//         apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}
//         render={render}
//       >
//         <Map
//           center={center}
//           onClick={onClick}
//           onIdle={onIdle}
//           zoom={zoom}
//           style={{ flexGrow: "1", height: "100%" }}
//         >
//           {clicks.map((latLng, i) => (
//             <Marker key={i} position={latLng} />
//           ))}
//         </Map>
//       </Wrapper>
//       {/* Basic form for controlling center and zoom of map. */}
//       {form}
//     </div>
//   );
// };
// interface MapProps extends google.maps.MapOptions {
//   style: { [key: string]: string };
//   onClick?: (e: google.maps.MapMouseEvent) => void;
//   onIdle?: (map: google.maps.Map) => void;
//   disableDefaultUI?: boolean;
//   children?: React.ReactNode;
// }

// const Map: React.FC<MapProps> = ({
//   onClick,
//   onIdle,
//   children,
//   style,
//   disableDefaultUI = true,
//   ...options
// }) => {
//   const ref = React.useRef<HTMLDivElement>(null);
//   const [map, setMap] = React.useState<google.maps.Map>();

//   const { data } = useMap();

//   //Routing Service
//   const getDirectionRequest = (data: { lat: number; lng: number }[]) => {
//     var response: DirectionsRequest = {
//       origin: {},
//       destination: {},
//       waypoints: [],
//       provideRouteAlternatives: false,
//       optimizeWaypoints: true,
//       travelMode: google.maps.TravelMode.DRIVING,
//       unitSystem: google.maps.UnitSystem.IMPERIAL,
//     };

//     data.map((location, index) => {
//       if (index === 0) {
//         response.origin = location;
//       } else if (index === data.length - 1) {
//         response.destination = location;
//       } else {
//         response.waypoints?.push({ location: location, stopover: true });
//       }
//     });

//     return response;
//   };

//   const directionsService = new google.maps.DirectionsService();
//   const directionsRenderer = React.useRef(new google.maps.DirectionsRenderer());
//   directionsRenderer.current.setMap(map);

//   const calculateAndDisplayRoute = (data: { lat: number; lng: number }[]) => {
//     const request = getDirectionRequest(data);

//     if (request !== undefined) {
//       directionsService.route(request, function (result, status) {
//         if (status == "OK") {
//           directionsRenderer.current.setDirections(result);
//         } else {
//           console.log("something wrong: ", status);
//         }
//       });
//     }
//   };

//   React.useEffect(() => {
//     // Initialize the map
//     if (map) {
//       calculateAndDisplayRoute(data);
//     }
//   }, []);

//   //Rerender map while data change
//   React.useEffect(() => {
//     // Calculate new route
//     calculateAndDisplayRoute(data);
//   }, [data]);

//   React.useEffect(() => {
//     if (ref.current && !map) {
//       setMap(
//         new window.google.maps.Map(ref.current, {
//           disableDefaultUI: disableDefaultUI,
//         })
//       );
//     }
//   }, [ref, map]);

//   // because React does not do deep comparisons, a custom hook is used
//   // see discussion in https://github.com/googlemaps/js-samples/issues/946
//   useDeepCompareEffectForMaps(() => {
//     if (map) {
//       map.setOptions(options);
//     }
//   }, [map, options]);

//   React.useEffect(() => {
//     if (map) {
//       ["click", "idle"].forEach((eventName) =>
//         google.maps.event.clearListeners(map, eventName)
//       );

//       if (onClick) {
//         map.addListener("click", onClick);
//       }

//       if (onIdle) {
//         map.addListener("idle", () => onIdle(map));
//       }
//     }
//   }, [map, onClick, onIdle]);

//   return (
//     <>
//       <div ref={ref} style={style} />
//       {React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//           // set the map prop on the child component
//           // @ts-ignore
//           return React.cloneElement(child, { map });
//         }
//       })}
//     </>
//   );
// };

// const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
//   const [marker, setMarker] = React.useState<google.maps.Marker>();

//   React.useEffect(() => {
//     if (!marker) {
//       setMarker(new google.maps.Marker());
//     }

//     // remove marker from map on unmount
//     return () => {
//       if (marker) {
//         marker.setMap(null);
//       }
//     };
//   }, [marker]);

//   React.useEffect(() => {
//     if (marker) {
//       marker.setOptions(options);
//     }
//   }, [marker, options]);

//   return null;
// };

// const deepCompareEqualsForMaps = createCustomEqual(
//   // @ts-ignore
//   (deepEqual) => (a: any, b: any) => {
//     if (
//       isLatLngLiteral(a) ||
//       a instanceof google.maps.LatLng ||
//       isLatLngLiteral(b) ||
//       b instanceof google.maps.LatLng
//     ) {
//       return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
//     }

//     // TODO extend to other types

//     // use fast-equals for other objects
//     return deepEqual(a, b);
//   }
// );

// function useDeepCompareMemoize(value: any) {
//   const ref = React.useRef();

//   if (!deepCompareEqualsForMaps(value, ref.current)) {
//     ref.current = value;
//   }

//   return ref.current;
// }

// function useDeepCompareEffectForMaps(
//   callback: React.EffectCallback,
//   dependencies: any[]
// ) {
//   React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
// }

// //Google Routing service

// type DirectionsRequest = {
//   origin: { lat: number; lng: number } | string | google.maps.Place;
//   destination:
//     | { lat: number; lng: number }
//     | string
//     | google.maps.Place
//     | google.maps.LatLng;
//   travelMode: google.maps.TravelMode;
//   transitOptions?: {
//     arrivalTime?: Date;
//     departureTime?: Date;
//     modes?: google.maps.TransitMode[];
//     routingPreference?: google.maps.TransitRoutePreference;
//   };
//   drivingOptions?: {
//     departureTime: Date;
//     trafficModel: google.maps.TrafficModel;
//   };
//   unitSystem?: google.maps.UnitSystem.METRIC | google.maps.UnitSystem.IMPERIAL;
//   waypoints?: { location: { lat: number; lng: number }; stopover: boolean }[];
//   optimizeWaypoints?: boolean;
//   provideRouteAlternatives?: boolean;
//   avoidFerries?: boolean;
//   avoidHighways?: boolean;
//   avoidTolls?: boolean;
//   region?: string;
// };

// export { GoogleMap };