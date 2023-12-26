import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Stack, Typography } from '@mui/material';
import { editUser } from "../../api/userpage.jsx";
import NameRepeatAlertModal from "./NameRepeatAlertModal.jsx";

const style = {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid transparent',
  borderRadius: "10px",
  boxShadow: 10,
  p: 4,
  marginTop: 5
};

export default function EditUserAccount({userName, userAvatar, setUserName, setUserAvatar}) {
  const [tempName, setTempName] = useState(userName)
  const [tempAvatar, setTempAvatar] = useState('')
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

  return (
    <Box sx={style}>
      <Typography 
        // sx={{ mt: 1 }}
        fontFamily="Poppins"
        fontSize={30}
        fontWeight={600}
        color="#325269"
      >
        Edit your account
      </Typography>
      <Box marginTop={3}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form">
          <Stack spacing={4}>
            <TextField {...register("username")} 
              type="text" 
              label={<Typography fontFamily="Poppins" fontWeight={500} color="#647680">Update your username</Typography>}
              variant="outlined" 
              value={tempName} 
              onChange={(e) => setTempName(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ style: { fontFamily: 'Poppins', fontWeight:500, color:"#647680", fontSize:"20px" } }}
            />
            <TextField {...register("file")} 
              type="file"  
              variant="outlined" 
              label={<Typography fontFamily="Poppins" fontWeight={500} color="#647680">Select your new avatar</Typography>}
              InputLabelProps={{ shrink: true }}
              inputProps={{ style: { fontFamily: 'Poppins', fontWeight:500, color:"#647680", fontSize:"20px" } }}
            />
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" sx={{fontSize:20, marginTop:3, fontFamily:"Poppins", fontWeight:"700"}} >Confirm</Button>
          </Box>
        </form>
      </Box>
      <NameRepeatAlertModal isNameRepeat={isNameRepeat} setIsNameRepeat={setIsNameRepeat}/>
    </Box>
  );
}
