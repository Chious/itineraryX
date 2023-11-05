import { Box, Stack } from "@mui/material";
import ScrollableTabsButtonAuto from "./ScrollableTabsButtonAuto";
import InputList from "./InputList";

export default function ControlBar() {
  return (
    <Box>
      <Box
        clasName="edit-trip-panel"
        height="250px"
        sx={{ background: "gray", boxShadow: 1 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 1 }}
        >
          <Box>返回</Box>
          <h1 style={{ fontSize: 30 }}>九份二日遊</h1>
          <Box>編輯</Box>
        </Stack>
        <Box style={{ position: "relative" }}>
          <ScrollableTabsButtonAuto />
        </Box>
      </Box>

      <Box
        clasName="edit-trip-list"
        sx={{ p: 2 }}
        style={{ height: "calc(92vh - 250px)", overflow: "scroll" }}
      >
        <InputList />
      </Box>
    </Box>
  );
}
