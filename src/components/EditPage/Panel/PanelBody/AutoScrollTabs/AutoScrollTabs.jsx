import { useState, useRef, createRef } from 'react';
import Stack from '@mui/material/Stack';
import TabControl from './TabControl';
import TabContent from './TabContent';
import { useTripInfo } from '@/contexts/TripInfoContext';

export default function AutoScrollTabs() {
  const [activeTab, setActiveTab] = useState('0');
  const tripInfo = useTripInfo();
  const numOfTabs = tripInfo.itinerary.days;

  const tabRefs = useRef(null);
  tabRefs.current = Array(numOfTabs)
    .fill()
    .map(() => createRef());

  const handleTabChange = (_event, newTabValue) => {
    setActiveTab(newTabValue);
    const target = tabRefs.current[newTabValue];
    if (target) {
      target.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Stack
        className="auto-scroll-tabs"
        width="100%"
        height="100%"
        sx={{ bgcolor: 'white' }}
      >
        {/* tab control panel */}
        <TabControl activeTab={activeTab} handleTabChange={handleTabChange} />

        {/* content for each tab */}
        <TabContent tabRefs={tabRefs} />
      </Stack>
    </>
  );
}
