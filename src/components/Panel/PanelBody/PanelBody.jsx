import Box from '@mui/material/Box';
import AddBtn from './ListCommons/AddBtn';
import Itinerary from './Itinerary';
import { useAuth } from '@/contexts/AuthContext';

export default function PanelBody({ handleFormOpen, activeTab, setActiveTab }) {
  const auth = useAuth();
  const canEdit = auth.canEdit;

  return (
    <Box
      className="panel-body"
      width="100%"
      height="100%"
      minHeight="0" // solve the overflow problem of flex items in a flexbox container
      sx={{
        backgroundColor: 'white',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Itinerary
        handleFormOpen={handleFormOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* the add button on the bottom-right of the panel */}
      {canEdit && (
        <Box
          style={{
            position: 'absolute',
            width: '48px',
            height: '48px',
            bottom: '2rem',
            right: '2rem',
            zIndex: '3',
          }}
        >
          <AddBtn onClick={() => handleFormOpen(1)} />
        </Box>
      )}
    </Box>
  );
}
