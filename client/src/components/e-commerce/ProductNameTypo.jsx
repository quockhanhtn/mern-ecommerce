import { Link, Tooltip, Typography, Zoom } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const TypographyStyle = styled(Typography)({
  cursor: 'pointer',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  lineHeight: '1rem',
  height: '2rem',
  lineClamp: 2,
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
});

ProductNameTypo.propTypes = {
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.bool,
  customTooltipTitle: PropTypes.any,
  tooltipPlacement: PropTypes.oneOf(
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top'
  ),
  tooltipTransitionComponent: PropTypes.any
};

function ProductNameTypo(props) {
  const {
    name,
    tooltip = true,
    customTooltipTitle = null,
    tooltipPlacement = 'top-start',
    tooltipTransitionComponent = Zoom,
    ...rest
  } = props;

  const content = (
    <TypographyStyle component={Link} color="inherit" variant="subtitle2" {...rest}>
      {name}
    </TypographyStyle>
  );

  if (!tooltip) {
    return content;
  }

  return (
    <Tooltip
      TransitionComponent={tooltipTransitionComponent}
      title={customTooltipTitle ?? name}
      placement={tooltipPlacement}
    >
      {content}
    </Tooltip>
  );
}

export default ProductNameTypo;
