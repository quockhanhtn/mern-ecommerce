import { experimentalStyled as styled } from '@material-ui/core/styles';

const Styled = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

function OptionStyle(props) {
  return <Styled {...props} />;
}

OptionStyle.propTypes = {};

export default OptionStyle;
