import React, { useState, useEffect } from "react";
import Navbar from "../components/Home/Navbar";
import { Card, CardMedia, Typography, Box, Stack, Grid } from "@mui/material";
import Footer from "../components/Home/Footer";
import DailyCard from "../components/Home/DailyCard";
import { destination } from "../api/home";
import fall from "../images/spot/What to do in Lesotho_ Best Things to do in the Kingdom in the Sky.jpeg";
import HomeIntroSection from "../components/Home/HomeIntroSection";
import HomeFeaturedDestinationsSection from "../components/Home/HomeFeaturedDestinationsSection";
import HomeExclusiveTripSection from "../components/Home/HomeExclusiveTripSection";
import HomeRecommendedSection from "../components/Home/HomeRecommendedSection";


export default function Home() {
  const [place, setPlace] = useState(null);
  const [image, setImage] = useState(null);
  const [intro, setIntro] = useState(null);

  // use token inside local storage to decide whether login or not
  const [isTokenExist, setIsTokenExist] = React.useState(
    localStorage.getItem("token") || false
  );

  useEffect(() => {
    // if (localStorage.token !== undefined) {
    destination().then((data) => {
      setPlace(data.name);
      setImage(data.image);
      setIntro(data.intro);
    });
    return;
    // }
  }, [isTokenExist]);

  return (
    <>
      <Stack height="auto" direction="column" width="100vw">
        <Navbar/>
        <HomeIntroSection/>
        <HomeFeaturedDestinationsSection/>
        <HomeExclusiveTripSection/>
        <HomeRecommendedSection/>
        <Footer />
      </Stack>
    </>
  );
}
