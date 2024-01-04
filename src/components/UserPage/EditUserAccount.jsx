import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Stack, Typography, Grid } from '@mui/material';
import { editUser } from "../../api/userpage.jsx";
import NameRepeatAlertModal from "./NameRepeatAlertModal.jsx";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const style = {
  width: '100%',
  bgcolor: 'background.paper',
  p: 2,
  marginTop: 5
};

function CityName({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fontSize = windowWidth <= 900 ? '14px' : '20px';

  return (
    <div 
      style={{ 
        fontFamily: 'Poppins', 
        fontWeight:500, 
        color:"#647680",
        fontSize: fontSize,
        padding:'3px 0'
      }}
    >
      {children}
    </div>
  );
}


export default function EditUserAccount({userName, userAvatar, setUserName, setUserAvatar}) {
  const [tempName, setTempName] = useState(userName)
  const [tempAvatar, setTempAvatar] = useState('')
  const [tempNumber, setTempNumber] = useState('1234-567-890')
  const [tempCity, setTempCity] = useState('Taipei')
  const { register, handleSubmit } = useForm();
  
  // use isNameRepeat as state variable passed to Alert modal for determine open or not
  const [isNameRepeat, setIsNameRepeat] = useState(false)

  useEffect(() => {
    setTempName(userName)
    setTempAvatar(userAvatar)
  }, [userName, userAvatar]);

  // after submit, update name, avatar and user info inside local storage if response success
  // do error handling if response fail
  const onSubmit = async (data) => {
    try {
      editUser(data.username, data.file[0])
      .then(data => {
        if (data.status === 'success') {
          const name = data.data.user.name;
          const avatar = data.data.user.avatar;
          const userInfo = localStorage.getItem('user');
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify({...JSON.parse(userInfo), name: name, avatar: avatar}));
          setUserName(name)
          setUserAvatar(avatar)
        } else if (data.response.status === 409) {
          setIsNameRepeat(true)
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  const cities = ['Keelung', 'Taipei', 'New Taipei', 'Taoyuan', 'Hsinchu', 'Taichung', 'Chiayi', 'Miaoli', 'Changhua', 'Nantou', 'Yunlin', 'Taichung City', 'Tainan City', 'Kaohsiung City', 'Pingtung', 'Yilan', 'Hualien', 'Taitung', 'Kinmen', 'Lienchiang', 'Penghu'];

  return (
    <Box sx={style}>
      <Box marginTop={3}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField {...register("username")} 
                fullWidth
                type="text" 
                label={<Typography fontFamily="Poppins" fontWeight={500} color="#647680">Username</Typography>}
                variant="outlined" 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ 
                  style: { 
                    fontFamily: 'Poppins', 
                    fontWeight:500, 
                    color:"#647680", 
                  },
                  sx:{
                    fontSize:{xs:'14px', md:'20px'}
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField {...register("file")} 
                fullWidth
                type="file"  
                variant="outlined" 
                label={<Typography fontFamily="Poppins" fontWeight={500} color="#647680">Avatar</Typography>}
                InputLabelProps={{ shrink: true }}
                inputProps={{ 
                  style: { 
                    fontFamily: 'Poppins', 
                    fontWeight:500, 
                    color:"#647680" 
                  } ,
                  sx:{
                    fontSize:{xs:'14px', md:'20px'}
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField 
                fullWidth
                type="tel" 
                label={<Typography fontFamily="Poppins" fontWeight={500} color="#647680">Phone Number</Typography>}
                variant="outlined" 
                placeholder="1234-567-890"
                onChange={(e) => setTempNumber(e.target.value)}
                InputLabelProps={{ shrink: true }}
                inputProps={{ 
                  style: { 
                    fontFamily: 'Poppins', 
                    fontWeight:500, 
                    color:"#647680" 
                  },
                  sx:{
                    fontSize:{xs:'14px', md:'20px'}
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} >
              <FormControl fullWidth>
                <InputLabel 
                  id="city-label" 
                  sx={{ 
                    fontFamily: 'Poppins', 
                    fontWeight:500, 
                    color:"#647680", 
                    fontSize:{xs:'1rem', md:'20px'},
                    backgroundColor:'white',
                    padding:'0 30px 0 8px'
                  }}
                >
                  City
                </InputLabel>
                <Select
                labelId="city-label"
                id="city-selector"
                value={tempCity}
                onChange={(e) => setTempCity(e.target.value)}
                renderValue={(selected) => <CityName>{selected}</CityName>}
                >
                {cities.map((city) => (
                  <MenuItem 
                    key={city} 
                    value={city} 
                    sx={{ 
                      fontFamily: 'Poppins', 
                      fontWeight:500, 
                      color:"#647680", 
                      fontSize:{xs:'14px', md:'20px'} 
                    }}>
                    {city}
                  </MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button 
              type="submit" 
              sx={{
                marginTop:5, 
                fontFamily:"Poppins", 
                fontWeight:"700",
                fontSize:{xs:12, md:20}
              }} 
            >
              Save change
            </Button>
          </Box>
        </form>
      </Box>
      <NameRepeatAlertModal isNameRepeat={isNameRepeat} setIsNameRepeat={setIsNameRepeat}/>
    </Box>
  );
}
