/* eslint-disable no-unused-vars */
// icons
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
//
import PropTypes from 'prop-types';
import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// material
import { Box, Tooltip, IconButton, DialogActions, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
//
import { MButton } from '~/components/@material-extend';
import { DialogAnimate } from '~/components/animate';
import InvoicePDF from './InvoicePDF';

// ----------------------------------------------------------------------

InvoiceToolbar.propTypes = {
  invoice: PropTypes.object
};

export default function InvoiceToolbar({ invoice }) {
  const [openPDF, setOpenPDF] = useState(false);

  const handleOpenPreview = () => {
    setOpenPDF(true);
  };

  const handleClosePreview = () => {
    setOpenPDF(false);
  };

  return (
    <>
      {/* <Stack mb={5} direction="row" justifyContent="flex-end" spacing={1.5}> */}
      {/*  <MButton color="error" size="small" variant="contained" endIcon={<Icon icon={shareFill} />}> */}
      {/*    Share */}
      {/*  </MButton> */}

      {/*  <MButton */}
      {/*    color="info" */}
      {/*    size="small" */}
      {/*    variant="contained" */}
      {/*    onClick={handleOpenPreview} */}
      {/*    endIcon={<Icon icon={eyeFill} />} */}
      {/*    sx={{ mx: 1 }} */}
      {/*  > */}
      {/*    Preview */}
      {/*  </MButton> */}

      {/*  <PDFDownloadLink */}
      {/*    document={<InvoicePDF invoice={invoice} />} */}
      {/*    fileName={`INVOICE-${invoice?._id}`} */}
      {/*    style={{ textDecoration: 'none' }} */}
      {/*  > */}
      {/*    {({ loading }) => ( */}
      {/*      <LoadingButton */}
      {/*        size="small" */}
      {/*        loading={loading} */}
      {/*        variant="contained" */}
      {/*        loadingPosition="end" */}
      {/*        endIcon={<Icon icon={downloadFill} />} */}
      {/*      > */}
      {/*        Download */}
      {/*      </LoadingButton> */}
      {/*    )} */}
      {/*  </PDFDownloadLink> */}
      {/* </Stack> */}

      <DialogAnimate fullScreen open={openPDF}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions sx={{ zIndex: 9, padding: '12px !important', boxShadow: (theme) => theme.customShadows.z8 }}>
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={handleClosePreview} size="large">
                <Icon icon={closeFill} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <InvoicePDF invoice={invoice} />
            </PDFViewer>
          </Box>
        </Box>
      </DialogAnimate>
    </>
  );
}
