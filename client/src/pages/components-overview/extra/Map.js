import mapboxgl from 'mapbox-gl';
import { Suspense, lazy } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Card, Skeleton, Container, CardHeader, CardContent } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { cities as CITIES } from '../../../components/map/assets/cities';
import { countries as COUNTRIES } from '../../../components/map/assets/countries';
//
import { mapConfig } from '../../../config';

// ----------------------------------------------------------------------

// FIX DISPLAY ERROR ON PRODUCTION

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const THEMES = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11'
};

const baseSettings = {
  mapboxApiAccessToken: mapConfig,
  width: '100%',
  height: '100%',
  minZoom: 1
};

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

const MapWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none'
  }
}));

// ----------------------------------------------------------------------

const MapHeatmap = lazy(() => import('../../../components/map/map-heatmap'));
const MapGeojson = lazy(() => import('../../../components/map/map-geojson'));
const MapClusters = lazy(() => import('../../../components/map/MapClusters'));
const MapChangeTheme = lazy(() => import('../../../components/map/map-change-theme'));
const MapZoomToBounds = lazy(() => import('../../../components/map/MapZoomToBounds'));
const MapMarkersPopups = lazy(() => import('../../../components/map/MapMarkersPopups'));
const MapDeckglOverlay = lazy(() => import('../../../components/map/MapDeckglOverlay'));
const MapDynamicStyling = lazy(() => import('../../../components/map/map-dynamic-styling'));
const MapInteraction = lazy(() => import('../../../components/map/map-interaction'));
const MapDraggableMarkers = lazy(() => import('../../../components/map/map-draggable-markers'));
const MapGeoJSONAnimation = lazy(() => import('../../../components/map/MapGeoJSONAnimation'));
const MapHighlightByFilter = lazy(() => import('../../../components/map/MapHighlightByFilter'));
const MapViewportAnimation = lazy(() => import('../../../components/map/map-viewport-animation'));

const SkeletonLoad = (
  <>
    <Skeleton width="100%" height={560} variant="rectangular" sx={{ borderRadius: 2, mb: 5 }} />
    <Skeleton width="100%" height={560} variant="rectangular" sx={{ borderRadius: 2 }} />
  </>
);

export default function Map() {
  return (
    <RootStyle title="Components: Map | Minimal-UI">
      <Box
        sx={{
          pt: 6,
          pb: 1,
          mb: 10,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800')
        }}
      >
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Map"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Map' }]}
            moreLink={['http://visgl.github.io/react-map-gl', 'https://docs.mapbox.com-js/example']}
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Suspense fallback={SkeletonLoad}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Map Change Theme" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapChangeTheme {...baseSettings} themes={THEMES} />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Map Dynamic Styling" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapDynamicStyling {...baseSettings} />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Map Markers & Popups" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapMarkersPopups {...baseSettings} data={COUNTRIES} mapStyle={THEMES.light} />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Map Draggable Markers" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapDraggableMarkers {...baseSettings} mapStyle={THEMES.light} />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Map Geojson" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapGeojson {...baseSettings} mapStyle={THEMES.light} />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Map Geojson Animation" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapGeoJSONAnimation {...baseSettings} mapStyle={THEMES.satelliteStreets} />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Map Clusters" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapClusters {...baseSettings} mapStyle={THEMES.light} />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Map Interaction" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapInteraction {...baseSettings} mapStyle={THEMES.light} />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Map Viewport Animation" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapViewportAnimation
                      {...baseSettings}
                      data={CITIES.filter((city) => city.state === 'Texas')}
                      mapStyle={THEMES.light}
                    />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Map Highlight By Filter" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapHighlightByFilter {...baseSettings} mapStyle={THEMES.light} />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Map Zoom To Bounds" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapZoomToBounds {...baseSettings} />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Map Deckgl Overlay" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapDeckglOverlay {...baseSettings} mapStyle={THEMES.light} />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title="Map Heatmap" />
                <CardContent>
                  <MapWrapperStyle>
                    <MapHeatmap {...baseSettings} mapStyle={THEMES.light} />
                  </MapWrapperStyle>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Suspense>
      </Container>
    </RootStyle>
  );
}
