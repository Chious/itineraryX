import React from "react";
import { Card, CardMedia, Typography, Box, Stack, Grid } from "@mui/material";
import TripCard from "../Home/TripCard";
import PlanHelper from "../Home/PlanHelper";
import forest from "../../images/spot/Australia.jpeg";
import iceland from "../../images/spot/Iceland.jpeg";
import tokyo from "../../images/spot/Tokyo.jpeg";
import seoul from "../../images/spot/Seoul.jpeg";
import osaka from "../../images/spot/Osaka.jpeg";
import { Blurhash } from "react-blurhash";

export default function HomeExclusiveTripSection () {
  // state for make sure image finish loaded or not
  const [isLoaded, setIsLoaded] = React.useState(false)

  // when image finished loaded, set isLoaded to true
  React.useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setIsLoaded(true)
    }
    img.src = iceland
  }, [iceland])

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} md={5}>
        <Box style={{ position: "relative" }}>
          <Card elevation={0}>
            <CardMedia
              src={forest}
              title="background"
              component="img"
              sx={{
                width: { xs: '100vw', md: '50vw' },
                height: { xs: '25vw', md: '60vw' },
              }}
              style={{
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
                  "linear-gradient(0deg, hsl(205.09,35.48%,50.39%,0.6) 0%, hsl(205.09,35.48%,10.39%,0.6) 100%)",
              }}
            />
          </Card>
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            sx={{
              padding: { xs: '20px', md: '45px' },
              width: { xs: '80vw', md: '40vw' },
            }}
          >
            <Box>
              <Stack
                direction="column"
                justifyContent="center"
                style={{ display: "flex" }}
                sx={{
                  alignItems: {xs:'center', md:'flex-start'}
                }}
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
                  sx={{
                    fontSize: { xs: '4vw', md: '5vw' },
                  }}
                >
                  Get ready for your lifetime journey
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    textAlign: {xs:'center', md:'start'},
                    fontSize: { xs: '1.6vw', md: '2vw' },
                  }}
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
      <Grid item xs={12} md={7}>
        <Box style={{ position: "relative" }} >
          <div style={{backgroundColor:'white'}}>
          {/* display blur image before image finish loaded */}
            <div style={{display: isLoaded ? 'none' : 'inline', opacity:'0.2'}}>
              <Blurhash
                hash="LfH2TPR.WBjb?wWUjZbF%ioeogbI"
                width='100%'
                height='60vw'
                resolutionX={32}
                resolutionY={32}
                punch={ 1 }
              />
            </div>
            {/* actual background image */}
            <img
              src={iceland}
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
          </div>
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-100%, -50%)",
              // padding: "2vw",
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
                    // transform: "translate(5%, -50%)",
                  }}
                  sx={{
                    width:{xs:'70vw', md:'55vw'},
                    transform: {xs:"translate(-8%, -50%)", md:"translate(5%, -50%)"},
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
                          fontFamily: "Poppins",
                          fontWeight: 600,
                        }}
                        sx={{
                          marginBottom:{xs:'3vw', md:'40px'}
                        }}
                      >
                        Our exclusive trip
                      </Typography>
                      <Grid container spacing={0} marginBottom={9}
                        sx={{
                          marginBottom:{xs:5, md:9}
                        }}
                      >
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