import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Table,
  Stack,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer
} from '@material-ui/core';
import useLocales from '../../hooks/useLocales';
// utils
import { fCurrency } from '../../utils/formatNumber';
//
import { MIconButton } from '../@material-extend';

// ----------------------------------------------------------------------

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  availableText: PropTypes.string,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func
};

function Incrementer({ available, availableText, quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ width: 96, textAlign: 'center', margin: '0 auto' }}>
      <IncrementerStyle>
        <MIconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Icon icon={minusFill} width={16} height={16} />
        </MIconButton>
        {quantity}
        <MIconButton size="small" color="inherit" onClick={onIncrease} disabled={quantity >= available}>
          <Icon icon={plusFill} width={16} height={16} />
        </MIconButton>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {availableText}
      </Typography>
    </Box>
  );
}

ProductList.propTypes = {
  formik: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func
};

export default function ProductList({ formik, onDelete, onIncreaseQuantity, onDecreaseQuantity }) {
  const { t, currentLang } = useLocales();
  const { products } = formik.values;

  const handleIncreaseQuantity = (_id, skuVariant) => {
    onIncreaseQuantity(_id, skuVariant);
  };

  const handleDecreaseQuantity = (_id, skuVariant) => {
    onDecreaseQuantity(_id, skuVariant);
  };

  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('dashboard.products.title')}</TableCell>
            <TableCell align="left">{t('cart.unit-price')}</TableCell>
            <TableCell align="center">{t('dashboard.products.quantity')}</TableCell>
            <TableCell align="right">{t('cart.amount-price')}</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => {
            const { _id, skuVariant, name, variantName, thumbnail, price, quantity, quantityAvailable } = product;
            return (
              <TableRow key={_id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThumbImgStyle alt="product image" src={thumbnail} />
                    <Box>
                      <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240, mb: 0.5 }}>
                        {name}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        divider={<Divider orientation="vertical" sx={{ height: 14, alignSelf: 'center' }} />}
                      >
                        <Typography variant="body2">
                          {/* <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                            Variant Name:&nbsp;
                          </Typography> */}
                          {variantName}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="left">{fCurrency(price, currentLang.value)}</TableCell>

                <TableCell align="center">
                  <Incrementer
                    quantity={quantity}
                    available={quantityAvailable}
                    availableText={t('cart.available', { available: quantityAvailable })}
                    onDecrease={() => handleDecreaseQuantity(_id, skuVariant)}
                    onIncrease={() => handleIncreaseQuantity(_id, skuVariant)}
                  />
                </TableCell>

                <TableCell align="right">{fCurrency(price * quantity, currentLang.value)}</TableCell>

                <TableCell align="right">
                  <MIconButton onClick={() => onDelete(_id, skuVariant)}>
                    <Icon icon={trash2Fill} width={20} height={20} />
                  </MIconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
