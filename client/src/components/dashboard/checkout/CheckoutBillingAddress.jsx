import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Box, Grid, Card, Button, Typography, TextField, Stack, Link, FormHelperText } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, withStyles } from '@material-ui/core/styles';
//
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import CheckoutSummary from './CheckoutSummary';
import CheckoutNewAddressForm from './CheckoutNewAddressForm';
import Label from '../../Label';
import * as Helper from '../../../helper/cartHelper';
import useToCart from '../../../hooks/useToCart';
import useAuth from '../../../hooks/useAuth';
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
import useLocales from '../../../hooks/useLocales';
import { MotionInView, varFadeInUp } from '../../animate';
import ProvincePicker from '../../ProvincePicker';
import DistrictPicker from '../../DistrictPicker';
import SubDistrictPicker from '../../SubDistrictPicker';

// ----------------------------------------------------------------------

const ADDRESS_BOOKS = [
  {
    receiver: faker.name.findName(),
    fullAddress: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
    addressType: 'Home',
    isDefault: true
  },
  {
    receiver: faker.name.findName(),
    fullAddress: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
    addressType: 'Office',
    isDefault: false
  },
  {
    receiver: faker.name.findName(),
    fullAddress: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
    addressType: 'Office',
    isDefault: false
  },
  {
    receiver: faker.name.findName(),
    fullAddress: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
    addressType: 'Office',
    isDefault: false
  }
];

AddressItem.propTypes = {
  address: PropTypes.object,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func
};

function AddressItem({ address, onNextStep, onCreateBilling }) {
  const { receiver, fullAddress, addressType, phone, isDefault } = address;

  const handleCreateBilling = () => {
    onCreateBilling(address);
    onNextStep();
  };

  return (
    <Card sx={{ p: 3, mb: 3, position: 'relative' }}>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1">{receiver}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({addressType})
        </Typography>
        {isDefault && (
          <Label color="info" sx={{ ml: 1 }}>
            Default
          </Label>
        )}
      </Box>
      <Typography variant="body2" gutterBottom>
        {fullAddress}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {phone}
      </Typography>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          position: { sm: 'absolute' },
          right: { sm: 24 },
          bottom: { sm: 24 }
        }}
      >
        {!isDefault && (
          <Button variant="outlined" size="small" color="inherit">
            Delete
          </Button>
        )}
        <Box sx={{ mx: 0.5 }} />
        <Button variant="outlined" size="small" onClick={handleCreateBilling}>
          Deliver to this Address
        </Button>
      </Box>
    </Card>
  );
}

