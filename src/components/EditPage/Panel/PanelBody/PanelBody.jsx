import { useState, useRef } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import DestinationCreateForm from './CRUD/DestinationCreateForm';
import AutoScrollTabs from './AutoScrollTabs/AutoScrollTabs';
import AddBtn from './AddBtn';

import {
  postMaps,
  postDestinations,
  useAuth,
  tripInfo_actions,
  useTripInfo,
  useTripInfoDispatch,
  routes_actions,
  useRoutesDispatch,
  usePlaceInfo,
} from '../../temp_data/trip_reducer';

export default function PanelBody() {
  const [openForm, setOpenForm] = useState(false);
  const auth = useAuth();
  const canEdit = auth.canEdit;
  const tripInfo = useTripInfo();
  const tripInfoDispatch = useTripInfoDispatch();
  const itinerary = tripInfo.itinerary;
  const routesDispatch = useRoutesDispatch();
  const placeInfo = usePlaceInfo();
  const formRef = useRef(null);

  const handleFormOpen = () => setOpenForm(true);
  const handleFormClose = () => setOpenForm(false);

  async function handleDestinationAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    const dayGap = Number(formRef.current.day.value) - 1;
    const date = moment(itinerary.startTime)
      .add(dayGap, 'days')
      .format('YYYY-MM-DD');
    const time = formRef.current.time.value;
    const datetime = `${date}T${time}Z`;
    // 更新後端資料庫
    const placeData = await postMaps(placeInfo.placeId);
    const resData = await postDestinations(
      itinerary.id,
      datetime,
      placeData.id
    );
    // 更新前端（更新destinations、更新routes）
    const destination_data = {
      ...resData,
      day: dayGap,
    };
    routesDispatch({
      type: routes_actions.SET_IS_Loaded,
      payload: false,
    });
    tripInfoDispatch({
      type: tripInfo_actions.ADD_DESTINATION,
      payload: destination_data,
    });
    setOpenForm(false);
  }

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
          handleDestinationAdd={handleDestinationAdd}
          handleFormClose={handleFormClose}
        />
      ) : (
        // mui automatic scroll buttons
        <AutoScrollTabs />
      )}

      {/* add button on the bottom-right of the panel */}
      {canEdit && (
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
      )}
    </Box>
  );
}
