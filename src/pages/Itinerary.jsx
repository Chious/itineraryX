import { Box, Typography } from "@mui/material";

export default function Itinerary() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Ensure that the parent container has a height of 100%
      }}
    >
      <Box bgcolor='white' sx={{ flexGrow: 1 }}>
        <Typography>123</Typography>
      </Box>
    </Box>
  );
}
