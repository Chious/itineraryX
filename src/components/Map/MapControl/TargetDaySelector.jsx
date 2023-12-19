import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useTripInfo } from '@/contexts/TripInfoContext';
import {
  currentTarget_actions,
  useCurrentTarget,
  useCurrentTargetDispatch,
} from '@/contexts/CurrentTargetContext';

export default function TargetDaySelector() {
  const totalDays = useTripInfo().itinerary.totalDays;
  const targetDay = useCurrentTarget().targetDay;
  const currentTargetDispatch = useCurrentTargetDispatch();

  function handleDayChange(e) {
    const newDay = Number(e.target.value);
    currentTargetDispatch({
      type: currentTarget_actions.SET_TARGET_DAY,
      payload: newDay,
    });
  }

  return (
    <Select
      value={targetDay}
      onChange={handleDayChange}
      size="small"
      sx={{ backgroundColor: 'white', boxShadow: 2 }}
    >
      <MenuItem value={''} disabled>
        select day...
      </MenuItem>
      <MenuItem value={0}>All Day</MenuItem>
      {Array(totalDays)
        .fill()
        .map((_, index) => (
          <MenuItem key={`option-${index + 1}`} value={index + 1}>
            {`Day ${index + 1}`}
          </MenuItem>
        ))}
    </Select>
  );
}
