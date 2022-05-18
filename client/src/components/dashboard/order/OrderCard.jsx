import {
  Box,
  Card,
  Divider,
  Grid,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// hooks
import { useLocales } from '../../../hooks';
// components
import { ImageBrokenIcon } from '../../../assets';
import { ThumbImgStyle } from '../../@styled';
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import { getOrderStatusColor, getPaymentStatusColor } from '../../../utils/labelColor';

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

// const ThumbImgStyle = styled('img')(({ theme }) => ({
//   width: 64,
//   height: 64,
//   objectFit: 'contain',
//   marginRight: theme.spacing(2),
//   borderRadius: theme.shape.borderRadiusSm
// }));

const ROW_RESULT_CELL_WIDTH = 180;
const LEFT_WIDTH = 100;

// eslint-disable-next-line react/prop-types
const InfoItem = ({ label, value, valueVariant }) => (
  <Box display="flex" alignItems="center">
    <Typography align="left" variant="body2" component="span" sx={{ color: 'text.secondary', width: LEFT_WIDTH }}>
      {label}
    </Typography>
    <Typography variant={valueVariant} sx={{ flex: 1, marginLeft: 3 }}>
      {value}
    </Typography>
  </Box>
);

export default function OrderCard({ order, isShowTitle, handleRePay }) {
  const { t } = useLocales();
  return (
    <Card sx={{ pt: 5, px: 5, mb: 5 }}>
      <Grid container>
        {isShowTitle && (
          <>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                {t('order.title')}
              </Typography>
              <Typography variant="h6" sx={{ display: 'inline-block', ml: 2 }}>
                {`#${order?.numericId || order?._id}`}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                <Label color={getOrderStatusColor(order?.status)} sx={{ textTransform: 'uppercase', mb: 1 }}>
                  {t(`order.status-${order?.status}`)}
                </Label>
              </Box>
            </Grid>
          </>
        )}

        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
          <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
            Khách hàng
          </Typography>
          <InfoItem
            label={t('address.full-name')}
            value={order?.address?.name || order?.customer?.name}
            valueVariant="subtitle1"
          />
          <InfoItem
            label={t('address.phone')}
            value={order?.address?.phone || order?.customer?.phone}
            valueVariant="body2"
          />
          {order?.isReceiveAtStore ? (
            // <InfoItem label={t('cart.receive-at-store')} value="" valueVariant="body2" />
            <Typography align="left" variant="body2" component="span" sx={{ color: 'text.secondary' }}>
              {t('cart.receive-at-store')}
            </Typography>
          ) : (
            <InfoItem
              label={t('address.title')}
              value={`${order?.address?.street}, ${order?.address?.ward}, ${order?.address?.district}, ${order?.address.province}`}
              valueVariant="body2"
            />
          )}
        </Grid>

        <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
          <Typography paragraph variant="overline" sx={{ color: 'text.disabled', mr: 2 }}>
            Tình trạng đơn hàng
          </Typography>
          <Stack spacing={1}>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary', mr: 2, width: 200 }}>
                {t('order.payment-method')}
              </Typography>
              <Typography variant="body2" component="span">
                {t(`order.payment-method-${order?.paymentMethod}`)}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary', mr: 2, width: 200 }}>
                {t('order.order-status')}
              </Typography>
              <Label color={getOrderStatusColor(order?.status)} sx={{ textTransform: 'uppercase' }}>
                {t(`order.status-${order?.status}`)}
              </Label>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary', mr: 2, width: 200 }}>
                {t('order.payment-status')}
              </Typography>
              <Label color={getPaymentStatusColor(order?.paymentStatus)} sx={{ textTransform: 'uppercase' }}>
                {t(`order.payment-status-${order?.paymentStatus}`)}
              </Label>
              {handleRePay !== null &&
                order?.paymentStatus === 'pending' &&
                ['cash', 'cod', '', undefined, null].indexOf(order?.paymentMethod) < 0 && (
                  <Link href="#" onClick={handleRePay} sx={{ ml: 2 }}>
                    Thanh toán ngay
                  </Link>
                )}
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Scrollbar>
        <TableContainer sx={{ minWidth: 960 }}>
          <Table>
            <TableHead
              sx={{
                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                '& th': { backgroundColor: 'transparent' }
              }}
            >
              <TableRow>
                <TableCell width={30}>#</TableCell>
                <TableCell align="left">{t('products.title')}</TableCell>
                <TableCell align="center">{t('products.quantity')}</TableCell>
                <TableCell align="right">{t('cart.unit-price')}</TableCell>
                <TableCell align="right">{t('cart.amount-price')}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {order?.items.map((item, index) => (
                <TableRow key={index} sx={{ borderBottom: (theme) => `solid 1px ${theme.palette.divider}` }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                    {item?.thumbnail ? (
                      <ThumbImgStyle alt="product image" src={item?.thumbnail} objectFit="contain" />
                    ) : (
                      <ImageBrokenIcon width={64} height={64} marginRight={2} />
                    )}
                    <Box sx={{ maxWidth: 560 }}>
                      <Link underline="hover" variant="subtitle2" target="_blank" href={`/product/${item.productId}`}>
                        {item.productName}
                      </Link>
                      {item.variantName && (
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {item.variantName}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="right">{fCurrency(item.pricePerUnit)}</TableCell>
                  <TableCell align="right">{fCurrency(item.pricePerUnit * item.quantity)}</TableCell>
                </TableRow>
              ))}

              <RowResultStyle>
                <TableCell colSpan={3} />
                <TableCell align="right">
                  <Box sx={{ mt: 2 }} />
                  <Typography variant="body1">{t('cart.order.sub-total')}</Typography>
                </TableCell>
                <TableCell align="right" width={ROW_RESULT_CELL_WIDTH}>
                  <Box sx={{ mt: 2 }} />
                  <Typography variant="body1">{fCurrency(order?.subTotal)}</Typography>
                </TableCell>
              </RowResultStyle>
              <RowResultStyle>
                <TableCell colSpan={3} />
                <TableCell align="right">
                  <Typography variant="body1">{t('cart.order.discount')}</Typography>
                </TableCell>
                <TableCell align="right" width={ROW_RESULT_CELL_WIDTH}>
                  <Typography sx={{ color: 'error.main' }}>{fCurrency(-order?.discount)}</Typography>
                </TableCell>
              </RowResultStyle>

              {!order?.isReceiveAtStore && (
                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography variant="body1">{t('cart.order.shipping-fee')}</Typography>
                  </TableCell>
                  <TableCell align="right" width={ROW_RESULT_CELL_WIDTH}>
                    <Typography variant="body1">{fCurrency(order?.shippingFee)}</Typography>
                  </TableCell>
                </RowResultStyle>
              )}
              <RowResultStyle>
                <TableCell colSpan={3} />
                <TableCell align="right">
                  <Typography variant="h6">{t('cart.order.total')}</Typography>
                </TableCell>
                <TableCell align="right" width={ROW_RESULT_CELL_WIDTH}>
                  <Typography variant="h6">{fCurrency(order?.total)}</Typography>
                </TableCell>
              </RowResultStyle>
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider sx={{ mt: 5 }} />

      <Grid container>
        <Grid item xs={12} md={9} sx={{ py: 3 }}>
          <Typography variant="subtitle2">{t('address.note').toUpperCase()}</Typography>
          <Typography variant="body2">{order?.address?.note || t('address.note-empty')}</Typography>
        </Grid>
        {/* <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
              <Typography variant="subtitle2">Have a Question?</Typography>
              <Typography variant="body2">support@minimals.cc</Typography>
            </Grid> */}
      </Grid>
    </Card>
  );
}
