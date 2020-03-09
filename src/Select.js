import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Colors = ['red', 'yellow', 'green', 'blue'];

const Comps = [
    { 'title' : 'Button', 'path': 'demo-button' },
    { 'title' : 'Selection Control', 'path': 'demo-selection-control' },
    { 'title' : 'Input', 'path': 'demo-input' },
    { 'title' : 'Snackbar', 'path': 'demo-snack-bar' },
    { 'title' : 'Chips', 'path': 'demo-chips' },
    { 'title' : 'Progress Tabs', 'path': 'demo-vertical-tabs' },
    { 'title' : 'Typography', 'path': 'demo-wip' },
    { 'title' : 'Card', 'path': 'demo-wip' },
    { 'title' : 'Pagination', 'path': 'demo-wip' }
];

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [compName, setCompName] = React.useState([]);
  const [dropdown, setDropdown] = React.useState([]);
  const dropdownHandleChange = event => {
    setDropdown(event.target.value);
  };
  const handleChange = event => {
    setPersonName(event.target.value);
  };
  const ComponentChange = event => {
    setCompName(event.target.value);
  };

  return (
    <div>
      <h3 style={{color:'#333'}}>Dropdown with search</h3>
      
      <FormControl className={classes.formControl}>
        <InputLabel className="MuiInputLabel-shrink">Default</InputLabel>
        <Select id="demo-mutiple-name"
          value={dropdown} onChange={dropdownHandleChange}
          input={<Input />} MenuProps={MenuProps} >
          <MenuItem value="colors">Colors</MenuItem>
          <MenuItem value="components">Components</MenuItem>
        </Select>
      </FormControl>
      
      <br/>

      <Autocomplete
        id="combo-box-demo"
        options={Comps}
        getOptionLabel={option => option.title}
        style={{ width: 300 }}
        renderInput={params => <TextField {...params} label="Combo box" variant="outlined" />}
        />

        <br/>

      <FormControl className={classes.formControl}>
        <InputLabel className="MuiInputLabel-shrink">Colors</InputLabel>
        <Select id="color-select"
          multiple value={personName}
          onChange={handleChange} input={<Input />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}>
          {Colors.map(name => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br/>
      <FormControl className={classes.formControl}>
        <InputLabel className="MuiInputLabel-shrink">Components</InputLabel>
        <Select id="component-select"
            multiple value={compName}
            onChange={ComponentChange} input={<Input />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}>
            {Comps.map(comp => (
                <MenuItem key={comp.title} value={comp.path}>
                <Checkbox checked={compName.indexOf(comp) > -1} />
                <ListItemText primary={comp.title} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
    </div>
  );
}
