import * as React from 'react';
import { styled } from '@mui/system';
import { Stack, Button, Divider } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DestinationList from './DestinationList/DestinationList';

const StyledTabs = styled(Tabs)`
  min-height: 40px;
  & .Mui-selected {
    font-weight: bold;
  }
`;

const StyledTab = styled(Tab)`
  min-height: 30px;
`;

export default function AutoScrollTabs() {
  const [numOfTabs, setNumOfTabs] = React.useState(2);  // 修改：取得行程的天數
  const [activeTab, setActiveTab] = React.useState('0');

  const tabRefs = React.useRef(
    Array(numOfTabs)
      .fill()
      .map(() => React.createRef())
  );

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    const target = tabRefs.current[newValue];
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
        <StyledTabs
          className="tabs"
          value={activeTab}
          onChange={handleChange}
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
                className="tab"
                label={`Day ${index + 1}`}
                value={`${index}`}
              />
            ))}
          <Button>+</Button>
        </StyledTabs>

        <Stack
          className="location-lists"
          width="100%"
          height="100%"
          padding={0}
          gap={3}
          sx={{ overflowY: 'scroll' }}
        >
          {Array(numOfTabs)
            .fill()
            .map((_, index) => (
              <>
                {index > 0 && (
                  <Divider sx={{ borderStyle: 'dashed', borderWidth: '1px' }} />
                )}
                <Stack
                  className="location-list-container"
                  padding={0}
                  ref={tabRefs.current[index]}
                >
                  <DestinationList day={index + 1} />
                </Stack>
              </>
            ))}
        </Stack>
      </Stack>
    </>
  );
}
