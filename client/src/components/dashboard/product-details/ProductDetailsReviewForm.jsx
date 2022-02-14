import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
// material
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import { Button, Rating, TextField, Typography, FormHelperText, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import useLocales from '../../../hooks/useLocales';
import useAuth from '../../../hooks/useAuth';
import { createComment } from '../../../redux/actions/comments';
// utils

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

export default function ProductDetailsReviewForm({ onClose, product, ...other }) {
  const { t } = useLocales();
  const theme = useTheme();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { item: comments, isLoading } = useSelector((state) => state.comment);

  let ReviewSchema = Yup.object().shape({
    star: Yup.mixed().required('Rating is required'),
    content: Yup.string().required('Review is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  if (user) {
    ReviewSchema = Yup.object().shape({
      star: Yup.mixed().required('Rating is required'),
      content: Yup.string().required('Review is required')
    });
  }

  const formik = useFormik({
    initialValues: {
      star: null,
      content: '',
      name: '',
      email: ''
    },
    validationSchema: ReviewSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      let commentData = {};
      if (user) {
        commentData = {
          product: product._id,
          author: user,
          content: values.content,
          star: values.star
        };
      } else {
        commentData = {
          product: product._id,
          name: values.name,
          email: values.email,
          phone: values.phone,
          content: values.content,
          star: values.star
        };
      }
      try {
        dispatch(createComment(commentData));
        onClose();
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Thêm thành công!', { variant: 'success' });
      } catch (e) {
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Thêm bình luận thất bại!', { variant: 'error' });
      }
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
        {t('dashboard.comments.title')}
      </Typography>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} spacing={1.5}>
              <Typography variant="body2">{t('dashboard.comments.title-review')}</Typography>
              <Rating
                {...getFieldProps('star')}
                onChange={(event) => setFieldValue('star', Number(event.target.value))}
              />
            </Stack>
            {errors.star && <FormHelperText error>{touched.star && errors.star}</FormHelperText>}

            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label={t('dashboard.comments.content')}
              {...getFieldProps('content')}
              error={Boolean(touched.content && errors.content)}
              helperText={touched.content && errors.content}
            />

            {!user && (
              <TextField
                fullWidth
                label={t('dashboard.comments.name')}
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            )}

            {!user && (
              <TextField
                fullWidth
                label={t('dashboard.comments.email')}
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
            )}

            <Stack direction="row" justifyContent="flex-end">
              <Button type="button" color="inherit" variant="outlined" onClick={onCancel} sx={{ mr: 1.5 }}>
                {t('dashboard.comments.cancel')}
              </Button>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {t('dashboard.comments.add-comment')}
              </LoadingButton>
            </Stack>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
