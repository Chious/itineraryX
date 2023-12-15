import React, { useState, useEffect } from "react";
import Navbar from "../components/Home/Navbar";
import { Card, CardMedia, Typography, Box, Stack, Grid } from "@mui/material";
import DestinationList from "../components/Home/Itinerary";
import TripCard from "../components/Home/TripCard";
import PlanHelper from "../components/Home/PlanHelper";
import Footer from "../components/Home/Footer";
import DailyCard from "../components/Home/DailyCard";
import { destination } from "../api/home";
import canada from "../images/spot/Canada-1.jpeg";
import world from "../images/material/world.jpg";
import forest from "../images/spot/Australia.jpeg";
import iceland from "../images/spot/Iceland.jpeg";
import tokyo from "../images/spot/Tokyo.jpeg";
import seoul from "../images/spot/Seoul.jpeg";
import osaka from "../images/spot/Osaka.jpeg";
import california from "../images/spot/California.jpeg";
import fall from "../images/spot/What to do in Lesotho_ Best Things to do in the Kingdom in the Sky.jpeg";

export default function Home() {
  const [place, setPlace] = useState(null);
  const [image, setImage] = useState(null);
  const [intro, setIntro] = useState(null);

  // use token inside local storage to decide whether login or not
  const [isTokenExist, setIsTokenExist] = React.useState(
    localStorage.getItem("token") || false
  );

  useEffect(() => {
    // if (localStorage.token !== undefined) {
    destination().then((data) => {
      setPlace(data.name);
      setImage(data.image);
      setIntro(data.intro);
    });
    return;
    // }
  }, [isTokenExist]);

  return (
    <>
      <Stack width="100vw" height="auto" direction="column">
        <Box>
          <Navbar></Navbar>
        </Box>
        <Box style={{ position: "relative" }}>
          <Card elevation={0} style={{ borderRadius: "0px" }}>
            <div
              style={{
                position: "relative",
                width: "100vw",
                height: "60vw",
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
                fontSize="8vw"
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
              spacing={2}
              style={{ display: "flex" }}
            >
              <Typography
                variant="h4"
                fontSize="1.5vw"
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
                fontSize="3vw"
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
        <Grid container spacing={0}>
          <Grid item xs={5}>
            <Box style={{ position: "relative" }}>
              <Card elevation={0}>
                <CardMedia
                  src={forest}
                  title="background"
                  component="img"
                  style={{
                    width: "50vw",
                    height: "60vw",
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
                      "linear-gradient(0deg, hsl(205.09,35.48%,30.39%,0.6) 0%, hsl(205.09,35.48%,30.39%,0.6) 100%)",
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
                      fontSize="5vw"
                      style={{
                        flex: 1,
                        color: "white",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                      }}
                    >
                      Get ready for your lifetime journey
                    </Typography>
                    <Typography
                      variant="h1"
                      fontSize="2vw"
                      style={{
                        flex: 1,
                        marginTop: "3vw",
                        color: "#B4C4D9",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                      }}
                    >
                      Convenience.
                      <br />
                      Synchronization.
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box style={{ position: "relative" }}>
              <Card elevation={0}>
                <CardMedia
                  src={iceland}
                  title="background"
                  component="img"
                  style={{
                    width: "60vw",
                    height: "60vw",
                    objectFit: "cover",
                    opacity: "0.1",
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
                <Box>
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
                        width: "60vw",
                      }}
                    >
                      <Box>
                        <Stack
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          style={{ display: "flex" }}
                        >
                          <Typography
                            variant="h1"
                            fontSize="3.5vw"
                            style={{
                              flex: 1,
                              color: "#325269",
                              textAlign: "left",
                              marginBottom: "40px",
                              fontFamily: "Poppins",
                              fontWeight: 600,
                            }}
                          >
                            Our exclusive trip
                          </Typography>
                          <Grid container spacing={0} marginBottom={9}>
                            <Grid
                              item
                              xs={4}
                              style={{ display: "flex" }}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <TripCard
                                image={tokyo}
                                name={"Tokyo"}
                                info={"Five day trip"}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              style={{ display: "flex" }}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <TripCard
                                image={seoul}
                                name={"Seoul"}
                                info={"Three day trip"}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={4}
                              style={{ display: "flex" }}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <TripCard
                                image={osaka}
                                name={"Osaka"}
                                info={"Six day trip"}
                              />
                            </Grid>
                          </Grid>
                          <Typography
                            variant="h1"
                            fontSize="2vw"
                            style={{
                              flex: 1,
                              color: "#647680",
                              textAlign: "left",
                              marginBottom: "1vw",
                              fontFamily: "Poppins",
                              fontWeight: 600,
                            }}
                          >
                            Your trip helper
                          </Typography>
                          <PlanHelper />
                        </Stack>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={7}>
            <Box style={{ position: "relative" }}>
              <Card elevation={0}>
                <CardMedia
                  src={california}
                  title="background"
                  component="img"
                  style={{
                    width: "60vw",
                    height: "60vw",
                    objectFit: "cover",
                    opacity: "0.1",
                  }}
                />
                <Box
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "40vw",
                  }}
                >
                  <Box>
                    <DailyCard place={place} image={image} intro={intro} />
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
                    width: "60vw",
                    height: "60vw",
                    objectFit: "cover",
                    opacity: "0.9",
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
                      width: "60vw",
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
                            transform: "translate(-50%, -50%)",
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
        <Footer />
      </Stack>
    </>
  );
}
