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
import Image from "mui-image";

export default function SingleDeveloperCard({ name, work, avatar, description, link }) {
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
    <Grid item md={3} xs={12} spacing={1} >
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
        p={2}
        direction={{ xs: "row", md: "column" }}
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        border="1px solid transparent"
        borderRadius="10px"
        textAlign={{ xs: "flex-start", md: "center" }}
        height="auto"
      >
        <Avatar sx={{ width: "120px", height: "120px", borderRadius: "50% 50% 50% 10%" }}>{avatarContent}</Avatar>
        <Stack spacing={1} className="123">
          <Typography fontFamily="Poppins" variant="h6" fontWeight={700} color="#FCA510">
            {name}
          </Typography>
          <Typography fontFamily="Poppins" variant="body1" fontWeight={600} color="#325269">
            {work}
          </Typography>
          <Typography fontFamily="Poppins" variant="body2" fontWeight={500} color="#647680">
            {description}
          </Typography>
          <Stack 
            className="btn-group" 
            direction="row" 
            alignItems="center" 
            justifyContent={{ xs: "flex-start", md: "center" }}
          >
            {buttons}
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
}
