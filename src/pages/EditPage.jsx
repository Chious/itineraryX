import { Box, Stack } from '@mui/material';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import Panel from '@/components/EditPage/Panel/Panel';

import {
  ItineraryProvider,
  DestinationsProvider,
  // DistancesProvider,
} from '@/components/EditPage/temp_data/trip_reducer.jsx';

export default function EditPage() {
  return (
    <ItineraryProvider>
      <DestinationsProvider>
        {/* <DistancesProvider> */}
          <Box
            className="edit-page"
            sx={{ height: '100vh', overflow: 'hidden' }}
          >
            <PrimarySearchAppBar>
              <Stack className="container" direction="row" height="100%">
                <Box className="edit-panel" width="400px" height="100%">
                  <Panel />
                </Box>
                <Box
                  className="edit-map"
                  sx={{ width: 'calc(100vw - 400px)', height: '100%' }}
                >
                  {/* <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?key=${
                      import.meta.env.VITE_MAP_TOKEN
                    }
    &q=Space+Needle,Seattle+WA`}
                  ></iframe> */}
                </Box>
              </Stack>
            </PrimarySearchAppBar>
          </Box>
        {/* </DistancesProvider> */}
      </DestinationsProvider>
    </ItineraryProvider>
  );
}
