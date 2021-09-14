import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import roundThumbUp from '@iconify/icons-ic/round-thumb-up';
import roundVerified from '@iconify/icons-ic/round-verified';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { Box, List, Button, Rating, Avatar, ListItem, Pagination, Typography, Stack } from '@material-ui/core';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

ReviewItem.propTypes = {
  review: PropTypes.object
};

function ReviewItem({ review }) {
  const [isHelpful, setHelpfuls] = useState(false);
  const { name, rating, comment, helpful, postedAt, avatarUrl, isPurchased } = review;

  const handleClickHelpful = () => {
    setHelpfuls((prev) => !prev);
  };

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          mb: 5,
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <Box
          sx={{
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            mb: { xs: 2, sm: 0 },
            minWidth: { xs: 160, md: 240 },
            textAlign: { sm: 'center' },
            flexDirection: { sm: 'column' }
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              mr: { xs: 2, sm: 0 },
              mb: { sm: 2 },
              width: { md: 64 },
              height: { md: 64 }
            }}
          />
          <div>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
              {fDate(postedAt)}
            </Typography>
          </div>
        </Box>

        <div>
          <Rating size="small" value={rating} precision={0.1} readOnly />

          {isPurchased && (
            <Typography variant="caption" sx={{ my: 1, display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <Icon icon={roundVerified} width={16} height={16} />
              &nbsp;Verified purchase
            </Typography>
          )}

          <Typography variant="body2">{comment}</Typography>

          <Stack mt={1} direction="row" alignItems="center" flexWrap="wrap">
            {!isHelpful && (
              <Typography variant="body2" sx={{ mr: 1 }}>
                Was this review helpful to you?
              </Typography>
            )}

            <Button
              size="small"
              color="inherit"
              startIcon={<Icon icon={!isHelpful ? roundThumbUp : checkmarkFill} />}
              onClick={handleClickHelpful}
            >
              {isHelpful ? 'Helpful' : 'Thank'}({fShortenNumber(!isHelpful ? helpful : helpful + 1)})
            </Button>
          </Stack>
        </div>
      </ListItem>
    </>
  );
}

ProductDetailsReviewList.propTypes = {
  product: PropTypes.object
};

export default function ProductDetailsReviewList({ product }) {
  const { reviews } = product;

  return (
    <Box sx={{ pt: 3, px: 2, pb: 5 }}>
      <List disablePadding>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
}
