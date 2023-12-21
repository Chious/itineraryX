import { Fragment } from 'react';
import { Grid, Skeleton, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const rwdColumns = [4, 8];

export default function PanelLoading() {
  return (
    <Grid container width="100%" height="100%">
      {/* panel head */}
      <Grid item xs={12} px={3} py={1.5}>
        <Skeleton animation="wave" variant="rectangular" height={40} />
      </Grid>
      <Grid item xs={12} px={7} paddingBottom={1}>
        <Skeleton animation="wave" variant="rectangular" height={30} />
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
              top: '60px',
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
                  p={3}
                  height={65}
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
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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
                <Grid item width="100px">
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    sx={{ width: '100px', height: '130px' }}
                  />
                </Grid>

                {/* destination info */}
                <Grid
                  container
                  justifyContent="center"
                  alignItems="start"
                  spacing={1}
                  p={3}
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
                        sx={{ color: 'gray', fontSize: '1.1rem' }}
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
