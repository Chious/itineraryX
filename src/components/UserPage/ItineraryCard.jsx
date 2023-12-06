import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CardDeleteButtons from "./CardDeleteButton";
import CardEditButtons from "./CardEditButton";
import { Stack } from "@mui/material";
import ParticipantsModal from "./ParticipantsModel";
import { useItineraries } from "../../context/UserPageContext";

export default function ItineraryCard({image}) {
  const {itineraries} = useItineraries()

  // function for ISO date transformation
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const [month, day, year] = new Date(dateString)
      .toLocaleDateString(undefined, options)
      .split('/');
    return `${year}/${month}/${day}`;
  };

  // console.log(itineraries)

  return (
    <Stack direction='row' spacing={2}   sx={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))', 
      gap: 2 
    }}>
      {itineraries.map((item) =>(
        item && (
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
              subheader={`Start from ${formatDate(item.startTime)} to ${formatDate(item.endTime)}`}
            />
            <CardMedia
              component="img"
              image={image}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Trip description
              </Typography>
            </CardContent>
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
        )
      ))}
    </Stack>
  );
}