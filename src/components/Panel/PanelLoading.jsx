import { Fragment } from 'react';
import { Grid, Skeleton, Stack, useMediaQuery } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const rwdColumns = [4, 8];

export default function PanelLoading() {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Grid container width="100%" height="100%">
      {/* panel head */}
      <Grid item xs={12} px={3} py={1.5}>
        <Skeleton animation="wave" variant="rectangular" height={40} />
      </Grid>
      <Grid item xs={12} px={7} paddingBottom={0.5}>
        <Skeleton animation="wave" variant="rectangular" height={35} />
      </Grid>

      {/* panel body */}
      <Grid container position="relative">
        {/* timeline */}
        <Grid
          item
          xs={rwdColumns[0]}
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
          }}
        >
          <div
            className="timeline"
            style={{
              width: '3.5px',
              position: 'absolute',
              top: '57px',
              bottom: '20px',
              left: '50%',
              transform: 'translate(-50%, 0)',
              background: `radial-gradient(circle closest-side, #ddd 100%, #0000) center / 100% 10px`,
            }}
          ></div>
        </Grid>

        {/* list subheader */}
        <Grid item xs={rwdColumns[0]} sx={{ padding: '0.6rem 1.9rem' }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            height={40}
            sx={{ borderRadius: '1.1rem' }}
          />
        </Grid>

        {/* itinerary */}
        {Array(5)
          .fill()
          .map((_, order) => (
            <Fragment key={`skeleton-${order}`}>
              {/* transportation */}
              <Grid container justifyContent="end">
                <Grid
                  item
                  xs={rwdColumns[1]}
                  py={3}
                  height={60}
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                  }}
                >
                  {order > 0 && (
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      width={200}
                      height={35}
                    />
                  )}
                </Grid>
              </Grid>

              {/* destination */}
              {/* time & order */}
              <Grid
                item
                xs={rwdColumns[0]}
                sx={{
                  p: 1,
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {/* time */}
                <Grid
                  container
                  flexDirection="column"
                  alignItems="end"
                  gap={1.5}
                  sx={{ position: 'absolute', right: '67%' }}
                >
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={40}
                    height={15}
                  />
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={25}
                    height={15}
                  />
                </Grid>
                {/* order */}
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={35}
                  height={35}
                />
              </Grid>
              {/* destination card */}
              <Grid
                item
                xs={rwdColumns[1]}
                marginLeft={-3}
                sx={{
                  display: 'flex',
                  hight: '130px',
                  borderRadius: '10px',
                  boxShadow:
                    '0px 1px 1px -1px rgba(0,0,0,0.2), 1px 1px 1px 0px rgba(0,0,0,0.14), 1px 1px 3px 1px rgba(0,0,0,0.12)',
                }}
              >
                {/* destination image */}
                {isDesktop && (
                  <Grid item width="100px">
                    <Skeleton
                      animation="wave"
                      variant="rounded"
                      sx={{
                        width: '100px',
                        height: '130px',
                        borderRadius: '10px 0 0 10px',
                      }}
                    />
                  </Grid>
                )}

                {/* destination info */}
                <Grid
                  container
                  justifyContent="center"
                  alignItems="start"
                  spacing={1}
                  px={2.5}
                  py={3}
                >
                  {/* location name */}
                  <Grid item xs={12} flexShrink={0}>
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="150px"
                      height="20px"
                    />
                  </Grid>

                  {/* location address */}
                  <Grid item xs={12} flexShrink={0}>
                    <Stack direction="row" gap="0.5rem">
                      <LocationOnIcon
                        sx={{ color: '#999', fontSize: '1.1rem' }}
                      />
                      <Stack gap="0.5rem">
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width="140px"
                          height="15px"
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width="140px"
                          height="15px"
                        />
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          ))}
      </Grid>
    </Grid>
  );
}
