import { useEffect, useState } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { Box, Container, Card, CardContent, CardHeader, Stack, Typography } from '@material-ui/core';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../actions/products';
// hooks
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(10),
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800]
}));

// ----------------------------------------------------------------------

export default function ViewOrderPage() {
  const { t } = useLocales();

  return (
    <Page title={t('order.page-title')} id="move_top">
      <ContentStyle>
        <Container maxWidth="lg">
          <></>
        </Container>
      </ContentStyle>
    </Page>
  );
}
