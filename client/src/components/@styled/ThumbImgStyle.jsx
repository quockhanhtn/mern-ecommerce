import { experimentalStyled as styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function ThumbImgStyle(props) {
  const { width = 64, height = 64, objectFit = 'cover', noBorder = false, isSelected = false, ...other } = props;
  const ImgStyle = styled('img')(({ theme }) => ({
    width,
    height,
    objectFit,
    margin: theme.spacing(0, 2, 0, 0),
    borderRadius: theme.shape.borderRadiusSm,
    border: isSelected ? `solid 3px ${theme.palette.primary.main}` : `solid 2px ${theme.palette.divider}`,
    backgroundColor: 'white'
  }));

  return (
    <ImgStyle
      style={noBorder ? { borderColor: 'transparent' } : {}}
      {...other}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = '/static/no-picture-available.png';
      }}
    />
  );
}

ThumbImgStyle.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  objectFit: PropTypes.string,
  noBorder: PropTypes.bool,
  isSelected: PropTypes.bool
};

export default ThumbImgStyle;
