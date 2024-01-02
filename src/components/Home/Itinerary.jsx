import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import kyoto from '../../images/spot/Kyoto.jpeg'
import bangkok from '../../images/spot/Bangkok.webp'
import california from '../../images/spot/California.jpeg'
import { Grid } from '@mui/material';

// itineraries in home page 'Featured Destinations' section
const images = [
  {
    image: kyoto,
    title: 'Kyoto',
  },
  {
    image: bangkok,
    title: 'Bangkok',
  },
  {
    image: california,
    title: 'California',
  },
];

const ImageButton = styled(ButtonBase)(() => ({
  position: 'relative',
  height: 500,
  borderRadius: '16px',
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
  borderRadius:'16px'
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
  borderRadius:'16px'
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
  borderRadius:'16px'
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 80,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 40px)',
  transition: theme.transitions.create('opacity'),
}));

export default function DestinationList() {
  return (
    <Grid container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {images.map((image) => (
      <Grid item md={4} xs={12} key={image.title}>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
          <ImageButton
            // focusRipple={false}
            sx={{
              boxShadow:'8',
              width: {xs:'70%', md:'90%'},
              height: {xs:'13vw', md:'35vw'},
              margin: '1vw 0',
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
                  p: 1,
                  // pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} - 6px)`,
                  fontSize: {xs:'16px', md:'30px'},
                  fontFamily:'Poppins', fontWeight:600
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        </Box>
      </Grid>
      ))}
    </Grid>

  );
}
