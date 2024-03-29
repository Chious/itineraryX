import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import PanelLoading from './PanelLoading';
import PanelControl from './PanelHead/PanelControl';
import TabControl from './PanelHead/TabControl';
import PanelBody from './PanelBody/PanelBody';
import DestinationCreateForm from './PanelBody/Form/DestinationCreateForm';
import {
  currentTarget_actions,
  useCurrentTargetDispatch,
} from '@/contexts/CurrentTargetContext';

export default function Panel({
  displayLoading,
  handleOpenChat,
  handleMarginIndexChange,
}) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
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

  if (displayLoading) {
    return (
      <Stack
        width="100%"
        height="100%"
        sx={{
          boxShadow: isDesktop ? 5 : 0,
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
        position: 'relative',
        zIndex: 1,
        boxShadow: isDesktop ? 5 : 0,
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
          handleMarginIndexChange={handleMarginIndexChange}
        />
      )}
    </Stack>
  );
}
