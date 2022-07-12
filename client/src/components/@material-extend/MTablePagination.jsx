import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';
import useLocales from '../../hooks/useLocales';

MTablePagination.propTypes = {
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func,
  onRowsPerPageChange: PropTypes.func.isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number)
};

MTablePagination.defaultProps = {
  rowsPerPageOptions: [10, 25, 50, 100]
};

export default function MTablePagination({
  count,
  rowsPerPage,
  page,
  onChangePage,
  onRowsPerPageChange,
  rowsPerPageOptions,
  ...other
}) {
  const { t } = useLocales();

  const customLabelDisplayedRows = ({ from, to, count }) =>
    `${from}–${to} ${t('common.of')} ${count !== -1 ? count : `${t('common.more-than')} ${to}`}`;

  return (
    <TablePagination
      labelRowsPerPage={t('common.rows-per-page')}
      labelDisplayedRows={customLabelDisplayedRows}
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onChangePage}
      onRowsPerPageChange={onRowsPerPageChange}
      {...other}
    />
  );
}
