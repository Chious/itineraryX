import {
  Avatar,
  Stack,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import data from "../../data/our-info.json";
import Image from "mui-image";

export default function DeveloperCard() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    height: "auto",
    bgcolor: "#fdfdfd",
    border: "2px solid transparent",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const cards = data.map((item) => {
    const { name, work, avatar, description, link, id } = item;
    return (
      <Card
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
      <Stack direction="row" spacing={2}>
        <Typography 
          textTransform="uppercase" 
          fontFamily="Poppins" 
          fontWeight={600} 
          fontSize={50}
          color="#647680"
          letterSpacing={4}
        >
          Meet our 
        </Typography>
        <Typography 
          textTransform="uppercase" 
          fontFamily="Poppins" 
          fontWeight={700} 
          fontSize={50}
          color="#325269"
          letterSpacing={4}
        >
          Team
        </Typography>
      </Stack>
      <Typography variant="h6" component="h2" color="gray" textAlign="center" fontFamily="Poppins">
        We are developers graduated from Alpha camp
        <br />
        This is an collaborative project for a travel application
        {/* <a style={{ color: "gray", textDecoration: "underline" }}>
          example.com
        </a> */}
      </Typography>
      <Grid
        container
        direction="row"
        spacing={2}
      >
        {cards}
      </Grid>
    </Stack>
  );
}

function Card({ name, work, avatar, description, link }) {
  const avatarContent = avatar !== "" ? <Image src={avatar} duration={0} /> : name[0];

  const getIcon = (link) => {
    switch (true) {
      case /github/i.test(link):
        return <GitHubIcon className="iconButton" sx={{ color: "#647680" }}/>;
      case /linkedin/i.test(link):
        return <LinkedInIcon className="iconButton" sx={{ color: "#647680" }}/>;
      default:
        return <HomeIcon className="iconButton" sx={{ color: "#647680" }}/>;
    }
  };

  const buttons = link.length !== 0 && link.map((link, index) => (
    <IconButton key={index} onClick={() => window.open(link)}>
      {getIcon(link)}
    </IconButton>
  ));

  return (
    <Grid item lg={3}>
      <Stack
        sx={{
          "&:hover": {
            boxShadow: "-5px 5px 10px 5px rgba(0,0,0,0.25)",
            bgcolor: "white",
            "& .iconButton": {
              color: "#FCA510",
              transition: "all 0.5s ease-in"
            },
          },
          transition: "all 0.5s ease-in"
        }}
        p={3}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        border="1px solid transparent"
        borderRadius="10px"
        textAlign="center"
        height={450}
      >
        <Avatar sx={{ width: "120px", height: "120px", borderRadius: "50% 50% 50% 10%" }}>{avatarContent}</Avatar>
        <Stack spacing={1}>
          <Typography fontFamily="Poppins" variant="h6" fontWeight={700} color="#FCA510">
            {name}
          </Typography>
          <Typography fontFamily="Poppins" variant="body1" fontWeight={600} color="#325269">
            {work}
          </Typography>
          <Typography fontFamily="Poppins" variant="body2" fontWeight={500} color="#647680">
            {description}
          </Typography>
          <Stack className="btn-group" direction="row" alignItems="center" justifyContent="center">
            {buttons}
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
}
