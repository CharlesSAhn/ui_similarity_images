import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import data from "env.json"
import { connect } from 'react-redux';
import * as actions from 'actions';

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(5),
    },
    textField: {
        marginTop: theme.spacing(2),
        width: '40ch',
      },
    marginSelect: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(2),
        width: '25ch',
      }
  }));

function FilterOptions(props) {

    const classes = useStyles();
    const [searchField, setSearchField ] = useState("");
    const [type, setType] = useState('');
    const types = data.types;

    const handleSearchFieldUpdate = (event) => {

        setSearchField(event.target.value);
      };


    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        props.saveSearchString(event.target.value)

      }
    }

      const handleTypedUpdate = (event) => {

        props.savedTypes(event.target.value);
        setType(event.target.value);
      };


    return (
        <div className={classes.root}>
            <FormControl className={classes.textField}>
                <TextField
                    label="search"
                    id="outlined-margin-dense"
                    className={classes.textField}
                    margin="dense"
                    variant="outlined"
                    value ={searchField}
                    onChange={handleSearchFieldUpdate}
                    onKeyPress={handleKeyPress}
                />
            </FormControl>
            
            <FormControl className={classes.marginSelect}>
                <InputLabel htmlFor="demo-customized-select-native">Type</InputLabel>
                <NativeSelect
                    id="demo-customized-select-native"
                    value={type}
                    onChange={handleTypedUpdate}
                    input={<BootstrapInput />}
                >
                    <option aria-label="None" />
                    {
                        types.map( t => <option key={t} value={t}>{t}</option> )
                    }
                
                </NativeSelect>
            </FormControl>
        </div>
    )
    
}


export default connect(null, actions) (FilterOptions);