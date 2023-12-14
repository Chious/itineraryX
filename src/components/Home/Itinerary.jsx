import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import kyoto from '../../images/spot/Kyoto.jpeg'
import bangkok from '../../images/spot/Bangkok.webp'
import california from '../../images/spot/California.jpeg'

// itineraries in home page 'Featured Destinations' section
const images = [
  {
    image: kyoto,
    title: 'Kyoto',
    width: '30%',
  },
  {
    image: bangkok,
    title: 'Bangkok',
    width: '30%',
  },
  {
    image: california,
    title: 'California',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 500,
  borderRadius: '16px',
  // [theme.breakpoints.down('sm')]: {
  //   width: '100% !important', // Overrides inline-style
  //   height: 100,
  // },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.05,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 100,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 50px)',
  transition: theme.transitions.create('opacity'),
}));

export default function DestinationList() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', minWidth: 300, width: '100%', gap:5 }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          sx={{boxShadow:'8'}}
          style={{
            width: image.width,
            height: '40vw',
            margin: '3vw 0',
            borderRadius:'16px'
          }}
        >
          <ImageSrc sx={{backgroundImage:`url(${image.image})`}} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                fontSize: 30,
                fontFamily:'Poppins', fontWeight:600
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}
