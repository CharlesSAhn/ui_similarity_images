import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    img: {
        margin: 'auto',
        display: 'block',
        width: 80,
        height: 80,
      },
    image_metadata: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(4),
    }
  }));


function SimilarImages(props){
    const classes = useStyles();
    const images = props.similarImages;
    const image_width_thumbnail = props.image_width_thumbnail
    
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                <List className={classes.root}>
                        {
                            images.map( (image, index) => (
                                <ListItem key={index}>
                                    <img className={classes.img} src={image.url} alt={image.fileName} height={image_width_thumbnail} width={image_width_thumbnail} />
                                    <ListItemText className={classes.image_metadata} primary={image.url} secondary={image.score}/>                                             
                                </ListItem>
                            ))
                        }
                        
                    </List>              
                </Grid>
            </Grid>
        </div>      
    )
}

export default SimilarImages;