import { useState } from 'react';
// material
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Tab, Tabs, Container, Stack } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' }
};

const SIMPLE_TAB = [
  { value: '1', icon: <PhoneIcon />, label: 'Item One', disabled: false },
  { value: '2', icon: <FavoriteIcon />, label: 'Item Two', disabled: false },
  { value: '3', icon: <PersonPinIcon />, label: 'Item Three', disabled: true }
];

const SCROLLABLE_TAB = [
  { value: '1', icon: <PhoneIcon />, label: 'Item 1' },
  { value: '2', icon: <FavoriteIcon />, label: 'Item 2' },
  { value: '3', icon: <PersonPinIcon />, label: 'Item 3' },
  { value: '4', icon: <PersonPinIcon />, label: 'Item 4' },
  { value: '5', icon: <PersonPinIcon />, label: 'Item 5' },
  { value: '6', icon: <PersonPinIcon />, label: 'Item 6' },
  { value: '7', icon: <PersonPinIcon />, label: 'Item 7' }
];

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function TabsComponent() {
  const [value, setValue] = useState('1');
  const [valueScrollable, setValueScrollable] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeScrollable = (event, newValue) => {
    setValueScrollable(newValue);
  };

  return (
    <RootStyle title="Components: Tabs | Minimal-UI">
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
            heading="Tabs"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Tabs' }]}
            moreLink="https://next.material-ui.com/components/tabs"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
            <Block title="Text" sx={style}>
              <TabContext value={value}>
                <TabList onChange={handleChange}>
                  {SIMPLE_TAB.map((tab, index) => (
                    <Tab key={tab.value} label={tab.label} value={String(index + 1)} />
                  ))}
                </TabList>
                <Box
                  sx={{
                    p: 2,
                    mt: 2,
                    height: 80,
                    width: '100%',
                    borderRadius: 1,
                    bgcolor: 'grey.50012'
                  }}
                >
                  {SIMPLE_TAB.map((panel, index) => (
                    <TabPanel key={panel.value} value={String(index + 1)}>
                      {panel.label}
                    </TabPanel>
                  ))}
                </Box>
              </TabContext>
            </Block>

            <Block title="Icon" sx={style}>
              <Tabs value={value} onChange={handleChange}>
                {SIMPLE_TAB.map((tab) => (
                  <Tab key={tab.value} icon={tab.icon} value={tab.value} />
                ))}
              </Tabs>
            </Block>
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
            <Block title="Text & Icon" sx={style}>
              <TabContext value={value}>
                <TabList onChange={handleChange}>
                  {SIMPLE_TAB.map((tab) => (
                    <Tab key={tab.value} icon={tab.icon} label={tab.label} value={tab.value} disabled={tab.disabled} />
                  ))}
                </TabList>
              </TabContext>
            </Block>

            <Block title="Scrollable" sx={style}>
              <Box
                sx={{
                  flexGrow: 1,
                  width: '100%',
                  maxWidth: 320
                }}
              >
                <Tabs
                  allowScrollButtonsMobile
                  value={valueScrollable}
                  variant="scrollable"
                  scrollButtons="auto"
                  onChange={handleChangeScrollable}
                >
                  {SCROLLABLE_TAB.map((tab) => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                  ))}
                </Tabs>
              </Box>
            </Block>
          </Stack>
        </Stack>
      </Container>
    </RootStyle>
  );
}
