import Stack from '@mui/material/Stack';
import PanelControl from './PanelControl/PanelControl';
import PanelBody from './PanelBody/PanelBody';

import moment from 'moment';
import { useEffect } from 'react';
import {
  getItinerary,
  isLoading_actions,
  useIsLoadingDispatch,
  itinerary_actions,
  useItinerary,
  useItineraryDispatch,
  getDestinations,
  destinations_actions,
  useDestinations,
  useDestinationsDispatch,
} from '../temp_data/trip_reducer';

export default function Panel() {
  ////////// 測試 //////////
  const isLoadingDispatch = useIsLoadingDispatch();

  const itinerary = useItinerary();
  const itineraryDispatch = useItineraryDispatch();
  const destinations = useDestinations();
  const destinationsDispatch = useDestinationsDispatch();

  useEffect(() => {
    // 取得指定行程的資料
    const fetchItinerary = async () => {
      const id = 1; // 修改：動態取得行程id
      const data = await getItinerary(id);
      const startTime = moment(data.startTime);
      const endTime = moment(data.endTime);
      const itineraryInfo = {
        ...data,
        days: endTime.diff(startTime, 'days') + 1,  // 行程的天數
      };
      itineraryDispatch({
        type: itinerary_actions.SET_ITINERARY,
        payload: data,
      });
    };

    // 取得指定行程中的所有景點
    const fetchDestinations = async () => {
      const id = 1; // 修改：動態取得行程id
      const days = 2; // 修改：動態取得行程天數
      const startDate = moment('2023-01-01'); // 後端日期格式是否需要修改？
      const destinations_data = [];
      for (let i = 0; i < days; i++) {
        const date = startDate.clone().add(i, 'days').format('YYYY-MM-DD');
        const data = await getDestinations(id, date);
        destinations_data.push([]);
        data?.forEach((item) =>
          destinations_data[i].push({
            ...item.Place, // id 為 placeId
            destinationId: item.id, // destinationId 為 destinationId
            date: item.date,
          })
        );
      }
      destinationsDispatch({
        type: destinations_actions.SET_DESTINATIONS,
        payload: destinations_data,
      });
    };

    Promise.all([fetchItinerary(), fetchDestinations()]).then(() => {
      isLoadingDispatch({ type: isLoading_actions.SET_FALSE });
    });
  }, []);

  return (
    <Stack
      className="panel"
      width="100%"
      height="100%"
      sx={{
        position: 'relative',
        zIndex: 1,
        boxShadow: 2,
      }}
    >
      <PanelControl />
      <PanelBody />
    </Stack>
  );
}
