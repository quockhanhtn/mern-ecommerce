import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import appleFilled from '@iconify/icons-ant-design/apple-filled';
import windowsFilled from '@iconify/icons-ant-design/windows-filled';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box, Card, Rating, CardHeader, Typography, Stack } from '@material-ui/core';
// utils
import { fCurrency, fShortenNumber } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

const APPLICATIONS = [
  {
    name: 'Chrome',
    system: 'Mac',
    price: 0,
    rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
    review: faker.datatype.number(),
    shortcut: '/static/icons/ic_chrome.svg'
  },
  {
    name: 'Drive',
    system: 'Mac',
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
    review: faker.datatype.number(),
    shortcut: '/static/icons/ic_drive.svg'
  },
  {
    name: 'Dropbox',
    system: 'Windows',
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
    review: faker.datatype.number(),
    shortcut: '/static/icons/ic_dropbox.svg'
  },
  {
    name: 'Evernote',
    system: 'Mac',
    price: 0,
    rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
    review: faker.datatype.number(),
    shortcut: '/static/icons/ic_evernote.svg'
  },
  {
    name: 'Github',
    system: 'Windows',
    price: 0,
    rating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
    review: faker.datatype.number(),
    shortcut: '/static/icons/ic_github.svg'
  }
];

// ----------------------------------------------------------------------

ApplicationItem.propTypes = {
  app: PropTypes.object
};

function ApplicationItem({ app }) {
  const theme = useTheme();
  const { shortcut, system, price, rating, review, name } = app;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.neutral'
        }}
      >
        <img src={shortcut} alt={name} width={24} height={24} />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 160 }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Stack direction="row" alignItems="center" sx={{ mt: 0.5, color: 'text.secondary' }}>
          <Icon width={16} height={16} icon={system === 'Mac' ? appleFilled : windowsFilled} />
          <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
            {system}
          </Typography>
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={price === 0 ? 'success' : 'error'}
          >
            {price === 0 ? 'Free' : fCurrency(price)}
          </Label>
        </Stack>
      </Box>

      <Stack alignItems="flex-end" sx={{ pr: 3 }}>
        <Rating readOnly size="small" precision={0.5} name="reviews" value={rating} />
        <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
          {fShortenNumber(review)}&nbsp;reviews
        </Typography>
      </Stack>
    </Stack>
  );
}

export default function AppTopRelated() {
  return (
    <Card>
      <CardHeader title="Top Related Applications" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {APPLICATIONS.map((app) => (
            <ApplicationItem key={app.name} app={app} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}
