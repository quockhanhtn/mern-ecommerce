import PropTypes from 'prop-types';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

MLabelTypo.propTypes = {
  text: PropTypes.string.isRequired
};

export default function MLabelTypo({ text }) {
  return <LabelStyle>{text}</LabelStyle>;
}
