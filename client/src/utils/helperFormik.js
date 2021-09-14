import PropTypes from 'prop-types';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import Scrollbar from '../components/Scrollbar';

// ----------------------------------------------------------------------

const RootStyle = styled('pre')(({ theme }) => ({
  ...theme.typography.body1,
  top: 0,
  right: 0,
  bottom: 0,
  width: 320,
  zIndex: 9999999,
  position: 'fixed',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)', // Fix on Mobile
  paddingLeft: theme.spacing(3),
  boxShadow: theme.customShadows.z24,
  color: theme.palette.primary.light,
  background: alpha(theme.palette.grey[900], 0.96),
  '& code': {
    ...theme.typography.body1
  }
}));

const LabelStyle = styled('div')(({ theme }) => ({
  ...theme.typography.subtitle1,
  minWidth: 160,
  margin: theme.spacing(1, 0),
  color: theme.palette.primary.lighter
}));

const BoolStyle = styled('div')(({ theme }) => ({
  '& code': {
    color: theme.palette.warning.contrastText,
    backgroundColor: theme.palette.warning.main
  }
}));

// ----------------------------------------------------------------------

HelperFormik.propTypes = {
  formik: PropTypes.object
};

export default function HelperFormik({ formik }) {
  const {
    dirty,
    status,
    values,
    errors,
    touched,
    isValid,
    // submitCount,
    isSubmitting,
    isValidating,
    initialValues,
    validateOnBlur,
    validateOnMount,
    validateOnChange
  } = formik;

  const Bool = (name, action) => (
    <BoolStyle
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...(action && {
          '& code': {
            color: 'warning.contrastText',
            bgcolor: 'primary.main'
          }
        })
      }}
    >
      <LabelStyle>{name}</LabelStyle>
      <code>:{JSON.stringify(action)}</code>
    </BoolStyle>
  );

  return (
    <RootStyle>
      <Scrollbar>
        <LabelStyle>values</LabelStyle>
        <code>{JSON.stringify(values, null, 2)}</code>

        <LabelStyle>initialValues</LabelStyle>
        <code>{JSON.stringify(initialValues, null, 2)}</code>

        <LabelStyle>errors</LabelStyle>
        <code>{JSON.stringify(errors, null, 2)}</code>

        <LabelStyle>status</LabelStyle>
        <code>{JSON.stringify(status, null, 2)}</code>

        <LabelStyle>touched</LabelStyle>
        <code>{JSON.stringify(touched, null, 2)}</code>

        {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LabelStyle>submitCount</LabelStyle>
        <code>:{JSON.stringify(submitCount)}</code>
      </Box> */}

        {Bool('isSubmitting', isSubmitting)}
        {Bool('dirty', dirty)}
        {Bool('isValid', isValid)}
        {Bool('isValidating', isValidating)}
        {Bool('validateOnBlur', validateOnBlur)}
        {Bool('validateOnChange', validateOnChange)}
        {Bool('validateOnMount', validateOnMount)}
      </Scrollbar>
    </RootStyle>
  );
}
