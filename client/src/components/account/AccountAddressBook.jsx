/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// icons
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import { Box, Grid, Card, Button, Typography, Stack, Paper } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { addressActions } from '../../redux/slices/accountSlice';
//
import useLocales from '../../hooks/useLocales';
//
import AddressForm from './AddressForm';
import Label from '../Label';
import { MButton, MCircularProgress } from '../@material-extend';

// ----------------------------------------------------------------------

const LEFT_WIDTH = 200;

const InfoItem = ({ label, value, valueVariant }) => {
  let display = (
    <Typography variant={valueVariant} sx={{ flex: 1, marginLeft: 3 }}>
      {value}
    </Typography>
  );
  if (Array.isArray(value)) {
    display = (
      <Box sx={{ flex: 1, marginLeft: 3 }}>
        {value.map((item, index) => (
          <Typography key={index} variant={valueVariant}>
            {item}
          </Typography>
        ))}
      </Box>
    );
  }

  return (
    <Box display="flex" alignItems={Array.isArray(value) ? 'start' : 'center'} mb={0.5}>
      <Typography align="right" variant="body2" component="span" sx={{ color: 'text.secondary', width: LEFT_WIDTH }}>
        {label}
      </Typography>
      {display}
    </Box>
  );
};

export default function AccountAddressBook() {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const { list: addressList, isLoading, error } = useSelector((state) => state.account.addresses);

  const [openForm, setOpenForm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    dispatch(addressActions.getAll());
  }, [dispatch]);

  const handleAdd = () => {
    setEditAddress(null);
    setOpenForm(true);
  };

  const handleEdit = (id) => {
    if (addressList && addressList.length > 0) {
      setEditAddress(addressList.find((a) => a._id === id));
      setOpenForm(true);
    }
  };

  const handleDelete = (id) => {
    dispatch(addressActions.delete(id));
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const handleSave = (data) => {
    if (editAddress) {
      dispatch(addressActions.update(editAddress._id, data));
    } else {
      dispatch(addressActions.create(data));
    }
    setOpenForm(false);
  };

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <MCircularProgress />
            <Typography>{t('common.please-wait')}</Typography>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3} alignItems="flex-start">
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              {t('address.list')}
            </Typography>
            <Button size="small" startIcon={<Icon icon={plusFill} />} onClick={handleAdd}>
              {t('address.add-title')}
            </Button>
          </Box>

          {isLoading && <p>Loading...</p>}

          {error && <p>Error: {error}</p>}

          {addressList.length === 0 && <p>No address found</p>}

          {addressList.map((address) => (
            <Paper key={address._id} sx={{ p: 2, width: 1, bgcolor: 'background.neutral', position: 'relative' }}>
              {address.type && <Label sx={{ right: 16, top: 16, position: 'absolute' }}>{address.type}</Label>}

              <InfoItem label={t('address.full-name')} value={address.name} valueVariant="subtitle1" />
              <InfoItem label={t('address.phone')} value={address.phone} valueVariant="body2" />
              <InfoItem
                label={t('address.title')}
                value={[address.street, address.ward, address.district, address.province]}
                valueVariant="body2"
              />

              <Box sx={{ display: 'flex', mt: 1 }}>
                <Box sx={{ width: LEFT_WIDTH }}>
                  <Button
                    size="small"
                    startIcon={<Icon icon={editFill} />}
                    onClick={() => handleEdit(address._id)}
                    sx={{ float: 'right' }}
                  >
                    {t('common.edit')}
                  </Button>
                </Box>
                <Box sx={{ flex: 1, marginLeft: 3 }}>
                  <MButton
                    color="error"
                    size="small"
                    startIcon={<Icon icon={trash2Fill} />}
                    onClick={() => handleDelete(address._id)}
                  >
                    {t('common.delete')}
                  </MButton>
                </Box>
              </Box>

              {/* <Typography variant="subtitle1" gutterBottom>
                <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                  {t('address.full-name')}: &nbsp;
                </Typography>
                {address.name}
              </Typography>

              <Typography variant="body2" gutterBottom>
                <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                  {t('address.phone')}: &nbsp;
                </Typography>
                {`${address.street}, ${address.ward}, ${address.district}, ${address.province}`}
              </Typography>

              <Typography variant="body2" gutterBottom>
                <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                  {t('address.title')}: &nbsp;
                </Typography>
                {address.phone}
              </Typography> */}
            </Paper>
          ))}
        </Stack>
      </Card>

      <AddressForm
        addressData={editAddress}
        open={openForm}
        onClose={handleClose}
        onSubmit={handleSave}
        isLoading={isLoading}
      />
    </>
  );
}
