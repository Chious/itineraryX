/*
  Attention:
    when using 'moment.js' to manipulate date & time, it's important to do it with 'clone()' method, in order to avoid the situation that date objects may affect one another during the manipulation.
*/

import moment from 'moment';
import { createRef, useEffect, useRef } from 'react';
import { useTheme } from '@emotion/react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTripInfo } from '@/contexts/TripInfoContext';
import { useCurrentTarget } from '@/contexts/CurrentTargetContext';
import {
  currentTarget_actions,
  useCurrentTargetDispatch,
} from '@/contexts/CurrentTargetContext';
import './tabControl.css';

export default function TabControl({ activeTab, setActiveTab }) {
  const tripInfo = useTripInfo();
  const numOfTabs = tripInfo.itinerary.totalDays;
  const startDate = moment(tripInfo.itinerary.startTime);
  const targetDay = useCurrentTarget().targetDay;
  const currentTargetDispatch = useCurrentTargetDispatch();
  const TabContainerRef = useRef(null);
  const TabRefs = useRef(null);
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const primaryLightColor = theme.palette.primary.light;

  // tab ref
  TabRefs.current = Array(numOfTabs)
    .fill()
    .map(() => createRef());

  // switch the active tab when clicking the TabControl
  const handleTabClick = (newActiveTab) => {
    setActiveTab(() => newActiveTab);
    currentTargetDispatch({
      type: currentTarget_actions.SET_TARGET_DAY,
      payload: newActiveTab + 1,
    });
  };

  // response to the change of TargetDaySelector
  useEffect(() => {
    if (targetDay !== 0) setActiveTab(() => targetDay - 1);
  }, [targetDay]);

  // tab scrollIntoView
  useEffect(() => {
    const tab = TabRefs.current[activeTab];
    if (tab && TabContainerRef.current) {
      const tabRect = tab.current.getBoundingClientRect();
      TabContainerRef.current.scrollTo({
        left: tabRect.width * activeTab,
        behavior: 'smooth',
      });
    }
  }, [activeTab]);

  return (
    <Grid
      container
      className="tab-control scrollbar"
      justifyContent="center"
      alignItems="center"
      sx={{
        px: 7,
        paddingBottom: 1,
        backgroundColor: 'white',
        position: 'relative',
      }}
    >
      <Grid
        container
        className='tab-control-container'
        flexWrap="nowrap"
        ref={TabContainerRef}
        style={{
          overflowX: 'scroll',
        }}
      >
        {Array(numOfTabs)
          .fill()
          .map((_, index) => (
            <Button
              key={index}
              className='tab'
              onClick={() => handleTabClick(index)}
              ref={TabRefs.current[index]}
              sx={{
                boxSizing: 'content-box',
                flexShrink: 0,
                px: 1.5,
                width: 'fit-content',
                borderRadius: 0,
                borderBottom:
                  index === activeTab ? `3px solid ${primaryColor}` : 0,
              }}
            >
              <Grid
                container
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  sx={{
                    color:
                      index === activeTab ? primaryColor : primaryLightColor,
                    fontWeight: index === activeTab ? 800 : 400,
                    fontSize: 15,
                    fontFamily: 'Roboto',
                    textShadow: `0.5px 0.5px 1px ${primaryLightColor}`,
                    letterSpacing: '1.5px',
                  }}
                >
                  Day {index + 1}
                </Typography>
                <Typography
                  sx={{
                    color:
                      index === activeTab ? primaryColor : primaryLightColor,
                    fontSize: 12,
                    fontFamily: 'Roboto',
                    textShadow: `0.5px 0.5px 1px ${primaryLightColor}`,
                    letterSpacing: '1.3px',
                  }}
                >
                  {startDate.clone().add(index, 'days').format('MM/DD')}
                </Typography>
              </Grid>
            </Button>
          ))}
      </Grid>
    </Grid>
  );
}
