import Box from '@mui/material/Box';
import AutoScrollTabs from './AutoScrollTabs/AutoScrollTabs';
import AddBtn from './AddBtn';

export default function PanelBody() {
  return (
    <Box
      className="panel-body"
      height="100%"
      minHeight="0" // 解決flexbox容器中flex item外溢的問題
      sx={{ position: 'relative' }}
    >
      {/* mui automatic scroll buttons */}
      <AutoScrollTabs />

      {/* add button on the bottom-right of the panel */}
      <Box
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2.5rem',
          zIndex: '10',
        }}
      >
        <AddBtn />
      </Box>
    </Box>
  );
}
