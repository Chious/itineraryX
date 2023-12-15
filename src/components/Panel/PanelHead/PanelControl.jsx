import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ForumIcon from "@mui/icons-material/Forum";
import { useAuth } from "@/contexts/AuthContext";
import { useTripInfo } from "@/contexts/TripInfoContext";

export default function PanelControl({ handleOpenChat }) {
  const canEdit = useAuth().canEdit;
  const itinerary = useTripInfo().itinerary;
  const navigate = useNavigate();

  function handleArrowIconClick() {
    navigate("/user");
  }

  return (
    <Stack
      className="panel-control"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        px: 2,
        py: 1,
        height: "40px",
        backgroundColor: "white",
        boxShadow: 1,
        position: "relative",
        zIndex: 5,
      }}
    >
      {/* arrow back icon & itinerary title */}
      <Stack className="trip-title" direction="row" gap="1rem">
        <ArrowBackIcon
          onClick={handleArrowIconClick}
          sx={{ color: "black", cursor: "pointer" }}
        />
        <Typography sx={{ fontWeight: "bold" }}>{itinerary.title}</Typography>
      </Stack>

      {/* chatroom icon */}
      <Stack className="icon-container" direction="row">
        {canEdit && (
          <ForumIcon
            sx={{ color: "black", cursor: "pointer" }}
            onClick={handleOpenChat}
          />
        )}
      </Stack>
    </Stack>
  );
}
