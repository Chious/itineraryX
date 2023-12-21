import { useTheme } from '@emotion/react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MapIcon from '@mui/icons-material/Map';

export function PlaceInfo({ place }) {
  const theme = useTheme();
  const infoColor = theme.palette.info.main;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 5, paddingRight: 0 }}>
      {/* place image */}
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

      {/* place info */}
      <div
        style={{
          width: '280px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {place.placeName && (
          <Typography color="primary" fontSize="1.3rem" fontWeight="700">
            {place.placeName}
          </Typography>
        )}

        {place.placeIntro && (
          <Typography color="#325269" fontSize="0.9rem">
            {place.placeIntro}
          </Typography>
        )}

        {place.placeAddress && (
          <Typography
            style={{
              color: infoColor,
              fontSize: '0.8rem',
            }}
          >
            {place.placeAddress}
          </Typography>
        )}

        {place.placeUrl && (
          <Button sx={{ width: 'fit-content', p: 0, gap: 0.8, fontSize: '0.8rem' }}>
            <MapIcon fontSize="small" sx={{color: infoColor}} />
            <a href={place.placeUrl} target='blank' style={{ color: infoColor }}>
              View details
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
