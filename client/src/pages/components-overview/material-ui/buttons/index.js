import { useState } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container, Tab } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
// routes
import { PATH_PAGE } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import TextButtons from './TextButtons';
import IconButtons from './IconButtons';
import ButtonGroups from './ButtonGroups';
import ToggleButtons from './ToggleButtons';
import OutlinedButtons from './OutlinedButtons';
import ContainedButtons from './ContainedButtons';
import FloatingActionButton from './FloatingActionButton';

// ----------------------------------------------------------------------

const BUTTONS = [
  { name: 'Contained Buttons', component: <ContainedButtons /> },
  { name: 'Outlined Buttons', component: <OutlinedButtons /> },
  { name: 'TextButtons', component: <TextButtons /> },
  { name: 'Icon Buttons', component: <IconButtons /> },
  { name: 'Floating Action Button', component: <FloatingActionButton /> },
  { name: 'Button Groups', component: <ButtonGroups /> },
  { name: 'Toggle Buttons', component: <ToggleButtons /> }
];

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function ButtonsComponent() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <RootStyle title="Components: Buttons | Minimal-UI">
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
            heading="Buttons"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Buttons' }]}
            moreLink={[
              'https://next.material-ui.com/components/buttons',
              'https://next.material-ui.com/components/button-group',
              'https://next.material-ui.com/components/floating-action-button',
              'https://next.material-ui.com/components/toggle-button'
            ]}
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <TabContext value={value}>
          <TabList onChange={handleChange}>
            {BUTTONS.map((tab, index) => (
              <Tab disableRipple key={tab.name} label={tab.name} value={String(index + 1)} />
            ))}
          </TabList>

          {BUTTONS.map((tab, index) => (
            <TabPanel key={tab.name} value={String(index + 1)} sx={{ mt: 5 }}>
              {tab.component}
            </TabPanel>
          ))}
        </TabContext>
      </Container>
    </RootStyle>
  );
}
