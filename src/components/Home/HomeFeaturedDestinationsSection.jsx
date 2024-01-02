import React from "react";
import { Card, CardMedia, Typography, Box, Stack } from "@mui/material";
import DestinationList from "../Home/Itinerary";
import world from "../../images/material/world.jpg";

export default function HomeFeaturedDestinationsSection () {
  return (
    <Box style={{ position: "relative" }}>
      <Card elevation={0}>
        <CardMedia
          src={world}
          title="background"
          component="img"
          style={{
            width: "100vw",
            height: "60vw",
            objectFit: "cover",
            opacity: "0.1",
          }}
        />
      </Card>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "5vw",
          width: "90vw",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1.5}
          style={{ display: "flex" }}
        >
          <Typography
            variant="h4"
            fontSize={{xs:"1.5vw", md:"2.2vw"}}
            style={{
              color: "#647680",
              fontFamily: "Poppins",
              fontWeight: 600,
            }}
          >
            Beautiful Places Around The World
          </Typography>
          <Typography
            variant="h1"
            fontSize={{xs:"3vw", md:"4vw"}}
            style={{
              color: "#325269",
              marginTop: "0.5vw",
              fontFamily: "Poppins",
              fontWeight: 600,
            }}
          >
            Featured Destinations
          </Typography>
          <DestinationList />
        </Stack>
      </Box>
    </Box>
  )
}