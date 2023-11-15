import * as React from 'react';
import Navbar from "../components/Home/Navbar"
import { Card, CardMedia, Typography, Box, Stack } from '@mui/material';
import DestinationList from "../components/Home/Itinerary";

export default function Home() {
  
  return (
    <>
      <Stack width='100vw' height='auto' direction='column'>
        <Box>
          <Navbar></Navbar>
        </Box>
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
              <Typography variant="h1" fontSize='8vw' style={{flex: 1, color:'white', fontWeight:'bold'}}>
                Explore the world with your friend.
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
              <Typography variant="h4" fontSize='1.5vw' style={{color:'rgb(11, 109, 178)', fontWeight:'bold'}}>
                Beautiful Places Around The World
              </Typography>
              <Typography variant="h1" fontSize='3vw' style={{color:'rgb(7, 75, 123)', fontWeight:'bold', marginTop:'0.5vw'}}>
                Featured Destinations
              </Typography>
                  {/* <Card sx={{width:'25vw', borderRadius:3}}>
                    <CardActionArea>
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="400"
                          image="/src/images/spot/Kyoto.jpeg"
                          alt="green iguana"
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            color: 'white',
                            padding: '15px',
                          }}
                        >
                          <Typography variant="h4" sx={{color:'white', fontWeight:'bold'}}>Kyoto</Typography>
                          <Typography variant="body2" sx={{color:'white', fontWeight:'bold'}}>Five day tour</Typography>
                        </Box>
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: 'auto',
                            color: 'white',
                            padding: '15px',
                          }}
                        >
                          <Button variant="contained">Detail</Button>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card> */}
              <DestinationList/>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </>
  )
}