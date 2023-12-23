import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import TourIcon from '@mui/icons-material/Tour';
import DestinationItem from './ListItems/DestinationItem';
import TransportationItem from './ListItems/TransportationItem';
import { useTripInfo } from '@/contexts/TripInfoContext';
import { useRoutesInfo } from '@/contexts/RoutesInfoContext';
import { useAuth } from '@/contexts/AuthContext';

export default function ListItems({ rwdColumns, day }) {
  const destinationsByDay = useTripInfo().destinations[day - 1];
  const routesInfo = useRoutesInfo();
  const routesIsLoaded = routesInfo.isLoaded;
  const routes = routesInfo.routes;
  const canEdit = useAuth().canEdit;
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  // display the hint message if there's no location on the certain day
  if (!destinationsByDay || destinationsByDay.length === 0) {
    return (
      <Grid key={`empty-${day}`} container justifyContent="flex-end">
        <Grid item xs={11}>
          <Typography
            sx={{
              height: '250px',
              marginLeft: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {/* icon */}
            {canEdit ? (
              <AddLocationAltIcon
                fontSize="large"
                sx={{ color: primaryColor }}
              />
            ) : (
              <TourIcon fontSize="large" sx={{ color: primaryColor }} />
            )}

            {/* text */}
            <Typography
              color="primary"
              fontSize="1.1rem"
              fontWeight="500"
              letterSpacing={1.1}
            >
              {canEdit
                ? 'Click button to add locations'
                : `There's no location yet`}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return destinationsByDay.map((_, order) => (
    <Box key={`destination-${destinationsByDay[order].destinationId}`}>
      {/* transportation */}
      <ListItem sx={{ p: '0.7rem' }}>
        <Grid container justifyContent="flex-end" p={0} height={35}>
          <Grid
            item
            xs={rwdColumns[1]}
            p={0}
            height="100%"
            display="flex"
            alignItems="center"
          >
            {order > 0 && routesIsLoaded ? (
              <TransportationItem route={routes[day - 1][order - 1]} />
            ) : (
              order > 0 && (
                <Skeleton variant="rounded" width={200} height="100%" />
              )
            )}
          </Grid>
        </Grid>
      </ListItem>

      {/* destination */}
      <ListItem
        sx={{
          p: 0,
          marginBottom: order === destinationsByDay.length - 1 ? '5rem' : 0,
        }}
      >
        <DestinationItem
          day={day}
          order={order}
          destination={destinationsByDay[order]}
          nextDestination={
            order < destinationsByDay.length - 1 && destinationsByDay[order + 1]
          }
          route={
            routes[day - 1]?.length > 0 && order < destinationsByDay.length - 1
              ? routes[day - 1][order]
              : {}
          }
          rwdColumns={rwdColumns}
        />
      </ListItem>
    </Box>
  ));
}
