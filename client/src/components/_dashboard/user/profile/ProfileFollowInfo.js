import PropTypes from 'prop-types';
// material
import { Card, Stack, Typography, Divider } from '@material-ui/core';
// utils
import { fNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

ProfileFollowInfo.propTypes = {
  profile: PropTypes.object
};

export default function ProfileFollowInfo({ profile }) {
  const { follower, following } = profile;

  return (
    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(follower)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Follower
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(following)}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Following
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
