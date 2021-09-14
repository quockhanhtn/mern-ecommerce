import { useState } from 'react';
import { Icon } from '@iconify/react';
import awardFill from '@iconify/icons-eva/award-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Box, Grid, Checkbox, FormGroup, Container, FormControl, FormControlLabel } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { MCheckbox } from '../../../components/@material-extend';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' }
};

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function RadioButtons() {
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  return (
    <RootStyle title="Components: Checkboxes | Minimal-UI">
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
            heading="Checkboxes"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Checkboxes' }]}
            moreLink="https://next.material-ui.com/components/checkboxes"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Block title="Basic" sx={style}>
                  <Checkbox />
                  <Checkbox defaultChecked />
                  <Checkbox defaultChecked indeterminate />
                  <Checkbox disabled />
                  <Checkbox disabled defaultChecked />
                  <Checkbox disabled indeterminate />
                </Block>
              </Grid>

              <Grid item xs={12}>
                <Block title="Size & Custom Icon" sx={style}>
                  <FormControlLabel label="Normal" control={<Checkbox defaultChecked />} />
                  <FormControlLabel label="Small" control={<Checkbox defaultChecked size="small" />} />
                  <FormControlLabel
                    control={<MCheckbox color="info" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />}
                    label="Custom icon"
                  />
                  <FormControlLabel
                    control={
                      <MCheckbox
                        size="small"
                        color="error"
                        icon={<Icon icon={awardFill} />}
                        checkedIcon={<Icon icon={awardFill} />}
                      />
                    }
                    label="Custom icon"
                  />
                </Block>
              </Grid>

              <Grid item xs={12}>
                <Block title="Placement" sx={style}>
                  <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                      <FormControlLabel value="top" label="Top" labelPlacement="top" control={<Checkbox />} />
                      <FormControlLabel value="start" label="Start" labelPlacement="start" control={<Checkbox />} />
                      <FormControlLabel value="bottom" label="Bottom" labelPlacement="bottom" control={<Checkbox />} />
                      <FormControlLabel value="end" label="End" labelPlacement="end" control={<Checkbox />} />
                    </FormGroup>
                  </FormControl>
                </Block>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Block title="Adding Colors">
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked color="default" />} label="Default" />
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Primary" />
                        <FormControlLabel control={<MCheckbox defaultChecked color="secondary" />} label="Secondary" />
                        <FormControlLabel control={<MCheckbox defaultChecked color="info" />} label="Info" />
                        <FormControlLabel control={<MCheckbox defaultChecked color="success" />} label="Success" />
                        <FormControlLabel control={<MCheckbox defaultChecked color="warning" />} label="Warning" />
                        <FormControlLabel control={<MCheckbox defaultChecked color="error" />} label="Error" />
                        <FormControlLabel
                          disabled
                          control={<MCheckbox defaultChecked color="error" />}
                          label="Disabled"
                        />
                      </FormGroup>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl component="fieldset">
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked indeterminate color="default" />}
                            label="Default"
                          />
                          <FormControlLabel control={<Checkbox defaultChecked indeterminate />} label="Primary" />
                          <FormControlLabel
                            control={<MCheckbox defaultChecked indeterminate color="secondary" />}
                            label="Secondary"
                          />
                          <FormControlLabel
                            control={<MCheckbox defaultChecked indeterminate color="info" />}
                            label="Info"
                          />
                          <FormControlLabel
                            control={<MCheckbox defaultChecked indeterminate color="success" />}
                            label="Success"
                          />
                          <FormControlLabel
                            control={<MCheckbox defaultChecked indeterminate color="warning" />}
                            label="Warning"
                          />
                          <FormControlLabel
                            control={<MCheckbox defaultChecked indeterminate color="error" />}
                            label="Error"
                          />
                          <FormControlLabel
                            disabled
                            control={<MCheckbox defaultChecked indeterminate color="error" />}
                            label="Disabled"
                          />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Block>
              </Grid>

              <Grid item xs={12}>
                <Block title="Indeterminate" sx={style}>
                  <div>
                    <FormControlLabel
                      label="Parent"
                      control={
                        <Checkbox
                          checked={checked[0] && checked[1]}
                          indeterminate={checked[0] !== checked[1]}
                          onChange={handleChange1}
                        />
                      }
                    />
                    <div>
                      <FormControlLabel
                        label="Child 1"
                        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                      />
                      <FormControlLabel
                        label="Child 2"
                        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
                      />
                    </div>
                  </div>
                </Block>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
