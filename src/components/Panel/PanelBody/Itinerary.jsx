import { createRef, useEffect, useRef } from 'react';
import ItineraryByDay from './ItineraryByDay';
import ListDivider from './ListCommons/ListDivider';
import { useTripInfo } from '@/contexts/TripInfoContext';
import { useCurrentTarget } from '@/contexts/CurrentTargetContext';
import './itinerary.css';

export default function Itinerary({ handleFormOpen, activeTab, setActiveTab }) {
  const currentTarget = useCurrentTarget();
  const targetDay = currentTarget.targetDay;
  const tripInfo = useTripInfo();
  const numOfDays = tripInfo.itinerary.totalDays;
  const listContainerRef = useRef(null);
  const listRefs = useRef(null);
  const observerRef = useRef(null);
  const timerIdRef = useRef(null); // to store scrollIntoView events

  // useRef of itinerary-by-day (for detecting PanelBody onScroll events)
  listRefs.current = Array(numOfDays)
    .fill()
    .map(() => createRef());

  // create Intersection Observer (for detecting PanelBody onScroll event)
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // PanelBody onScroll event (when a user scroll on the Panel)
        if (entries[0].isIntersecting && timerIdRef.current === null) {
          setActiveTab(Number(entries[0].target.dataset.listId));
        }
      },
      {
        root: listContainerRef.current,
        rootMargin: '-15% 0% -60% 0%',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    listRefs.current.forEach((ref) => {
      observerRef.current.observe(ref.current);
    });

    return () => {
      listRefs.current.forEach((ref) => {
        observerRef.current.unobserve(ref.current);
      });
    };
  }, []);

  // scrollIntoView
  useEffect(() => {
    // use conditional statement
    // to avoid the conflict between browser scrollIntoView events & Panel onScroll events
    if (targetDay !== 0 && targetDay === activeTab + 1) {
      // TabControl onClick or TargetDaySelector onChange (browser scrollIntoView event)
      const target = listRefs.current[targetDay - 1];
      if (target) {
        timerIdRef.current = setTimeout(() => {
          target.current.scrollIntoView({
            behavior: 'smooth',
          });
          // wait for a scrollIntoView event to complete and clear the timeout
          timerIdRef.current = setTimeout(() => {
            clearTimeout(timerIdRef.current);
            timerIdRef.current = null;
          }, 1000);
        }, 400);
      }
    }
  }, [targetDay, activeTab]);

  return (
    <div
      className="itinerary"
      style={{
        width: '99.5%',
        height: '99%',
        overflowY: 'scroll',
      }}
      ref={listContainerRef}
    >
      {Array(numOfDays)
        .fill()
        .map((_, index) => (
          <div className="itinerary-by-day" key={`day-${index}`}>
            {index > 0 && <ListDivider />}

            <div
              className="intersection-observer-ref"
              data-list-id={`${index}`}
              ref={listRefs.current[index]}
            >
              <ItineraryByDay day={index + 1} handleFormOpen={handleFormOpen} />
            </div>
          </div>
        ))}
    </div>
  );
}
