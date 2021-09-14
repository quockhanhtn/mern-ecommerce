import { useState } from 'react';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Paper, Radio, Container, Typography, RadioGroup, FormControlLabel, Stack } from '@material-ui/core';
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

const ContainerStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadiusSm,
  border: `solid 1px ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800]
}));

// ----------------------------------------------------------------------

const LABELS = ['1col', '2col', '3col', '4col', '6col', '12col'];

export default function FoundationGrid() {
  const theme = useTheme();
  const [spacing, setSpacing] = useState(2);
  const [column, setColumn] = useState(3);

  const handleChangeSpacing = (event) => {
    setSpacing(Number(event.target.value));
  };

  const handleChangeColumn = (event) => {
    setColumn(Number(event.target.value));
  };

  return (
    <RootStyle title="Foundations: Grid | Minimal-UI">
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
            heading="Grid"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Grid' }]}
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Block title="Spacing">
            <ContainerStyle variant="outlined">
              <Typography variant="body2" sx={{ mb: 3, textAlign: 'center' }}>
                Spacing: <strong>{theme.spacing(spacing)}</strong>
              </Typography>

              <Grid container spacing={spacing}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
                  <Grid key={value} item xs={1}>
                    <Paper
                      sx={{
                        height: 80,
                        boxShadow: (theme) => theme.customShadows.z8
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              <RadioGroup
                row
                name="spacing"
                value={spacing.toString()}
                onChange={handleChangeSpacing}
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <FormControlLabel key={value} value={value.toString()} label={value.toString()} control={<Radio />} />
                ))}
              </RadioGroup>
            </ContainerStyle>
          </Block>

          <Block title="Column">
            <ContainerStyle variant="outlined">
              <Grid container spacing={3}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
                  <Grid key={value} item xs={column}>
                    <Paper
                      sx={{
                        py: 3,
                        textAlign: 'center',
                        boxShadow: (theme) => theme.customShadows.z8
                      }}
                    >
                      xs = {column}
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <RadioGroup
                row
                name="column"
                value={column.toString()}
                onChange={handleChangeColumn}
                sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
              >
                {[12, 6, 4, 3, 2, 1].map((value, index) => (
                  <FormControlLabel key={value} value={value.toString()} label={LABELS[index]} control={<Radio />} />
                ))}
              </RadioGroup>
            </ContainerStyle>
          </Block>
        </Stack>
      </Container>
    </RootStyle>
  );
}
