import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Image from "mui-image";
import picture from "../../assets/joshua-hibbert-Pn6iimgM-wo-unsplash.jpg";

export default function InputList() {
  return (
    <Stack sx={{ background: "#FFE4B8", color: "black", p: 2 }} spacing={1}>
      <Typography>Day1</Typography>
      <InputPlace />
      <InputPlace />
      <InputPlace />
      <InputPlace />
      <AddPlace />
    </Stack>
  );
}

function InputPlace() {
  return (
    <Grid container direction="row">
      <Grid item lg={2}>
        <Image src={picture} duration={0} fit="contain" />
      </Grid>
      <Grid item lg={10}>
        <Stack
          direction="column"
          spacing={1}
          sx={{ background: "white", p: 1 }}
        >
          <Typography>太空針塔 | 公車 40分鐘</Typography>
          <Typography>400 Broad St, Seattle, WA 98109</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}

function AddPlace() {
  return <Button sx={{ background: "white" }}>Add</Button>;
}
