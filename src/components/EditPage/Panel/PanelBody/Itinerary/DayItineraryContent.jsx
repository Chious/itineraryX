import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import DestinationItem from './DestinationItem';
import TransportationItem from './TransportationItem';

import {
  getRoutes,
  postRoutes,
  useTripInfo,
  routes_actions,
  useRoutes,
  useRoutesDispatch,
} from '../../../temp_data/trip_reducer';

export default function DayItineraryContent({
  rwdColumns,
  day,
}) {
  const tripInfo = useTripInfo();
  const itinerary = tripInfo.itinerary;
  const destinations = tripInfo.destinations;
  const destinationsByDay = destinations[day - 1];
  const routesState = useRoutes();
  const routesDispatch = useRoutesDispatch();

  useEffect(() => {
    // 產生placePairs起終點陣列
    const genPlacePairs = (destinations) => {
      const placePairs = [];
      destinations.forEach((_, day) => {
        placePairs.push([]);
        destinations[day].forEach((_, order) => {
          if (order === destinations[day].length - 1) return;
          const placePair = {
            originId: destinations[day][order].id,
            destinationId: destinations[day][order + 1].id,
          };
          placePairs[day].push(placePair);
        });
      });
      return placePairs;
    };

    // 產生routes交通路線資訊陣列
    const fetchRoutes = async (destinations) => {
      const placePairs = genPlacePairs(destinations);
      const newRoutes = [];
      for (let day = 0; day < placePairs.length; day++) {
        newRoutes.push([]);
        for (let order = 0; order < placePairs[day].length; order++) {
          const itineraryId = itinerary.id;
          const originId = placePairs[day][order].originId;
          const destinationId = placePairs[day][order].destinationId;
          let route = await getRoutes(itineraryId, originId, destinationId);
          if (!route) {
            const reqBody = {
              itineraryId: itineraryId,
              transportationMode: 'walking', // 預設值walking
              originId: originId,
              destinationId: destinationId,
            };
            route = await postRoutes(reqBody);
          }
          newRoutes[day].push(route);
        }
      }
      routesDispatch({
        type: routes_actions.SET_ROUTES,
        payload: newRoutes,
      });
      routesDispatch({
        type: routes_actions.SET_IS_Loaded,
        payload: true,
      });
    };

    fetchRoutes(destinations);
  }, [destinations]);

  // 若有某天尚未添加任何景點則顯示提示訊息
  if (!destinationsByDay || destinationsByDay.length === 0) {
    return (
      <Grid key={`empty-${day}`} container justifyContent="flex-end">
        <Grid item xs={rwdColumns[1]}>
          <Typography>請點擊按鈕添加景點</Typography>
        </Grid>
      </Grid>
    );
  }

  return destinationsByDay.map((_, order) => (
    <>
      <ListItem key={`route-${day}-${order}`} sx={{ padding: '1rem' }}>
        {routesState.isLoaded && order > 0 && (
          <TransportationItem
            rwdColumn={rwdColumns[1]}
            route={routesState.routes[day - 1][order - 1]}
          />
        )}
      </ListItem>
      <ListItem key={`destination-${day}-${order}`} sx={{ padding: 0 }}>
        <DestinationItem day={day} destination={destinationsByDay[order]} />
      </ListItem>
    </>
  ));
}
