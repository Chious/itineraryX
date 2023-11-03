import { Card, Grid, Stack } from "@mui/material";
import data from "../data/songs.json";
import Image from "mui-image";
import imgFolder from "../assets/favorite-empty-folder.svg";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export const SongNoFound = () => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        shadows: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src={imgFolder} duration={0} height="30px" width="30px" />
      <h2>您尚未加入任何 Podcast，可以點擊按鈕新增！</h2>
      <button>新增Podcast</button>
    </Card>
  );
};

export const SongCard = ({ data }) => {
  const { title, description, imgSrc, date, videoLength } = data;

  return (
    <Grid item xs={12}>
      <Card
        className="podcast-card"
        sx={{
          shadows: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          width: "100%",
        }}
      >
        <Grid container direction="row" spacing={1}>
          <Grid item lg={2}>
            <Image
              className="song-card-img"
              src={imgSrc}
              duration={0}
              fit="cover"
            />
          </Grid>
          <Grid item lg={10}>
            <Stack spacing={1}>
              <Stack
                width="100%"
                direction="row"
                justifyContent="space-between"
              >
                <p className="song-card-title">{title}</p>
                <BookmarkBorderIcon />
              </Stack>
              <p className="song-card-author">{description}</p>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PlayCircleIcon className="song-card-play-btn" />
                <p>
                  {date}・{videoLength}
                </p>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export const SongCardCollection = () => {
  const songcards = data.map((item, index) => {
    return <SongCard data={item} key={index} />;
  });

  return (
    <Grid container className="song-collection-container" spacing={2}>
      {songcards}
    </Grid>
  );
};
