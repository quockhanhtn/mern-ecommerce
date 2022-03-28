import { sentenceCase } from 'change-case';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer
} from '@material-ui/core';
// utils
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
//
import Label from '../Label';
import Scrollbar from '../Scrollbar';
import useLocales from '../../hooks/useLocales';
import { getFullAllProducts } from '../../redux/slices/productSlice';
import * as api from '../../api';

// ----------------------------------------------------------------------

export default function StatisticBestSeller() {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const { listFull: productsList } = useSelector((state) => state.product);
  const theme = useTheme();
  const [listProductBestSeller, setListProductBestSeller] = useState([]);

  useEffect(() => {
    dispatch(getFullAllProducts());
  }, [dispatch]);

  useEffect(async () => {
    const bestSellers = [];
    await api.getFullAllProduct().then((data) => {
      const productsList = data.data.data;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < productsList.length; i++) {
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < productsList[i].variants.length; j++) {
          const productItem = {
            product: productsList[i].name,
            variant: productsList[i].variants[j].variantName,
            thumbnail: productsList[i].variants[j].thumbnail,
            total: productsList[i].variants[j].sold
          };
          bestSellers.push(productItem);
        }
      }
    });
    bestSellers.sort((a, b) => b.total - a.total);
    const bestSeller5 = bestSellers.slice(0, 5);
    const bestSellersRank = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < bestSeller5.length; i++) {
      const productItem = {
        product: bestSeller5[i].product,
        variant: bestSeller5[i].variant,
        thumbnail: bestSeller5[i]?.thumbnail,
        total: bestSeller5[i].total,
        rank: `top_${i + 1}`
      };
      bestSellersRank.push(productItem);
    }
    setListProductBestSeller(bestSellersRank);
  }, []);

  return (
    <Card sx={{ pb: 3 }}>
      <CardHeader title={t('dashboard.statistics.best-seller')} sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('dashboard.statistics.product-name')}</TableCell>
                <TableCell>{t('dashboard.statistics.total')}</TableCell>
                <TableCell align="right">{t('dashboard.statistics.top')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProductBestSeller.map((row) => (
                <TableRow key={row.variant}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={row.variant} src={row?.thumbnail} />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2"> {row.product}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {row.variant}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell align="right">
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      color={
                        (row.rank === 'top_1' && 'primary') ||
                        (row.rank === 'top_2' && 'info') ||
                        (row.rank === 'top_3' && 'success') ||
                        (row.rank === 'top_4' && 'warning') ||
                        'error'
                      }
                    >
                      {sentenceCase(row.rank)}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
