import React from "react";
import { Card, CardMedia, Typography, Box, Stack, Grid } from "@mui/material";
import TripCard from "../Home/TripCard";
import PlanHelper from "../Home/PlanHelper";
import forest from "../../images/spot/Australia.jpeg";
import iceland from "../../images/spot/Iceland.jpeg";
import tokyo from "../../images/spot/Tokyo.jpeg";
import seoul from "../../images/spot/Seoul.jpeg";
import osaka from "../../images/spot/Osaka.jpeg";

export default function HomeExclusiveTripSection () {
  return (
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
                  "linear-gradient(0deg, hsl(205.09,35.48%,30.39%,0.4) 0%, hsl(205.09,35.48%,30.39%,0.4) 100%)",
              }}
            />
          </Card>
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "45px",
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
                    transform: "translate(5%, -50%)",
                    width: "55vw",
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
  )
}