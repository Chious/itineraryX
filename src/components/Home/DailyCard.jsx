import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// Daily recommended card in home page
export default function DailyCard({place, image, intro}) {
  return (
    <Card 
      sx={{
        borderRadius:'2vw', 
        width:'100%', 
        boxShadow:'8',
        }} 
      >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200vw"
          src={image}
          alt="daily card"
        />
        <CardContent sx={{height:'22vw'}}>
          <Typography gutterBottom variant="h4" color='#325269' component="div" sx={{fontFamily:'Poppins', fontWeight:700, fontSize:'30px' }}>
            {place}
          </Typography>
          <Typography variant="body2" color="#647680" sx={{fontSize:'1.5vw', fontFamily:'Poppins', fontWeight:600 }}>
            {intro}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
