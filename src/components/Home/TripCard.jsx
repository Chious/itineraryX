import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import {Box} from '@mui/material';

export default function TripCard({image, name, info}) {
  return (
    <Card sx={{width:'15vw', borderRadius:3, boxShadow:'8'}}>
      <CardActionArea>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="200vw"
            image={image}
            style={{opacity:'0.9'}}
            alt="green iguana"
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              color: 'white',
              padding: '15px',
            }}
          >
            <Typography variant="h5" sx={{color:'white', fontFamily:'Poppins', fontWeight:600}}>{name}</Typography>
            <Typography variant="h6" sx={{color:'white', fontSize:'1.5vw', fontFamily:'Poppins', fontWeight:600}}>{info}</Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}