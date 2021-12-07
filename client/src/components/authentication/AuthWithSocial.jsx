import PropTypes from 'prop-types';
// material
import { Stack, Button, Divider, Typography } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { FacebookIcon, GoogleIcon, TwitterIcon } from '../../assets';
// hooks
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

AuthWithSocial.propTypes = {
  orText: PropTypes.string
};

AuthWithSocial.defaultProps = {
  orText: 'or'
};

export default function AuthWithSocial({ orText }) {
  const { googleOAuth, loginWithFaceBook, loginWithTwitter } = useAuth();

  const handleGoogleLoginSuccess = async (res) => {
    const tokenId = res?.tokenId;
    await googleOAuth(tokenId);
  };

  const handleGoogleLoginFailure = (err) => {
    console.log(err);
  };

  const handleLoginFaceBook = async () => {
    try {
      await loginWithFaceBook();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginTwitter = async () => {
    try {
      await loginWithTwitter();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <GoogleLogin
          clientId="235569401328-lib09fjkc10r16r6mbscljl4ulb5049q.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <GoogleIcon disabled={renderProps.disabled} />
            </Button>
          )}
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy="single_host_origin"
        />

        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLoginFaceBook}>
          <FacebookIcon disabled />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLoginTwitter}>
          <TwitterIcon disabled />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {orText.toUpperCase()}
        </Typography>
      </Divider>
    </>
  );
}
