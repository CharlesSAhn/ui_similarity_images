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
        justifyContent: "center"
      },
    img: {
        margin: 'auto',
        display: 'block',
        justifyContent: "center"
      },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    andesite: {
        color: red[300],
    }
  }));




function ImageGrid(props) {

    const classes = useStyles();

    let imageList = []

    const image_width = props.thumbnail ? props.width_dimension / 15: props.width_dimension / 7;
    const grid_spacing = props.thumbnail ? 1 : 2;

    // filter based on the rock types
    if (props.type[0] === "" || props.type.length === 0){
        imageList = props.imageList.images
    }else{
        imageList = props.imageList.images.filter( function(image) {
            return image.type === props.type[0]
        })
    }


    //filter based on the search text
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
        <Grid container spacing={grid_spacing}> 
            {
                imageList.map( image => (
                    <Grid key={image.url} item xs={12} sm={2}>
                        <Paper className={classes.paper} variant="outlined">
                            <Grid container spacing={2}>
                                <Grid item>
                                    <ButtonBase className={classes.image} height={image_width} width={image_width} onClick={selectImage}>   
                                        <img className={classes.img} src={image.url} alt={image.fileName} height={image_width} width={image_width} />                                                                                                           
                                   </ButtonBase>  
                                </Grid>
                                <Grid item xs={12} sm container>    
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography variant="body2" color="textSecondary">
                                                {image.fileName}  
                                            </Typography> 

                                            <Typography className={classes.andesite}>
                                                {image.type}  
                                            </Typography>                             
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