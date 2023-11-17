import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function DailyCard() {
  return (
    <Card sx={{borderRadius:'2vw', width:'100%', boxShadow:'8'}} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200vw"
          image="/src/images/spot/Canada.jpeg"
          alt="green iguana"
        />
        <CardContent sx={{height:'22vw'}}>
          <Typography gutterBottom variant="h4" color='#38358C' component="div" sx={{fontFamily:'Poppins', fontWeight:600 }}>
            Canada
          </Typography>
          <Typography variant="body2" color="black" sx={{fontSize:'1.5vw', fontFamily:'Poppins', fontWeight:600 }}>
            Canada is a country in North America. Its ten provinces and three territories extend from the Atlantic Ocean to the Pacific Ocean and northward into the Arctic Ocean, making it the world's second-largest country by total area, with the world's longest coastline.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
