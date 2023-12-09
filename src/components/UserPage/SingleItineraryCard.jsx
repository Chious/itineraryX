import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import CardDeleteButtons from "./CardDeleteButton";
import CardEditButtons from "./CardEditButton";
import ParticipantsModal from "./ParticipantsModel";
import { Box, Stack } from "@mui/material";

export default function SingleItineraryCard({item}) {
  // function for ISO date transformation
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const [month, day, year] = new Date(dateString)
      .toLocaleDateString(undefined, options)
      .split('/');
    return `${year}/${month}/${day}`;
  };

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
          <IconButton aria-label="settings">
            <ParticipantsModal id={item.id} holderId={item.holderId}/>
          </IconButton>
        }
        title={item.title}
        subheader={`${formatDate(item.startTime)} to ${formatDate(item.endTime)}`}
      />
      <CardMedia
        component="img"
        image='../../../src/images/spot/California.jpeg'
        alt="Paella dish"
      />
      <Stack display="flex" flexDirection="row" spacing={2} useFlexGap p={2}>
        <CardEditButtons id={item.id} />
        <CardDeleteButtons id={item.id} />
        <Box sx={{ flexGrow: 1 }} bgcolor='white' />
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </Stack>
    </Card>
  );
}
