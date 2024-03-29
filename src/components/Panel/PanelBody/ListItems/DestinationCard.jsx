import { useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CardBtnPopper from '../Form/CardBtnPopper';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@emotion/react';

export default function DestinationCard({
  day,
  destination,
  stayingTime,
  formattedStayingTime,
}) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const canEdit = useAuth().canEdit;
  const theme = useTheme();
  const infoColor = theme.palette.info.main;

  return (
    <Card
      className="destination-card"
      sx={{
        height: 'fit-content', // adjust the height of the card according to the content
        minHeight: '100px',
        borderRadius: '10px',
        boxShadow:
          '0px 1px 1px -1px rgba(0,0,0,0.2), 1px 1px 1px 0px rgba(0,0,0,0.14), 1px 1px 3px 1px rgba(0,0,0,0.12)',
        display: 'flex',
        position: 'relative',
      }}
    >
      {/* the button for editing or deleting the destination */}
      {canEdit && (
        <CardBtnPopper day={day} destinationId={destination.destinationId} />
      )}

      {/* display the image of the destination */}
      {isDesktop && (
        <div
          className="img"
          style={{
            flexShrink: '0',
            width: '100px',
            backgroundImage: `url(${destination.placeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <a
            href={destination.placeUrl}
            target="_blank"
            style={{ display: 'block', width: '100%', height: '100%' }}
          ></a>
        </div>
      )}

      {/* display the information of the destination */}
      <CardContent
        sx={{
          flexGrow: '1',
          display: 'flex',
          alignItems: 'center',
          // should use ':last-child' when adjusting the padding of the MUI card component
          '&:last-child': {
            py: '1.5rem',
            px: '1.2rem',
          },
        }}
      >
        <Stack spacing={1}>
          {/* location name */}
          <a
            href={destination.placeUrl}
            target="_blank"
            style={{ display: 'block', width: '100%', height: '100%' }}
          >
            <Typography color="primary" fontSize="1.07rem" fontWeight="700">
              {destination.placeName}
            </Typography>
          </a>

          {/* location address */}
          <Stack direction="row" gap="0.5rem">
            <LocationOnIcon sx={{ color: infoColor, fontSize: '1rem' }} />
            <Typography
              sx={{
                color: infoColor,
                fontSize: '0.8rem',
                lineHeight: '1.2',
                wordWrap: 'break-word',
              }}
            >
              {destination.placeAddress}
            </Typography>
          </Stack>

          {/* staying time */}
          {formattedStayingTime && (
            <Stack direction="row" gap="0.5rem">
              <AccessTimeIcon
                sx={{
                  color: stayingTime < 0 ? 'red' : infoColor,
                  fontSize: '1rem',
                }}
              />
              <Typography
                sx={{
                  color: stayingTime < 0 ? 'red' : infoColor,
                  fontSize: '0.8rem',
                  lineHeight: '1.2',
                  wordWrap: 'break-word',
                }}
              >
                Stay for {formattedStayingTime}
              </Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
