import { useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import { useCurrentTarget } from '@/contexts/CurrentTargetContext';

export function PlaceInfo({ place, day, display }) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const theme = useTheme();
  const primaryLightColor = theme.palette.primary.light;
  const infoColor = theme.palette.info.main;
  const targetDay = useCurrentTarget().targetDay;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: 5,
        paddingRight: 0,
      }}
    >
      {/* place image */}
      {(isDesktop || display) && (
        <div
          className="img"
          style={{
            flexShrink: '0',
            width: '100%',
            height: '150px',
            borderRadius: '8px',
            backgroundImage: `url(${place.placeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      )}

      {/* place info */}
      <div
        style={{
          width: '300px',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {/* day & order */}
        {targetDay === 0 && day >= 0 && (
          <Typography variant="body2" color="primary" fontWeight="600">
            Day {day + 1}
          </Typography>
        )}

        {place.placeName && (
          <Typography variant="h6" color="primary" fontWeight="700">
            {place.placeName}
          </Typography>
        )}

        {place.placeIntro && (isDesktop || display) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <InfoIcon sx={{ color: primaryLightColor, fontSize: '1rem' }} />
            <Typography
              variant="body2"
              color={primaryLightColor}
              lineHeight={1.3}
            >
              {place.placeIntro}
            </Typography>
          </div>
        )}

        {place.placeAddress && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <LocationOnIcon
              sx={{ color: primaryLightColor, fontSize: '1rem' }}
            />
            <Typography
              variant="body2"
              color={primaryLightColor}
              lineHeight={1.3}
            >
              {place.placeAddress}
            </Typography>
          </div>
        )}

        {place.placeUrl && (
          <Button sx={{ width: 'fit-content', p: 0, gap: 1.3 }}>
            <MapIcon sx={{ color: infoColor, fontSize: '1rem' }} />
            <a href={place.placeUrl} target="_blank">
              <Typography variant="body2" color={infoColor}>
                view details
              </Typography>
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
