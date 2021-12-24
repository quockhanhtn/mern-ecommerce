import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material-ui
import { Button, Card, TextField, Stack } from '@material-ui/core';
// firebase
import firebase, { auth as firebaseAuth } from '../../../firebase';

export default function OTPPhoneInput() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('invisible-recaptcha', {
      size: 'invisible',
      defaultCountry: 'VN',
      callback: (response) => {
        console.log('response', response);
      }
    });
  }, []);

  const PhoneInputSchema = Yup.object().shape({
    phone: Yup.string().required('Code is required')
  });

  const formik = useFormik({
    initialValues: {
      phone: '+84 1234 56789'
    },
    validationSchema: PhoneInputSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const appVerifier = window.recaptchaVerifier;
      firebaseAuth
        .signInWithPhoneNumber(values.phone, appVerifier)
        .then((confirmationResult) => {
          setResult(confirmationResult);
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // console.log(confirmationResult);
          console.log('OTP is sent');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  const { errors, touched, getFieldProps, handleSubmit } = formik;

  return (
    <Card sx={{ p: 5 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <TextField
              required
              fullWidth
              label="Phone"
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
