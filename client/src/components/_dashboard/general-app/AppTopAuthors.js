import faker from 'faker';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import heartFill from '@iconify/icons-eva/heart-fill';
import trophyFilled from '@iconify/icons-ant-design/trophy-filled';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Stack, Card, Avatar, CardHeader, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const AUTHORS = [
  {
    name: faker.name.findName(),
    favourite: faker.datatype.number(),
    avatar: '/static/mock-images/avatars/avatar_2.jpg'
  },
  {
    name: faker.name.findName(),
    favourite: faker.datatype.number(),
    avatar: '/static/mock-images/avatars/avatar_3.jpg'
  },
  {
    name: faker.name.findName(),
    favourite: faker.datatype.number(),
    avatar: '/static/mock-images/avatars/avatar_4.jpg'
  }
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.08)
}));

// ----------------------------------------------------------------------

AuthorItem.propTypes = {
  author: PropTypes.object,
  index: PropTypes.number
};

function AuthorItem({ author, index }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={author.name} src={author.avatar} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{author.name}</Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.secondary'
          }}
        >
          <Box component={Icon} icon={heartFill} sx={{ width: 16, height: 16, mr: 0.5 }} />
          {fShortenNumber(author.favourite)}
        </Typography>
      </Box>

      <IconWrapperStyle
        sx={{
          ...(index === 1 && {
            color: 'info.main',
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08)
          }),
          ...(index === 2 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
          })
        }}
      >
        <Icon icon={trophyFilled} width={20} height={20} />
      </IconWrapperStyle>
    </Stack>
  );
}

export default function AppTopAuthors() {
  const displayAuthor = orderBy(AUTHORS, ['favourite'], ['desc']);

  return (
    <Card>
      <CardHeader title="Top Authors" />
      <Stack spacing={3} sx={{ p: 3 }}>
        {displayAuthor.map((author, index) => (
          <AuthorItem key={author.name} author={author} index={index} />
        ))}
      </Stack>
    </Card>
  );
}
