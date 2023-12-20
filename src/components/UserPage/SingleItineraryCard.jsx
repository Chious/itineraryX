import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CardDeleteButtons from "./CardDeleteButton";
import CardEditButtons from "./CardEditButton";
import ParticipantsModal from "./ParticipantsModel";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import defaultImage from '../../../src/images/spot/California.jpeg'

export default function SingleItineraryCard({item}) {
  // function for ISO date transformation
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const [month, day, year] = new Date(dateString)
      .toLocaleDateString(undefined, options)
      .split('/');
    return `${year}/${month}/${day}`;
  };

  const navigate = useNavigate()

  // single itinerary card for both MY ITINERARIES & JOINED ITINERARIES tab
  return (
    <Card key={item.id} sx={{ maxWidth: 350, boxShadow: 5, borderRadius: 3, height:'auto', justifySelf:'start' }} style={{marginLeft:0}} >
      <CardHeader
        action={
          <IconButton aria-label="participants modal" sx={{width:'45px', height:'45px'}}>
            <ParticipantsModal id={item.id} holderId={item.holderId}/>
          </IconButton>
        }
        title={item.title}
        subheader={`${formatDate(item.startTime)} to ${formatDate(item.endTime)}`}
        titleTypographyProps={{
          fontFamily:'Poppins',
          fontSize: 20, 
          fontWeight: '600',
          color: '#325269',
          gutterBottom: '10px'
        }}
        subheaderTypographyProps={{
          fontFamily:'Poppins',
          fontSize: 15, 
          fontWeight: '400', 
          color: '#647680'
        }}
        sx={{
          fontFamily:'Poppins',
        }}
      />
      
      {/* use Link to achieve dynamic redirect URL function */}
      <CardMedia
        component="img"
        image={defaultImage}
        alt="Paella dish"
        onClick={() => navigate('/edit/'+item.id)}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      />
      <Stack display="flex" flexDirection="row" spacing={1} useFlexGap p={1.5}>
        <CardEditButtons id={item.id} />
        <CardDeleteButtons id={item.id} />
        <Box sx={{ flexGrow: 1 }} bgcolor='white' />
        <Button 
          variant="contained" 
          onClick={() => navigate('/edit/'+item.id)}
          sx={{ 
            fontFamily: 'Poppins', 
            fontSize: '16px', 
            fontWeight: '600', 
            color: 'white', 
            backgroundColor:'#FE7A00' 
          }}
        >
        Go!
        </Button>
      </Stack>
    </Card>
  );
}
