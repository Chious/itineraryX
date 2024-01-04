import * as React from "react";
import { Stack, Typography, IconButton, Box } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AboutUsModal from "./AboutUsModal";

// social media icon template
const FooterIcon = ({ IconComponent, color }) => (
  <IconButton aria-label={IconComponent.displayName} color={color}>
    <IconComponent fontSize="small" sx={{ color: "white" }} />
  </IconButton>
);

// link template
const FooterLink = ({ text, onClick }) => (
  <Typography
    textAlign={"center"}
    color={"white"}
    fontSize={10}
    fontWeight={"bold"}
    sx={{ fontFamily: "Poppins", fontWeight: 600 }}
    onClick={onClick}
  >
    {text}
  </Typography>
);

export default function Footer() {
  const socialMediaIcons = [
    { IconComponent: InstagramIcon, color: "primary" },
    { IconComponent: FacebookIcon, color: "primary" },
    { IconComponent: TwitterIcon, color: "secondary" },
    { IconComponent: YouTubeIcon, color: "primary" },
  ];

  //Open Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <AboutUsModal open={open} setOpen={setOpen} />
      <Stack
        width="100vw"
        height="auto"
        direction="column"
        backgroundColor="white"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        bgcolor={"#325269"}
      >
        <Stack
          width="100vw"
          height="auto"
          backgroundColor="white"
          alignItems={"center"}
          justifyContent={"center"}
          marginTop={4}
          marginBottom={1}
          bgcolor={"#325269"}
          direction={{xs:'column', md:'row'}}
        >
          <Stack 
            direction="row" 
            spacing={4} 
            alignItems={"center"}
            sx={{
              marginBottom:{
                xs:1.5,
                md:0
              }
            }}
          >
            <Typography
              textAlign={"center"}
              color={"white"}
              fontSize={20}
              sx={{ 
                letterSpacing: 3, 
                fontFamily: "Poppins", 
                fontWeight: 600,
                fontSize:{
                  xs:15,
                  md:20
                }
              }}
            >
              ItineraryX
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems={"center"}
            marginLeft={20}
            marginRight={20}
            sx={{
              marginBottom:{
                xs:1,
                md:0
              }
            }}
          >
            <FooterLink text="About" />
            <FooterLink text="Our Team" onClick={handleOpen} />
            <FooterLink text="Contact" />
          </Stack>
          <Stack direction="row" spacing={0} alignItems={"center"}>
            {socialMediaIcons.map((icon, index) => (
              <FooterIcon key={index} {...icon} />
            ))}
          </Stack>
        </Stack>
        <Stack
          width="100vw"
          height="auto"
          direction="row"
          backgroundColor="white"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          marginBottom={4}
          bgcolor={"#325269"}
        >
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                id="outlined-email-input"
                label="Your email"
                type="email"
                size="small"
                sx={{ marginRight: 0 }}
                InputProps={{
                  sx: {
                    height: "38px",
                    fontSize: {
                    xs:'10px',
                    md:'15px'
                  },
                    textAlign: "center",
                    "&::placeholder": {
                      fontSize: "8px",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  color: '#325269',
                  fontSize:{
                    xs:'10px',
                    md:'15px'
                  }
                }}
              >
                Subscribe
              </Button>
            </div>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
