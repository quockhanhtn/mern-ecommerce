import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
// material
import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Link, Paper, Rating, Container, Typography, useMediaQuery } from '@material-ui/core';
//
import { varFadeInUp, varFadeInLeft, MotionInView } from '../../animate';
import { MHidden } from '../../@material-extend';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    name: 'jjgonzales3',
    rating: 5,
    dateCreate: 'April 19, 2021',
    content: `Excellent Work! Thanks a lot!`
  },
  {
    name: 'James Davidson',
    rating: 5,
    dateCreate: 'April 19, 2021',
    content: `It's a very good dashboard and we are really liking the product . We've done some things, like migrate to TS and implementing a react useContext api, to fit our job methodology but the product is one of the best in terms of design and application architecture. The team did a really good job.`
  },
  {
    name: 'John Thurston',
    rating: 5,
    dateCreate: 'April 19, 2021',
    content: `customer support is realy fast and helpful the desgin of this theme is looks amazing also the code is very clean and readble realy good job !`
  },
  {
    name: 'nedy yehuda',
    rating: 5,
    dateCreate: 'April 19, 2021',
    content: `Trinh's work on this React UI kit is amazing. The animations, visuals, coding, and documentation is just excellent. Furthermore, the support when I have emailed for help has been A+. Thank you Trinh for creating this!`
  },
  {
    name: 'Joris Ruitenbeek',
    rating: 5,
    dateCreate: 'April 19, 2021',
    content: `Got a few questions after purchasing the product. The owner responded very fast and very helpfull. Overall the code is excellent and works very good. 5/5 stars!`
  },
  {
    name: 'Miguel Asipavicins',
    rating: 5,
    dateCreate: 'April 19, 2021',
    content: `CEO of Codealy.io here. We’ve built a developer assessment platform that makes sense - tasks are based on git repositories and run in virtual machines. We automate the pain points - storing candidates code, running it and sharing test results with the whole team, remotely. Bought this template as we need to provide an awesome dashboard for our early customers. I am super happy with purchase. The code is just as good as the design. Thanks!`
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 0),
  backgroundSize: 'cover',
  backgroundImage: `linear-gradient(to right, ${alpha(theme.palette.grey[900], 0.8)} , ${alpha(
    theme.palette.grey[900],
    0.8
  )}), url(/static/about/testimonials.jpg)`,
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    padding: 0,
    height: 840,
    overflow: 'hidden'
  }
}));

// ----------------------------------------------------------------------

TestimonialCard.propTypes = {
  testimonial: PropTypes.object
};

function TestimonialLink() {
  return (
    <Link href="#" variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
      Read more testimonials
      <Box component={Icon} icon={roundArrowRightAlt} sx={{ ml: 1, width: 20, height: 20 }} />
    </Link>
  );
}

function TestimonialCard({ testimonial }) {
  const { name, rating, dateCreate, content } = testimonial;
  return (
    <Paper
      sx={{
        mt: 3,
        p: 3,
        color: 'common.white',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)', // Fix on Mobile
        bgcolor: (theme) => alpha(theme.palette.common.white, 0.04)
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {name}
      </Typography>
      <Typography gutterBottom component="p" variant="caption" sx={{ color: 'grey.500' }}>
        {dateCreate}
      </Typography>
      <Rating value={rating} readOnly size="small" />
      <Typography variant="body2" sx={{ mt: 1.5 }}>
        {content}
      </Typography>
    </Paper>
  );
}

export default function AboutTestimonials() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative', height: '100%' }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ height: '100%' }}
        >
          <Grid item xs={10} md={4}>
            <Box sx={{ maxWidth: { md: 360 } }}>
              <MotionInView variants={varFadeInUp}>
                <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
                  Testimonials
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography variant="h2" sx={{ mb: 3, color: 'common.white' }}>
                  Who love <br />
                  my work
                </Typography>
              </MotionInView>

              <MotionInView variants={varFadeInUp}>
                <Typography sx={{ color: 'common.white' }}>
                  Our goal is to create a product and service that you’re satisfied with and use it every day. This is
                  why we’re constantly working on our services to make it better every day and really listen to what our
                  users has to say.
                </Typography>
              </MotionInView>

              <MHidden width="mdUp">
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <MotionInView variants={varFadeInUp}>
                    <TestimonialLink />
                  </MotionInView>
                </Box>
              </MHidden>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            lg={6}
            sx={{
              right: { md: 24 },
              position: { md: 'absolute' }
            }}
          >
            <Grid container spacing={isDesktop ? 3 : 0} alignItems="center">
              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(0, 3).map((testimonial) => (
                  <MotionInView key={testimonial.name} variants={varFadeInUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </MotionInView>
                ))}
              </Grid>

              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(3, 6).map((testimonial) => (
                  <MotionInView key={testimonial.name} variants={varFadeInUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </MotionInView>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <MHidden width="mdDown">
          <Box sx={{ bottom: 60, position: 'absolute' }}>
            <MotionInView variants={varFadeInLeft}>
              <TestimonialLink />
            </MotionInView>
          </Box>
        </MHidden>
      </Container>
    </RootStyle>
  );
}
