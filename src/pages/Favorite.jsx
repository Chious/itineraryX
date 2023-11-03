import ResponsiveDrawer from "../components/ResponsiveDrawer";
import NowPlaying from "../components/NowPlaying";
import { Grid } from "@mui/material";
import { SongCardCollection } from "../components/SongCard";
import "./Favorite.scss";

export default function Favorite() {
  return (
    <ResponsiveDrawer>
      <Grid container direction="row" spacing={2}>
        <Grid item lg={9}>
          <SongCardCollection />
        </Grid>
        <Grid item lg={3}>
          <NowPlaying />
        </Grid>
      </Grid>
    </ResponsiveDrawer>
  );
}
