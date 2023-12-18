import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardBtnPopper from '../Form/CardBtnPopper';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@emotion/react';

export default function DestinationCard({ day, destination }) {
  const canEdit = useAuth().canEdit;
  const theme = useTheme();
  const infoColor = theme.palette.info.main;

  return (
    <Card
      className="destination-card"
      sx={{
        height: 'fit-content', // 自動根據內容調整卡片高度
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
      <div
        className="img"
        style={{
          flexShrink: '0',
          width: '100px',
          backgroundImage: `url(${destination.placeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* display the information of the destination */}
      <CardContent
        sx={{
          flexGrow: '1',
          display: 'flex',
          alignItems: 'center',
          // 調整MUI卡片元件內距需使用 last-child
          '&:last-child': {
            py: '1.5rem',
            px: '1.2rem',
          },
        }}
      >
        <Stack spacing={1}>
          {/* location name */}
          <Typography
            color="primary"
            sx={{ fontSize: '1.1rem', fontWeight: '700' }}
          >
            {destination.placeName}
          </Typography>

          {/* location address */}
          <Stack direction="row" gap="0.5rem">
            <LocationOnIcon sx={{ color: infoColor, fontSize: '1.1rem' }} />
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
        </Stack>
      </CardContent>
    </Card>
  );
}
