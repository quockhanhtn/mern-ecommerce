import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import codeFill from '@iconify/icons-eva/code-fill';
// material
import { Box, Tooltip, IconButton, DialogTitle, DialogContent } from '@material-ui/core';
//
import Markdown from './Markdown';
import { DialogAnimate } from './animate';

// ----------------------------------------------------------------------

CodeSnippets.propTypes = {
  source: PropTypes.string.isRequired,
  title: PropTypes.string,
  sx: PropTypes.object
};

export default function CodeSnippets({ source, title, sx }) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={sx}>
      <Tooltip title="View Code">
        <IconButton
          onClick={() => setOpen(true)}
          color={open ? 'primary' : 'default'}
          sx={{
            right: 8,
            bottom: 8,
            position: 'absolute'
          }}
        >
          <Icon icon={codeFill} width={20} height={20} />
        </IconButton>
      </Tooltip>

      <DialogAnimate fullWidth open={open} maxWidth="md" scroll="paper" onClose={() => setOpen(false)}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <Markdown children={source} />
        </DialogContent>
      </DialogAnimate>
    </Box>
  );
}
