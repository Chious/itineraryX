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
  const timerIdRef = useRef(null); // 記錄目前是否有scrollIntoView事件

  // itinerary-by-day 的 useRef (用來偵測 PanelBody onScroll 事件)
  listRefs.current = Array(numOfDays)
    .fill()
    .map(() => createRef());

  // 創建 Intersection Observer (用來偵測 PanelBody onScroll 事件)
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // PanelBody onScroll 事件 (使用者scroll滑鼠)
        if (entries[0].isIntersecting && timerIdRef.current === null) {
          setActiveTab(`${entries[0].target.dataset.listId}`);
        }
      },
      {
        root: listContainerRef.current,
        rootMargin: '70% 0% -80% 0%',
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
    // 使用 if 判斷式
    // 避免「TabControl 點擊、TargetDaySelector 選擇、PanelBody 滾動」三種事件
    // 以及「瀏覽器scrollIntoView、Panel滾動」互相衝突
    if (targetDay !== 0 && targetDay === Number(activeTab) + 1) {
      // TabControl onClick 或 TargetDaySelector onChange 事件 (瀏覽器scrollIntoView)
      const target = listRefs.current[targetDay - 1];
      if (target) {
        timerIdRef.current = setTimeout(() => {
          target.current.scrollIntoView({
            behavior: 'smooth',
          });
          // 等待 scrollIntoView 執行完畢再清除 timerId
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
              style={{ visibility: 'hidden' }}
            ></div>

            <ItineraryByDay day={index + 1} handleFormOpen={handleFormOpen} />
          </div>
        ))}
    </div>
  );
}
