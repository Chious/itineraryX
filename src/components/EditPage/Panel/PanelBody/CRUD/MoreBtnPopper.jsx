import moment from 'moment';
import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Button, List, ListItem, ListItemButton, Modal } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import {
  deleteDestinations,
  destinations_actions,
  patchDestinations,
  useDestinations,
  useDestinationsDispatch,
  useItinerary,
} from '../../../temp_data/trip_reducer';

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

export default function MoreBtnPopper({ day, destinationId }) {
  const [openBtnPopper, setOpenBtnPopper] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editTime, setEditTime] = useState(null);
  const formRef = useRef(null);
  const itinerary = useItinerary();
  const destinations = useDestinations();
  const destinationsDispatch = useDestinationsDispatch();

  const handlePopperClickAway = () => setOpenBtnPopper(false);
  const handleMoreBtnClick = () => setOpenBtnPopper((prev) => !prev);
  const handleEditModalOpen = () => setOpenEditModal(true);
  const handleEditModalClose = () => setOpenEditModal(false);

  function handleDestinationEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    const time = formRef.current.time.value;
    const date = moment(itinerary.startTime)
      .add(day - 1, 'days')
      .format('YYYY-MM-DD');
    const datetime = moment(date + time, 'YYYY-MM-DDHH:mm')
      .utc()
      .format('YYYY-MM-DD[T]HH:mm:ss[Z]');
    const data = {
      destinationId: destinationId,
      datetime: datetime,
    };
    // 更新前端
    destinationsDispatch({
      type: destinations_actions.CHANGE_DESTINATION_TIME,
      payload: data,
    });
    // 更新後端
    patchDestinations(destinationId, datetime);
    setOpenEditModal(false);
  }

  function handleDeleteBtnClick(e) {
    // e.stopPropagation();
    // if (!openBtnPopper) return;
    const dayIndex = day - 1;
    const order = destinations[dayIndex].findIndex(
      (item) => item.destinationId === destinationId
    );
    if (order === -1) return;
    // 更新前端
    destinationsDispatch({
      type: destinations_actions.DELETE_DESTINATION,
      dayIndex: dayIndex,
      order: order,
    });
    // 更新後端
    deleteDestinations(destinationId);
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
