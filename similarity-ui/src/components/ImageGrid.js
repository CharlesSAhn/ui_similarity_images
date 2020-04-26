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
    image: {
        width: 200,
        height: 200,
        paddingTop: theme.spacing(2)
      },
    img: {
        display: 'block',
        width: 180,
        height: 180,
        paddingLeft: theme.spacing(2)
      },
    fileNamePos: {
        marginLeft: theme.spacing(2),
      },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    andesite: {
        color: red[300],
        marginLeft: theme.spacing(2),
    },
    gneiss: {
        color: deepPurple[300],
        marginLeft: theme.spacing(2),
    },
    marble: {
        color: brown[300],
        marginLeft: theme.spacing(2),
    },
    quartzite: {
        color: blue[300],
        marginLeft: theme.spacing(2),
    },
    rhyolite: {
        color: deepOrange[300],
        marginLeft: theme.spacing(2),
    },
    schist: {
        color: teal[300],
        marginLeft: theme.spacing(2),
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

    return (
        <Grid container spacing={3}> 
            {
                imageList.map( image => (
                    <Grid key={image.url} item xs={12} sm={2}>
                        <Paper elevation={1}>
                            <Grid item xs={12} sm container>
                                <Grid item xs>
                                    <ButtonBase className={classes.image}>   
                                        <img className={classes.img} src={image.url} alt={image.fileName} />                                                                                                           
                                   </ButtonBase>  
                                </Grid>
                                <Grid item xs>                                 
                                    <Typography className={classes.fileNamePos} color="textSecondary">
                                        {image.fileName}  
                                    </Typography> 
                                    {
                                        image.type === "andesite" && (
                                            <Typography className={classes.fileNamePos} className={classes.andesite}>
                                                {image.type}  
                                            </Typography> 
                                        )
                                    }     

                                    {
                                        image.type === "gneiss" && (
                                            <Typography className={classes.fileNamePos} className={classes.gneiss}>
                                                {image.type}  
                                            </Typography> 
                                        )
                                    } 

                                    {
                                        image.type === "quartzite" && (
                                            <Typography className={classes.fileNamePos} className={classes.quartzite}>
                                                {image.type}  
                                            </Typography> 
                                        )
                                    } 

                                    {
                                        image.type === "marble" && (
                                            <Typography className={classes.fileNamePos} className={classes.marble}>
                                                {image.type}  
                                            </Typography> 
                                        )
                                    } 

                                    {
                                        image.type === "rhyolite" && (
                                            <Typography className={classes.fileNamePos} className={classes.rhyolite}>
                                                {image.type}  
                                            </Typography> 
                                        )
                                    } 

                                    {
                                        image.type === "schist" && (
                                            <Typography className={classes.fileNamePos} className={classes.schist}>
                                                {image.type}  
                                            </Typography> 
                                        )
                                    }                                                             
                                                                    
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
        imageList: state.imageList
    }
}

export default connect(mapStateToProps, actions) (ImageGrid);