import Button from '@mui/material/Button';

export default function AddBtn({ handleFormOpen }) {
  return (
    <Button
      variant="contained"
      onClick={handleFormOpen}
      sx={{
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
