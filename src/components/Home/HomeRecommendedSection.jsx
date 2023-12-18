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
      <Grid container spacing={0}>
        <Grid item xs={7}>
          <Box style={{position:'relative'}}>
            <Card elevation={0}>
              <CardMedia         
                image="/src/images/spot/California.jpeg"
                title="background"
                component="img"
                style={{width:'60vw', height:'60vw', objectFit:'cover', opacity:'0.1'}}
              />
              <Box style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', width:'40vw'}}>
                <Box>
                  <DailyCard place={place} image={image} intro={intro}/>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box style={{ position: "relative" }}>
            <Card elevation={0}>
              <CardMedia
                src={fall}
                title="background"
                component="img"
                style={{
                  width: "100%",
                  height: "60vw",
                  objectFit: "cover",
                  opacity: "0.8",
                  backgroundColor: "#B4C4D9",
                }}
              />
            </Card>
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-100%, -50%)",
                padding: "2vw",
                width: "60vw",
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
                          transform: "translate(10%, -50%)",
                          padding: "5vw",
                          width: "40vw",
                        }}
                      >
                        <Box>
                          <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            style={{ display: "flex" }}
                          >
                            <Typography
                              variant="h1"
                              fontSize="4.5vw"
                              sx={{ color: "white" }}
                              style={{
                                flex: 1,
                                fontFamily: "Poppins",
                                fontWeight: 600,
                              }}
                            >
                              Our daily recommended tour
                            </Typography>
                          </Stack>
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