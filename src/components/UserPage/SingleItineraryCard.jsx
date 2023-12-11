import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import CardDeleteButtons from "./CardDeleteButton";
import CardEditButtons from "./CardEditButton";
import ParticipantsModal from "./ParticipantsModel";
import { Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

export default function SingleItineraryCard({item}) {
  // function for ISO date transformation
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const [month, day, year] = new Date(dateString)
      .toLocaleDateString(undefined, options)
      .split('/');
    return `${year}/${month}/${day}`;
  };

  const baseUrl = import.meta.env.VITE_BASE_URL

  // single itinerary card for both MY ITINERARIES & JOINED ITINERARIES tab
  return (
    <Card key={item.id} sx={{ maxWidth: 350, boxShadow: 5, borderRadius: 3, height:'auto', justifySelf:'start' }} style={{marginLeft:0}} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="participants modal">
            <ParticipantsModal id={item.id} holderId={item.holderId}/>
          </IconButton>
        }
        title={item.title}
        subheader={`${formatDate(item.startTime)} to ${formatDate(item.endTime)}`}
      />
      
      {/* use Link to achieve dynamic redirect URL function */}
      <Link to={baseUrl+'/edit/'+item.id}>
        <CardMedia
          component="img"
          image='../../../src/images/spot/California.jpeg'
          alt="Paella dish"
        />
      </Link>
      <Stack display="flex" flexDirection="row" spacing={1} useFlexGap p={1.5}>
        <CardEditButtons id={item.id} />
        <CardDeleteButtons id={item.id} />
        <Box sx={{ flexGrow: 1 }} bgcolor='white' />
        <Link to={baseUrl+'/edit/'+item.id}>
          <Button variant="contained">Go!</Button>
        </Link>
      </Stack>
    </Card>
  );
}
