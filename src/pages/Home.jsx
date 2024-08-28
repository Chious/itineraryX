import React, { useState, useEffect } from "react";
import Navbar from "../components/Home/Navbar";
import { Stack } from "@mui/material";
import Footer from "../components/Home/Footer";
import { destination } from "../api/home";
import HomeIntroSection from "../components/Home/HomeIntroSection";
import HomeFeaturedDestinationsSection from "../components/Home/HomeFeaturedDestinationsSection";
import HomeExclusiveTripSection from "../components/Home/HomeExclusiveTripSection";
import HomeRecommendedSection from "../components/Home/HomeRecommendedSection";
import OurTeamSection from "../components/Home/OurTeamSection";
import HomeDemoVideoSection from "../components/Home/HomeDemoVideoSection";

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
      <Stack height="auto" direction="column" width="100%">
        <Navbar />
        <HomeIntroSection isTokenExist={isTokenExist}/>
        {/* <HomeFeaturedDestinationsSection /> */}
        <HomeDemoVideoSection />
        {/* <HomeExclusiveTripSection /> */}
        {/* <HomeRecommendedSection /> */}
        <OurTeamSection />
        <Footer />
      </Stack>
    </>
  );
}