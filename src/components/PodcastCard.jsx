import { Card, Grid } from "@mui/material";
import data from "../data/podcast.json";
import Image from "mui-image";

export const PodcastCard = ({ data }) => {
  const { title, author, imgSrc } = data;

  return (
    <Grid item xs={3}>
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
        <Image className="podcast-card-img" src={imgSrc} duration={0} />
        <p className="pocast-card-title">{title}</p>
        <p className="pocast-card-author">{author}</p>
        <button className="podcast-card-btn">更多</button>
      </Card>
    </Grid>
  );
};

export const PodcastCardCollection = () => {
  const podcastcards = data.map((item) => {
    return <PodcastCard data={item} key={item.title} />;
  });

  return (
    <Grid container className="podcast-collection-container" spacing={2}>
      {podcastcards}
    </Grid>
  );
};
