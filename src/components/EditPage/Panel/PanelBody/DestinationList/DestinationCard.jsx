import Stack from '@mui/material/Stack';
import { Box, IconButton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import photo from '../../../../../assets/joshua-hibbert-Pn6iimgM-wo-unsplash.jpg';

export default function DestinationCard({ destination }) {
  return (
    <Card
      className="destination-card"
      sx={{
        marginRight: '10px',
        height: 'fit-content',
        minHeight: '100px',
        borderRadius: '10px',
        display: 'flex',
        gap: '5px',
        position: 'relative',
      }}
    >
      {/* icon button for edit function */}
      <IconButton
        sx={{
          position: 'absolute',
          top: '5px',
          right: '5px',
        }}
      >
        <MoreHorizIcon sx={{ fontSize: '1.2rem' }} />
      </IconButton>

      {/* image */}
      <div
        className="img"
        style={{
          flexShrink: '0',
          width: '100px',
          backgroundImage: `url(${destination.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* destination info */}
      <CardContent
        sx={{
          flexGrow: '1',
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          '&:last-child': {
            padding: '10px',
          },
        }}
      >
        <Stack spacing={0.5}>
          <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
            {destination.name}
          </Typography>
          <Stack direction="row" gap="2px">
            <LocationOnIcon sx={{ fontSize: '0.9rem' }} />
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: '0.7rem',
                lineHeight: '1.1',
                wordWrap: 'break-word',
              }}
            >
              {destination.address}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
