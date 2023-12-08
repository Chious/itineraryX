import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CardDeleteButtons from "./CardDeleteButton";
import CardEditButtons from "./CardEditButton";
import { Stack } from "@mui/material";
import ParticipantsModal from "./ParticipantsModel";

export default function ItineraryCard1({item, image}) {
  // function for ISO date transformation
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const [month, day, year] = new Date(dateString)
      .toLocaleDateString(undefined, options)
      .split('/');
    return `${year}/${month}/${day}`;
  };

  return (
    <Card key={item.id} sx={{ maxWidth: 345, boxShadow: 5, borderRadius: 3, height:'auto' }} >
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
        image={image}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <CardDeleteButtons id={item.id} />
        <CardEditButtons id={item.id} />
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
