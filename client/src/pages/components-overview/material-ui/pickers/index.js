import { useState } from 'react';
// material
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container, Tab } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import PickerDate from './PickerDate';
import PickerTime from './PickerTime';
import PickerDateTime from './PickerDateTime';
import PickerDateRange from './PickerDateRange';

// ----------------------------------------------------------------------

const PICKERS = [
  { name: 'Date', component: <PickerDate /> },
  { name: 'DateTime', component: <PickerDateTime /> },
  { name: 'DateRange', component: <PickerDateRange /> },
  { name: 'Time', component: <PickerTime /> }
];

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function PickersComponent() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <RootStyle title="Components: Pickers | Minimal-UI">
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
            heading="Date / Time pickers"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Date / Time pickers' }]}
            moreLink="https://next.material-ui.com/components/pickers"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {PICKERS.map((tab, index) => (
              <Tab disableRipple key={tab.name} label={tab.name} value={String(index + 1)} />
            ))}
          </TabList>

          {PICKERS.map((tab, index) => (
            <TabPanel key={tab.name} value={String(index + 1)} sx={{ mt: 5 }}>
              {tab.component}
            </TabPanel>
          ))}
        </TabContext>
      </Container>
    </RootStyle>
  );
}
