import { Divider } from '@mui/material';

export default function ListDivider({ index }) {
  return (
    <Divider
      key={`divider-${index}`}
      sx={{ borderStyle: 'dashed', borderWidth: '1px' }}
    />
  );
}
