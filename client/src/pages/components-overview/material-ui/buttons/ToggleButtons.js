import { useState } from 'react';
// material
import CheckIcon from '@material-ui/icons/Check';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import { Grid, ToggleButton, ToggleButtonGroup } from '@material-ui/core';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' }
};

export default function ToggleButtons() {
  const [alignment, setAlignment] = useState('left');
  const [formats, setFormats] = useState(() => ['bold', 'italic']);
  const [view, setView] = useState('list');
  const [selected, setSelected] = useState(false);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Block title="Exclusive selection" sx={style}>
          <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
            <ToggleButton value="left">
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center">
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="right">
              <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton value="justify" disabled>
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Multiple selection" sx={style}>
          <ToggleButtonGroup value={formats} onChange={handleFormat}>
            <ToggleButton value="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined">
              <FormatUnderlinedIcon />
            </ToggleButton>
            <ToggleButton value="color" disabled>
              <FormatColorFillIcon />
              <ArrowDropDownIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Exclusive selection" sx={style}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <ToggleButtonGroup size="small" value={alignment} exclusive onChange={handleAlignment}>
                <ToggleButton value="left">
                  <FormatAlignLeftIcon />
                </ToggleButton>
                <ToggleButton value="center">
                  <FormatAlignCenterIcon />
                </ToggleButton>
                <ToggleButton value="right">
                  <FormatAlignRightIcon />
                </ToggleButton>
                <ToggleButton value="justify" disabled>
                  <FormatAlignJustifyIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            <Grid item>
              <ToggleButtonGroup size="medium" value={alignment} exclusive onChange={handleAlignment}>
                <ToggleButton value="left">
                  <FormatAlignLeftIcon />
                </ToggleButton>
                <ToggleButton value="center">
                  <FormatAlignCenterIcon />
                </ToggleButton>
                <ToggleButton value="right">
                  <FormatAlignRightIcon />
                </ToggleButton>
                <ToggleButton value="justify" disabled>
                  <FormatAlignJustifyIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            <Grid item>
              <ToggleButtonGroup size="large" value={alignment} exclusive onChange={handleAlignment}>
                <ToggleButton value="left">
                  <FormatAlignLeftIcon />
                </ToggleButton>
                <ToggleButton value="center">
                  <FormatAlignCenterIcon />
                </ToggleButton>
                <ToggleButton value="right">
                  <FormatAlignRightIcon />
                </ToggleButton>
                <ToggleButton value="justify" disabled>
                  <FormatAlignJustifyIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Vertical & Standalone buttons" sx={style}>
          <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleChange}>
            <ToggleButton value="list">
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton value="module">
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value="quilt">
              <ViewQuiltIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButton
            value="check"
            selected={selected}
            onChange={() => {
              setSelected(!selected);
            }}
          >
            <CheckIcon />
          </ToggleButton>
        </Block>
      </Grid>
    </Grid>
  );
}
