import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import PanelLoading from './PanelLoading';
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
  const [displayLoading, setDisplayLoading] = useState(true);
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

  // 若資料尚未載入完畢將顯示Loading畫面
  useEffect(() => {
    setTimeout(() => {
      if (tripInfo.isLoaded) {
        setDisplayLoading(false);
      }
    }, 3000);
  }, [tripInfo.isLoaded]);

  if (displayLoading) {
    return (
      <Stack width="480px" height="100%">
        <PanelLoading />
      </Stack>
    );
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
