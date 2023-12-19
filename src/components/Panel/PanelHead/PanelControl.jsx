import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ForumIcon from '@mui/icons-material/Forum';
import { useAuth } from '@/contexts/AuthContext';
import { useTripInfo } from '@/contexts/TripInfoContext';

export default function PanelControl({ handleOpenChat }) {
  const canEdit = useAuth().canEdit;
  const itinerary = useTripInfo().itinerary;
  const navigate = useNavigate();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;

  function returnToUserPage() {
    navigate('/user');
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      px={3}
      py={1.5}
    >
      {/* return-to-user-page icon */}
      <Grid item xs={1} flexShrink={0}>
        <ArrowBackIosIcon
          onClick={returnToUserPage}
          fontSize="medium"
          sx={{
            cursor: 'pointer',
            p: 1,
            width: '2.5rem',
            height: '2.5rem',
            color: primaryLightColor,
            '&:hover': {
              backgroundColor: '#eee',
              color: primaryColor,
            },
          }}
        />
      </Grid>

      {/* itinerary title */}
      <Grid
        item
        xs={9}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography
          color={primaryColor}
          fontFamily="Roboto"
          fontSize="1.5rem"
          fontWeight="800"
          letterSpacing={1.5}
          textAlign="center"
          sx={{
            wordBreak: 'break-all',
            overflowWrap: 'break-word',
            textShadow: `1px 1px 2px ${primaryLightColor}`,
          }}
        >
          {itinerary.title.toUpperCase()}
        </Typography>
      </Grid>

      {/* chatroom icon */}
      <Grid item xs={1} flexShrink={0}>
        {canEdit && (
          <ForumIcon
            onClick={handleOpenChat}
            fontSize="medium"
            sx={{
              cursor: 'pointer',
              p: 1,
              width: '2.5rem',
              height: '2.5rem',
              color: primaryLightColor,
              '&:hover': {
                backgroundColor: '#eee',
                color: primaryColor,
              },
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}
