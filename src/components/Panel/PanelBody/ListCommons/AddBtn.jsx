import Button from '@mui/material/Button';

export default function AddBtn({ onClick }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        width: '100%',
        height: '100%',
        minWidth: '30px',
        minHeight: '30px',
        borderRadius: '50%',
        boxShadow: '3',
      }}
    >
      +
    </Button>
  );
}
