import { useEffect } from 'react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import PanelControl from './PanelControl/PanelControl';
import PanelBody from './PanelBody/PanelBody';
import { getItinerary, getDestinations } from '@/api/editPage.js';
import { auth_actions, useAuthDispatch } from '@/contexts/AuthContext';

import {
  tripInfo_actions,
  useTripInfo,
  useTripInfoDispatch,
} from '../temp_data/trip_reducer';

export default function Panel() {
  const tripInfo = useTripInfo();
  const tripInfoDispatch = useTripInfoDispatch();
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    // 取得指定行程的資料
    const fetchItinerary = async () => {
      const id = 1; // 修改：動態取得行程id
      const data = await getItinerary(id);
      const startTime = moment(data.startTime);
      const endTime = moment(data.endTime);
      const itinerary_data = {
        ...data,
        days: endTime.diff(startTime, 'days') + 1, // 行程的天數
      };
      tripInfoDispatch({
        type: tripInfo_actions.SET_ITINERARY,
        payload: itinerary_data,
      });
      return itinerary_data;
    };

    // 取得指定行程中的所有景點
    const fetchDestinations = async (itinerary_data) => {
      const id = itinerary_data.id;
      const days = itinerary_data.days;
      const startTime = moment(itinerary_data.startTime);
      const destinations_data = [];
      for (let i = 0; i < days; i++) {
        const date = startTime.clone().add(i, 'days').format('YYYY-MM-DD');
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
      tripInfoDispatch({
        type: tripInfo_actions.SET_DESTINATIONS,
        payload: destinations_data,
      });
      tripInfoDispatch({
        type: tripInfo_actions.SET_IS_Loaded,
        payload: true,
      });
    };

    const auth = (itinerary_data) => {
      ////////// 測試 //////////
      localStorage.setItem('user', JSON.stringify({ id: 1 }));
      // 檢查使用者是否有編輯權限
      const userInfo = JSON.parse(localStorage.getItem('user'));
      if (!userInfo) return;
      const userId = Number(userInfo.id);
      const authorizedIds = itinerary_data.ParticipantsUser.map(
        (participant) => participant.id
      );
      const authStatus = authorizedIds.includes(userId);
      authDispatch({
        type: auth_actions.SET_CAN_EDIT,
        payload: authStatus,
      });
    };

    fetchItinerary().then((itinerary_data) => {
      fetchDestinations(itinerary_data);
      auth(itinerary_data);
    });
  }, []);

  if (!tripInfo.isLoaded) {
    // 優化：skeleton loading / skeleton preview
    return <Grid>Loading...</Grid>;
  }

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
