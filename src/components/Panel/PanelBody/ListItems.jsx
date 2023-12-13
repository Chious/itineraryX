import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import DestinationItem from './ListItems/DestinationItem';
import TransportationItem from './ListItems/TransportationItem';
import { useTripInfo } from '@/contexts/TripInfoContext';
import { useRoutesInfo } from '@/contexts/RoutesInfoContext';

export default function ListItems({ rwdColumns, day }) {
  const destinationsByDay = useTripInfo().destinations[day - 1];
  const routesInfo = useRoutesInfo();
  const routesIsLoaded = routesInfo.isLoaded;
  const routes = routesInfo.routes;

  // 若有某天尚未添加任何景點則顯示提示訊息
  if (!destinationsByDay || destinationsByDay.length === 0) {
    return (
      <Grid key={`empty-${day}`} container justifyContent="flex-end">
        <Grid item xs={rwdColumns[1]}>
          <Typography>請點擊按鈕添加景點</Typography>
        </Grid>
      </Grid>
    );
  }

  return destinationsByDay.map((_, order) => (
    <>
      <ListItem key={`route-${day}-${order}`} sx={{ padding: '1rem' }}>
        {order > 0 && routesIsLoaded && (
          <TransportationItem
            route={routes[day - 1][order - 1]}
            rwdColumns={rwdColumns}
          />
        )}
      </ListItem>
      <ListItem key={`destination-${day}-${order}`} sx={{ padding: 0 }}>
        <DestinationItem
          day={day}
          destination={destinationsByDay[order]}
          rwdColumns={rwdColumns}
        />
      </ListItem>
    </>
  ));
}
