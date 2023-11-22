/**
 * useEffect 是否需搭配 useCallback、useMemo？
 */

import Stack from '@mui/material/Stack';
import PanelControl from './PanelControl/PanelControl';
import PanelBody from './PanelBody/PanelBody';

import moment from 'moment';
import { useEffect } from 'react';
import {
  getItinerary,
  itinerary_actions,
  useItinerary,
  useItineraryDispatch,
  getDestination,
  destinations_actions,
  useDestinations,
  useDestinationsDispatch,
  // postDistances,
  // distances_actions,
  // useDistances,
  // useDistancesDispatch,
} from '../temp_data/trip_reducer';

export default function Panel() {
  const itinerary = useItinerary();
  const itineraryDispatch = useItineraryDispatch();
  const destinations = useDestinations();
  const destinationsDispatch = useDestinationsDispatch();
  // const distances = useDistances();
  // const distancesDispatch = useDistancesDispatch();

  // 取得指定行程的資料
  useEffect(() => {
    const fetchItinerary = async () => {
      const id = 1; // 修改：動態取得行程id
      const data = await getItinerary(id);
      itineraryDispatch({
        type: itinerary_actions.GET_ITINERARY,
        payload: data,
      });
    };

    fetchItinerary();
    // console.log(itinerary);
  }, []);

  // 取得指定行程中的所有景點
  useEffect(() => {
    const fetchDestinations = async () => {
      const id = 1; // 修改：動態取得行程id
      const days = 2; // 修改：動態取得行程天數
      const startDate = moment('2023-01-01'); // 後端日期格式是否需要修改？
      const destinations_data = [];
      for (let i = 0; i < days; i++) {
        const date = startDate.add(i, 'days').format('YYYY-MM-DD');
        const data = await getDestination(id, date);
        destinations_data.push([]);
        data.forEach((item) =>
          destinations_data[i].push({ ...item.Place, date: item.date })
        );
      }
      destinationsDispatch({
        type: destinations_actions.GET_DESTINATIONS,
        payload: destinations_data,
      });
    };

    fetchDestinations();
    // console.log(destinations);
  }, []);

  // 修改：post的API改成get的API
  // useEffect(() => {
  //   const fetchDistances = async () => {
  //     const reqBody = {
  //       elements: {
  //         itineraryId: 1,
  //         date: '2023-01-01T01:20:30Z',
  //         transportationMode: 'driving',
  //         originId: 11,
  //         destinationId: 12,
  //       },
  //     };
  //     const data = await postDistances(reqBody)
  //     console.log(data)
  //   };
  //   fetchDistances();
  // });

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
