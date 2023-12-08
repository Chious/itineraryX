import { useRef, useState } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Modal from '@mui/material/Modal';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { patchDestinations, deleteDestinations } from '@/api/editPage.js';
import { routes_actions, useRoutesDispatch } from '@/contexts/RoutesContext';
import {
  tripInfo_actions,
  useTripInfo,
  useTripInfoDispatch,
} from '@/contexts/TripInfoContext';

const btnStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
};

const BtnPopperStyle = {
  width: 'max-content',
  position: 'absolute',
  top: '100%',
  right: 10,
  zIndex: 1,
  p: 1,
  boxShadow: 3,
  borderRadius: 1,
  bgcolor: 'white',
};

const EditModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'white',
  borderRadius: 3,
  boxShadow: 10,
  p: 4,
};

export default function CardBtnPopper({ day, destinationId }) {
  const [openBtnPopper, setOpenBtnPopper] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const tripInfo = useTripInfo();
  const tripInfoDispatch = useTripInfoDispatch();
  const itinerary = tripInfo.itinerary;
  const destinations = tripInfo.destinations;
  const routesDispatch = useRoutesDispatch();
  const formRef = useRef(null);

  const handlePopperClickAway = () => setOpenBtnPopper(false);
  const handleMoreBtnClick = () => setOpenBtnPopper((prev) => !prev);
  const handleEditModalOpen = () => setOpenEditModal(true);
  const handleEditModalClose = () => setOpenEditModal(false);

  function handleDestinationEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    const dayGap = day - 1;
    const date = moment(itinerary.startTime)
      .add(dayGap, 'days')
      .format('YYYY-MM-DD');
    const time = formRef.current.time.value;
    const datetime = `${date}T${time}Z`;
    const destination_data = {
      destinationId: destinationId,
      datetime: datetime,
    };
    // 更新前端（更新destinations、更新routes）
    routesDispatch({
      type: routes_actions.SET_IS_Loaded,
      payload: false,
    });
    tripInfoDispatch({
      type: tripInfo_actions.CHANGE_DESTINATION_TIME,
      payload: destination_data,
    });
    // 更新後端
    patchDestinations(destinationId, datetime);
    // 關閉popper與modal表單
    handlePopperClickAway();
    handleEditModalClose();
  }

  function handleDeleteBtnClick(e) {
    const dayIndex = day - 1;
    const order = destinations[dayIndex].findIndex(
      (item) => item.destinationId === destinationId
    );
    if (order === -1) return;
    // 更新前端（更新destinations、更新routes）
    routesDispatch({
      type: routes_actions.SET_IS_Loaded,
      payload: false,
    });
    tripInfoDispatch({
      type: tripInfo_actions.DELETE_DESTINATION,
      payload: {
        dayIndex: dayIndex,
        order: order,
      },
    });
    // 更新後端
    deleteDestinations(destinationId);
    // 關閉popper表單
    setOpenBtnPopper(false);
  }

  return (
    <ClickAwayListener onClickAway={handlePopperClickAway}>
      <Box sx={btnStyle}>
        <Button type="button" onClick={handleMoreBtnClick}>
          <MoreHorizIcon sx={{ fontSize: '1.2rem' }} />
        </Button>

        {openBtnPopper && (
          <Box sx={BtnPopperStyle}>
            <List sx={{ p: 0 }}>
              <ListItem sx={{ p: 0 }}>
                <ListItemButton
                  sx={{ padding: '5px' }}
                  onClick={handleEditModalOpen}
                >
                  edit
                </ListItemButton>
                <Modal open={openEditModal} onClose={handleEditModalClose}>
                  <Box sx={EditModalStyle}>
                    <form ref={formRef} onSubmit={handleDestinationEdit}>
                      <label>New time</label>
                      <input id="time" type="time" />
                      <Button type="submit" variant="contained">
                        Change time
                      </Button>
                    </form>
                  </Box>
                </Modal>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <ListItemButton
                  sx={{ padding: '5px' }}
                  onClick={handleDeleteBtnClick}
                >
                  delete
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}