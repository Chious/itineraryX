import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { styled } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTripInfo } from '@/contexts/TripInfoContext';
import { useCurrentTarget } from '@/contexts/CurrentTargetContext';
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
  min-width: 50px;
  min-height: 30px;
  padding: 0 1.1rem;
  letter-spacing: 1.5px;
  &:hover {
    background-color: #eee;
  }
`;

export default function TabControl({ activeTab, setActiveTab }) {
  const tripInfo = useTripInfo();
  const numOfTabs = tripInfo.itinerary.totalDays;
  const targetDay = useCurrentTarget().targetDay;
  const currentTargetDispatch = useCurrentTargetDispatch();
  const theme = useTheme();
  const primaryLightColor = theme.palette.primary.light;

  // 響應 TargetDaySelector 的天數變化
  useEffect(() => {
    if (targetDay !== 0) setActiveTab(() => `${targetDay - 1}`);
  }, [targetDay]);

  // 點擊切換tab
  const handleTabChange = (_event, newValue) => {
    setActiveTab(() => newValue);
    currentTargetDispatch({
      type: currentTarget_actions.SET_TARGET_DAY,
      payload: Number(newValue) + 1,
    });
  };

  return (
    <StyledTabs
      className="tab-control"
      value={activeTab}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons={false}
      aria-label="scrollable auto tabs"
      sx={{
        px: 7,
        paddingBottom: 1,
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
            value={`${index}`} // value的值需為字串
            sx={{
              color: primaryLightColor,
              textShadow: `0.5px 0.5px 1px ${primaryLightColor}`,
            }}
          />
        ))}
    </StyledTabs>
  );
}
