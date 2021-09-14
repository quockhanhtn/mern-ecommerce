import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import FavoriteIcon from '@material-ui/icons/Favorite';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import { withStyles, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Stack, Rating, Container } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+'
};

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied'
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied'
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral'
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied'
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied'
  }
};

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' }
};

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

const StyledRating = withStyles({
  iconFilled: { color: '#FF4842' },
  iconHover: { color: '#B72136' }
})(Rating);

// ----------------------------------------------------------------------

IconContainer.propTypes = {
  value: PropTypes.number
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function RatingComponent() {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  return (
    <RootStyle title="Components: Rating | Minimal-UI">
      <Box
        sx={{
          pt: 6,
          pb: 1,
          mb: 10,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800')
        }}
      >
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Rating"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Rating' }]}
            moreLink="https://next.material-ui.com/components/rating"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
            <Block title="Controlled" sx={style}>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Block>
            <Block title="Read only" sx={style}>
              <Rating name="read-only" value={value} readOnly />
            </Block>
            <Block title="Disabled" sx={style}>
              <Rating name="disabled" value={value} disabled />
            </Block>
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
            <Block title="Pristine" sx={style}>
              <Rating name="pristine" value={null} />
            </Block>
            <Block title="Custom empty icon" sx={style}>
              <Rating name="customized-empty" defaultValue={2} precision={0.5} />
            </Block>
            <Block title="Custom icon and color" sx={style}>
              <StyledRating
                name="customized-color"
                defaultValue={2}
                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                precision={0.5}
                icon={<FavoriteIcon />}
                emptyIcon={<FavoriteIcon />}
              />
            </Block>
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
            <Block title="10 stars" sx={style}>
              <Rating name="customized-10" defaultValue={2} max={10} />
            </Block>
            <Block title="Custom icon set" sx={style}>
              <Rating
                name="customized-icons"
                defaultValue={2}
                getLabelText={(value) => customIcons[value].label}
                IconContainerComponent={IconContainer}
              />
            </Block>
            <Block title="Hover feedback" sx={style}>
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
            </Block>
          </Stack>

          <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
            <Block title="Half ratings" sx={style}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <br />
              <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
            </Block>

            <Block title="Sizes" sx={style}>
              <Rating name="size-small" defaultValue={2} size="small" />
              <br />
              <Rating name="size-medium" defaultValue={2} />
              <br />
              <Rating name="size-large" defaultValue={2} size="large" />
            </Block>
          </Stack>
        </Stack>
      </Container>
    </RootStyle>
  );
}
