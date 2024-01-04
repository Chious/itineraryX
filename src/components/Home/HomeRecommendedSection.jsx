import React, { useState, useEffect } from "react";
import { Card, CardMedia, Typography, Box, Stack, Grid } from "@mui/material";
import DailyCard from "../Home/DailyCard";
import { destination } from "../../api/home";
import fall from "../../images/spot/What to do in Lesotho_ Best Things to do in the Kingdom in the Sky.jpeg";

export default function HomeRecommendedSection () {
  const [place, setPlace] = useState(null);
  const [image, setImage] = useState(null);
  const [intro, setIntro] = useState(null);

  useEffect(() => {
    destination().then((data) => {
      setPlace(data.name);
      setImage(data.image);
      setIntro(data.intro);
    });
    return;
    // }
  }, []);

  return (
    <Box width='100vw'>
      <Grid container spacing={0} direction={{md:'row', xs:'column-reverse'}}>
        <Grid item xs={12} md={7} >
          <Box style={{position:'relative'}}>
            <Card elevation={0}>
              <CardMedia         
                image="/src/images/spot/California.jpeg"
                title="background"
                component="img"
                style={{objectFit:'cover', opacity:'0.1'}}
                sx={{
                  width: { xs: '100vw', md: '100%' },
                  height: { xs: '60vw', md: '60vw' },
                }}
              />
              <Box 
                style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)'}}
                sx={{
                  width:{xs:'60vw',md:'40vw'}
                }}
              >
                <Box>
                  <DailyCard place={place} image={image} intro={intro}/>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} >
          <Box style={{ position: "relative" }}>
            <Card elevation={0}>
              <CardMedia
                src={fall}
                title="background"
                component="img"
                style={{
                  objectFit: "cover",
                  opacity: "0.8",
                }}
                  sx={{
                  width: { xs: '100vw', md: '100%' },
                  height: { xs: '25vw', md: '60vw' },
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
                    "linear-gradient(0deg, hsl(205.09,35.48%,50.39%,0.4) 0%, hsl(205.09,35.48%,10.39%,0.4) 100%)",
                }}
              />
            </Card>
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-100%, -50%)",
              }}
              sx={{
                width:{xs:'80vw', md:'40vw'}
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ display: "flex" }}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(0%, -50%)",
                    padding: "5vw",
                    width: "auto",
                  }}
                >
                  <Box>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      style={{ display: "flex" }}
                    >
                      <Box
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          padding: "3vw",
                        }}
                        sx={{
                          width:{xs:'80vw', md:'35vw'},
                          transform: {xs:"translate(-7%, -50%)", md:"translate(-5%, -50%)"},
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h1"
                            fontSize="4.5vw"
                            sx={{ 
                              color: "white",
                              fontSize: {xs:'4vw', md:'4vw'},
                              textAlign:{xs:'center', md:'start'},
                            }}
                            style={{
                              flex: 1,
                              fontFamily: "Poppins",
                              fontWeight: 600,
                            }}
                          >
                            Our daily recommended tour
                          </Typography>
                          <Typography
                            variant="h1"
                            fontSize="2.5vw"
                            fontWeight={"bold"}
                            style={{
                              flex: 1,
                              marginTop: "3vw",
                              color: "#B4C4D9",
                              fontFamily: "Poppins",
                              fontWeight: 600,
                            }}
                            sx={{
                              textAlign:{xs:'center', md:'start'},
                              fontSize: { xs: '1.6vw', md: '2vw' },
                            }}
                          >
                            Collection of most breath-taking places
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}