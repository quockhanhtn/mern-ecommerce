import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography, Button } from '@material-ui/core';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useLocales from '../../hooks/useLocales';
import useAuth from '../../hooks/useAuth';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from '../../components/authentication/login';
import AuthFirebaseSocials from '../../components/authentication/AuthFirebaseSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { t, currentLang } = useLocales();
  const { user, method, login, errMessage } = useAuth();

  const handleLoginAuth0 = async () => {
    try {
      await login();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout>
        {t('auth.dont-have-account')} &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
          {t('auth.get-started')}
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            {t('auth.salutation')}
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                {t('auth.sign-in')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{t('auth.sign-in-description')}</Typography>
            </Box>

            <Tooltip title={method}>
              <Box component="img" src={`/static/auth/ic_${method}.png`} sx={{ width: 32, height: 32 }} />
            </Tooltip>
          </Stack>

          <AuthFirebaseSocials orText={t('auth.or')} />

          {errMessage && (
            <Alert severity="error" sx={{ marginBottom: 5 }}>
              <Typography variant="body1"> {errMessage?.[currentLang.value] || errMessage} </Typography>
            </Alert>
          )}

          {method !== 'auth0' ? (
            <LoginForm />
          ) : (
            <Button fullWidth size="large" type="submit" variant="contained" onClick={handleLoginAuth0}>
              {t('auth.login')}
            </Button>
          )}

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              {t('auth.dont-have-account')}&nbsp;
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                {t('auth.get-started')}
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
