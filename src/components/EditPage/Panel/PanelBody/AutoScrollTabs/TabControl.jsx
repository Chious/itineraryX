import { styled } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTripInfo } from '@/contexts/TripInfoContext';

const StyledTabs = styled(Tabs)`
  min-height: 40px;
  & .Mui-selected {
    font-weight: bold;
  }
`;

const StyledTab = styled(Tab)`
  min-height: 30px;
`;

export default function TabControl({ activeTab, handleTabChange }) {
  const tripInfo = useTripInfo();
  const numOfTabs = tripInfo.itinerary.days;

  return (
    <StyledTabs
      className="tab-control"
      value={activeTab}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
      aria-label="scrollable auto tabs"
      sx={{ position: 'relative', zIndex: 3, boxShadow: 1 }}
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
