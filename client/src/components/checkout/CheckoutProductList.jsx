import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import radioButtonOffFill from '@iconify/icons-eva/radio-button-off-fill';
import radioButtonOnFill from '@iconify/icons-eva/radio-button-on-fill';
import radioButtonOnOutline from '@iconify/icons-eva/radio-button-on-outline';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Checkbox,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { useState } from 'react';
//
import { useLocales } from '../../hooks';
import { fCurrency } from '../../utils/formatNumber';
import { MCheckbox, MIconButton } from '../@material-extend';

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

CheckoutProductList.propTypes = {
  products: PropTypes.object,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func
};

export default function CheckoutProductList({ products, onDelete, onIncreaseQuantity, onDecreaseQuantity }) {
  const { t, currentLang } = useLocales();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleIncreaseQuantity = (productId, sku, qty) => {
    onIncreaseQuantity(productId, sku, qty);
  };

  const handleDecreaseQuantity = (productId, sku, qty) => {
    onDecreaseQuantity(productId, sku, qty);
  };

  const handleSelectAll = () => {
    if (selectedItems.length < products?.length) {
      setSelectedItems(products?.map((x) => ({ productId: x.productId, sku: x.sku })));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectChange = (e, productId, sku) => {
    if (e.target.checked) {
      setSelectedItems((prev) => [...prev, { productId, sku }]);
    } else {
      setSelectedItems((prev) => [...prev.filter((x) => x.productId !== productId && x.sku !== sku)]);
    }
  };

  const isSelected = (productId, sku) =>
    selectedItems.findIndex((x) => x.productId === productId && x.sku === sku) > -1;

  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <MCheckbox
                indeterminate={selectedItems.length > 0 && selectedItems.length < products?.length}
                checked={products?.length > 0 && selectedItems.length === products?.length}
                onChange={handleSelectAll}
                inputProps={{ 'aria-label': 'select all desserts' }}
                color="primary"
                sx={{
                  color: 'rgba(0,0,0,0)',
                  '&:hover': { color: (theme) => theme.palette.primary.main }
                }}
              />
            </TableCell>
            <TableCell>{t('products.title')}</TableCell>
            <TableCell align="left">{t('cart.unit-price')}</TableCell>
            <TableCell align="center">{t('products.quantity')}</TableCell>
            <TableCell align="right">{t('cart.amount-price')}</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products?.map((product) => {
            const { productId, sku, qty, name, variantName, thumbnail, price, marketPrice, quantity, sold } = product;
            const isItemSelected = isSelected(productId, sku);
            const labelId = `enhanced-table-checkbox-${productId}_${sku}`;
            return (
              <TableRow
                hover
                key={`${productId}_${sku}`}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <MCheckbox
                    // inputProps={{ 'aria-labelledby': labelId }}
                    onChange={(e) => handleSelectChange(e, productId, sku)}
                    checked={isItemSelected}
                    sx={{
                      color: 'rgba(0,0,0,0)',
                      '&:hover': {
                        color: (theme) => theme.palette.primary.main
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThumbImgStyle alt="product image" src={thumbnail} />
                    <Box>
                      <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240, mb: 0.5 }}>
                        {name}
                      </Typography>

                      {variantName && <Typography variant="body2">{variantName}</Typography>}
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="left">{fCurrency(price, currentLang.value)}</TableCell>

                <TableCell align="center">
                  <Incrementer
                    quantity={qty}
                    available={quantity - sold}
                    availableText={t('cart.available', { available: quantity - sold })}
                    onDecrease={() => handleDecreaseQuantity(productId, sku, qty)}
                    onIncrease={() => handleIncreaseQuantity(productId, sku, qty)}
                  />
                </TableCell>

                <TableCell align="right">{fCurrency(price * qty, currentLang.value)}</TableCell>

                <TableCell align="right">
                  <MIconButton onClick={() => onDelete(productId, sku)}>
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
