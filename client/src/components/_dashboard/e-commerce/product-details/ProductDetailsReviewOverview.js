import { sumBy } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as ScrollLink } from 'react-scroll';
import edit2Fill from '@iconify/icons-eva/edit-2-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Grid, Rating, Button, Typography, LinearProgress, Stack } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1)
}));

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:nth-child(2)': {
    [theme.breakpoints.up('md')]: {
      borderLeft: `solid 1px ${theme.palette.divider}`,
      borderRight: `solid 1px ${theme.palette.divider}`
    }
  }
}));

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  star: PropTypes.object,
  total: PropTypes.number
};

function ProgressItem({ star, total }) {
  const { name, starCount, reviewCount } = star;
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Typography variant="subtitle2">{name}</Typography>
      <LinearProgress
        variant="determinate"
        value={(starCount / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
          bgcolor: 'divider'
        }}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 64, textAlign: 'right' }}>
        {fShortenNumber(reviewCount)}
      </Typography>
    </Stack>
  );
}

ProductDetailsReviewOverview.propTypes = {
  product: PropTypes.object,
  onOpen: PropTypes.func
};

export default function ProductDetailsReviewOverview({ product, onOpen }) {
  const { totalRating, totalReview, ratings } = product;

  const total = sumBy(ratings, (star) => star.starCount);

  return (
    <Grid container>
      <GridStyle item xs={12} md={4}>
        <Typography variant="subtitle1" gutterBottom>
          Average rating
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ color: 'error.main' }}>
          {totalRating}/5
        </Typography>
        <RatingStyle readOnly value={totalRating} precision={0.1} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ({fShortenNumber(totalReview)}
          &nbsp;reviews)
        </Typography>
      </GridStyle>

      <GridStyle item xs={12} md={4}>
        <Stack spacing={1.5} sx={{ width: 1 }}>
          {ratings
            .slice(0)
            .reverse()
            .map((rating) => (
              <ProgressItem key={rating.name} star={rating} total={total} />
            ))}
        </Stack>
      </GridStyle>

      <GridStyle item xs={12} md={4}>
        <ScrollLink to="move_add_review" spy smooth offset={-200}>
          <Button size="large" onClick={onOpen} variant="outlined" startIcon={<Icon icon={edit2Fill} />}>
            Write your review
          </Button>
        </ScrollLink>
      </GridStyle>
    </Grid>
  );
}
