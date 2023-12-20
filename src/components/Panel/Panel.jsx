import { useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import PanelControl from "./PanelHead/PanelControl";
import TabControl from "./PanelHead/TabControl";
import PanelBody from "./PanelBody/PanelBody";
import DestinationCreateForm from "./PanelBody/Form/DestinationCreateForm";
import { useTripInfo } from "@/contexts/TripInfoContext";
import {
  currentTarget_actions,
  useCurrentTargetDispatch,
} from "@/contexts/CurrentTargetContext";

export default function Panel({ handleOpenChat }) {
  const tripInfo = useTripInfo();
  const currentTargetDispatch = useCurrentTargetDispatch();
  const [activeTab, setActiveTab] = useState('0');
  const [openForm, setOpenForm] = useState(false);
  const [dayOfForm, setDayOfForm] = useState(1);
  const handleFormOpen = (day) => {
    setDayOfForm(day);
    setOpenForm(true);
  };
  const handleFormClose = () => {
    setOpenForm(false);
    currentTargetDispatch({
      type: currentTarget_actions.DELETE_TARGET_PLACE,
    });
  };

  // 若使用者尚未登入則顯示提示訊息
  if (!localStorage.getItem("token")) {
    return <Grid>Please log in</Grid>;
  }

  // 若資料尚未載入完畢將顯示Loading提示字樣
  if (!tripInfo.isLoaded) {
    // 優化：skeleton loading / skeleton preview
    return <Grid>Loading...</Grid>;
  }

  return (
    <Stack
      className="panel"
      width="100%"
      height="100%"
      sx={{
        position: "relative",
        zIndex: 1,
        boxShadow: 5,
        backgroundColor: 'white',
      }}
    >
      <PanelControl handleOpenChat={handleOpenChat} />
      <TabControl activeTab={activeTab} setActiveTab={setActiveTab} />
      <PanelBody
        handleFormOpen={handleFormOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {openForm && (
        <DestinationCreateForm
          dayOfForm={dayOfForm}
          handleFormClose={handleFormClose}
        />
      )}
    </Stack>
  );
}
