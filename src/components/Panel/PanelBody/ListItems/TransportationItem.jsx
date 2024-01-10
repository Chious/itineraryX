import { useTheme } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
} from '@/contexts/RoutesInfoContext';
import { sendRoutes } from '@/socket/socketManager';

const BtnPopperStyle = {
  width: '230px',
  position: 'absolute',
  top: '110%',
  zIndex: 1,
  p: 0,
  boxShadow: 3,
  borderRadius: 1,
  bgcolor: 'white',
};

export default function TransportationItem({ route }) {
  const [openBtnPopper, setOpenBtnPopper] = useState(false);
  const { itineraryId } = useParams();
  const canEdit = useAuth().canEdit;
  const routesInfoDispatch = useRoutesInfoDispatch();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const handlePopperClickAway = () => setOpenBtnPopper(false);
  const handleRouteInfoBtnClick = () => setOpenBtnPopper((prev) => !prev);

  const handleTransModeEdit = async (mode) => {
    if (!route?.id) return;
    // update backend
    const route_data = await patchRoutes(route.id, mode);
    if (!route_data)
      // if there's no route data then terminate the execution and pop up the alert
      return alert(
        `Sorry, you can't change the transportation mode of this route to '${mode}' because there's no related route data.`
      );
    // update frontend
    routesInfoDispatch({
      type: routesInfo_actions.CHANGE_TRANSPORTATION_MODE,
      payload: route_data,
    });
    // socket
    sendRoutes({
      room: itineraryId,
      actionType: routesInfo_actions.CHANGE_TRANSPORTATION_MODE,
      routeData: route_data,
    });
  };

  const icons = useMemo(() => ({
    driving: {
      text: 'Car',
      icon: <DirectionsCarIcon sx={{ color: primaryColor }} />,
    },
    walking: {
      text: 'Walk',
      icon: <DirectionsWalkIcon sx={{ color: primaryColor }} />,
    },
    bicycling: {
      text: 'Bike',
      icon: <PedalBikeIcon sx={{ color: primaryColor }} />,
    },
  }));

  const transportationContent = useMemo(
    () => (
      <Stack height="100%" direction="row" spacing={1.3}>
        {icons[route?.transportationMode ?? 'driving'].icon}
        <Typography
          variant="body1"
          color="primary"
          fontWeight="600"
          textTransform="none"
        >
          about {route?.durationText}
        </Typography>
      </Stack>
    ),
    [route?.transportationMode]
  );

  const transportationInfo = useMemo(
    () =>
      canEdit ? (
        <ClickAwayListener onClickAway={handlePopperClickAway}>
          <Button type="button" onClick={handleRouteInfoBtnClick} p={0}>
            {transportationContent}
          </Button>
        </ClickAwayListener>
      ) : (
        <>{transportationContent}</>
      ),
    [route?.transportationMode]
  );

  return (
    <Box minWidth="max-content" position="relative" p={0}>
      {/* display transportation info */}
      {transportationInfo}

      {/* display transportation mode edit form */}
      {openBtnPopper && (
        <Box sx={BtnPopperStyle}>
          <List sx={{ p: 1 }}>
            {/* form title */}
            <ListItem sx={{ px: 2, display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body1" color="primary" fontWeight="600">
                Transportation Mode
              </Typography>
            </ListItem>

            {/* form options */}
            <ListItem justifyContent="center" alignItems="center" sx={{ p: 0 }}>
              {Object.entries(icons).map((entry) => (
                <ListItemButton
                  key={`mode-${entry[0]}`}
                  onClick={() => handleTransModeEdit(entry[0])}
                  onTouchEnd={() => handleTransModeEdit(entry[0])}
                  sx={{ p: 1, display: 'flex', flexDirection: 'column' }}
                >
                  {entry[1].icon}
                  <Typography variant="body2" color="primary" fontWeight="500">
                    {entry[1].text}
                  </Typography>
                </ListItemButton>
              ))}
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
}
