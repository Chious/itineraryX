import {
  Avatar,
  Stack,
  Modal,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { data } from "../../data/our-info";
import Image from "mui-image";

export default function AboutUsModal({ open, setOpen }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "70%",
    bgcolor: "background.paper",
    border: "2px solid transparent",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  // handle Modal Open
  const handleClose = () => setOpen(false);

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
    <div>
      <Modal open={open} onClose={handleClose}>
        <Stack sx={style} alignItems="start" justifyContent="start" spacing={1}>
          <h5>About us</h5>
          <Typography variant="h6" component="h2" color="gray">
            This app is a team work from Alpha Camp.
            <br />
            If there is any question regarding the app, please contact us at:
            <a
              href="https://github.com/Chious"
              target="_blank"
              rel="noreferrer noopener"
              style={{ color: "gray", textDecoration: "underline" }}
            >
              https://github.com/Chious
            </a>
          </Typography>
          <Grid
            container
            direction="row"
            spacing={2}
            sx={{ height: "430px", overflow: "scroll" }}
          >
            {cards}
          </Grid>
        </Stack>
      </Modal>
    </div>
  );
}

function Card({ name, work, avatar, description, link }) {
  const buttons =
    link.length !== 0 &&
    link.map((link, index) => {
      const githubRegex = /github/i;
      const linkedinRegex = /linkedin/i;

      if (githubRegex.test(link)) {
        return (
          <IconButton onClick={() => window.open(link)}>
            <GitHubIcon />
          </IconButton>
        );
      } else if (linkedinRegex.test(link)) {
        return (
          <IconButton onClick={() => window.open(link)}>
            <LinkedInIcon />
          </IconButton>
        );
      } else {
        return (
          <IconButton onClick={() => window.open(link)}>
            <HomeIcon />
          </IconButton>
        );
      }
    });

  const avatarContent =
    avatar !== "" ? <Image src={avatar} duration={0} /> : name[0];

  return (
    <Grid item lg={6}>
      <Stack
        boxShadow={2}
        p={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        border="1px solid transparent"
        borderRadius="5px"
      >
        <Avatar sx={{ width: "60px", height: "60px" }}>{avatarContent}</Avatar>
        <Stack spacing={1}>
          <h1 style={{ fontSize: "17px", fontWeight: 200, color: "#FCA510" }}>
            {name}
          </h1>
          <h1 style={{ fontSize: "17px", fontWeight: 200 }}>{work}</h1>
          <h1 style={{ fontSize: "15px", fontWeight: 100 }}>{description}</h1>
          <Stack className="btn-group" direction="row">
            {buttons}
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
}
