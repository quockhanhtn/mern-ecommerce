import { Icon } from '@iconify/react';
import clockFill from '@iconify/icons-eva/clock-fill';
import chargingFill from '@iconify/icons-eva/charging-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import colorPaletteFill from '@iconify/icons-eva/color-palette-fill';
import arrowCircleDownFill from '@iconify/icons-eva/arrow-circle-down-fill';
// material
import AdbIcon from '@material-ui/icons/Adb';
import AddIcon from '@material-ui/icons/Add';
import AppleIcon from '@material-ui/icons/Apple';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Stack, SvgIcon, Container } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';

import CodeSnippets from '../../../components/CodeSnippets';
import SvgIconStyle from '../../../components/SvgIconStyle';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { material, iconify, local } from './data';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' }
};

// ----------------------------------------------------------------------

export default function FoundationIcons() {
  return (
    <RootStyle title="Foundations: Icons | Minimal-UI">
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
            heading="Icons"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Icons' }]}
            moreLink={['https://material-ui.com/components/material-icons', 'https://iconify.design/icon-sets']}
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Box sx={{ position: 'relative' }}>
            <Block title="Material Icons" sx={style}>
              <CodeSnippets source={material} />
              <AdbIcon color="action" />
              <AddIcon color="disabled" />
              <AccountCircleIcon color="error" />
              <AirplanemodeActiveIcon color="inherit" />
              <AppleIcon color="primary" />
              <AppleIcon color="secondary" />
            </Block>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <Block title="Iconify Icons" sx={style}>
              <CodeSnippets source={iconify} />
              <SvgIcon color="action">
                <Icon icon={alertCircleFill} width={24} height={24} />
              </SvgIcon>
              <SvgIcon color="disabled">
                <Icon icon={chargingFill} width={24} height={24} />
              </SvgIcon>
              <SvgIcon color="error">
                <Icon icon={arrowCircleDownFill} width={24} height={24} />
              </SvgIcon>
              <SvgIcon color="inherit">
                <Icon icon={clockFill} width={24} height={24} />
              </SvgIcon>
              <SvgIcon color="primary">
                <Icon icon={colorPaletteFill} width={24} height={24} />
              </SvgIcon>
              <SvgIcon color="secondary">
                <Icon icon={colorPaletteFill} width={24} height={24} />
              </SvgIcon>
            </Block>
          </Box>

          <Box sx={{ position: 'relative' }}>
            <Block title="Local Icons" sx={style}>
              <CodeSnippets source={local} />
              <SvgIconStyle src="/static/icons/browser-edge.svg" />
              <SvgIconStyle src="/static/icons/browser-edge.svg" color="action" />
              <SvgIconStyle src="/static/icons/browser-edge.svg" color="disabled" />
              <SvgIconStyle src="/static/icons/browser-edge.svg" color="primary" />
              <SvgIconStyle src="/static/icons/browser-edge.svg" color="secondary" />
              <SvgIconStyle src="/static/icons/elephant.svg" color="info" />
              <SvgIconStyle src="/static/icons/json-logo.svg" color="success" />
              <SvgIconStyle src="/static/icons/love-camera.svg" color="warning" />
              <SvgIconStyle src="/static/icons/shield.svg" color="error" />
            </Block>
          </Box>
        </Stack>
      </Container>
    </RootStyle>
  );
}
