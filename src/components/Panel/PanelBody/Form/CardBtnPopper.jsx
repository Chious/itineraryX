import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import moment from 'moment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Modal from '@mui/material/Modal';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { patchDestinations, deleteDestinations } from '@/api/editPage.js';
import {
  routesInfo_actions,
  useRoutesInfoDispatch,
} from '@/contexts/RoutesInfoContext';
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
  const routesInfoDispatch = useRoutesInfoDispatch();

  const handlePopperClickAway = () => setOpenBtnPopper(false);
  const handleMoreBtnClick = () => setOpenBtnPopper((prev) => !prev);
  const handleEditModalOpen = () => setOpenEditModal(true);
  const handleEditModalClose = () => setOpenEditModal(false);

  const schema = z.object({
    time: z.string().refine((time) => time.length > 0, {
      message: 'please enter the time',
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function handleDestinationEdit(data, event) {
    event.preventDefault();
    event.stopPropagation();
    const dayGap = day - 1;
    const date = moment(itinerary.startTime.split('T')[0])
      .add(dayGap, 'days')
      .format('YYYY-MM-DD');
    const time = data.time;
    const datetime = `${date}T${time}Z`;
    const destination_data = {
      destinationId: destinationId,
      datetime: datetime,
    };
    // 更新前端
    routesInfoDispatch({
      type: routesInfo_actions.SET_IS_Loaded,
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
    const order = destinations[day - 1].findIndex(
      (item) => item.destinationId === destinationId
    );
    // 更新前端
    routesInfoDispatch({
      type: routesInfo_actions.SET_IS_Loaded,
      payload: false,
    });
    tripInfoDispatch({
      type: tripInfo_actions.DELETE_DESTINATION,
      payload: {
        dayIndex: day - 1,
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
                    <form
                      noValidate
                      onSubmit={handleSubmit(handleDestinationEdit)}
                      className="edit-form"
                    >
                      <Grid container spacing={2}>
                        <Grid item sx={12}>
                          <Typography
                            sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                          >
                            Edit Time
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex' }}>
                          <Grid
                            item
                            xs={3}
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Typography>Time</Typography>
                          </Grid>
                          <Grid item xs={7} sx={{ position: 'relative' }}>
                            <input
                              {...register('time')}
                              onFocus={(e) => e.target.showPicker()}
                              id="time"
                              type="time"
                              style={{
                                width: '90%',
                                height: '100%',
                                padding: 5,
                                borderRadius: 3,
                                borderWidth: errors.time ? 1.5 : 1,
                                borderColor: errors.time
                                  ? '#d32f2f'
                                  : 'rgba(0, 0, 0, 0.3)',
                              }}
                            />
                            <Box
                              style={{
                                position: 'absolute',
                                top: '105%',
                                left: '0',
                                color: '#d32f2f',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                              }}
                            >
                              {errors.time && errors.time.message}
                            </Box>
                          </Grid>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sx={{
                            marginTop: '1rem',
                            display: 'flex',
                            justifyContent: 'end',
                            gap: 1,
                          }}
                        >
                          <Button
                            type="button"
                            variant="text"
                            onClick={handleEditModalClose}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" variant="contained">
                            Confirm
                          </Button>
                        </Grid>
                      </Grid>
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
