import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import starFill from '@iconify/icons-eva/star-fill';
import linkFill from '@iconify/icons-eva/link-fill';
import starOutline from '@iconify/icons-eva/star-outline';
import roundLabelImportant from '@iconify/icons-ic/round-label-important';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Link, Tooltip, Typography, Stack } from '@material-ui/core';
// redux
import { useSelector } from '../../../redux/store';
// utils
import { fDate } from '../../../utils/formatTime';
import createAvatar from '../../../utils/createAvatar';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { MAvatar, MCheckbox, MHidden } from '../../@material-extend';
import Label from '../../Label';
import MailItemAction from './MailItemAction';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(0, 2),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    alignItems: 'center'
  },
  '&:hover': {
    zIndex: 999,
    position: 'relative',
    boxShadow: theme.customShadows.z24,
    '& .showActions': { opacity: 1 }
  }
}));

const WrapStyle = styled(Link)(({ theme }) => ({
  minWidth: 0,
  display: 'flex',
  padding: theme.spacing(2, 0),
  transition: theme.transitions.create('padding')
}));

// ----------------------------------------------------------------------

const linkTo = (params, mailId) => {
  const { systemLabel, customLabel } = params;
  const baseUrl = PATH_DASHBOARD.mail.root;

  if (systemLabel) {
    return `${baseUrl}/${systemLabel}/${mailId}`;
  }
  if (customLabel) {
    return `${baseUrl}/label/${customLabel}/${mailId}`;
  }
  return baseUrl;
};

MailItem.propTypes = {
  mail: PropTypes.object.isRequired,
  isDense: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  onDeselect: PropTypes.func,
  onSelect: PropTypes.func
};

export default function MailItem({ mail, isDense, isSelected, onSelect, onDeselect, ...other }) {
  const params = useParams();
  const { labels } = useSelector((state) => state.mail);
  const isAttached = mail.files.length > 0;

  const handleChangeCheckbox = (event) => (event.target.checked ? onSelect() : onDeselect());

  return (
    <RootStyle
      sx={{
        ...(!mail.isUnread && {
          color: 'text.primary',
          backgroundColor: 'background.paper'
        }),
        ...(isSelected && { bgcolor: 'action.selected' })
      }}
      {...other}
    >
      <MHidden width="mdDown">
        <Stack direction="row" sx={{ mr: 2 }}>
          <MCheckbox checked={isSelected} onChange={handleChangeCheckbox} />
          <Tooltip title="Starred">
            <MCheckbox
              color="warning"
              defaultChecked={mail.isStarred}
              icon={<Icon icon={starOutline} />}
              checkedIcon={<Icon icon={starFill} />}
            />
          </Tooltip>
          <Tooltip title="Important">
            <MCheckbox
              color="warning"
              defaultChecked={mail.isImportant}
              checkedIcon={<Icon icon={roundLabelImportant} />}
              icon={<Icon icon={roundLabelImportant} />}
            />
          </Tooltip>
        </Stack>
      </MHidden>

      <WrapStyle
        color="inherit"
        underline="none"
        component={RouterLink}
        to={linkTo(params, mail.id)}
        sx={{ display: 'flex', ...(isDense && { py: 1 }) }}
      >
        <MAvatar
          alt={mail.from.name}
          src={mail.from.avatar}
          color={createAvatar(mail.from.name).color}
          sx={{ width: 32, height: 32 }}
        >
          {createAvatar(mail.from.name).name}
        </MAvatar>

        <Box
          sx={{
            ml: 2,
            minWidth: 0,
            alignItems: 'center',
            display: { md: 'flex' }
          }}
        >
          <Typography
            variant="body2"
            noWrap
            sx={{
              pr: 2,
              minWidth: 200,
              ...(!mail.isUnread && { fontWeight: 'fontWeightBold' })
            }}
          >
            {mail.from.name}
          </Typography>

          <Typography
            noWrap
            variant="body2"
            sx={{
              pr: 2
            }}
          >
            <Box component="span" sx={{ ...(!mail.isUnread && { fontWeight: 'fontWeightBold' }) }}>
              {mail.subject}
            </Box>
            &nbsp;-&nbsp;
            <Box
              component="span"
              sx={{
                ...(!mail.isUnread && { color: 'text.secondary' })
              }}
            >
              {mail.message}
            </Box>
          </Typography>

          <MHidden width="mdDown">
            <Box sx={{ display: 'flex' }}>
              {mail.labelIds.map((labelId) => {
                const label = labels.find((_label) => _label.id === labelId);
                if (!label) return null;
                return (
                  <Label
                    key={label.id}
                    sx={{
                      mx: 0.5,
                      textTransform: 'capitalize',
                      bgcolor: label.color,
                      color: (theme) => theme.palette.getContrastText(label.color)
                    }}
                  >
                    {label.name}
                  </Label>
                );
              })}
            </Box>

            {isAttached && (
              <Box
                component={Icon}
                icon={linkFill}
                sx={{
                  mx: 2,
                  width: 20,
                  height: 20,
                  flexShrink: 0
                }}
              />
            )}
          </MHidden>

          <Typography
            variant="caption"
            sx={{
              flexShrink: 0,
              minWidth: 120,
              textAlign: 'right',
              ...(!mail.isUnread && { fontWeight: 'fontWeightBold' })
            }}
          >
            {fDate(mail.createdAt)}
          </Typography>
        </Box>
      </WrapStyle>

      <MailItemAction className="showActions" />
    </RootStyle>
  );
}
