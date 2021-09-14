import { useState } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Pagination, TablePagination } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { my: 1 }
};

// ----------------------------------------------------------------------

export default function PaginationComponent() {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <RootStyle title="Components: Pagination | Minimal-UI">
      <Box
        sx={{
          pt: 6,
          pb: 1,
          mb: 10,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800')
        }}
      >
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Pagination"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Pagination' }]}
            moreLink="https://next.material-ui.com/components/pagination"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Block title="Basic" sx={style}>
              <Pagination count={10} />
              <Pagination count={10} color="primary" />
              <Pagination count={10} disabled />
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Outlined" sx={style}>
              <Pagination count={10} variant="outlined" />
              <Pagination count={10} variant="outlined" color="primary" />
              <Pagination count={10} variant="outlined" disabled />
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Rounded" sx={style}>
              <Pagination count={10} shape="rounded" />
              <Pagination count={10} variant="outlined" shape="rounded" />
              <Pagination count={10} shape="rounded" color="primary" />
              <Pagination count={10} variant="outlined" shape="rounded" color="primary" />
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Size" sx={style}>
              <Pagination count={10} size="small" />
              <Pagination count={10} />
              <Pagination count={10} size="large" />
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Buttons" sx={style}>
              <Pagination count={10} showFirstButton showLastButton />
              <Pagination count={10} hidePrevButton hideNextButton />
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Ranges" sx={style}>
              <Pagination count={11} defaultPage={6} siblingCount={0} />
              <Pagination count={11} defaultPage={6} />
              <Pagination count={11} defaultPage={6} siblingCount={0} boundaryCount={2} />
              <Pagination count={11} defaultPage={6} boundaryCount={2} />
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Table" sx={style}>
              <TablePagination
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Block>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
