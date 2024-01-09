import React, { useState, useEffect } from "react";
import { Card, CardMedia, Typography, Box, Stack } from "@mui/material";
import DestinationList from "../Home/Itinerary";
import world from "../../images/material/world.jpg";
import { Blurhash } from "react-blurhash";

export default function HomeFeaturedDestinationsSection () {
  const [isLoaded, setIsLoaded] = useState(false)

  // when image finished loaded, set isLoaded to true
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setIsLoaded(true)
    }
    img.src = world
  }, [world])

  return (
    <Box style={{ position: "relative", width:'100%', height:'60vw' }} bgcolor='white'>
      <div style={{display: isLoaded ? 'none' : 'inline'}}>
        <Blurhash
          hash="LJR{#?t7%MRjM{j[ofM{~qWBIUt7"
          width='100%'
          height='40vw'
          resolutionX={32}
          resolutionY={32}
          punch={1 } 
        />
      </div>
      {/* actual background image */}
      <img
        src={world}
        title="background"
        component="img"
        style={{
          width: "100%",
          height: "60vw",
          objectFit: "cover",
          opacity: "0.2",
          display: !isLoaded ? 'none' : 'inline'
        }}
      />
      <Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "3vw",
          width: "85vw",
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