import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import Panel from '../components/Panel/Panel';
import { useFetchDataAndCheckAuth } from './EditPage.hook.jsx';
import { useJsApiLoader } from '@react-google-maps/api';
import Map from '../components/Map/Map';

const libraries = ['places'];

export default function EditPage() {
  useFetchDataAndCheckAuth();

  // 載入 Google Map API 的 script
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_MAP_TOKEN,
    id: 'google-map-script',
    version: 'weekly',
    libraries: libraries,
  });

  return (
    <Box className="container" sx={{ height: '100vh', overflow: 'hidden' }}>
      <PrimarySearchAppBar>
        <Stack className="content" direction="row" height="100%">
          {/* Panel component */}
          <Box className="edit-panel" width="400px" height="100%">
            <Panel />
          </Box>

          {/* Map component */}
          <Box
            className="edit-map"
            sx={{ width: 'calc(100vw - 400px)', height: '100%' }}
          >
            <Map isLoaded={isLoaded} />
          </Box>
        </Stack>
      </PrimarySearchAppBar>
    </Box>
  );
}
