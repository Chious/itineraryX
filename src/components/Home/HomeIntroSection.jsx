import React from "react";
import { Card, CardMedia, Typography, Box, Stack, Button } from "@mui/material";
import canada from "../../images/spot/Canada-1.jpeg";
import { Link } from 'react-router-dom';

export default function HomeIntroSection ({isTokenExist}) {
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
          height:'45vw',
          position: "absolute",
          // top: "50%",
          bottom:'0%',
          // transform: "translate(0, -50%)",
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
          </Typography>
        </Stack>
        {isTokenExist && (
          <Button 
            variant="contained"  
            component={Link} 
            to="/user"
            sx={{
              position: 'absolute',
              bottom: '30px',
              right: '30px',
              zIndex: 99,
              backgroundColor: '#FE7A00',
              display: {xs:'block', md:'none'}
            }}
            style={{
              flex: 1,
              color: "white",
              fontWeight: "800",
              fontFamily: "Poppins",
              fontSize: '2vw'
            }}
          >
            Start plan!
          </Button>
        )}
      </Box>
    </Box>
  )
}