export default function CheckoutBillingAddress() {
  const dispatch = useDispatch();
  const { t } = useLocales();
  const theme = useTheme();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { cart, activeStep, backStepPayment, nextStepPayment } = useToCart();
  const [subTotal, setSubTotal] = useState(Helper.getSubTotal(cart));
  const discount = cart.length > 0 ? 50000 : 0;
  const [total, setTotal] = useState(Helper.getSubTotal(cart) - discount);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [subDistrict, setSubDistrict] = useState(null);
  const initInfo = Helper.getBillingInfo();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNextStep = () => {
    if (user) {
      // TODD
    } else if (!province || !district || !subDistrict) {
      enqueueSnackbar('Vui lòng điền đầy đủ thông tin giao hàng!', {
        variant: 'error'
      });
    } else {
      nextStepPayment(activeStep).then(() => {
        enqueueSnackbar('Next step to cart successfully', {
          variant: 'success'
        });
      });
    }
  };

  const handleBackStep = () => {
    backStepPayment(activeStep).then(() => {
      enqueueSnackbar('Back step to cart successfully', {
        variant: 'success'
      });
    });
  };

  const handleCreateBilling = (value) => {
    // dispatch(createBilling(value));
  };

  const renderAddressOfUser = () => (
    <div>
      {ADDRESS_BOOKS.map((address, index) => (
        <AddressItem key={index} address={address} onNextStep={handleNextStep} onCreateBilling={handleCreateBilling} />
      ))}
    </div>
  );

  const phoneRegExp = '(84|0[3|5|7|8|9])+([0-9]{8})\\b';
  const PersonInfo = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    addressDetail: Yup.string().required('Address is required'),
    province: Yup.string().required('Province is required'),
    district: Yup.string().required('District is required'),
    subDistrict: Yup.string().required('Sub District is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: initInfo.fullName || '',
      phone: initInfo.phone || '',
      email: initInfo.email || '',
      addressDetail: initInfo.addressDetail || '',
      province: province?.name || '',
      district: district?.name || '',
      subDistrict: subDistrict?.name || '',
      moreInfo: initInfo.moreInfo || ''
    },
    validationSchema: PersonInfo,
    onSubmit: async () => {
      try {
        Helper.saveBillingInfo(values);
        handleNextStep();
      } catch (e) {
        enqueueSnackbar('Lỗi', {
          variant: 'error'
        });
      }
    }
  });

  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;

  const handleChangeProvince = (newValue) => {
    setProvince(newValue);
    setDistrict(null);
    setSubDistrict(null);
  };

  const handleChangeDistrict = (newValue) => {
    setDistrict(newValue);
    setSubDistrict(null);
  };

  const handleChangeSubDistrict = (newValue) => {
    setSubDistrict(newValue);
  };

  const renderAddressOfNotUser = () => (
    <FormikProvider value={formik}>
      <Form>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2">Thông tin thanh toán</Typography>
            {!user && (
              <Stack direction="row">
                <Typography variant="subtitle2">Bạn đã có tài khoản?</Typography>
                <Link to={PATH_AUTH.login} color="inherit" component={RouterLink} sx={{ textDecoration: '' }}>
                  <Typography
                    variant="subtitle2"
                    component="span"
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                  >
                    &nbsp;Đăng nhập ngay
                  </Typography>
                </Link>
              </Stack>
            )}
          </Box>
          <Stack direction="row" spacing={3} sx={{ marginBottom: theme.spacing(2) }}>
            <TextField
              fullWidth
              label="Full Name"
              {...getFieldProps('fullName')}
              error={Boolean(touched.fullName && errors.fullName)}
              helperText={touched.fullName && errors.fullName}
              size="small"
            />
            <TextField
              fullWidth
              label="Phone"
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
              size="small"
            />
          </Stack>
          <TextField
            fullWidth
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            size="small"
          />
          <TextField
            fullWidth
            label="Address"
            {...getFieldProps('addressDetail')}
            error={Boolean(touched.addressDetail && errors.addressDetail)}
            helperText={touched.addressDetail && errors.addressDetail}
            size="small"
          />
          <Stack direction="row" spacing={3} sx={{ marginBottom: theme.spacing(2) }}>
            <ProvincePicker
              label="Tỉnh/Thành"
              onChange={(newValue) => handleChangeProvince(newValue)}
              value={province?.name}
              required
              fullWidth
              size="small"
            />
            <DistrictPicker
              label="Quận/Huyện"
              defaultProvinceCode={province?.code}
              onChange={(newValue) => handleChangeDistrict(newValue)}
              value={district?.name}
              required
              fullWidth
              size="small"
            />
            <SubDistrictPicker
              label="Phường/Xã"
              defaultDistrictCode={district?.code}
              onChange={(newValue) => handleChangeSubDistrict(newValue)}
              value={subDistrict?.name}
              required
              fullWidth
              size="small"
            />
          </Stack>
          <TextField
            fullWidth
            label="More Info (Example: Delivery time)"
            {...getFieldProps('moreInfo')}
            error={Boolean(touched.moreInfo && errors.moreInfo)}
            helperText={touched.moreInfo && errors.moreInfo}
            size="small"
          />
          <Button fullWidth size="large" type="submit" variant="contained">
            Tiếp tục
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {user && renderAddressOfUser()}
          {!user && renderAddressOfNotUser()}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Button size="small" color="inherit" onClick={handleBackStep} startIcon={<Icon icon={arrowIosBackFill} />}>
              Back
            </Button>
            {user && (
              <Button size="small" onClick={handleClickOpen} startIcon={<Icon icon={plusFill} />}>
                Add new address
              </Button>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary subtotal={subTotal} total={total} discount={discount} />
        </Grid>
      </Grid>

      <CheckoutNewAddressForm
        open={open}
        onClose={handleClose}
        onNextStep={handleNextStep}
        onCreateBilling={handleCreateBilling}
      />
    </>
  );
}
