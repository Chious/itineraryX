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
import { useItineraries } from "../../context/UserPageContext";
import ItineraryCard from "./ItineraryCard";

export default function MyItineraries({image}) {
  const {itineraries} = useItineraries()

  // function for ISO date transformation
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const [month, day, year] = new Date(dateString)
      .toLocaleDateString(undefined, options)
      .split('/');
    return `${year}/${month}/${day}`;
  };

  return (
    <Stack direction='row' spacing={2}  sx={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))', 
      gap: 2 
    }}>
      {itineraries.map((item) =>(
        item && (
          <ItineraryCard key={item.id} item={item} image={image} />
        )
      ))}
    </Stack>
  );
}
