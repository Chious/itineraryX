import * as React from 'react';
import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Button, List, ListItem, ListItemButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import {
  deleteDestinations,
  destinations_actions,
  useDestinations,
  useDestinationsDispatch,
} from '../../../temp_data/trip_reducer';

const btnStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
};

const popperStyle = {
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

export default function MoreBtnPopper({ day, destinationId }) {
  const [open, setOpen] = React.useState(false);
  const destinations = useDestinations();
  const destinationsDispatch = useDestinationsDispatch();

  const handlePopperClickAway = () => {
    setOpen(false);
  };

  const handleMoreBtnClick = () => {
    setOpen((prev) => !prev);
  };

  function handleDeleteBtnClick(e) {
    // e.stopPropagation();
    // if (!open) return;
    const dayIndex = day - 1;
    const order = destinations[dayIndex].findIndex(
      (item) => item.id === destinationId
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
    setOpen(false);
  }

  return (
    <ClickAwayListener onClickAway={handlePopperClickAway}>
      <Box sx={btnStyle}>
        <Button type="button" onClick={handleMoreBtnClick}>
          <MoreHorizIcon sx={{ fontSize: '1.2rem' }} />
        </Button>
        {open && (
          <Box sx={popperStyle}>
            <List sx={{ p: 0 }}>
              <ListItem sx={{ p: 0 }}>
                <ListItemButton sx={{ padding: '5px' }}>edit</ListItemButton>
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
