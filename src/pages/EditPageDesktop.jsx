import Grid from '@mui/material/Grid';
import Panel from '../components/Panel/Panel';
import Map from '../components/Map/Map';

export default function EditPageDesktop({
  displayLoading,
  handleOpenChat,
  isLoaded,
}) {
  return (
    <>
      <Grid
        container
        className="content"
        direction="row"
        flexWrap="nowrap"
        sx={{ height: 'calc(100vh - 64px)' }}
      >
        {/* Panel component */}
        <Grid item md={4} minWidth="480px" height="100%">
          <Panel
            displayLoading={displayLoading}
            handleOpenChat={handleOpenChat}
          />
        </Grid>

        {/* Map component */}
        <Grid
          item
          md={8}
          flex={`1 1 ${'calc(100vw - 480px)'}`}
          sx={{ width: '100%', height: '100%' }}
        >
          <Map isLoaded={isLoaded} />
        </Grid>
      </Grid>
    </>
  );
}
