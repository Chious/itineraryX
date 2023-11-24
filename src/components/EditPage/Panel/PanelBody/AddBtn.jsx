import Button from '@mui/material/Button';

export default function AddBtn() {
  return (
    <Button
      variant="contained"
      sx={{
        minWidth: '30px',
        minHeight: '30px',
        borderRadius: '50%',
        boxShadow: '3'
      }}
    >
      +
    </Button>
  );
}
