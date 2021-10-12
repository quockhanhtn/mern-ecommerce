// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container, Typography, useTheme } from '@material-ui/core';
//
import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const IMG = [...Array(10)].map((_, index) => `/static/home/clean-${index + 1}.png`);

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    zIndex: 11,
    textAlign: 'left',
    position: 'absolute'
  }
}));

// ----------------------------------------------------------------------

export default function LandingCleanInterfaces() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <ContentStyle>
          <MotionInView variants={varFadeInUp}>
            <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>
              clean & clear
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography
              variant="h2"
              paragraph
              sx={{
                ...(!isLight && {
                  textShadow: (theme) => `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`
                })
              }}
            >
              Beautiful, modern and clean user interfaces
            </Typography>
          </MotionInView>
        </ContentStyle>

        <Box sx={{ position: 'relative' }}>
          {IMG.map((_, index) => (
            <MotionInView
              key={index}
              threshold={index / 15}
              variants={varFadeInUp}
              sx={{
                top: 0,
                left: 0,
                position: 'absolute',
                ...(index === 0 && { zIndex: 8 }),
                ...(index === 9 && { position: 'relative', zIndex: 9 })
              }}
            >
              <Box component="img" src={`/static/home/clean-${index + 1}.png`} />
            </MotionInView>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
