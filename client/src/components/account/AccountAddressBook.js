import PropTypes from 'prop-types';
import { useEffect } from 'react';
// icons
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import { Box, Card, Button, Typography, Stack, Paper } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllAddresses, createAddress, updateAddress, deleteAddress } from '../../actions/account';
//
import { MButton } from '../@material-extend';

// ----------------------------------------------------------------------

export default function AccountAddressBook() {
  const dispatch = useDispatch();
  const { list: addressList, isLoading, error } = useSelector((state) => state.account.addresses);

  useEffect(() => {
    dispatch(getAllAddresses());
  }, [dispatch]);

  const handleAdd = () => {
    //
  };

  const handleEdit = (id) => {
    //
  };

  const handleDelete = (id) => {
    //
  };

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3} alignItems="flex-start">
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            Billing Info
          </Typography>
          <Button size="small" startIcon={<Icon icon={plusFill} />} onClick={handleAdd}>
            Add new address
          </Button>
        </Box>

        {isLoading && <p>Loading...</p>}

        {addressList.map((address) => (
          <Paper key={address._id} sx={{ p: 3, width: 1, bgcolor: 'background.neutral' }}>
            <Typography variant="subtitle1" gutterBottom>
              {address.name}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Address: &nbsp;
              </Typography>
              {`${address.street}, ${address.ward}, ${address.district}, ${address.province}`}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Phone: &nbsp;
              </Typography>
              {address.phone}
            </Typography>

            <Box sx={{ mt: 1 }}>
              <Button
                size="small"
                startIcon={<Icon icon={editFill} />}
                onClick={handleEdit(address._id)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <MButton
                color="error"
                size="small"
                startIcon={<Icon icon={trash2Fill} />}
                onClick={handleDelete(address._id)}
              >
                Delete
              </MButton>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Card>
  );
}
