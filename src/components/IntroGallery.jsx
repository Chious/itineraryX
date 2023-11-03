import img1 from "../assets/login--1.svg";
import img2 from "../assets/login--2.svg";
import img3 from "../assets/login--3.svg";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Stack } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "鼓舞人心的故事",
    desc: "從非凡的人生故事和成功經歷中獲得靈感",
    backgroundColor: "#23262F",
    imgPath: img1,
  },
  {
    label: "輕鬆分類與管理",
    desc: "一目了然的分類，讓蒐藏的Podcast保持整潔",
    backgroundColor: "#2D3831",
    imgPath: img2,
  },
  {
    label: "Spotify 快速同步",
    desc: "透過 Spotify 登入，即刻同步您的蒐藏，隨時隨地收聽",
    backgroundColor: "#063540",
    imgPath: img3,
  },
];

export default function IntroGallery() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "50vw", height: "100vh", flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Stack
                height="100vh"
                alignItems="center"
                justifyContent="center"
                sx={{ background: step.backgroundColor }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 255,
                    display: "block",
                    maxWidth: 400,
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
                <Typography>{step.label}</Typography>
                <Typography>{step.desc}</Typography>
              </Stack>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        style={{ position: "absolute", bottom: 50, left: "74%" }}
      />
    </Box>
  );
}
