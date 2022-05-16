import { experimentalStyled as styled } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

const ThumbImgStyle = (props) => {
  const { width = 64, height = 64, objectFit = 'cover', ...other } = props;
  const ImgStyle = styled('img')(({ theme }) => ({
    width,
    height,
    objectFit,
    margin: theme.spacing(0, 2, 0, 0),
    borderRadius: theme.shape.borderRadiusSm,
    border: `solid 2px ${theme.palette.divider}`,
    backgroundColor: 'white'
  }));

  return (
    <ImgStyle
      {...other}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = '/static/img-error.png';
      }}
    />
  );
};

ThumbImgStyle.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  objectFit: PropTypes.string
};

export default ThumbImgStyle;
