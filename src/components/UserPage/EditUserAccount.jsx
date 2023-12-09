import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Stack, Typography } from '@mui/material';
import { editUser } from "../../api/userpage.jsx";

const style = {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 5,
  p: 4,
  marginTop: 5
};

export default function EditUserAccount({userName, userAvatar, setUserName, setUserAvatar}) {
  const [tempName, setTempName] = useState('')
  const [tempAvatar, setTempAvatar] = useState('')
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setTempName(userName)
    setTempAvatar(userAvatar)
  }, [userName, userAvatar]);

  const onSubmit = async (data) => {
    try {
      const responseData = await editUser(data.username, data.file[0]);
      const name = responseData.data.user.name;
      const avatar = responseData.data.user.avatar;
      const userInfo = localStorage.getItem('user');
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify({...JSON.parse(userInfo), name: name, avatar: avatar}));
      setUserName(name)
      setUserAvatar(avatar)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={style}>
      <Typography variant="h4" sx={{ mt: 2 }}>Edit your account</Typography>
      <Box marginTop={3}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form">
          <Stack spacing={2}>
            <TextField {...register("username")} type="text" label="Username" variant="outlined" value={tempName} onChange={(e) => setTempName(e.target.value)}/>
            <TextField {...register("file")} type="file"  variant="outlined" />
          </Stack>
          <Button type="submit" sx={{fontSize:20, marginTop:2}}>Confirm</Button>
        </form>
      </Box>
    </Box>
  );
}
