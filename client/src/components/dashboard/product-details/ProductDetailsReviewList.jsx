import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import roundThumbUp from '@iconify/icons-ic/round-thumb-up';
import roundVerified from '@iconify/icons-ic/round-verified';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { Box, List, Button, Rating, Avatar, ListItem, Pagination, Typography, Stack } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
import { getAllComments } from '../../../redux/actions/comments';
import useLocales from '../../../hooks/useLocales';

// utils

// ----------------------------------------------------------------------

ReviewItem.propTypes = {
  review: PropTypes.object
};

function ReviewItem({ review }) {
  const { t } = useLocales();
  const [isHelpful, setHelpfuls] = useState(false);
  const { author, content, star, anonymousAuthor, createdAt } = review;

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
            src={author?.avatar || '/static/mock-images/avatars/avatar_default.jpg'}
            sx={{
              mr: { xs: 2, sm: 0 },
              mb: { sm: 2 },
              width: { md: 64 },
              height: { md: 64 }
            }}
          />
          <div>
            <Typography variant="subtitle2" noWrap>
              {author ? `${author?.lastName} ${author?.firstName}` : anonymousAuthor.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
              {fDate(createdAt)}
            </Typography>
          </div>
        </Box>

        <div>
          <Rating size="small" value={star} precision={0.1} readOnly />

          {content && (
            <Typography variant="caption" sx={{ my: 1, display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <Icon icon={roundVerified} width={16} height={16} />
              &nbsp;Đã mua hàng
            </Typography>
          )}

          <Typography variant="body2">{content}</Typography>

          <Stack mt={1} direction="row" alignItems="center" flexWrap="wrap">
            {!isHelpful && (
              <Typography variant="body2" sx={{ mr: 1 }}>
                {t('dashboard.comments.helpful')}
              </Typography>
            )}

            <Button
              size="small"
              color="inherit"
              startIcon={<Icon icon={!isHelpful ? roundThumbUp : checkmarkFill} />}
              onClick={handleClickHelpful}
            >
              {isHelpful ? 'Thích' : 'Thích'}&nbsp;(
              {fShortenNumber(!isHelpful ? 1 + Math.floor(Math.random() * 10) : 11 + 1)})
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
  const { t } = useLocales();
  const dispatch = useDispatch();
  const { list: comments, isLoading } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getAllComments(product._id));
  }, [dispatch]);

  useEffect(() => {
    // console.log('comments', comments);
  }, [comments]);

  if (!comments || comments.length < 1) {
    return null;
  }

  return (
    <Box sx={{ pt: 3, px: 2, pb: 5 }}>
      <List disablePadding>
        {comments.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </List>
      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={10} color="primary" />
      </Box> */}
    </Box>
  );
}
