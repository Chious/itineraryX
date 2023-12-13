import Box from '@mui/material/Box';
import AddBtn from './ListCommons/AddBtn';
import Itinerary from './Itinerary';
import { useAuth } from '@/contexts/AuthContext';

export default function PanelBody({ handleFormOpen }) {
  const auth = useAuth();
  const canEdit = auth.canEdit;

  return (
    <Box
      className="panel-body"
      width="100%"
      height="100%"
      minHeight="0" // 解決flexbox容器中flex item外溢的問題
      sx={{ position: 'relative' }}
    >
      <Itinerary handleFormOpen={handleFormOpen} />

      {/* the add button on the bottom-right of the panel */}
      {canEdit && (
        <Box
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2.5rem',
            zIndex: '3',
          }}
        >
          <AddBtn onClick={() => handleFormOpen(1)} />
        </Box>
      )}
    </Box>
  );
}
