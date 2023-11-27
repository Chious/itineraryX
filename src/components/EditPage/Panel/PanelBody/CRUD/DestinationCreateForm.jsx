import { useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {
  usePlaceInfoDispatch,
  placeInfo_actions,
} from '../../../temp_data/trip_reducer';

const center = {
  lat: 23.42926,
  lng: 120.92492,
};

export default function DestinationCreateForm({
  formRef,
  numOfDays,
  handleDestinationAdd,
  handleFormClose,
}) {
  const placeInfoDispatch = usePlaceInfoDispatch();
  const inputDivRef = useRef(null);
  const autocompleteRef = useRef(null);
  const rwdColumns = [3, 9];

  function handleAutocompleteChange() {
    const place = autocompleteRef.current.getPlace();
    const placeInfo = {
      placeId: place.place_id,
      location: place.geometry.location,
      placeName: place.name,
    };
    placeInfoDispatch({
      type: placeInfo_actions.SET_PLACE_INFO,
      payload: placeInfo,
    });
  }

  async function initAutocomplete() {
    const autocompleteOptions = {
      fields: ['place_id', 'geometry', 'name'],
      bounds: {
        north: center.lat + 1,
        south: center.lat - 1,
        east: center.lng + 1,
        west: center.lng - 1,
      },
      strictBounds: false,
    };
    const { Autocomplete } = await window.google.maps.importLibrary('places');
    const autocompleteInstance = new Autocomplete(
      inputDivRef.current,
      autocompleteOptions
    );
    autocompleteInstance.addListener('place_changed', handleAutocompleteChange);
    autocompleteRef.current = autocompleteInstance;
  }

  useEffect(() => {
    initAutocomplete(
      inputDivRef.current,
      autocompleteRef,
      handleAutocompleteChange
    );
  }, []);

  return (
    <form
      // novalidate
      className="create-destination-form"
      ref={formRef}
      onSubmit={handleDestinationAdd}
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        padding: '2rem',
        backgroundColor: 'white',
        position: 'relative',
        zIndex: '4',
      }}
    >
      <Grid container spacing={3}>
        {/* location input */}
        <Grid
          item
          xs={rwdColumns[0]}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography>Place</Typography>
        </Grid>
        <Grid item xs={rwdColumns[1]}>
          <input
            id="place"
            type="text"
            placeholder="search place..."
            required
            ref={inputDivRef}
            style={{ width: '100%' }}
          />
        </Grid>

        {/* day selector */}
        <Grid
          item
          xs={rwdColumns[0]}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography>Day</Typography>
        </Grid>
        <Grid item xs={rwdColumns[1]}>
          <select name="day" id="day" required>
            <option value={0} disabled>
              select day...
            </option>
            {Array(numOfDays)
              .fill()
              .map((_, index) => (
                <option key={`option-${index + 1}`} value={index + 1}>
                  {`Day ${index + 1}`}
                </option>
              ))}
          </select>
        </Grid>

        {/* time input */}
        <Grid
          item
          xs={rwdColumns[0]}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography>Time</Typography>
        </Grid>
        <Grid item xs={rwdColumns[1]}>
          <input
            id="time"
            type="time"
            placeholder="input time..."
            onFocus={(e) => e.target.showPicker()}
            required
          />
        </Grid>

        {/* buttons */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            onClick={handleDestinationAdd}
          >
            新增景點
          </Button>
          <Button variant="contained" onClick={handleFormClose}>
            取消
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
