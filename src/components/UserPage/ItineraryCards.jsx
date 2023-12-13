import * as React from "react";
import { Stack } from "@mui/material";
import SingleItineraryCard from "./SingleItineraryCard";

export default function ItineraryCards({itineraries}) {

  // this component contain total itineraries card
  return (
    <Stack direction='row' spacing={2}  sx={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(345px, 1fr))', 
      gap: 2,
      marginTop: 2,
      justifyItems:'start'
    }}>
      {itineraries.map((item) =>(
        item && (
          <SingleItineraryCard key={item.id} item={item} />
        )
      ))}
    </Stack>
  );
}
