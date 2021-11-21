// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import { Container } from '@material-ui/core';
import Page from '../../components/Page';
import { CarouselAnimation } from '../../components/carousel';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  // paddingTop: theme.spacing(0),
  // paddingBottom: theme.spacing(0),
  // paddingLeft: theme.spacing(0),
  // paddingRight: theme.spacing(0)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

const items = [
  {
    _id: '1',
    title: 'ddddcc',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas animi ab deserunt tempora repellat maxime saepe tenetur eaque ipsum?',
    image: 'https://source.unsplash.com/random/800x600'
  } // ,
  // {
  //   _id: '2',
  //   title: 'Hello',
  //   description: 'asdddddddddddddweewwe',
  //   image: 'https://source.unsplash.com/random/800x500'
  // }
  // {
  //   _id: '3',
  //   title: 'ddddss',
  //   description:
  //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas animi ab deserunt tempora repellat maxime saepe tenetur eaque ipsum?',
  //   image: 'https://source.unsplash.com/random/800x600'
  // },
  // {
  //   _id: '4',
  //   title: 'ddssdd',
  //   description:
  //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quas animi ab deserunt tempora repellat maxime saepe tenetur eaque ipsum?',
  //   image: 'https://source.unsplash.com/random/800x600'
  // }
];

export default function HomePage() {
  return (
    <RootStyle title="Home page" id="move_top">
      <ContentStyle sx={{ bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800') }}>
        <Container maxWidth="lg">
          <CarouselAnimation items={items} />
        </Container>
      </ContentStyle>
    </RootStyle>
  );
}
