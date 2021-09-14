import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import copyFill from '@iconify/icons-eva/copy-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import filePdfFilled from '@iconify/icons-ant-design/file-pdf-filled';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function MoreMenuButton() {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickImport = () => {
    alert('Hello Import!!');
    setIsOpen(false);
  };

  const handleClickCopy = () => {
    alert('Hello Copy!!');
    setIsOpen(false);
  };

  const handleClickExport = () => {
    alert('Hello Export!!');
    setIsOpen(false);
  };

  const handleClickArchive = () => {
    alert('Hello Archive!!');
    setIsOpen(false);
  };

  const OPTIONS = [
    { text: 'Import', icon: downloadFill, action: handleClickImport },
    { text: 'Copy', icon: copyFill, action: handleClickCopy },
    { text: 'Export', icon: filePdfFilled, action: handleClickExport },
    { text: 'Archive', icon: archiveFill, action: handleClickArchive }
  ];

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {OPTIONS.map((item) => (
          <MenuItem key={item.text} onClick={item.action} sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Icon icon={item.icon} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
