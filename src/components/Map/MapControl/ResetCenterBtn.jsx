import Button from '@mui/material/Button';

export default function ResetCenterBtn({ map, center }) {
  return (
    <Button
      type="button"
      variant="contained"
      sx={{ boxShadow: 4 }}
      onClick={() => map.panTo(center)}
    >
      RESET CENTER
    </Button>
  );
}
