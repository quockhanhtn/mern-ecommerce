import { isString } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Paper, Box, Typography } from '@material-ui/core';
import { MLinearProgress } from '../@material-extend';
// utils
import { fData } from '../../utils/formatNumber';
//
import { UploadIllustration } from '../../assets';

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
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  sx: PropTypes.object,
  uploadPercent: PropTypes.number
};

export default function UploadSingleFile({ error, file, sx, uploadPercent, ...other }) {
  const [isMoveHover, setIsMoveHover] = useState(false);
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: false,
    ...other
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size } = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  const handleMoveEnter = () => {
    setIsMoveHover(true);
  };

  const handleMoveLeave = () => {
    setIsMoveHover(false);
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      {isMoveHover && <>ddd</>}
      <DropZoneStyle
        {...getRootProps()}
        onMouseEnter={handleMoveEnter}
        onMouseLeave={handleMoveLeave}
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

        <UploadIllustration sx={{ width: 220 }} />

        <Box sx={{ p: 3, ml: { md: 2 } }}>
          <Typography gutterBottom variant="h5">
            Drop or Select file
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Drop files here or click&nbsp;
            <Typography variant="body2" component="span" sx={{ color: 'primary.main' }}>
              browse
            </Typography>
            &nbsp;thorough your machine
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
      </DropZoneStyle>

      {uploadPercent > 0 && <MLinearProgress sx={{ marginTop: 2 }} variant="determinate" value={uploadPercent} />}

      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
}
