/* eslint-disable */
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import Page from '../components/Page';
import {
  LandingHero,
  LandingMinimal,
  LandingDarkMode,
  LandingAdvertisement,
  LandingCleanInterfaces,
  LandingHugePackElements
} from '../components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="Home page" id="move_top">
      <LandingHero />
      <ContentStyle>
        {/* <LandingMinimal />
        <LandingHugePackElements />
        <LandingDarkMode />
        <LandingCleanInterfaces />
        <LandingAdvertisement /> */}
      </ContentStyle>
    </RootStyle>
  );
}
