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

  // display loading animation before data-fetching completed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (tripInfo.isLoaded) {
        setDisplayLoading(false);
        clearTimeout(timer);
      }
    }, 2000);
  }, [tripInfo.isLoaded]);

  if (displayLoading) {
    return (
      <Stack
        width="100%"
        height="100%"
        sx={{
          boxShadow: 5,
          backgroundColor: 'white',
        }}
      >
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
