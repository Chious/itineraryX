import { Box, Stack } from '@mui/material';
import Panel from '@/components/Panel/Panel';
import { AuthProvider } from '@/contexts/AuthContext';
import { TripInfoProvider } from '@/contexts/TripInfoContext';
import { RoutesProvider } from '@/contexts/RoutesContext';
import { PlaceInfoProvider } from '@/contexts/PlaceInfoContext';
import Navbar from '../components/Home/Navbar';

export default function EditPage() {
  return (
    <AuthProvider>
      <TripInfoProvider>
        <RoutesProvider>
          <PlaceInfoProvider>
            <Box
              className="edit-page"
              sx={{ height: '100vh', overflow: 'hidden' }}
            >
              <Navbar/>
              <Stack className="container" direction="row" height="100%">
                {/* Panel component */}
                <Box className="edit-panel" width="400px" height="100%">
                  <Panel />
                </Box>

                {/* Map component */}
                <Box
                  className="edit-map"
                  sx={{ width: 'calc(100vw - 400px)', height: '100%' }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?key=${
                      import.meta.env.VITE_MAP_TOKEN
                    }&q=Space+Needle,Seattle+WA`}
                  ></iframe>
                </Box>
              </Stack>
            </Box>
          </PlaceInfoProvider>
        </RoutesProvider>
      </TripInfoProvider>
    </AuthProvider>
  );
}
