import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { Icon } from '@iconify/react';
// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// ----------------------------------------------------------------------

MTableMoreMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired,
      handleOnClick: PropTypes.func.isRequired
    })
  )
};

export default function MTableMoreMenu({ menuItems }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
        <div onMouseLeave={() => setIsOpen(false)}>
          {menuItems.map((item, index) => (
            <MenuItem key={`-${index}`} onClick={item.handleOnClick} sx={{ color: 'text.secondary' }}>
              <ListItemIcon>
                <Icon icon={item.icon} width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary={item.title} primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          ))}
        </div>
      </Menu>
    </>
  );
}
