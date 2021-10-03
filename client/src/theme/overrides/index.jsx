import { merge } from 'lodash';
import Fab from './Fab';
import Card from './Card';
import Chip from './Chip';
import Tabs from './Tabs';
import Menu from './Menu';
import Grid from './Grid';
import Lists from './Lists';
import Table from './Table';
import Alert from './Alert';
import Badge from './Badge';
import Paper from './Paper';
import Input from './Input';
import Radio from './Radio';
import Drawer from './Drawer';
import Dialog from './Dialog';
import Avatar from './Avatar';
import Rating from './Rating';
import Slider from './Slider';
import Button from './Button';
import Switch from './Switch';
import Select from './Select';
import SvgIcon from './SvgIcon';
import Tooltip from './Tooltip';
import Popover from './Popover';
import Stepper from './Stepper';
import Pickers from './Pickers';
import Skeleton from './Skeleton';
import Backdrop from './Backdrop';
import Snackbar from './Snackbar';
import Progress from './Progress';
import Timeline from './Timeline';
import TreeView from './TreeView';
import Checkbox from './Checkbox';
import Container from './Container';
import Accordion from './Accordion';
import Typography from './Typography';
import Pagination from './Pagination';
import IconButton from './IconButton';
import Breadcrumbs from './Breadcrumbs';
import ButtonGroup from './ButtonGroup';
import Autocomplete from './Autocomplete';
import ToggleButton from './ToggleButton';
import ControlLabel from './ControlLabel';
import LoadingButton from './LoadingButton';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(
    Fab(theme),
    Tabs(theme),
    Chip(theme),
    Card(theme),
    Menu(theme),
    Grid(theme),
    Badge(theme),
    Lists(theme),
    Table(theme),
    Paper(theme),
    Alert(theme),
    Input(theme),
    Radio(theme),
    Rating(theme),
    Dialog(theme),
    Drawer(theme),
    Avatar(theme),
    Slider(theme),
    Button(theme),
    Switch(theme),
    Select(theme),
    Pickers(theme),
    Stepper(theme),
    Tooltip(theme),
    Popover(theme),
    SvgIcon(theme),
    Skeleton(theme),
    Timeline(theme),
    TreeView(theme),
    Backdrop(theme),
    Snackbar(theme),
    Progress(theme),
    Checkbox(theme),
    Container(theme),
    Accordion(theme),
    Typography(theme),
    Pagination(theme),
    IconButton(theme),
    Breadcrumbs(theme),
    ButtonGroup(theme),
    ControlLabel(theme),
    Autocomplete(theme),
    ToggleButton(theme),
    LoadingButton(theme)
  );
}
