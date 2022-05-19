import { experimentalStyled as styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function OptionStyle(props) {
  const { border = null, padding = null, ...rest } = props;

  const Styled = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: padding ?? theme.spacing(0, 2.5),
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('all'),
    border: border ?? `solid 1px ${theme.palette.grey[500_32]}`
  }));
  return <Styled {...rest} />;
}

OptionStyle.propTypes = {
  border: PropTypes.any,
  padding: PropTypes.any
};

export default OptionStyle;
