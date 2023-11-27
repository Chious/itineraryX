import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import AutoScrollTabs from './AutoScrollTabs/AutoScrollTabs';
import DestinationCreateForm from './CRUD/DestinationCreateForm';
import AddBtn from './AddBtn';

import {
  placeInfo_actions,
  useIsLoading,
  useItinerary,
  useDestinations,
  usePlaceInfoDispatch,
  postMaps,
  usePlaceInfo,
  postDestinations,
  useDestinationsDispatch,
  destinations_actions,
} from '../../temp_data/trip_reducer';

export default function PanelBody() {
  const [openForm, setOpenForm] = useState(false);
  const [numOfDays, setNumOfDays] = useState(0);
  // const [formValue, setFormValue] = useState({});
  const isLoading = useIsLoading();
  const itinerary = useItinerary();
  const destinations = useDestinations();
  const destinationsDispatch = useDestinationsDispatch();
  const placeInfo = usePlaceInfo();
  const placeInfoDispatch = usePlaceInfoDispatch();
  const formRef = useRef(null);

  const handleFormOpen = () => setOpenForm(true);
  const handleFormClose = () => setOpenForm(false);

  async function handleDestinationAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    const dayGap = Number(formRef.current.day.value) - 1;
    const date = moment(itinerary.startTime)
      .add(dayGap, 'days')
      .format('YYYY/MM/DD');
    const time = formRef.current.time.value;
    const datetime = moment(date + time, 'YYYY/MM/DDHH:mm')
      .utc()
      .format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    // 更新後端資料庫
    const placeData = await postMaps(placeInfo.placeId);
    const resData = await postDestinations(
      itinerary.id,
      datetime,
      placeData.id
    );
    const destinationData = {
      ...resData,
      day: dayGap,
    };
    // 前端setState
    destinationsDispatch({
      type: destinations_actions.ADD_DESTINATION,
      payload: destinationData,
    });
    setOpenForm(false);
  }

  useEffect(() => {
    if (!isLoading) {
      const startTime = moment(itinerary.startTime);
      const endTime = moment(itinerary.endTime);
      setNumOfDays(endTime.diff(startTime, 'days') + 1);
    }
  }, [itinerary, isLoading]);

  return (
    <Box
      className="panel-body"
      width="100%"
      height="100%"
      minHeight="0" // 解決flexbox容器中flex item外溢的問題
      sx={{ position: 'relative' }}
    >
      {openForm ? (
        // a form to create destination
        <DestinationCreateForm
          formRef={formRef}
          numOfDays={numOfDays}
          handleDestinationAdd={handleDestinationAdd}
          handleFormClose={handleFormClose}
        />
      ) : (
        // mui automatic scroll buttons
        <AutoScrollTabs />
      )}

      {/* add button on the bottom-right of the panel */}
      <Box
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2.5rem',
          zIndex: '3',
        }}
      >
        <AddBtn handleFormOpen={handleFormOpen} />
      </Box>
    </Box>
  );
}
