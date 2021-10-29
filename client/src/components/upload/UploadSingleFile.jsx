import { isString } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, FormControlLabel, Switch, Typography, TextField, Tooltip } from '@material-ui/core';
import { MLinearProgress, MIconButton, MLabelTypo } from '../@material-extend';
//
import { UploadIllustration } from '../../assets';
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' }
}));

// ----------------------------------------------------------------------

UploadSingleFile.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  setFile: PropTypes.func,
  sx: PropTypes.object,
  uploadPercent: PropTypes.number
};

export default function UploadSingleFile({ label, error, file, setFile, sx, uploadPercent, ...other }) {
  const { t } = useLocales();
  const [showInputUrl, setShowInputUrl] = useState(false);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    multiple: false,
    ...other
  });

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // eslint-disable-next-line no-undef
    if (setFile) setFile(null);
  };

  const handleInputUrl = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowInputUrl(!showInputUrl);
  };

  const onInputChange = (e) => {
    setFile(e.target.value);
  };

  return (
    <>
      <Box sx={{ width: '100%', ...sx }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          {label && <MLabelTypo text={label} />}
          <FormControlLabel
            control={<Switch value={showInputUrl} onChange={handleInputUrl} />}
            label={t('common.upload.from-url')}
          />
        </Box>

        {showInputUrl && (
          <TextField
            autoFocus
            fullWidth
            type="url"
            variant="outlined"
            label={t('common.upload.image-url')}
            onChange={onInputChange}
            value={file}
            sx={{ marginTop: 1, marginBottom: 1 }}
          />
        )}

        <DropZoneStyle
          {...getRootProps()}
          sx={{
            ...(isDragActive && { opacity: 0.72 }),
            ...((isDragReject || error) && {
              color: 'error.main',
              borderColor: 'error.light',
              bgcolor: 'error.lighter'
            }),
            ...(file && { padding: '12% 0' })
          }}
        >
          <input {...getInputProps()} />

          <UploadIllustration sx={{ width: 220, ...(file && { opacity: 0 }) }} />

          <Box sx={{ p: 3, ml: { md: 2 } }}>
            <Typography gutterBottom variant="h5">
              {t('common.upload.drop-or-select-file')}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t('common.upload.drop-files-here-or-click')}&nbsp;
              <Typography variant="body2" component="span" sx={{ color: 'primary.main' }}>
                {t('common.upload.browse')}
              </Typography>
              &nbsp;{t('common.upload.thorough-your-machine')}
            </Typography>
          </Box>

          {file && (
            <Box
              component="img"
              alt="file preview"
              src={isString(file) ? file : file.preview}
              sx={{
                top: 8,
                borderRadius: 1,
                objectFit: 'contain',
                position: 'absolute',
                width: 'calc(100% - 16px)',
                height: 'calc(100% - 16px)',
                bgcolor: 'background.paper'
              }}
            />
          )}

          <Box
            component="span"
            sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', flexDirection: 'column' }}
          >
            {file && (
              <Tooltip title={t('common.delete')} arrow>
                <MIconButton color="error" onClick={handleRemove}>
                  <Icon icon={closeFill} />
                </MIconButton>
              </Tooltip>
            )}
          </Box>
        </DropZoneStyle>

        {uploadPercent > 0 && <MLinearProgress sx={{ marginTop: 2 }} variant="determinate" value={uploadPercent} />}
      </Box>
    </>
  );
}
