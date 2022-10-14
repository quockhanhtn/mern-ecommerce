import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Grid, Link, Divider, Container, Typography, IconButton, Stack } from '@mui/material';
//
import Logo from '~/components/Logo';

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: 'FaceBook', icon: facebookFill, url: 'https://www.facebook.com/hkmobileshop' },
  { name: 'Google', icon: googleFill, url: 'https://www.google.com/' },
  { name: 'Linkedin', icon: linkedinFill, url: 'https://www.linkedin.com/' },
  { name: 'Twitter', icon: twitterFill, url: 'https://www.twitter.com/' }
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  const LINKS = [
    {
      headline: 'VỀ CHÚNG TÔI',
      children: [
        { name: 'Khách hàng đánh gia', href: '#' },
        { name: 'Liên hệ', href: '#' },
        { name: 'Hỏi đáp', href: '#' }
      ]
    },
    {
      headline: 'Chính sách',
      children: [
        { name: 'Chính sách vận chuyển', href: '#' },
        { name: 'Chính sách bảo hàng', href: '#' }
      ]
    },
    {
      headline: 'Tổng đài hỗ trợ (Miễn phí gọi)',
      children: [
        { name: 'Gọi mua: 1800.xxxx (7:30 - 22:00)' },
        { name: 'Kỹ thuật: 1800.xyxy (7:30 - 22:00)' },
        { name: 'Khiếu nại: 1800.xzxz (8:00 - 21:30)' },
        { name: 'Bảo hành: 1800.xyzt (8:00 - 21:00)' }
      ]
    }
  ];

  return (
    <RootStyle>
      <Divider />
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <ScrollLink to="move_top" spy smooth>
              <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
            </ScrollLink>
          </Grid>
          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              Success or failure in business depends more on attitude in thinking than in ability to think.
            </Typography>

            <Stack
              spacing={1.5}
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              {SOCIALS.map((social) => (
                <IconButton
                  key={social.name}
                  color="primary"
                  sx={{ p: 1 }}
                  href={social.url}
                  target="_blank"
                  size="large"
                >
                  <Icon icon={social.icon} width={16} height={16} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack spacing={5} direction={{ xs: 'column', md: 'row' }} justifyContent="space-between">
              {LINKS.map((list) => {
                const { headline, children } = list;
                return (
                  <Stack key={headline} spacing={2}>
                    <Typography component="p" variant="overline">
                      {headline}
                    </Typography>
                    {children.map((link) =>
                      link.href ? (
                        <Link
                          to={link.href}
                          key={link.name}
                          color="inherit"
                          variant="body2"
                          component={RouterLink}
                          sx={{ display: 'block' }}
                          underline="hover"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <Typography key={link.name} component="p" variant="body2" sx={{ display: 'block' }}>
                          {link.name}
                        </Typography>
                      )
                    )}
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          &copy; 2021 HK Mobile. All rights reserved
        </Typography>
      </Container>
    </RootStyle>
  );
}
