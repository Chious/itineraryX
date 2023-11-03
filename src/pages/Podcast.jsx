import NowPlaying from "../components/NowPlaying";
import { PodcastCardCollection } from "../components/PodcastCard";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import { Grid } from "@mui/material";

import "./Podcast.scss";

export default function Podcast() {
  return (
    <ResponsiveDrawer>
      <Grid container direction="row" spacing={2}>
        <Grid item lg={9}>
          <PodcastCardCollection />
        </Grid>
        <Grid item lg={3}>
          <NowPlaying />
        </Grid>
      </Grid>
    </ResponsiveDrawer>
  );
}
