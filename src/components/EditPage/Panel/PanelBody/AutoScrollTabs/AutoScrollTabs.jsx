import * as React from 'react';
import moment from 'moment';
import Stack from '@mui/material/Stack';
import TabControl from './TabControl';
import TabContent from './TabContent';

import { useIsLoading, useItinerary } from '../../../temp_data/trip_reducer';

export default function AutoScrollTabs() {
  const [numOfTabs, setNumOfTabs] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState('0');
  const isLoading = useIsLoading();
  const itinerary = useItinerary();
  const tabRefs = React.useRef(null);

  React.useEffect(() => {
    if (!isLoading) {
      const startTime = moment(itinerary.startTime);
      const endTime = moment(itinerary.endTime);
      const days = endTime.diff(startTime, 'days') + 1;
      setNumOfTabs(days);
      tabRefs.current = Array(days)
        .fill()
        .map(() => React.createRef());
    }
  }, [itinerary, isLoading]);

  const handleChange = (_event, newTabValue) => {
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
        <TabControl
          numOfTabs={numOfTabs}
          activeTab={activeTab}
          handleChange={handleChange}
        />

        {/* tab content section */}
        <TabContent numOfTabs={numOfTabs} tabRefs={tabRefs} />
      </Stack>
    </>
  );
}
