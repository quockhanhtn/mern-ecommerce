import PropTypes from 'prop-types';
// material
import { Typography, Box, Grid, Paper } from '@material-ui/core';
//
import { varFadeIn, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const CATEGORIES = [
  {
    label: 'Managing your account',
    icon: '/static/faqs/ic_account.svg',
    href: '#'
  },
  {
    label: 'Payment',
    icon: '/static/faqs/ic_payment.svg',
    href: '#'
  },
  {
    label: 'Delivery',
    icon: '/static/faqs/ic_delivery.svg',
    href: '#'
  },
  {
    label: 'Problem with the Product',
    icon: '/static/faqs/ic_package.svg',
    href: '#'
  },
  {
    label: 'Return & Refund',
    icon: '/static/faqs/ic_refund.svg',
    href: '#'
  },
  {
    label: 'Guarantees and assurances',
    icon: '/static/faqs/ic_assurances.svg',
    href: '#'
  }
];

// ----------------------------------------------------------------------

CategoryCard.propTypes = {
  category: PropTypes.object
};

function CategoryCard({ category }) {
  const { label, icon } = category;

  return (
    <Paper
      sx={{
        px: 2,
        height: 260,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow: (theme) => theme.customShadows.z8
      }}
    >
      <Box component="img" src={icon} sx={{ mb: 2, width: 80, height: 80 }} />
      <Typography variant="subtitle2">{label}</Typography>
    </Paper>
  );
}

export default function FaqsCategory() {
  return (
    <Grid container spacing={3} sx={{ mb: 15 }}>
      {CATEGORIES.map((category) => (
        <Grid item xs={12} sm={4} md={2} key={category.label}>
          <MotionInView variants={varFadeIn}>
            <CategoryCard category={category} />
          </MotionInView>
        </Grid>
      ))}
    </Grid>
  );
}
