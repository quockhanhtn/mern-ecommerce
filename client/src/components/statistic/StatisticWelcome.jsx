// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography, Button, Card, CardContent } from '@material-ui/core';
//
import MotivationIllustration from '../../assets/illustration_motivation';
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  [theme.breakpoints.up('xl')]: { height: 320 }
}));

// ----------------------------------------------------------------------

export default function StatisticWelcome() {
  const { t } = useLocales();

  return (
    <RootStyle>
      <CardContent
        sx={{
          color: 'grey.800',
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4">
          {t('dashboard.statistics.title')}
          <br /> HK - Mobile
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          {t('dashboard.statistics.title-detail')}
        </Typography>

        <Button variant="contained">{t('dashboard.statistics.go')}</Button>
      </CardContent>

      <MotivationIllustration
        sx={{
          p: 2,
          height: 280,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
