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
        return <GitHubIcon className="iconButton" sx={{ color: "#647680", fontSize: { xs: '1rem', md: '1.5rem' } }}/>;
      case /linkedin/i.test(link):
        return <LinkedInIcon className="iconButton" sx={{ color: "#647680", fontSize: { xs: '1rem', md: '1.5rem' } }}/>;
      default:
        return <HomeIcon className="iconButton" sx={{ color: "#647680", fontSize: { xs: '1rem', md: '1.5rem' } }}/>;
    }
  };

  const buttons = link.length !== 0 && link.map((link, index) => (
    <IconButton key={index} onClick={() => window.open(link)}>
      {getIcon(link)}
    </IconButton>
  ));

  return (
    <Grid item md={3} xs={12} style={{padding:0}}>
      <Stack
        sx={{
          "&:hover": {
            boxShadow: "-5px 5px 10px 5px rgba(0,0,0,0.25)",
            "& .iconButton": {
              color: "#FCA510",
              transition: "all 0.5s ease-in"
            },
          },
          transition: "all 0.5s ease-in"
        }}
        p={1}
        direction={{ xs: "row", md: "column" }}
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        border="1px solid transparent"
        borderRadius="10px"
        textAlign={{ xs: "flex-start", md: "center" }}
        height="auto"
      >
        <Avatar 
          sx={{ 
            width: {xs:"50px" ,md:"120px"}, 
            height: {xs:"50px" ,md:"120px"}, 
            borderRadius: "50% 50% 50% 10%" 
          }}
        >
          {avatarContent}
        </Avatar>
        <Stack 
          className="123"
          sx={{
            spacing: {xs:0, md:1}
          }}
        >
          <Typography 
            fontFamily="Poppins" 
            fontWeight={700} 
            color="#FCA510"
            sx={{
              fontSize: { xs: '10px', md: '15px' },
            }}
          >
            {name}
          </Typography>
          <Typography 
            fontFamily="Poppins" 
            variant="body1" 
            fontWeight={600} 
            color="#325269" 
            sx={{
              fontSize: { xs: '10px', md: '12px' },
            }}
          >
            {work}
          </Typography>
          <Stack 
            className="btn-group" 
            direction="row" 
            alignItems="center" 
            justifyContent={{ xs: "flex-start", md: "center" }}
          >
            {buttons}
          </Stack>
          <Typography 
            fontFamily="Poppins" 
            variant="body2" 
            fontWeight={500} 
            color="#647680"
            sx={{
              fontSize: { xs: '10px', md: '12px' },
            }}
          >
            {description}
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );
}
