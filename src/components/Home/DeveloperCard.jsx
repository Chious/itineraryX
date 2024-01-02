import {
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import {data} from "../../data/our-info"
import SingleDeveloperCard from "./SingleDeveloperCard";

export default function DeveloperCard() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "80%",
    bgcolor: "#fdfdfd",
    border: "2px solid transparent",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const cards = data.map((item) => {
    const { name, work, avatar, description, link, id } = item;
    return (
      <SingleDeveloperCard
        key={id}
        name={name}
        work={work}
        avatar={avatar}
        description={description}
        link={link}
      />
    );
  });

  return (
    <Stack sx={style} alignItems="center" justifyContent="center" spacing={1} bgcolor="white">
      <Stack direction="row" spacing={2} >
        <Typography 
          textTransform="uppercase" 
          fontFamily="Poppins" 
          fontWeight={500} 
          fontSize={{xs: 20, md: 50}}
          color="#647680"
          letterSpacing={4}
        >
          Meet our 
        </Typography>
        <Typography 
          textTransform="uppercase" 
          fontFamily="Poppins" 
          fontWeight={700} 
          fontSize={{xs: 20, md: 50}}
          color="#325269"
          letterSpacing={4}
        >
          Team
        </Typography>
      </Stack>
      <Typography 
        variant="h6" 
        component="h2" 
        color="gray" 
        textAlign="center" 
        fontFamily="Poppins"
        fontSize={{xs: 10, md: 20}}
        style={{marginBottom:"10px"}}
      >
        We are developers graduated from Alpha camp
        <br />
        This is an collaborative project for a travel application
      </Typography>
      <Grid
        container
        direction="row"
        spacing={2}
        overflow="scroll"
        p={2}
        style={{marginTop:0}}
      >
        {cards}
      </Grid>
    </Stack>
  );
}
