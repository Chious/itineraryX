import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Box } from "@mui/material";
import Image from "mui-image";

export default function DisplayFile({ file, setFile }) {
  const removeFile = (targetName) => {
    const filterFile = file.filter((item) => item.name !== targetName);
    setFile(filterFile);
  };

  const isZero = file.length === 0 ? true : false;

  const images =
    file.length !== 0 &&
    file.map((item, index) => {
      return (
        <Box key={index}>
          <RemoveCircleIcon
            onClick={() => {
              removeFile(item.name);
            }}
            sx={{
              position: "relative",
              top: 15,
              right: 10,
              zIndex: 10,
              color: "#FE7A00",
            }}
          />
          <Image src={item.preview} duration={0} height="50px" width="50px" />
        </Box>
      );
    });

  return (
    <Box
      sx={{ p: 1.5 }}
      style={{
        background: isZero ? "transparent" : "gray",
        position: "absolute",
        width: 300,
        bottom: 50,
        zIndex: 5,
      }}
    >
      {images}
    </Box>
  );
}
