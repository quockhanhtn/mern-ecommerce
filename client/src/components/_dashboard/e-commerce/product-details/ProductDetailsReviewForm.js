import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Rating, TextField, Typography, FormHelperText, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import fakeRequest from '../../../../utils/fakeRequest';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor: theme.palette.background.neutral
}));

// ----------------------------------------------------------------------

ProductDetailsReviewForm.propTypes = {
  onClose: PropTypes.func
};

export default function ProductDetailsReviewForm({ onClose, ...other }) {
  const { enqueueSnackbar } = useSnackbar();

  const ReviewSchema = Yup.object().shape({
    rating: Yup.mixed().required('Rating is required'),
    review: Yup.string().required('Review is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      rating: null,
      review: '',
      name: '',
      email: ''
    },
    validationSchema: ReviewSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await fakeRequest(500);
      alert(JSON.stringify(values, null, 2));
      onClose();
      resetForm();
      setSubmitting(false);
      enqueueSnackbar('Verify success', { variant: 'success' });
    }
  });

  const { errors, touched, resetForm, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const onCancel = () => {
    onClose();
    resetForm();
  };

  return (
    <RootStyle {...other}>
      <Typography variant="subtitle1" gutterBottom>
        Add Review
      </Typography>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} spacing={1.5}>
              <Typography variant="body2">Your review about this product:</Typography>
              <Rating
                {...getFieldProps('rating')}
                onChange={(event) => setFieldValue('rating', Number(event.target.value))}
              />
            </Stack>
            {errors.rating && <FormHelperText error>{touched.rating && errors.rating}</FormHelperText>}

            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Review *"
              {...getFieldProps('review')}
              error={Boolean(touched.review && errors.review)}
              helperText={touched.review && errors.review}
            />

            <TextField
              fullWidth
              label="Name *"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              label="Email *"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <Stack direction="row" justifyContent="flex-end">
              <Button type="button" color="inherit" variant="outlined" onClick={onCancel} sx={{ mr: 1.5 }}>
                Cancel
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Post review
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
