import { useState } from 'react';
import {
  Button,
  Grid,
  Box,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PedalBikeIcon from '@mui/icons-material/PedalBike';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { patchRoutes } from '../../../temp_data/trip_reducer';

const icons = {
  driving: <DirectionsCarIcon color="black" />,
  walking: <DirectionsWalkIcon color="black" />,
  bicycling: <PedalBikeIcon color="black" />,
};

const BtnPopperStyle = {
  width: 'max-content',
  position: 'absolute',
  top: '80%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  zIndex: 1,
  p: 1,
  boxShadow: 3,
  borderRadius: 1,
  bgcolor: 'white',
};

export default function TransportationItem({ rwdColumn, route }) {
  const [routeState, setRouteState] = useState(route);
  const [openBtnPopper, setOpenBtnPopper] = useState(false);

  const handlePopperClickAway = () => setOpenBtnPopper(false);
  const handleRouteBtnClick = () => setOpenBtnPopper((prev) => !prev);

  const handleTransModeEdit = async (mode) => {
    const routeId = routeState.id;
    // 更新後端
    const res = await patchRoutes(routeId, mode);
    // 更新前端
    setRouteState((prevRoute) => ({
      ...prevRoute,
      durationText: res.durationText,
      transportationMode: res.transportationMode,
    }));
  };

  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={rwdColumn}>
        <ClickAwayListener onClickAway={handlePopperClickAway}>
          <Button type="button" onClick={handleRouteBtnClick}>
            <Stack direction="row" spacing={1}>
              {icons[routeState.transportationMode]}
              <Typography>about {routeState.durationText}</Typography>
            </Stack>
          </Button>
        </ClickAwayListener>
        {openBtnPopper && (
          <Box sx={BtnPopperStyle}>
            <List sx={{ p: 0 }}>
              <ListItem sx={{ p: 0 }} alignItems="flex-start">
                {Object.entries(icons).map((entry) => (
                  <ListItemButton
                    key={`mode-${entry[0]}`}
                    onClick={() => handleTransModeEdit(entry[0])}
                    sx={{ padding: '5px' }}
                  >
                    {entry[1]}
                  </ListItemButton>
                ))}
              </ListItem>
            </List>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
