import { isString } from 'lodash';
import PropTypes from 'prop-types';
// material
import { Box, Typography, Link, Stack } from '@mui/material';
//
import { MBreadcrumbs } from './@material-extend';

// ----------------------------------------------------------------------

HeaderBreadcrumbs.propTypes = {
  links: PropTypes.array,
  action: PropTypes.node,
  heading: PropTypes.string.isRequired,
  moreLink: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  sx: PropTypes.object
};

export default function HeaderBreadcrumbs({ links, action, heading, moreLink = '' || [], sx, ...other }) {
  return (
    <Stack sx={sx} mb={2} spacing={2}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {heading}
          </Typography>
          <MBreadcrumbs links={links} {...other} />
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Stack>

      {isString(moreLink) ? (
        <Link href={moreLink} target="_blank" variant="body2" underline="hover">
          {moreLink}
        </Link>
      ) : (
        moreLink.map((href) => (
          <Link
            noWrap
            key={href}
            href={href}
            variant="body2"
            target="_blank"
            sx={{ display: 'flex' }}
            underline="hover"
          >
            {href}
          </Link>
        ))
      )}
    </Stack>
  );
}
