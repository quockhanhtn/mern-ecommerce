// icon
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import eyeOutline from '@iconify/icons-eva/eye-outline';
import eyeOffOutline from '@iconify/icons-eva/eye-off-outline';
//
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { paramCase } from 'change-case';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import { useLocales } from '../../../hooks';
import { PATH_DASHBOARD } from '../../../routes/paths';
import DialogConfirm from '../../dialog/DialogConfirm';

// ----------------------------------------------------------------------

ProductMoreMenu.propTypes = {
  productId: PropTypes.string,
  productName: PropTypes.string,
  isHide: PropTypes.bool,
  onChangeHide: PropTypes.func,
  onDelete: PropTypes.func
};

export default function ProductMoreMenu({ productId, productName, isHide, onChangeHide, onDelete }) {
  const { t } = useLocales();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [textConfirmDelete, setTextConfirmDelete] = useState('');

  useEffect(() => {
    const text = t('products.confirm-delete', { nameInfo: productName });
    setTextConfirmDelete(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]);

  const handleChangeHide = (_e) => {
    if (typeof onChangeHide === 'function') {
      onChangeHide(productId);
    }
    setIsOpen(false);
  };

  const handleDelete = () => {
    setOpenDialogConfirm(true);
    setIsOpen(false);
  };

  const handleDeleteSuccess = () => {
    onDelete();
    setOpenDialogConfirm(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{ sx: { width: 200, maxWidth: '100%' } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          component={RouterLink}
          to={`${PATH_DASHBOARD.app.products.root}/${paramCase(productId)}/edit`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={t('common.edit')} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={handleChangeHide} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={isHide ? eyeOutline : eyeOffOutline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={isHide ? 'Hiển thị' : 'Ẩn sản phầm'} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={t('common.delete')} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      <DialogConfirm
        open={openDialogConfirm}
        setOpen={setOpenDialogConfirm}
        handleSubmit={handleDeleteSuccess}
        textContent={textConfirmDelete}
      />
    </>
  );
}
