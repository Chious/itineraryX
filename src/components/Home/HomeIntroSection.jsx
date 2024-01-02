import React from "react";
import { Card, CardMedia, Typography, Box, Stack } from "@mui/material";
import canada from "../../images/spot/Canada-1.jpeg";

export default function HomeIntroSection () {
  return (
    <Box style={{ position: "relative", width: "100vw", height: "auto"}} flexGrow={1}>
      <Card elevation={0} style={{ borderRadius: "0px" }}>
        <div
          style={{
            position: "relative",
          }}
        >
          <CardMedia
            src={canada}
            title="background"
            component="img"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: "0.9",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(0deg, hsl(205.09,35.48%,30.39%,0.1) 0%, hsl(205.09,35.48%,30.39%,1) 100%)",
            }}
          />
        </div>
      </Card>
      <Box
        style={{
          position: "absolute",
          top: "50%",
          transform: "translate(0, -50%)",
          padding: "5vw",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{ display: "flex" }}
        >
          <Typography
            variant="h1"
            fontSize={{xs:"6vw", md:"8vw"}}
            style={{
              flex: 1,
              color: "white",
              fontWeight: "800",
              fontFamily: "Poppins",
            }}
          >
            Explore the world with your friends.
            {/* <h1>1234</h1>
            <h2>1234</h2>
            <h3>1234</h3>
            <button>123</button> */}
          </Typography>
        </Stack>
      </Box>
    </Box>
  )
}