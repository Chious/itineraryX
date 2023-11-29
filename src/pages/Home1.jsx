import React, { useState, useEffect } from 'react';
import Navbar from "../components/Home/Navbar"
import { Card, CardMedia, Typography, Box, Stack, Grid } from '@mui/material';
import DestinationList from "../components/Home/Itinerary";
import TripCard from '../components/Home/TripCard';
import PlanHelper from '../components/Home/PlanHelper';
import Footer from '../components/Home/Footer';
import DailyCard from '../components/Home/DailyCard';
import { destination } from '../api/home';

export default function Home() {
  const [place, setPlace] = useState(null);
  const [image, setImage] = useState(null);
  const [intro, setIntro] = useState(null);

  useEffect(() => {
    destination().then(data => {
      setPlace(data.name);
      setImage(data.image);
      setIntro(data.intro);
    });
  }, []);

  return (
    <>
      <Stack width='100vw' height='auto' direction='column'>
        {/* <Box>
          <Navbar></Navbar>
        </Box> */}
        <Box style={{position:'relative'}}>
          <Card elevation={0}>
            <CardMedia          
              image="/src/images/spot/Iceland.jpeg"
              title="background"
              component="img"
              style={{width:'100vw', height:'60vw', objectFit:'cover', opacity:'0.9'}}
            />
          </Card>
          <Box style={{position:'absolute', top:'50%', transform: 'translate(0, -50%)', padding:'5vw'}}>
            <Stack 
              direction='row' 
              justifyContent="center" 
              alignItems="center" 
              spacing={2}
              style={{display: 'flex'}}
            >
              <Typography variant="h1" fontSize='8vw' style={{flex: 1, color:'white', fontWeight:'800', fontFamily:'Poppins'}}>
                Explore the world with your friends.
                {/* <h1>1234</h1>
                <h2>1234</h2>
                <h3>1234</h3>
                <button>123</button> */}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box style={{position:'relative'}}>
          <Card elevation={0}>
            <CardMedia          
              image="/src/images/material/world.jpg"
              title="background"
              component="img"
              style={{width:'100vw', height:'60vw', objectFit:'cover', opacity:'0.1'}}
            />
          </Card>
          <Box style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', padding:'5vw', width:'90vw'}}>
            <Stack 
              direction='column' 
              justifyContent="center" 
              alignItems="center"
              spacing={2}
              style={{display: 'flex'}}
            >
              <Typography variant="h4" fontSize='1.5vw' style={{color:'#B4C4D9', fontWeight:'bold', fontFamily:'Poppins', fontWeight:600 }}>
                Beautiful Places Around The World
              </Typography>
              <Typography variant="h1" fontSize='3vw' style={{color:'#38358C', fontWeight:'bold', marginTop:'0.5vw',fontFamily:'Poppins', fontWeight:600 }}>
                Featured Destinations
              </Typography>
              <DestinationList/>
            </Stack>
          </Box>
        </Box>
        <Grid container spacing={0}>
          <Grid item xs={5}>
            <Box style={{position:'relative'}}>
              <Card elevation={0}>
                <CardMedia          
                  image="/src/images/spot/forest-1.jpeg"
                  title="background"
                  component="img"
                  style={{width:'50vw', height:'60vw', objectFit:'cover', opacity:'0.9'}}
                />
              </Card>
              <Box style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', padding:'5vw', width:'40vw'}}>
                <Box>
                  <Stack 
                    direction='column' 
                    justifyContent="center" 
                    alignItems="flex-start"
                    style={{display: 'flex'}}
                  >
                    <Typography variant="h1" fontSize='5vw' style={{flex: 1, color:'white', fontWeight:'bold', fontFamily:'Poppins', fontWeight:600 }}>
                      Get ready for your lifetime journey
                    </Typography>
                    <Typography variant="h1" fontSize='2vw' style={{flex: 1, color:'white', fontWeight:'bold', marginTop:'3vw', color:'#B4C4D9', fontFamily:'Poppins', fontWeight:600 }}>
                      Convenience.<br/>Synchronization.
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box style={{position:'relative'}}>
              <Card elevation={0}>
                <CardMedia          
                  image="/src/images/spot/Canada-1.jpeg"
                  title="background"
                  component="img"
                  style={{width:'60vw', height:'60vw', objectFit:'cover', opacity:'0.2', backgroundColor:'#B4C4D9'}}
                />
              </Card>
              <Box style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-100%, -50%)', padding:'2vw', width:'60vw'}}>
                <Box>
                  <Stack 
                    direction='row' 
                    justifyContent="center" 
                    alignItems="center" 
                    style={{display: 'flex'}}
                  >
                    <Box style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(0%, -50%)', padding:'5vw', width:'60vw'}}>
                      <Box>
                        <Stack 
                          direction='column' 
                          justifyContent="center" 
                          alignItems="center" 
                          style={{display: 'flex'}}
                        >
                          <Typography variant="h1" fontSize='3.5vw' style={{flex: 1, color:'#38358C', fontWeight:'bold', textAlign:'left', marginBottom: '2vw', fontFamily:'Poppins', fontWeight:600 }}>
                            Our exclusive trip
                          </Typography>
                          <Grid container spacing={0} marginBottom={9}>
                            <Grid item xs={4} style={{display: 'flex'}} justifyContent="center" alignItems="center">
                              <TripCard image={'/src/images/spot/Tokyo.jpeg'} name={'Tokyo'} info={'Five day trip'}/>
                            </Grid>
                            <Grid item xs={4} style={{display: 'flex'}} justifyContent="center" alignItems="center">
                              <TripCard image={'/src/images/spot/Seoul.jpeg'} name={'Seoul'} info={'Three day trip'}/>
                            </Grid>
                            <Grid item xs={4} style={{display: 'flex'}} justifyContent="center" alignItems="center">
                              <TripCard image={'/src/images/spot/Osaka.jpeg'} name={'Osaka'} info={'Six day trip'}/>
                            </Grid>
                          </Grid>
                          <Typography variant="h1" fontSize='2vw' style={{flex: 1, color:'#38358C', fontWeight:'bold', textAlign:'left', marginBottom: '1vw', fontFamily:'Poppins', fontWeight:600 }}>
                            Your trip helper
                          </Typography>
                          <PlanHelper/>
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
            <Box style={{position:'relative'}}>
              <Card elevation={0}>
                <CardMedia          
                  image="/src/images/spot/What to do in Lesotho_ Best Things to do in the Kingdom in the Sky.jpeg"
                  title="background"
                  component="img"
                  style={{width:'60vw', height:'60vw', objectFit:'cover', opacity:'0.9', backgroundColor:'#B4C4D9'}}
                />
              </Card>
              <Box style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-100%, -50%)', padding:'2vw', width:'60vw'}}>
                <Box>
                  <Stack 
                    direction='row' 
                    justifyContent="center" 
                    alignItems="center" 
                    style={{display: 'flex'}}
                  >
                    <Box style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(0%, -50%)', padding:'5vw', width:'60vw'}}>
                      <Box>
                        <Stack 
                          direction='column' 
                          justifyContent="center" 
                          alignItems="center" 
                          style={{display: 'flex'}}
                        >
                          <Box style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', padding:'5vw', width:'40vw'}}>
                            <Box>
                              <Stack 
                                direction='column' 
                                justifyContent="center" 
                                alignItems="flex-start"
                                style={{display: 'flex'}}
                              >
                                <Typography variant="h1" fontSize='4.5vw' sx={{color:'white'}} style={{flex: 1, fontWeight:'bold', fontFamily:'Poppins', fontWeight:600 }}>
                                  Our daily recommended tour
                                </Typography>
                              </Stack>
                              <Typography variant="h1" fontSize='2.5vw' fontWeight={'bold'} style={{flex: 1, color:'white', fontWeight:'bolder', marginTop:'3vw', color:'#B4C4D9', fontFamily:'Poppins', fontWeight:600 }}>
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
            </Box>
          </Grid>
        </Grid>
        <Footer/>
      </Stack>
    </>
  )
}