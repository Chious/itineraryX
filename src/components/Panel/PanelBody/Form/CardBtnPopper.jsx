import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '@emotion/react';
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
import { sendDestinations } from '@/socket/socketManager';

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
  width: 330,
  bgcolor: 'white',
  borderRadius: 3,
  boxShadow: 10,
  p: 4,
};

const fieldNameStyle = {
  color: 'primary',
  fontSize: '1.2rem',
  fontWeight: '500',
  letterSpacing: 1.1,
};

export default function CardBtnPopper({ day, destinationId }) {
  const { itineraryId } = useParams();
  const [openBtnPopper, setOpenBtnPopper] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const tripInfo = useTripInfo();
  const tripInfoDispatch = useTripInfoDispatch();
  const itinerary = tripInfo.itinerary;
  const routesInfoDispatch = useRoutesInfoDispatch();
  const theme = useTheme();
  const primaryLightColor = theme.palette.primary.light;
  const errorColor = theme.palette.error.main;
  const fontFamily = theme.typography.fontFamily;

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
    // socket
    sendDestinations({
      room: itineraryId,
      actionType: tripInfo_actions.CHANGE_DESTINATION_TIME,
      destinationData: destination_data,
    });
    // 更新後端
    patchDestinations(destinationId, datetime);
    // 關閉popper與modal表單
    handlePopperClickAway();
    handleEditModalClose();
  }

  function handleDeleteBtnClick(_e) {
    // 更新前端
    routesInfoDispatch({
      type: routesInfo_actions.SET_IS_Loaded,
      payload: false,
    });
    tripInfoDispatch({
      type: tripInfo_actions.DELETE_DESTINATION,
      payload: destinationId,
    });
    // socket
    sendDestinations({
      room: itineraryId,
      actionType: tripInfo_actions.DELETE_DESTINATION,
      destinationData: destinationId,
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
          <MoreHorizIcon sx={{ fontSize: '1.4rem' }} />
        </Button>

        {openBtnPopper && (
          <Box sx={BtnPopperStyle}>
            <List sx={{ p: 0 }}>
              <ListItem sx={{ p: 0 }}>
                {/* option: edit destination time */}
                <ListItemButton
                  sx={{ padding: '5px', marginTop: '5px' }}
                  onClick={handleEditModalOpen}
                >
                  <Typography color="primary">edit</Typography>
                </ListItemButton>

                {/* edit time form */}
                <Modal open={openEditModal} onClose={handleEditModalClose}>
                  <Box sx={EditModalStyle}>
                    <form
                      noValidate
                      onSubmit={handleSubmit(handleDestinationEdit)}
                      className="edit-form"
                    >
                      <Grid container spacing={2}>
                        {/* form title */}
                        <Grid item sx={12}>
                          <Typography
                            color="primary"
                            sx={{
                              fontSize: '1.7rem',
                              fontWeight: '700',
                              letterSpacing: 1.2,
                              textShadow: `1px 1px 1px ${primaryLightColor}`,
                            }}
                          >
                            Edit Time
                          </Typography>
                        </Grid>

                        {/* form body */}
                        <Grid item xs={12} sx={{ display: 'flex' }}>
                          <Grid
                            item
                            xs={3}
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Typography color="primary" sx={fieldNameStyle}>
                              Time
                            </Typography>
                          </Grid>

                          <Grid
                            item
                            xs={7}
                            sx={{ marginLeft: 1, position: 'relative' }}
                          >
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
                                borderWidth: errors.time ? 2 : 1,
                                borderColor: errors.time
                                  ? errorColor
                                  : 'rgba(0, 0, 0, 0.3)',
                              }}
                            />
                            <Box
                              style={{
                                position: 'absolute',
                                top: '105%',
                                left: '5px',
                                color: errorColor,
                                fontSize: '0.7rem',
                                fontWeight: '400',
                                fontFamily: fontFamily,
                              }}
                            >
                              {errors.time && errors.time.message}
                            </Box>
                          </Grid>
                        </Grid>

                        {/* form buttons */}
                        <Grid
                          item
                          xs={12}
                          sx={{
                            marginTop: '1rem',
                            display: 'flex',
                            justifyContent: 'end',
                            gap: 2,
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

              {/* option: delete destination */}
              <ListItem sx={{ p: 0 }}>
                <ListItemButton
                  sx={{ padding: '5px' }}
                  onClick={handleDeleteBtnClick}
                >
                  <Typography color="primary">delete</Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
