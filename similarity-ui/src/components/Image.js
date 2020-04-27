import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import * as actions from 'actions';
import Paper from '@material-ui/core/Paper';
import { blueGrey } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles((theme) => ({
    root: {
    
    },
    paper: {
        backgroundColor: blueGrey[900],
        color: blueGrey[50]
    },
    margin: {
        margin: theme.spacing(2)
    },
    image: {
        display: 'block',
        width: 300,
        height: 300,
    }
  }));


function Image(props){

    console.log(props.imageurl)
    const url = props.imageurl.url
    const url_list = url.split("/")
    const type = url_list.pop()
    const filename = url_list.pop()
    const classes = useStyles();

    console.log(url_list)
    const closeImage = () => {
        props.selectedImage(null)
      };

    return (
        <div className={classes.root} >
            <Paper variant="outlined" className={classes.paper}>
                <Grid container spacing={3}> 
                    <Grid container item xs={12} justify="flex-end">  
                        <IconButton aria-label="close" color="secondary" onClick={closeImage}>
                            <CloseIcon />
                        </IconButton >
                    </Grid>
                    <Grid container item xs={12} className={classes.margin}> 
                        <Grid item xs={12} sm={6}>
                            <img className={classes.image} src={url} alt={props.imageurl} /> 
                        </Grid> 
                        <Grid item xs={12} sm={6}>
                            <Grid item>
                                File name: {filename}
                            </Grid>
                            <Grid item>
                                Rock type: {type}
                            </Grid>
                                                                                
                        </Grid>      
                    </Grid>
                    <Grid container item xs={12} className={classes.margin}>  
                        <Grid item>
                            URL: {url}
                        </Grid>  
                    </Grid>
                </Grid>
            </Paper>
            
        </div>
    )
}

function mapStateToProps(state){
    return { 
        type: state.type,
        searchField: state.searchField,
        imageList: state.imageList
    }
}

export default connect(mapStateToProps, actions) (Image);