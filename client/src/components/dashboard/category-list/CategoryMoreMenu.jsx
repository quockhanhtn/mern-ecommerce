import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import useLocales from '~/hooks/useLocales';
import DialogConfirm from '../../dialog/DialogConfirm';

// ----------------------------------------------------------------------

CategoryMoreMenu.propTypes = {
  editTitle: PropTypes.string,
  onEdit: PropTypes.func,
  deleteTitle: PropTypes.string,
  onDelete: PropTypes.func,
  nameInfo: PropTypes.string
};

export default function CategoryMoreMenu({ editTitle, onEdit, deleteTitle, onDelete, nameInfo }) {
  const { t } = useLocales();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [textConfirmDelete, setTextConfirmDelete] = useState('');

  useEffect(() => {
    const text = t('dashboard.categories.confirm-delete', { nameInfo });
    setTextConfirmDelete(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameInfo]);

  const handleEdit = (event) => {
    if (onEdit && typeof onEdit === 'function') {
      onEdit();
    }
    setIsOpen(false);
  };

  const handleDelete = (event) => {
    setOpenDialogConfirm(true);
    setIsOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)} size="large">
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
        <MenuItem onClick={handleEdit} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={editTitle} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={deleteTitle} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      <DialogConfirm
        open={openDialogConfirm}
        setOpen={setOpenDialogConfirm}
        handleSubmit={onDelete}
        textContent={textConfirmDelete}
      />
    </>
  );
}
