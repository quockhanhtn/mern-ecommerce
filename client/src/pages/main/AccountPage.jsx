import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import faker from 'faker';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import {
  useMediaQuery,
  Box,
  Container,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
// icons
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../actions/products';
// hooks
import useQuery from '../../hooks/useQuery';
import useLocales from '../../hooks/useLocales';
// components\
import Page from '../../components/Page';
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountAddressBook,
  AccountChangePassword
} from '../../components/account';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(10),
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800]
}));

// ----------------------------------------------------------------------

export default function AccountPage() {
  const { t } = useLocales();
  const query = useQuery();
  const navigate = useNavigate();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [currentTab, setCurrentTab] = useState(query.get('tab') || 'info');
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCards());
  //   dispatch(getAddressBook());
  //   dispatch(getInvoices());
  //   dispatch(getNotifications());
  //   dispatch(getProfile());
  // }, [dispatch]);

  const addressBook = [...Array(4)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
    country: faker.address.country(),
    state: faker.address.state(),
    city: faker.address.city(),
    street: faker.address.streetAddress(),
    zipCode: faker.address.zipCode()
  }));

  const tabOpts = [
    {
      label: t('account.info'),
      value: 'info',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />
    },
    {
      label: t('account.order'),
      value: 'order',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <AccountBilling />
    },
    {
      label: t('account.address-book'),
      value: 'address-book',
      icon: <Icon icon={bellFill} width={20} height={20} />,
      component: <AccountAddressBook addressBook={addressBook} />
    },
    {
      label: t('account.change-password'),
      value: 'change-password',
      icon: <Icon icon={shareFill} width={20} height={20} />,
      component: <AccountSocialLinks />
    },
    {
      label: t('account.config'),
      value: 'config',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
    navigate(`?tab=${newValue}`);
  };

  return (
    <Page title={t('home.page-title')} id="move_top">
      <ContentStyle>
        <Container maxWidth="lg">
          <Stack spacing={5} direction={isMobile ? 'column' : 'row'}>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              orientation={isMobile ? 'horizontal' : 'vertical'}
              allowScrollButtonsMobile
              onChange={handleChangeTab}
              sx={{ width: 200, float: 'left' }}
            >
              {tabOpts.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  label={
                    <Box sx={{ display: 'flex', justifyContent: 'start', alignContent: 'center', width: '100%' }}>
                      {tab.icon}
                      <Typography variant="body2" sx={{ ml: 2 }}>
                        {tab.label}
                      </Typography>
                    </Box>
                  }
                  // icon={tab.icon}
                  value={tab.value}
                  sx={{ justifyContent: 'flex-start' }}
                />
              ))}
            </Tabs>

            {tabOpts.map((tab) => {
              const isMatched = tab.value === currentTab;
              return (
                isMatched && (
                  <Box sx={{ flex: 1 }} key={tab.value}>
                    {tab.component}
                  </Box>
                )
              );
            })}
          </Stack>
        </Container>
      </ContentStyle>
    </Page>
  );
}
