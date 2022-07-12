import PropTypes from 'prop-types';
// material
import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
// hooks
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// components
import { MotionInView, varFadeInUp } from '../../animate';
import PhoneInputForm from './PhoneInputForm';
import VerifyCodeForm from './VerifyCodeForm';

PhoneVerifyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func
};

PhoneVerifyDialog.defaultProps = {
  onSuccess: (result) => {
    console.log('onClose', result);
  }
};

export default function PhoneVerifyDialog({ open, onClose, onSuccess }) {
  const navigate = useNavigate();
  const [confirmResult, setConfirmResult] = useState(null);
  const [isSent, setIsSent] = useState(false);

  const handleOtpSent = (confirmResult) => {
    setConfirmResult(confirmResult);
    setIsSent(true);
  };

  const handleResentOtp = () => {
    if (confirmResult) {
      //
    }
  };

  const handleGoBack = () => {
    setIsSent(false);
    navigate('/');
  };

  const handleSuccess = () => {
    setIsSent(false);
    onClose();
    onSuccess();
  };

  const handleClose = (_event, reason) => {
    if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
      return;
    }
    onClose();
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h5">{isSent ? 'Nhập mã OTP' : ' Nhập số điện thoại để xác thực'}</Typography>
      </DialogTitle>
      <DialogContent>
        <MotionInView variants={varFadeInUp}>
          <Box sx={{ width: '100%', minWidth: '450px' }}>
            {!isSent ? (
              <PhoneInputForm onOtpSent={handleOtpSent} onGoBack={handleGoBack} />
            ) : (
              <VerifyCodeForm
                confirmResult={confirmResult}
                onResentOtp={handleResentOtp}
                onGoBack={handleGoBack}
                onSuccess={handleSuccess}
              />
            )}
          </Box>
        </MotionInView>
      </DialogContent>
    </Dialog>
  );
}
