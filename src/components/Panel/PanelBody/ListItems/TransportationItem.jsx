import { useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { patchRoutes } from '@/api/editPage.js';
import { useAuth } from '@/contexts/AuthContext';
import {
  routesInfo_actions,
  useRoutesInfoDispatch,
} from '../../../../contexts/RoutesInfoContext';

const icons = {
  driving: { text: 'Car', icon: <DirectionsCarIcon color="black" /> },
  walking: { text: 'Walk', icon: <DirectionsWalkIcon color="black" /> },
  bicycling: { text: 'Bike', icon: <PedalBikeIcon color="black" /> },
};

const BtnPopperStyle = {
  // width: 'max-content',
  position: 'absolute',
  top: '105%',
  left: 0,
  zIndex: 1,
  p: 0,
  boxShadow: 3,
  borderRadius: 1,
  bgcolor: 'white',
};

export default function TransportationItem({ route, rwdColumns }) {
  const [openBtnPopper, setOpenBtnPopper] = useState(false);
  const canEdit = useAuth().canEdit;
  const routesInfoDispatch = useRoutesInfoDispatch();

  const handlePopperClickAway = () => setOpenBtnPopper(false);
  const handleRouteInfoBtnClick = () => setOpenBtnPopper((prev) => !prev);
  const handleTransModeEdit = async (mode) => {
    // 更新後端
    const routeId = route.id;
    const res = await patchRoutes(routeId, mode);
    // 更新前端
    routesInfoDispatch({
      type: routesInfo_actions.CHANGE_TRANSPORTATION_MODE,
      payload: { routeId: routeId, transportationMode: mode },
    });
  };

  const transportationInfo = useMemo(
    () =>
      canEdit ? (
        <ClickAwayListener onClickAway={handlePopperClickAway}>
          <Button type="button" onClick={handleRouteInfoBtnClick}>
            <Stack direction="row" spacing={1}>
              {icons[route?.transportationMode ?? 'driving'].icon}
              <Typography>about {route?.durationText}</Typography>
            </Stack>
          </Button>
        </ClickAwayListener>
      ) : (
        <Stack direction="row" spacing={1}>
          {icons[route?.transportationMode].icon}
          <Typography>about {route?.durationText}</Typography>
        </Stack>
      ),
    [route?.transportationMode]
  );

  return (
    <Grid container justifyContent="flex-end">
      <Grid item xs={rwdColumns[1]} position="relative">
        {transportationInfo}

        {openBtnPopper && (
          <Box sx={BtnPopperStyle}>
            <List sx={{ p: 1 }}>
              <ListItem
                sx={{ px: 2, display: 'flex', justifyContent: 'center' }}
              >
                <Typography>Transportation Mode</Typography>
              </ListItem>
              <ListItem
                justifyContent="center"
                alignItems="center"
                sx={{ p: 0 }}
              >
                {Object.entries(icons).map((entry) => (
                  <ListItemButton
                    key={`mode-${entry[0]}`}
                    onClick={() => handleTransModeEdit(entry[0])}
                    sx={{ p: 1, display: 'flex', flexDirection: 'column' }}
                  >
                    {entry[1].icon}
                    <Typography fontSize="0.8rem">{entry[1].text}</Typography>
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
