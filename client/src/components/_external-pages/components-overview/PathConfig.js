import { paramCase } from 'change-case';

// ----------------------------------------------------------------------

export const FOUNDATION_LIST = ['Color', 'Typography', 'Shadows', 'Grid', 'Icons'].map((item) => ({
  name: item,
  href: `/components/${paramCase(item)}`,
  icon: `/static/components/${paramCase(item)}.png`
}));

export const EXTRA_LIST = [
  'Chart',
  'Map',
  'Editor',
  'Copy to clipboard',
  'Upload',
  'Carousel',
  'Multi language',
  'Animate',
  'Mega Menu'
].map((item) => ({
  name: item,
  href: `/components/${paramCase(item)}`,
  icon: `/static/components/${paramCase(item)}.png`
}));

export const MATERIAL_LIST = [
  'Accordion',
  'Alert',
  'Autocomplete',
  'Avatar',
  'Badge',
  'Breadcrumbs',
  'Buttons',
  'Checkbox',
  'Chip',
  'Dialog',
  'Label',
  'List',
  'Menu',
  'Pagination',
  'Pickers',
  'Popover',
  'Progress',
  'Radio Button',
  'Rating',
  'Slider',
  'Snackbar',
  'Stepper',
  'Switch',
  'Table',
  'Tabs',
  'Textfield',
  'Timeline',
  'Tooltip',
  'Transfer List',
  'TreeView'
].map((item) => ({
  name: item,
  href: `/components/${paramCase(item)}`,
  icon: `/static/components/${paramCase(item)}.png`
}));
