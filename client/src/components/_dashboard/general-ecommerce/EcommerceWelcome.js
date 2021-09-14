// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography, Button, Card, CardContent } from '@material-ui/core';
//
import { MotivationIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  [theme.breakpoints.up('xl')]: { height: 320 }
}));

// ----------------------------------------------------------------------

export default function EcommerceWelcome() {
  return (
    <RootStyle>
      <CardContent
        sx={{
          color: 'grey.800',
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4">
          Congratulations,
          <br /> Fabiana Capmany!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          Best seller of the month You have done 57.6% more sales today.
        </Typography>

        <Button variant="contained">Go Now</Button>
      </CardContent>

      <MotivationIllustration
        sx={{
          p: 2,
          height: 280,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
