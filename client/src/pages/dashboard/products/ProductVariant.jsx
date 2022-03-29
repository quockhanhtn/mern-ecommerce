import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Stack,
  Typography,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useLocales from '../../../hooks/useLocales';
import * as Helper from '../../../helper/listHelper';
import Scrollbar from '../../../components/Scrollbar';
import ProductVariantForm from './ProductVariantForm';
import { ImageBrokenIcon } from '../../../assets';
import { deleteProductVariant, getProductById } from '../../../redux/slices/productSlice';
import { ProductVariantListHead, ProductVariantMoreMenu } from '../../../components/dashboard/products';
// ----------------------------------------------------------------------
const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2, 0, 0),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

export default function ProductVariant() {
  const { t } = useLocales();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { item: currentProduct } = useSelector((state) => state.product);
  let variants = currentProduct?.variants;
  const [currentVariant, setCurrentVariant] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    dispatch(getProductById(id));
    variants = currentProduct?.variants;
  }, [id, variants?.length]);

  const tableHeads = [
    {
      id: 'sku',
      numeric: false,
      disablePadding: true,
      label: t('products.sku')
    },
    {
      id: 'variantName',
      numeric: false,
      disablePadding: false,
      label: 'Loại sản phẩm'
    },
    {
      id: 'price',
      numeric: false,
      disablePadding: false,
      label: t('products.price')
    },
    {
      id: 'marketPrice',
      numeric: true,
      disablePadding: false,
      label: t('products.market-price')
    },
    {
      id: 'quantity',
      numeric: true,
      disablePadding: false,
      label: t('products.quantity')
    },
    {
      id: 'sold',
      numeric: true,
      disablePadding: false,
      label: 'Đã bán'
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false
    }
  ];

  const handleDeleteVariant = (sku) => {
    if (variants.length === 1) {
      enqueueSnackbar('A product must have at least 1 item', { variant: 'error' });
    } else {
      dispatch(deleteProductVariant(id, sku));
      variants.length -= 1;
      enqueueSnackbar('Delete successfully', { variant: 'success' });
    }
  };

  const handleEditVariant = (sku) => {
    let index;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < variants.length; i++) {
      if (variants[i].sku === sku) {
        index = i;
        break;
      }
    }
    const variant = variants[index];
    setCurrentVariant(variant);
    setOpenForm(true);
  };

  const handleOpenForm = () => {
    setCurrentVariant(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleCreateDone = () => {
    setOpenForm(false);
    variants.length += 1;
  };

  return (
    <Grid container spacing={3} sx={{ marginTop: theme.spacing(3) }}>
      <Grid item xs={12} md={12}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h4" gutterBottom>
                  Phân loại
                </Typography>
                <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleOpenForm}>
                  Thêm loại mới
                </Button>
              </Stack>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table size="medium">
                    <ProductVariantListHead headLabel={tableHeads} />
                    {variants && (
                      <TableBody>
                        {Helper.stableSort(variants, Helper.getComparator()).map((row, index) => {
                          const { _id, sku, variantName, price, marketPrice, quantity, sold, thumbnail } = row;
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <TableRow hover tabIndex={-1} key={_id}>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                style={{ minWidth: 220 }}
                              >
                                <Box sx={{ py: 2, display: 'flex', alignItems: 'center' }}>
                                  {thumbnail ? (
                                    <ThumbImgStyle alt={thumbnail} src={thumbnail} />
                                  ) : (
                                    <ImageBrokenIcon width={64} height={64} marginRight={2} />
                                  )}
                                  <Typography variant="subtitle2" noWrap>
                                    {sku}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="left">
                                <Typography variant="subtitle2" noWrap style={{ minWidth: 160 }}>
                                  {variantName}
                                </Typography>
                              </TableCell>
                              <TableCell align="left" style={{ minWidth: 80 }}>
                                <Typography variant="subtitle4" noWrap align="right">
                                  {price}
                                </Typography>
                              </TableCell>
                              <TableCell align="right" style={{ minWidth: 100 }}>
                                <Typography variant="subtitle4" noWrap>
                                  {marketPrice}
                                </Typography>
                              </TableCell>
                              <TableCell align="right" style={{ minWidth: 100 }}>
                                <Typography variant="subtitle4" noWrap>
                                  {quantity}
                                </Typography>
                              </TableCell>
                              <TableCell align="right" style={{ minWidth: 100 }}>
                                <Typography variant="subtitle4" noWrap>
                                  {sold}
                                </Typography>
                              </TableCell>
                              <TableCell align="right" onClick={(event) => event.stopPropagation()}>
                                <ProductVariantMoreMenu
                                  onEdit={() => handleEditVariant(sku)}
                                  onDelete={() => handleDeleteVariant(sku)}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>
              {openForm && (
                <ProductVariantForm
                  open={openForm}
                  currentVariant={currentVariant}
                  currentProductId={id}
                  handleClose={handleCloseForm}
                  handleCreateDone={handleCreateDone}
                />
              )}
            </Stack>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}
