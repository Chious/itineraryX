import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '@emotion/react';
import moment from 'moment';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTripInfo } from '@/contexts/TripInfoContext';
import {
  useCurrentTargetDispatch,
  currentTarget_actions,
} from '@/contexts/CurrentTargetContext';
import { useCurrentTarget } from '@/contexts/CurrentTargetContext';
import { postDestinations, postMaps } from '@/api/editPage';
import {
  routesInfo_actions,
  useRoutesInfoDispatch,
} from '@/contexts/RoutesInfoContext';
import {
  tripInfo_actions,
  useTripInfoDispatch,
} from '@/contexts/TripInfoContext';
import { sendDestinations } from '@/socket/socketManager';

const headerStyle = {
  width: '100%',
  padding: 2,
  paddingLeft: 4,
  boxShadow: 1,
  display: 'flex',
  alignItems: 'center',
};

const gridItemStyle = {
  minWidth: '70px',
  minHeight: '70px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  position: 'relative',
};

const formStyle = {
  boxSizing: 'border-box',
  backgroundColor: 'white',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: '10',
};

const fieldNameStyle = {
  marginTop: 1,
  color: 'primary',
  fontSize: '1.2rem',
  fontWeight: '500',
  letterSpacing: 1.1,
};

const center = {
  lat: 23.42926,
  lng: 120.92492,
};

export default function DestinationCreateForm({ dayOfForm, handleFormClose }) {
  const [inputValue, setInputValue] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const { itineraryId } = useParams();
  const placeId = useCurrentTarget().targetPlace.placeId;
  const currentTargetDispatch = useCurrentTargetDispatch();
  const routesInfoDispatch = useRoutesInfoDispatch();
  const tripInfoDispatch = useTripInfoDispatch();
  const tripInfo = useTripInfo();
  const itinerary = tripInfo.itinerary;
  const theme = useTheme();
  const primaryLightColor = theme.palette.primary.light;
  const errorColor = theme.palette.error.main;
  const fontFamily = theme.typography.fontFamily;
  const rwdColumns = [3, 9];

  const schema = z.object({
    location: z.string().refine(() => placeId > 0, {
      message: 'please select from search result',
    }),
    day: z.string().refine((day) => day.length > 0, {
      message: 'please select the day',
    }),
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

  async function handleAutocompleteChange() {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setInputValue(place.name);
      // 更新後端
      const placeData = await postMaps(place.place_id);
      // 更新前端
      const targetPlace = {
        placeId: placeData.id,
        placeName: placeData.name,
        placeAddress: placeData.address,
        placeIntro: placeData.intro,
        placeImage: placeData.image,
        placeLatLng: { lat: placeData.lat, lng: placeData.lng },
      };
      currentTargetDispatch({
        type: currentTarget_actions.SET_TARGET_PLACE,
        payload: targetPlace,
      });
    }
  }

  async function handleDestinationAdd(data, event) {
    event.preventDefault();
    event.stopPropagation();
    const dayGap = Number(data.day) - 1;
    const date = moment(itinerary.startTime.split('T')[0])
      .add(dayGap, 'days')
      .format('YYYY-MM-DD');
    const time = data.time;
    const datetime = `${date}T${time}Z`;
    const reqBody = {
      itineraryId: itinerary.itineraryId,
      date: datetime,
      placeId: placeId,
    };
    // 更新後端
    const resData = await postDestinations(reqBody);
    // 更新前端
    const destination_data = {
      day: data.day,
      date: resData.date,
      destinationId: resData.id,
      placeId: resData.Place.id,
      placeName: resData.Place.name,
      placeAddress: resData.Place.address,
      placeIntro: resData.Place.intro,
      placeImage: resData.Place.image,
      placeLatLng: { lat: resData.Place.lat, lng: resData.Place.lng },
    };
    routesInfoDispatch({
      type: routesInfo_actions.SET_IS_Loaded,
      payload: false,
    });
    tripInfoDispatch({
      type: tripInfo_actions.ADD_DESTINATION,
      payload: destination_data,
    });
    // socket
    sendDestinations({
      room: itineraryId,
      actionType: tripInfo_actions.ADD_DESTINATION,
      destinationData: destination_data,
    });
    // 關閉表單
    handleFormClose();
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleDestinationAdd)}
      className="create-form"
      style={formStyle}
    >
      {/* header */}
      <Box className="header" sx={headerStyle}>
        <Typography
          color="primary"
          sx={{
            fontSize: '1.5rem',
            fontWeight: '700',
            letterSpacing: 1.5,
            textShadow: `1px 1px 2px ${primaryLightColor}`,
          }}
        >
          Add New Location
        </Typography>
      </Box>

      {/* body */}
      <Grid
        container
        rowSpacing={4}
        columnSpacing={3}
        sx={{ padding: 4, paddingTop: 6 }}
      >
        {/* location */}
        <Grid item xs={rwdColumns[0]} sx={gridItemStyle}>
          <Typography sx={fieldNameStyle}>Location</Typography>
        </Grid>
        <Grid item xs={rwdColumns[1]} sx={gridItemStyle}>
          <Autocomplete
            onLoad={(autocomplete) => {
              setAutocomplete(autocomplete);
              autocomplete.setFields(['place_id', 'name', 'formatted_address']);
            }}
            onPlaceChanged={handleAutocompleteChange}
          >
            <TextField
              {...register('location')}
              error={Boolean(errors.location)}
              helperText={
                errors.location
                  ? errors.location.message
                  : 'type & select from search results'
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              size="small"
              placeholder="enter a location"
            />
          </Autocomplete>
        </Grid>

        {/* day */}
        <Grid item xs={rwdColumns[0]} sx={gridItemStyle}>
          <Typography sx={fieldNameStyle}>Day</Typography>
        </Grid>
        <Grid item xs={rwdColumns[1]} sx={gridItemStyle}>
          <Select
            {...register('day')}
            error={Boolean(errors.day)}
            helperText={errors.day && errors.day.message}
            defaultValue={`${dayOfForm}`}
            size="small"
            sx={{ width: '50%' }}
          >
            <MenuItem value={'0'} disabled>
              select day...
            </MenuItem>
            {Array(itinerary.totalDays)
              .fill()
              .map((_, index) => (
                <MenuItem key={`option-${index + 1}`} value={`${index + 1}`}>
                  {`Day ${index + 1}`}
                </MenuItem>
              ))}
          </Select>
        </Grid>

        {/* time */}
        <Grid item xs={rwdColumns[0]} sx={gridItemStyle}>
          <Typography sx={fieldNameStyle}>Time</Typography>
        </Grid>
        <Grid item xs={rwdColumns[1]} sx={gridItemStyle}>
          <input
            {...register('time')}
            onFocus={(e) => e.target.showPicker()}
            type="time"
            style={{
              width: '50%',
              height: '100%',
              padding: 8,
              borderRadius: 3,
              borderWidth: errors.time ? 2 : 1,
              borderColor: errors.time ? errorColor : 'rgba(0, 0, 0, 0.3)',
            }}
          />
          <Box
            style={{
              position: 'absolute',
              top: '105%',
              left: '2.3rem',
              color: errorColor,
              fontSize: '0.7rem',
              fontWeight: '400',
              fontFamily: fontFamily,
            }}
          >
            {errors.time && errors.time.message}
          </Box>
        </Grid>

        {/* submit button */}
        <Grid container justifyContent="flex-end" paddingTop={6} gap={3.5}>
          <Button type="button" variant="text" onClick={handleFormClose}>
            CANCEL
          </Button>
          <Button type="submit" variant="contained">
            ADD
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
