import { styled } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTripInfo } from '@/contexts/TripInfoContext';
import { useCurrentTarget } from '@/contexts/CurrentTargetContext';
import { useEffect, useState } from 'react';
import {
  currentTarget_actions,
  useCurrentTargetDispatch,
} from '../../../contexts/CurrentTargetContext';

const StyledTabs = styled(Tabs)`
  min-height: 40px;
  & .Mui-selected {
    font-weight: bold;
  }
`;

const StyledTab = styled(Tab)`
  min-height: 30px;
`;

export default function TabControl() {
  const [activeTab, setActiveTab] = useState('0');
  const tripInfo = useTripInfo();
  const numOfTabs = tripInfo.itinerary.totalDays;
  const targetDay = useCurrentTarget().targetDay;
  const currentTargetDispatch = useCurrentTargetDispatch();

  useEffect(() => {
    if (targetDay !== 0) setActiveTab(`${targetDay - 1}`);
  }, [targetDay]);

  const handleTabChange = (_event, newTabValue) => {
    currentTargetDispatch({
      type: currentTarget_actions.SET_TARGET_DAY,
      payload: Number(newTabValue) + 1,
    });
  };

  return (
    <StyledTabs
      className="tab-control"
      value={activeTab}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      aria-label="scrollable auto tabs"
      sx={{
        position: 'relative',
        zIndex: 3,
        boxShadow: 1,
        backgroundColor: 'white',
      }}
    >
      {Array(numOfTabs)
        .fill()
        .map((_, index) => (
          <StyledTab
            key={`tab-${index}`}
            className="tab-item"
            label={`Day ${index + 1}`}
            value={`${index}`}
          />
        ))}
    </StyledTabs>
  );
}
