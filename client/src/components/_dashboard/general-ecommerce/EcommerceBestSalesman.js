import faker from 'faker';
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
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------

const BEST_SALES = [
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: '/static/mock-images/avatars/avatar_8.jpg',
    category: 'CAP',
    flag: '/static/icons/ic_flag_de.svg',
    total: faker.finance.amount(),
    rank: 'top_1'
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: '/static/mock-images/avatars/avatar_2.jpg',
    category: 'Branded Shoes',
    flag: '/static/icons/ic_flag_en.svg',
    total: faker.finance.amount(),
    rank: 'top_2'
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: '/static/mock-images/avatars/avatar_3.jpg',
    category: 'Headphone',
    flag: '/static/icons/ic_flag_fr.svg',
    total: faker.finance.amount(),
    rank: 'top_3'
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: '/static/mock-images/avatars/avatar_4.jpg',
    category: 'Cell Phone',
    flag: '/static/icons/ic_flags_kr.svg',
    total: faker.finance.amount(),
    rank: 'top_4'
  },
  {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: '/static/mock-images/avatars/avatar_5.jpg',
    category: 'Earings',
    flag: '/static/icons/ic_flags_us.svg',
    total: faker.finance.amount(),
    rank: 'top_5'
  }
];

// ----------------------------------------------------------------------

export default function EcommerceBestSalesman() {
  const theme = useTheme();

  return (
    <Card sx={{ pb: 3 }}>
      <CardHeader title="Best Salesman" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Seller</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Total</TableCell>
                <TableCell align="right">Rank</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {BEST_SALES.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={row.name} src={row.avatar} />
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="subtitle2"> {row.name}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {row.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    <img src={row.flag} alt="country flag" />
                  </TableCell>
                  <TableCell>{fCurrency(row.total)}</TableCell>
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
