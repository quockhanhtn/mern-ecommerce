import faker from 'faker';
import { useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box, Card, Button, Container, Typography, IconButton } from '@material-ui/core';
//
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../../animate';
import { CarouselControlsArrowsBasic2 } from '../../carousel';

// ----------------------------------------------------------------------

const MEMBERS = [
  {
    name: faker.name.findName(),
    role: 'UI Designer',
    avatar: '/static/about/avatar-1.jpg'
  },
  {
    name: faker.name.findName(),
    role: 'UI/UX Designer',
    avatar: '/static/about/avatar-2.jpg'
  },
  {
    name: faker.name.findName(),
    role: 'Full Stack Developer',
    avatar: '/static/about/avatar-3.jpg'
  },
  {
    name: faker.name.findName(),
    role: 'Leader',
    avatar: '/static/about/avatar-4.jpg'
  },
  {
    name: faker.name.findName(),
    role: 'Leader',
    avatar: '/static/about/avatar-5.jpg'
  },
  {
    name: faker.name.findName(),
    role: 'Leader',
    avatar: '/static/about/avatar-6.jpg'
  }
];

// ----------------------------------------------------------------------

MemberCard.propTypes = {
  member: PropTypes.object
};

function MemberCard({ member }) {
  const { name, role, avatar } = member;
  return (
    <Card key={name} sx={{ p: 1, mx: 1.5 }}>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {role}
      </Typography>
      <Box component="img" src={avatar} sx={{ width: '100%', borderRadius: 1.5 }} />
      <Box sx={{ mt: 2, mb: 1 }}>
        {[facebookFill, instagramFilled, linkedinFill, twitterFill].map((social, index) => (
          <IconButton key={index}>
            <Icon icon={social} width={20} height={20} />
          </IconButton>
        ))}
      </Box>
    </Card>
  );
}

export default function AboutTeam() {
  const carouselRef = useRef();
  const theme = useTheme();

  const settings = {
    speed: 500,
    slidesToShow: 4,
    centerMode: true,
    centerPadding: '0 80px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Container maxWidth="lg" sx={{ pb: 10, textAlign: 'center' }}>
      <MotionInView variants={varFadeInDown}>
        <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
          Dream team
        </Typography>
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <Typography variant="h2" sx={{ mb: 3 }}>
          Great team is the key
        </Typography>
      </MotionInView>

      <MotionInView variants={varFadeInUp}>
        <Typography
          sx={{
            mb: 10,
            mx: 'auto',
            maxWidth: 630,
            color: (theme) => (theme.palette.mode === 'light' ? 'text.secondary' : 'common.white')
          }}
        >
          Minimal will provide you support if you have any problems, our support team will reply within a day and we
          also have detailed documentation.
        </Typography>
      </MotionInView>

      <Box sx={{ position: 'relative' }}>
        <Slider ref={carouselRef} {...settings}>
          {MEMBERS.map((member) => (
            <MotionInView key={member.name} variants={varFadeIn}>
              <MemberCard key={member.name} member={member} />
            </MotionInView>
          ))}
        </Slider>
        <CarouselControlsArrowsBasic2
          onNext={handleNext}
          onPrevious={handlePrevious}
          sx={{ transform: 'translateY(-64px)' }}
        />
      </Box>
      <Button
        variant="outlined"
        color="inherit"
        size="large"
        endIcon={<Icon icon={roundArrowRightAlt} width={24} height={24} />}
        sx={{ mx: 'auto' }}
      >
        View all team members
      </Button>
    </Container>
  );
}
