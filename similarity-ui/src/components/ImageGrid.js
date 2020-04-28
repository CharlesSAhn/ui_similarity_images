import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { deepOrange, deepPurple, indigo, red, blue, teal, brown } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import * as actions from 'actions';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(1),
        margin: 'auto',
        maxWidth: 500,
      },
    image: {
        width: 80,
        height: 80
      },
    img: {
        margin: 'auto',
        display: 'block',
        width: 80,
        height: 80,
      },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    andesite: {
        color: red[300],
    },
    gneiss: {
        color: deepPurple[300],
    },
    marble: {
        color: brown[300],
    },
    quartzite: {
        color: blue[300],
    },
    rhyolite: {
        color: deepOrange[300],
    },
    schist: {
        color: teal[300],
    },
  }));




function ImageGrid(props) {

    const classes = useStyles();

    let imageList = []
    

    // filter based on the rock types
    if (props.type[0] === "" || props.type.length === 0){
        imageList = props.imageList.images
    }else{
        imageList = props.imageList.images.filter( function(image) {
            return image.type === props.type[0]
        })
    }


    //filter based on the search text
    console.log(props.searchField)
    if (props.searchField.length > 0){
        if (props.searchField[0] !== ""){
            imageList = imageList.filter( function(image) {
                return image.fileName.toLowerCase().includes(props.searchField[0].toLowerCase())
            })
        }
    }

    const selectImage = (event) => {
        if (event.target.src === undefined){
            console.log("---------undefined image -----------")
            console.log(event.target)
        }
        else{
            props.selectedImage({url: event.target.src});
        }
        
      }

    return (
        <Grid container spacing={3}> 
            {
                imageList.map( image => (
                    <Grid key={image.url} item xs={12} sm={2}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <ButtonBase className={classes.image} onClick={selectImage}>   
                                        <img className={classes.img} src={image.url} alt={image.fileName} />                                                                                                           
                                   </ButtonBase>  
                                </Grid>
                                <Grid item xs={12} sm container>    
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography variant="body2" color="textSecondary">
                                                {image.fileName}  
                                            </Typography> 

                                            {
                                                image.type === "andesite" && (
                                                    <Typography className={classes.andesite}>
                                                        {image.type}  
                                                    </Typography> 
                                                )
                                            }     

                                            {
                                                image.type === "gneiss" && (
                                                    <Typography className={classes.gneiss}>
                                                        {image.type}  
                                                    </Typography> 
                                                )
                                            } 

                                            {
                                                image.type === "quartzite" && (
                                                    <Typography className={classes.quartzite}>
                                                        {image.type}  
                                                    </Typography> 
                                                )
                                            } 

                                            {
                                                image.type === "marble" && (
                                                    <Typography className={classes.marble}>
                                                        {image.type}  
                                                    </Typography> 
                                                )
                                            } 

                                            {
                                                image.type === "rhyolite" && (
                                                    <Typography className={classes.rhyolite}>
                                                        {image.type}  
                                                    </Typography> 
                                                )
                                            } 

                                            {
                                                image.type === "schist" && (
                                                    <Typography className={classes.schist}>
                                                        {image.type}  
                                                    </Typography> 
                                                )
                                            }   
                        
                                        </Grid>

                                    </Grid>                             
                                   
                                                                                              
                                                                    
                                </Grid>
                            </Grid> 
                        </Paper>                                         
                    </Grid>                       
                ))
            }
                
        </Grid>
    )
}

function mapStateToProps(state){
    return { 
        type: state.type,
        searchField: state.searchField,
        imageList: state.imageList,
        selectedImage: state.image.selectedImage
    }
}

export default connect(mapStateToProps, actions) (ImageGrid);