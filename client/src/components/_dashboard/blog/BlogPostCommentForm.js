import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Stack, Typography, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import fakeRequest from '../../../utils/fakeRequest';

// ----------------------------------------------------------------------

const RootStyles = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor: theme.palette.background.neutral
}));

// ----------------------------------------------------------------------

export default function BlogPostCommentForm() {
  const { enqueueSnackbar } = useSnackbar();

  const CommentSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      comment: '',
      name: '',
      email: ''
    },
    validationSchema: CommentSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors({ afterSubmit: error.code });
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <RootStyles>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Add Comment
      </Typography>

      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Comment *"
              {...getFieldProps('comment')}
              error={Boolean(touched.comment && errors.comment)}
              helperText={touched.comment && errors.comment}
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

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Post comment
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyles>
  );
}
