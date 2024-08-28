import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const HomeDemoVideoSection = () => {
  const videoId1 = "lp_O-Wer46c";
  const videoId2 = "1s_RJ5KT37A";
  const videoId3 = "2vJXtdnQvx0";
  const videoId4 = "ZhT8dwD5CD0";
  const videoId5 = "APgg0Q4EHb0";
  const videoUrl1 = `https://www.youtube.com/embed/${videoId1}`;
  const videoUrl2 = `https://www.youtube.com/embed/${videoId2}`;
  const videoUrl3 = `https://www.youtube.com/embed/${videoId3}`;
  const videoUrl4 = `https://www.youtube.com/embed/${videoId4}`;
  const videoUrl5 = `https://www.youtube.com/embed/${videoId5}`;

  return (
    <Container sx={{ bgcolor: '#f5f5f5', py: 4, width: '100%' }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: "#647680",
          fontFamily: "Poppins",
          fontWeight: 600,
          mb: 1,
        }}
      >
        Sorry...our service is under maintenance
      </Typography>
      <Typography
        variant="h2"
        align="center"
        sx={{
          color: "#325269",
          fontFamily: "Poppins",
          fontWeight: 600,
          mb: 4,
        }}
      >
        Watch Our Demos Videos for a sneak peek!
      </Typography>
      <Typography
        variant="h3"
        align="center"
        sx={{
          color: "#325269",
          fontFamily: "Poppins",
          fontWeight: 600,
          mb: 2,
        }}
      >
        Co-edit itinerary
      </Typography>
      {[videoUrl4, videoUrl1, videoUrl3, videoUrl5, videoUrl2].map((url, index) => (
        <Box key={index} sx={{ mb: 6, mx: 5 }}>
          <Box
            sx={{
              position: 'relative',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              height: 0,
              overflow: 'hidden',
            }}
          >
            <iframe
              src={url}
              title={`Demo Video ${index + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
            />
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default HomeDemoVideoSection;