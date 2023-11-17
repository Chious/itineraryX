import * as React from 'react';
import { Stack, Typography, IconButton, Box } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Footer() {
  return (
    <Stack
      width='100vw' 
      height='auto' 
      direction='column' 
      backgroundColor='white' 
      display={'flex'} 
      alignItems={'center'} 
      justifyContent={'center'}
      bgcolor={'#B4C4D9'}
    >
      <Stack 
        width='100vw' 
        height='auto' 
        direction='row' 
        backgroundColor='white' 
        display={'flex'} 
        alignItems={'center'} 
        justifyContent={'center'}
        marginTop={4}
        marginBottom={1}
        bgcolor={'#B4C4D9'}
        
      >
        <Stack direction="row" spacing={4} alignItems={'center'}>
          <Typography textAlign={'center'} color={'#38358C'} fontSize={20} sx={{letterSpacing:3,fontFamily:'Poppins', fontWeight:600}}>ItineraryX</Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems={'center'} marginLeft={20} marginRight={20}>
          <Typography textAlign={'center'} color={'#38358C'} fontSize={10} fontWeight={'bold'} sx={{fontFamily:'Poppins', fontWeight:600 }}>About</Typography>
          <Typography textAlign={'center'} color={'#38358C'} fontSize={10} fontWeight={'bold'} sx={{fontFamily:'Poppins', fontWeight:600 }}>Our team</Typography>
          <Typography textAlign={'center'} color={'#38358C'} fontSize={10} fontWeight={'bold'} sx={{fontFamily:'Poppins', fontWeight:600 }}>Contact</Typography>
        </Stack>
        <Stack direction="row" spacing={0} alignItems={'center'}>
          <IconButton aria-label="instagram" >
            <InstagramIcon fontSize='small' sx={{color:'#38358C'}}/>
          </IconButton>
          <IconButton aria-label="facebook" color="primary">
            <FacebookIcon fontSize='small' sx={{color:'#38358C'}}/>
          </IconButton>
          <IconButton color="secondary" aria-label="twitter">
            <TwitterIcon fontSize='small' sx={{color:'#38358C'}}/>
          </IconButton>
          <IconButton color="primary" aria-label="youtube">
            <YouTubeIcon fontSize='small' sx={{color:'#38358C'}}/>
          </IconButton>
        </Stack>
      </Stack>
      <Stack 
        width='100vw' 
        height='auto' 
        direction='row' 
        backgroundColor='white' 
        display={'flex'} 
        alignItems={'center'} 
        justifyContent={'center'}
        marginBottom={4}
        bgcolor={'#B4C4D9'}
      >
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <TextField
              id="outlined-email-input"
              label="Your email"
              type="email"
              size="small"
              marginRight={0}
              InputProps={{
                sx: {
                  height: '38px',
                  fontSize: '18px',
                  textAlign: 'center',
                  '&::placeholder': {
                    fontSize: '8px',
                  },
                },
              }}
            />
            <Button variant='contained' sx={{backgroundColor:'#38358C', fontFamily:'Poppins', fontWeight:600 }}>Subscribe</Button>
          </div>
        </Box>
      </Stack>
    </Stack>
  );
}
